import React from 'react';
import {Route} from 'react-router-dom';
import BookList from './BookList'
import BookContext from './BookContext'
import '../css/app.css'
import AddBook from './AddBook';
import config from '../config'


export default class App extends React.Component {

   

  constructor(props){
    super(props)
    this.state = {
      books : [],
      error: null
    };
  }

  handleAddBook = newBook =>{
    this.setState({
      books: [...this.state.books, newBook]
    })
  }

  componentDidMount(){

         
    const options = {
      method: 'GET',
      headers:{
        "Content-Type": "application/json" 
      }
    }


    fetch(`${config.REACT_APP_API_ENDPOINT}/books`,options)
      .then(res =>{
        if (!res.ok){
            throw new Error('Something went wrong, please try again later');
        }

          return res.json()
      })
      .then(books =>{
        this.setState({
          books:books
        })
      })
        .catch(err =>{
          this.setState({
              error: err.message
          });
      });
    
  }

  render(){

    const value = {
      books : this.state.books,
      handleAddBook: this.handleAddBook,
      postToDatabase: this.postToDatabase
    }

    return (
      <BookContext.Provider value={value}>
        <div className="App">
          <header>
            <h1>VFS-Bookshelf</h1>
          </header>
          <Route exact path='/' component={BookList} />
          <Route path='/add' component={AddBook} />

          {/*<Route path='/results' component={SearchResultList} /> */}
        </div>
      </BookContext.Provider>
    );
  }
}


