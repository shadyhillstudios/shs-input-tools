import React, { useState } from 'react'

const CheckboxInput = (props) => {
    return (
        <input
            type="checkbox"
            checked={useState(props.value)}
            onClick={(evt) => evt.stopPropagation()}
            {...props}
        />
    )
}

export default CheckboxInput
