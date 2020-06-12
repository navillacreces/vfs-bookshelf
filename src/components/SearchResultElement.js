import React from 'react'
import bookContext from './BookContext'



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

        const title = this.props.volumeInfo.title;
        const authors = this.props.volumeInfo.authors;

        const newBook = {
            title : title,
            author : authors,
            status: status,
            rating: rating
        }
        
        
        this.context.postToDatabase(newBook)
        this.props.history.push('/');
    }


    render() {

        let imageAddress = this.props.volumeInfo.imageLinks.thumbnail

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
                    <button type="button" onClick={() => this.confirmedBook()}>This is the book</button>
                </div>
                <div className="search-result-desc">
                    
                    <img src={imageAddress} alt={"book-cover"} />
                    <p>{this.props.volumeInfo.description}</p>
                </div>
                
            </div>
        )
    }
}
