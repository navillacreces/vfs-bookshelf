import React from 'react'
import bookContext from './BookContext'
import config from '../config'


export default class SearchResultElement extends React.Component {

    static contextType = bookContext

    static defaultProps = {
        history: {
            push: () => { }
        },
    }


    constructor(props){
        super(props)
        this.state = {
            error: null
        }
    }

    confirmedBook = event =>{

        console.log(this.props.volumeInfo.title)

        const status = this.props.ownership;
        const rating = this.props.rating;
        const img = this.props.volumeInfo.imageLinks.thumbnail;
        const title = this.props.volumeInfo.title;
        const authors = this.props.volumeInfo.authors[0];
        const purchase_link = this.props.volumeInfo.previewLink;

        const newBook = {
            title : title,
            author : authors,
            ownership: status,
            rating: rating,
            img : img,
            purchase_link: purchase_link
        }
        
        console.log(newBook)


        const options = {
            method : 'POST',
            body: JSON.stringify(newBook),
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
        .then(book =>{
           
            this.props.history.push('/');
         //  this.context.handleAddBook(book)
        })
        .catch(err =>{

            console.log(err);
            
              this.setState({
                  
                  error: err.message
              });
              
          });
        
    }


    render() {

        
        let imageAddress = this.props.volumeInfo.imageLinks.thumbnail;

        if (imageAddress === undefined){
            imageAddress = ''
        }
        
        

        return (
            <div className="search-result-element">
                <div className="search-result-title">
                  <h4>{this.props.volumeInfo.title}</h4> 
                </div>
                <div className="search-result-author">
                    <h5>{this.props.volumeInfo.authors}</h5>
                </div>
                <div className="search-result-button">
                    <button type="button" onClick={(e) => this.confirmedBook()}>This is the book</button>
                </div>
                <div className="search-result-desc">
                    
                    <img src={imageAddress} alt={"book-cover"} />
                    <p>{this.props.volumeInfo.description}</p>
                </div>
                
            </div>
        )
    }
}
