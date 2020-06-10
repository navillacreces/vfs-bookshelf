import React, { Component } from 'react'
//import ValidationError from './ValidationError'
import BookContext from './BookContext'
import config from '../config'
import SearchResultList from './SearchResultList';

export default class AddBook extends Component {

    static contextType = BookContext;

    static defaultProps = {
        history: {
            push: () => { }
        },
    }


    constructor(props){
        super(props)
        this.state = {
            results : [],
            searched: false
        };
    }

    postToDataBase(aNewBook){

        const options = {
            method : 'POST',
            body: JSON.stringify(aNewBook),
            headers:{
                'Content-Type' : 'application/json'
            }
        }

        

        fetch(`${config.REACT_APP_API_ENDPOINT}/books`,options)
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
        
        const rating = event.target.rating.value;
        const ownership = event.target.ownership.value;

        const newBook = {
            title : title,
            author: author,
            rating: rating,
            status: ownership,
            isbn: null,
            img: null,
            purchase_link: null
        }
        
        
        const url = 'https://www.googleapis.com/books/v1/volumes?q='

        const titleArray = title.split(' ');

        const authorArray = author.split(' ');
        const authorLastName = authorArray[authorArray.length - 1]

        const titleQuery= `intitle:${titleArray[0]}`
        const authorQuery = `inauthor:${authorLastName}+`
       // const isbnQuery = `isbn:${isbn}`

        const options = {
            method : 'GET',
            header : {
                'Content-Type': 'application/json'
            }
        }

        const urlWithQ = url + authorQuery + titleQuery; // isbn 
        
        fetch(urlWithQ + `&key=${config.REACT_APP_API_KEY}`, options)
            .then(res =>{
                if (!res.ok){
                    throw new Error ('something went wrong try again later');
                }
                return res.json()
            })
            .then(resObj =>{

               

                
                if (resObj.totalItems <= 1){
                    console.log('this is one')
                   // this.postToDataBase(newBook)
                   // this.context.handleAddBook(newBook)
                  //  this.props.history.push('/');
                } else {

                    // get first 5 results
                    const firstFiveResults = [];
                    

                    for (let x = 0; x < 4 ; x++){
                        console.log(resObj.items[x])
                        firstFiveResults.push(resObj.items[x])
                    }
                    

                    // set resObj to state
                    this.setState({
                        results: firstFiveResults,
                        searched: true
                    })
                    // state bool true , searched

                }

                

                /*
               newBook.img = resObj.items[0].volumeInfo.imageLinks.thumbnail;
               newBook.purchase_link = resObj.items[0].volumeInfo.previewLink;

               this.postToDataBase(newBook)
               this.context.handleAddBook(newBook)
               this.props.history.push('/');
               */
               
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
               
                <div className="rating-container">
                    <label>
                        Your Rating: 
                    </label>
                    <select name="rating">
                        <option defaultValue value='1'>1</option>
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
                        <option defaultValue value="Not Yet Owned">
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
                {this.state.searched && <SearchResultList results={this.state.results} />}
            </div>
        )
    }
}
