import React, { Component } from 'react'
import ValidationError from './ValidationError'
import BookContext from './BookContext'

export default class AddBook extends Component {

    static contextType = BookContext;

    constructor(props){
        super(props)
        this.state = {};
    }


    onSubmit(){

    }

    ValidateTitle(){

    }

    ValidateAuthor(){

    }



    render() {
        return (
            <div className="addBook">
                <div className="form-container">
                <form>
                <div className="title-container">
                    <label>
                        Title:
                    </label>
                    <input type="text" />
                </div>
                <div className="author-container">
                    <label>
                        Author:
                    </label>
                    <input type="text" />
                </div>
                <div className="rating-container">
                    <label>
                        Your Rating: 
                    </label>
                    <select>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                    </select>
                </div>
                <div className="ownership-container">
                    <label>
                        Ownership: 
                    </label>
                    <select>
                        <option>
                            No
                        </option>
                        <option>
                            Kindle
                        </option>
                        <option>
                            E-Book
                        </option>
                        <option>
                            Hardcopy
                        </option>
                    </select>
                    </div>
                    <button type="button">Submit</button>
                </form>
                </div>
            </div>
        )
    }
}
