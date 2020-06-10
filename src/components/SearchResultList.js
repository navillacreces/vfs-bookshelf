import React from 'react'
import SearchResultElement from './SearchResultElement'

export default class SearchResultList extends React.Component {

    constructor(props){
        super(props)
        this.state ={}
    }

    componentDidMount(){

    }


    render() {
        return (
            <div className="search-result-list">
                {this.props.results.map(book =>{
                    return <SearchResultElement key={book.id}{...book} />                                         
                })} 
            </div>
        )
    }
}
