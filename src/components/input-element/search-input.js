import React from 'react'

const SearchInput = (props) => {
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(event.target.elements[0].value);
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="search"
                onClick={(evt) => evt.stopPropagation()}
                {...props} />
            <button type="submit">Search</button>
        </form>
    )
}

export default SearchInput