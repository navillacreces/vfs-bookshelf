import React from 'react'
import SearchResultElement from './SearchResultElement'


export default class SearchResultList extends React.Component {

    constructor(props){
        super(props)
        this.state ={}
    }



    render() {
        return (
            <section>
            <div className="search-result-list">
                <div className="search-heading">
                    <h4>Search Results</h4>
                    <h6>With Google Books API</h6>
                    <button 
                        type="button"
                        onClick={this.props.clearTheForm} 
                        className="not-found-button">None of these are it</button>
                </div>
                {this.props.results.map(book =>{
                    return <SearchResultElement 
                                key={book.id}
                                history={this.props.history}
                                rating={this.props.rating}
                                ownership={this.props.ownership}
                                {...book} />                                         
                })} 
            </div>
            </section>
        )
    }
}
