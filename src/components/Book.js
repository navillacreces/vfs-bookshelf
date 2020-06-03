import React, {Component} from 'react';
import Rating from './Rating'

export default class Book extends React.Component {





    render(){

        const {title,author,ownership,img} = this.props;
    

        return (
            <div className="book">
                <div className="book-title-div">
                    
                    <h3>Title</h3>
                    <p>{title}</p>
                </div>
                <div className="book-author-div">
                    <h4>Author</h4>
                    <p>{author}</p>
                </div>
                <div className="cover">
                    <img src={img} alt="bookcover"></img>
                </div>
                <Rating />
                <div className="own-status">
                    <h4>Status:</h4>
                    <p>{ownership}</p>
                </div>
                
                <a href="https://amazon.com" target="_blank"><h4>Purchase Link</h4></a>
            </div>
        )
    }
}