import React from 'react'

const TextAreaInput = (props) => {
    return (
        <textarea
            onClick={(evt) => evt.stopPropagation()}
            {...props} />
    )
}

export default TextAreaInput
