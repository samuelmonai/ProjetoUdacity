import React from 'react'

function Shelf (props) {
    return(
      <div className="bookshelf">
      <h2 className="bookshelf-title">{props.shelf}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {props.myBooks.map((book)=>(
            <li key={book.id}>
              <div className="book">
                <div className="book-top">
                  <div className="book-cover" style={{
                    width: 128, height: 193,
                    backgroundImage:book.imageLinks ? `url(${book.imageLinks.smallThumbnail})` :null
                    }}>
                  </div>
                  <div className="book-shelf-changer">
                    <select value={book.shelf} onChange={(event)=>props.onMoveBook(book,event.target.value)} >
                    <option value="none">None</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    </select>
                  </div>
                </div>
               <div className="book-title">{book.title}</div>
               <div className="book-authors">{book.authors}</div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}
export default Shelf