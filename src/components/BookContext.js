import React from 'react';

//Context api
const BookContext = React.createContext({

    books:[],
    handleAddBook: () => {},
    postToDatabase: () => {},

})

export default BookContext