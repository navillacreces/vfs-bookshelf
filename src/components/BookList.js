import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import Book from './Book'
import BookContext from './BookContext'

export default class BookList extends React.Component {

    static contextType = BookContext;

    constructor(props){
        super(props)
        this.state={};
    }


    render() {

        
        
        return (
            <>
                
                <div className="book-list">
                    <div className="add-button-container">
                        <Link to='/add'>
                            <button type="button">+</button>
                        </Link>
                    </div>
                    {this.context.books.map(book =>{
                        return <Book key={book.id}{...book}></Book>
                    })}
                </div>
            </>
        )
    }
}
