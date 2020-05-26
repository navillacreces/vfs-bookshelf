import React from 'react';
import Rating from './Rating'

export default function Book() {
    return (
        <div className="Book">
            <div className="book-title-div">
                <h3>Title</h3>
            </div>
            <div className="book-author-div">
                <h4>Author</h4>
            </div>
            <Rating />
        </div>
    )
}
