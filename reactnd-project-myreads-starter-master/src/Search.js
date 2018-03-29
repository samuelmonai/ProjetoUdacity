import React from 'react'
import * as BooksAPI from './BooksAPI'
import {Link} from 'react-router-dom'
import Shelf from './Shelf'


class Search extends React.Component {
  constructor(){
    super();
      this.state={query:'',queryResults:[],myBooks:[],myBooksOnDisplay:[]
    };
    this.onChange = (ev)=>{
      const state = Object.assign({},this.state);
      const campo = ev.target.name;
      state[campo]= ev.target.value;
      this.setState(state);
    };
  }

  moveBook = (book,shelf) => {
    this.props.onMoveBook(book,shelf)
    shelf!=='none' ?
      (this.setState((state)=>({
        myBooksOnDisplay: state.myBooksOnDisplay.concat(book),
        queryResults:state.queryResults.filter((b) => b.id !== book.id),
        myBooks: state.myBooks.concat(book)
      })))
    :
      (this.setState((state)=>({
        myBooksOnDisplay: state.myBooksOnDisplay.filter((b) => b.id !== book.id),
        queryResults: state.queryResults.concat(book),
        myBooks: state.myBooks.filter((b) => b.id !== book.id)
      })))
  }

  componentDidMount(){
    BooksAPI.getAll().then((myBooks)=>{
      this.setState({myBooks:myBooks})
    }).catch
  }

  updateQuery = (query) =>{
    this.setState({query:query.trim()})
      BooksAPI.search(this.state.query).then((books)=>{
      if (books) {
        let interse =[]
        for (const book of books) {
          for ( const b of this.state.myBooks) {
            if (b.id === book.id){
              book.shelf=b.shelf;
              interse.push(book);
              books = books.filter((b) => (b.id!==book.id))
            }
          }
        }
        this.setState({myBooksOnDisplay:interse})
        this.setState({queryResults:books})
      }
    }).catch
  }

  render(){
    const { myBooksOnDisplay, queryResults } = this.state;
   
    return(
      <div className="search-books">
      <div className="search-books-bar">
        <Link className="close-search" to="/">Close</Link>
        <div className="search-books-input-wrapper">
          {           
            /*
            NOTES: The search from BooksAPI is limited to a particular set of search terms.
            You can find these search terms here:
            https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

            However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
            you don't find a specific author or title. Every search is limited by search terms.
          */}
          <input type="text" placeholder="Search by title or author" value={this.state.query} 
          onChange={(event)=>this.updateQuery(event.target.value)}/>
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid"></ol>
        <div className="list-books-content">
          <Shelf onMoveBook={this.moveBook} myBooks={myBooksOnDisplay} shelf={'On My Colection'}/>
          <Shelf onMoveBook={this.moveBook} myBooks={queryResults} shelf={'Looking'}/>
      </div >
      </div>
    </div>
    )
  }
}
export default Search