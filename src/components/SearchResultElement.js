import React from 'react'

export default class SearchResultElement extends React.Component {


    constructor(props){
        super(props)
        this.state = {}
    }



    render() {

        

        return (
            <div className="search-result-element">
                <div className="search-result-title">
                   {this.props.volumeInfo.title}
                </div>
                <div className="search-result-author">
                    {this.props.volumeInfo.authors}
                </div>
                <div className="search-result-button">
                    <button type="button">This is the book</button>
                </div>
                <div className="search-result-desc">
                    
                    <img src={this.props.volumeInfo.imageLinks.thumbnail} alt={"book-cover"} />
                    <p>{this.props.volumeInfo.description}</p>
                </div>
                
            </div>
        )
    }
}
