import React from 'react';
import Rating from './Rating'

export default class Book extends React.Component {


    render(){

        const {title,author,ownership,img,purchase_link,rating} = this.props;
    

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
                <div className="rating">
                <Rating value={rating}/>
                </div>
                <div className="own-status">
                    <h4>Status:</h4>
                    <p>{ownership}</p>
                </div>
                
                <a href={purchase_link} rel="noopener noreferrer" target="_blank"><h4>Purchase Link</h4></a>
            </div>
        )
    }
}