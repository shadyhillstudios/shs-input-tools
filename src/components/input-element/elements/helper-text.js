import React from 'react'

const HelperText = ({ helperText, isActive }) => {
    if (!helperText) {
        return null
    }

    return (
        <span className={`helper-text ${isActive ? 'visible' : 'invisible'}`}>
            {helperText}
        </span>
    )
}

export default HelperText
