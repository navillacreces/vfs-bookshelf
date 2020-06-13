import React from 'react';


const BookContext = React.createContext({

    books:[],
    handleAddBook: () => {},
    postToDatabase: () => {},

})

export default BookContext