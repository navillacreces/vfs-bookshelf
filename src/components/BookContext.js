import React from 'react';


const BookContext = React.createContext({

    books:[],
    handleAddBook: () => {}

})

export default BookContext