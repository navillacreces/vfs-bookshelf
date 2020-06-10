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
                <div className="search-result-isbn">
                    {this.props.industryIndentifiers}
                </div>
                
            </div>
        )
    }
}
