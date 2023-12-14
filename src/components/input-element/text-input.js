import React from 'react'

const TextInput = (props) => {
    return (
        <input
            onClick={(evt) => evt.stopPropagation()}
            {...props} />
    )
}

export default TextInput
