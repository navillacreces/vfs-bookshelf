import React, { Component } from 'react'
import ValidationError from './ValidationError'
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
            zeroResult : false,
            searched: false,
            ownership: '',
            rating: '',
            error: ''
        };
    }


    clearTheForm = event =>{
        
        document.getElementById('myform').reset();
        this.setState({
            results: [],
            searched: false,      
        }) 
    }


    onSubmit = event =>{

        event.preventDefault();

        this.setState({
            zeroResult: false
        })

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
        
        // google books api 
        const url = 'https://www.googleapis.com/books/v1/volumes?q=';

        const titleArray = title.split(' ');

        const authorArray = author.split(' ');
        const authorLastName = authorArray[authorArray.length - 1];

        const titleQuery= `intitle:${titleArray[0]}`;
        const authorQuery = `inauthor:${authorLastName}+`;
       

        const options = {
            method : 'GET',
            header : {
                'Content-Type': 'application/json'
            }
        };
        //  search string
        const urlWithQ = url + authorQuery + titleQuery; 
        
        fetch(urlWithQ + `&key=${config.REACT_APP_API_KEY}`, options)
            .then(res =>{
                if (!res.ok){
                    throw new Error ('something went wrong try again later');
                }
                return res.json();
            })
            .then(resObj =>{
                
               //reset form if no results
                if (resObj.totalItems === 0){
                    this.setState({
                        zeroResult: true
                    })
                    document.getElementById('myform').reset();
                   
                } else {

                const firstFive = []; // lets user decide which to add to library
                let x = 0;

                for (x = 0; x <= 4; x++){
                    
                    firstFive.push(resObj.items[x]);
                }

                this.setState({
                    results: firstFive,
                    searched: true,
                    ownership: newBook.status,
                    rating: newBook.rating
                })                  
                };  

            })
            .catch(err =>{

                this.setState({
                    error: err
                })           
              });       
    }


    ZeroResult(){
       
            return 'No Results Found, Please make a new serach';
        
    }

    render() {

        const zeroResultsError = this.ZeroResult()
        return (
            <section>
            <div className="addBook">
                <h4>Add a book to your bookshelf with the Google Api</h4>
                {this.state.zeroResult && <ValidationError className="zero-error" message={zeroResultsError}/>}
                <div className="form-container">
                <form id="myform" onSubmit={this.onSubmit}>
                    <div className="form-container">
                <div className="title-container">
                    <label htmlFor="title">
                        Title:
                    </label>
                    <input type="text" name="title" id="title" />
                </div>
                <div className="author-container">
                    <label htmlFor="author">
                        Author:
                    </label>
                    <input type="text" name="author" id="author" />
                </div>
               
                <div className="rating-container">
                    <label htmlFor="rating">
                        Your Rating: 
                    </label>
                    <select name="rating" id="rating">
                        <option defaultValue value='1'>1</option>
                        <option value='2'>2</option>
                        <option value='3'>3</option>
                        <option value='4'>4</option>
                        <option value='5'> 5</option>
                    </select>
                </div>
                <div className="ownership-container">
                    <label htmlFor="ownership">
                        Ownership: 
                    </label>
                    <select name="ownership" id="ownership">
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
                    </div>
                    <button type="submit">Submit</button>
                </form>
                </div>
                {this.state.searched && <SearchResultList 
                    history={this.props.history}
                    clearTheForm={this.clearTheForm}
                    results={this.state.results}
                    ownership={this.state.ownership}
                    rating={this.state.rating} />}
            </div>
            </section>
        )
    }
}
