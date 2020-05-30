import React, {Component} from 'react';
import Rating from './Rating'

export default class Book extends React.Component {





    render(){

        const {Title,Author,Status,img} = this.props;
    

        return (
            <div className="book">
                <div className="book-title-div">
                    
                    <h3>Title</h3>
                    <p>{Title}</p>
                </div>
                <div className="book-author-div">
                    <h4>Author</h4>
                    <p>{Author}</p>
                </div>
                <div className="cover">bookcover</div>
                <Rating />
                <div className="own-status">
                    <h4>Status:</h4>
                    <p>{Status}</p>
                </div>
                
                <a href="https://amazon.com" target="_blank"><h4>Purchase Link</h4></a>
            </div>
        )
    }
}