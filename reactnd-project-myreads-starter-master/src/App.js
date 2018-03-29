import React from 'react'
import {Link} from 'react-router-dom'
import {Route} from 'react-router'
import * as BooksAPI from './BooksAPI'
import Shelf from './Shelf'
import Search from './Search'
import './App.css'

class BooksApp extends React.Component {
  constructor(){
    super();
      this.state={books :[]
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    };
    this.onChange = (ev)=>{
      const state = Object.assign({},this.state);
      const campo = ev.target.name;
      state[campo]= ev.target.value;
      this.setState(state);
    };
  }

  componentDidMount(){
    BooksAPI.getAll().then((books)=>{
      this.setState({books:books})
    })
  }

  moveBook = (book,shelf) => {
    console.log(book.title, shelf);
    this.setState(state=>({
      books: state.books.filter((b) => b.id !== book.id)
    }))
    book.shelf = shelf
    this.setState((state)=>({
      books: state.books.concat(book)
    }))
    BooksAPI.update(book,shelf)
  }

 

  render() {
    return (
      <div className="app">
          <Route exact path="/" render={()=>( 
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-top">
              <div className="list-books-content">
              <Shelf onMoveBook={this.moveBook} myBooks={this.state.books.filter((book)=>book.shelf==='currentlyReading')} shelf={'currentlyReading'}/>
              <Shelf onMoveBook={this.moveBook} myBooks={this.state.books.filter((book)=>book.shelf==='wantToRead')} shelf={'wantToRead'}/>
              <Shelf onMoveBook={this.moveBook} myBooks={this.state.books.filter((book)=>book.shelf==='read')} shelf={'Read'}/>
              </div>
            </div>
            <div className="open-search">
            <Link to="/search">Add a book</Link>
            </div>
          </div>
        )}/>
        <Route path="/search" render={()=>(
        <div className="list-books">
          <Search onMoveBook={this.moveBook} myBooks={this.state.books}/>
        </div>
      )}/>
      </div>
    )
  }
}

export default BooksApp
