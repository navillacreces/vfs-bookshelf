import React, { Component } from 'react'
//import ValidationError from './ValidationError'
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

    postToDataBase(aNewBook){

        const options = {
            method : 'POST',
            body: JSON.stringify(aNewBook),
            headers:{
                'Content-Type' : 'application/json'
            }
        }

        const url = 'http://localhost:8000/books';

        fetch(url,options)
            .then(res =>{
                if(!res.ok){
                    throw new Error('something went wrong, please try again');
                }
                return res.json()
            })
            .then(res =>{
                this.context.handleAddBook(res)
            })
            .catch(err =>{

                console.log(err);
                  this.setState({
                      
                      error: err.message
                  });
              });
    }


    onSubmit = event =>{

        event.preventDefault();

        const author = event.target.author.value;
        const title = event.target.title.value;
        const isbn = event.target.ISBN.value;
        const rating = event.target.rating.value;
        const ownership = event.target.ownership.value;

        const newBook = {
            title : title,
            author: author,
            rating: rating,
            status: ownership,
            isbn: isbn,
            img: null,
            purchase_link: null
        }
        
        
        const url = 'https://www.googleapis.com/books/v1/volumes?q='
        const authorArray = author.split(' ');
        const authorLastName = authorArray[authorArray.length - 1]

        const authorQuery = `inauthor:${authorLastName}+`
        const isbnQuery = `isbn:${isbn}`

        const options = {
            method : 'GET',
            header : {
                'Content-Type': 'application/json'
            }
        }

        const urlWithQ = url + authorQuery + isbnQuery;
        
        fetch(urlWithQ + `&key=${config.REACT_APP_API_KEY}`, options)
            .then(res =>{
                if (!res.ok){
                    throw new Error ('something went wrong try again later');
                }
                return res.json()
            })
            .then(resObj =>{

                if (resObj.totalItems === 0){
                    this.postToDataBase(newBook)
                    this.context.handleAddBook(newBook)
                    this.props.history.push('/');
                }
                
               newBook.img = resObj.items[0].volumeInfo.imageLinks.thumbnail;
               newBook.purchase_link = resObj.items[0].volumeInfo.previewLink;

               this.postToDataBase(newBook)
               this.context.handleAddBook(newBook)
               this.props.history.push('/');
               
            })
            .catch(err =>{

                console.log(err);
               
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
                        <option selected value='1'>1</option>
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
                        <option selected value="Not Yet Owned">
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
