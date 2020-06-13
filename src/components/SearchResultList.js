import React from 'react'
import SearchResultElement from './SearchResultElement'


export default class SearchResultList extends React.Component {

    constructor(props){
        super(props)
        this.state ={}
    }



    render() {
        return (
            <div className="search-result-list">
                <h4>Search Results</h4>
                <h6>With Google Books API</h6>
                <button type="button">None of these are it</button>
                {this.props.results.map(book =>{
                    return <SearchResultElement 
                                key={book.id}
                                
                                rating={this.props.rating}
                                ownership={this.props.ownership}
                                {...book} />                                         
                })} 
            </div>
        )
    }
}
