import React, { Component } from 'react'
import ValidationError from './ValidationError'
import BookContext from './BookContext'

export default class AddBook extends Component {

    static contextType = BookContext;

    static defaultProps = {
        history: {
            push: () => { }
        },
    }


    constructor(props){
        super(props)
        this.state = {};
    }


    onSubmit = event =>{

        event.preventDefault();

        const author = event.target.author.value;
        const title = event.target.title.value;
        const isbn = event.target.isbn.value;
        const rating = event.target.rating.value;
        const ownership = event.target.ownership.value;

        const newBook = {
            Title : title,
            Author: author,
            Rating: rating,
            Status: ownership,
            id: new Date()
        }
        
       

    }

    ValidateTitle(){

    }

    ValidateAuthor(){

    }



    render() {
        return (
            <div className="addBook">
                <div className="form-container">
                <form onSubmit={this.onSubmit}>
                <div className="title-container">
                    <label>
                        Title:
                    </label>
                    <input type="text" name="title" />
                </div>
                <div className="author-container">
                    <label>
                        Author:
                    </label>
                    <input type="text" name="author" />
                </div>
                <div className="ISBN-container">
                    <label>
                        ISBN:
                    </label>
                    <input 
                        type="text"
                        name="ISBN"></input>
                </div>
                <div className="rating-container">
                    <label>
                        Your Rating: 
                    </label>
                    <select name="rating">
                        <option value='1'>1</option>
                        <option value='2'>2</option>
                        <option value='3'>3</option>
                        <option value='4'>4</option>
                        <option value='5'> 5</option>
                    </select>
                </div>
                <div className="ownership-container">
                    <label>
                        Ownership: 
                    </label>
                    <select name="ownership">
                        <option value="Not Yet Owned">
                            No
                        </option>
                        <option value="Kindle">
                            Kindle
                        </option>
                        <option value="E-Book">
                            E-Book
                        </option>
                        <option value="Hardcopy">
                            Hardcopy
                        </option>
                    </select>
                    </div>
                    <button type="submit">Submit</button>
                </form>
                </div>
            </div>
        )
    }
}
