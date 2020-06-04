import React from 'react';
import {Route} from 'react-router-dom';
import BookList from './BookList'
import BookContext from './BookContext'
import '../css/app.css'
import AddBook from './AddBook';

const sampleBooks = [
  {
    id: '0',
    author: "Adam Carolla",
    title: "Not Taco Bell Material",
    ownership: "Not Owned",
   
  },
  {
    id: '1',
    author: "Chuck Palahniuk",
    title: "Fight Club",
    ownership: "Hardcopy",
    
  },
  {
    id: '2',
    author: "Aldous Huxley",
    title: "Brave New World",
    ownership: "E-Book",
   
  },
  {
    id: '3',
    author: "Walter Isaacson",
    title: "Steve Jobs",
    ownership: "Hardcopy",
   
  },
  {
    id:'4',
    author: "Danny Mullen",
    title: "Home",
    ownership: "Not Owned",
    
  }

]

export default class App extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      books : []
    };
  }

  handleAddBook = (newBook) =>{
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

    

    fetch('http://localhost:8000/books',options)
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
      



    /*
    this.setState({
      books: sampleBooks
    })
    */
  }

  render(){

    const value = {
      books : this.state.books,
      handleAddBook: this.handleAddBook
    }

    return (
      <BookContext.Provider value={value}>
      <div className="App">
        <header>
            <h1>VFS-Bookshelf</h1>
        </header>
        <Route exact path='/' component={BookList} />
        <Route path='/add' component={AddBook} />
        
      </div>
      </BookContext.Provider>
    );
  }
}


