import React from 'react'

const Label = ({ label, required }) => {
    if (!label) {
        return null
    }
    if (label === '') {
        return <label>&nbsp;</label>
    }
    return (
        <label>
            {label}{required ? '*' : ''}
        </label>
    )
}

export default Label
