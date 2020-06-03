import React, { Component } from 'react'
import ValidationError from './ValidationError'
import BookContext from './BookContext'
import config from '../config'



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
        const rating = event.target.rating.value;
        const ownership = event.target.ownership.value;

        const authorNameArray = author.split(' ');
        const authorLastName = authorNameArray[1];


        const titleArray = title.split(' ');
        const titleQuery = `${titleArray[0]}+${titleArray[1]}+${titleArray[2]}`

        const newBook = {
            Title : title,
            Author: author,
            Rating: rating,
            Status: ownership,
            id: new Date()
        }
        // remember key

        const options = {
            method: 'GET',
            headers: {
                'Content-Type' : 'application/json'
            }
        }

        const url = 'https://www.googleapis.com/books/v1/volumes?q='
        const bookQuery = `inauthor:${authorLastName}+intitle:${titleQuery}`
        
        const ourSearch = url + bookQuery;

        fetch(ourSearch + `&key=${config.REACT_APP_API_KEY}`,options)
            .then(res =>{
                if(!res.ok){
                    throw new Error('Something went wrong, please try again later');
                }
                
                console.log(res.json())
            })
            .catch(err =>{

                console.log(err);
                  this.setState({
                      
                      error: err.message
                  });
                });

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
