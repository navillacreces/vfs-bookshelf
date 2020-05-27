import React from 'react';
import {Route} from 'react-router-dom';
import BookList from './BookList'

import '../css/app.css'
import AddBook from './AddBook';

const sampleBooks = [
  {
    id: '0',
    Author: "Adam Carolla",
    Title: "Not Taco Bell Material",
    Status: "Not Owned",
   
  },
  {
    id: '1',
    Author: "Chuck Palahniuk",
    Title: "Fight Club",
    Status: "Hardcopy",
    
  },
  {
    id: '2',
    Author: "Aldous Huxley",
    Title: "Brave New World",
    Status: "E-Book",
   
  },
  {
    id: '3',
    Author: "Walter Isaacson",
    Title: "Steve Jobs",
    Status: "Hardcopy",
   
  },
  {
    id:'4',
    Author: "Danny Mullen",
    Title: "Home",
    Status: "Not Owned",
    
  }

]

export default class App extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      books : []
    };
  }

  componentDidMount(){
    this.setState({
      books: sampleBooks
    })
  }

  render(){

    return (
      <div className="App">
        <header>
            <h1>VFS-Bookshelf</h1>
        </header>
        
      </div>
    );
  }
}


