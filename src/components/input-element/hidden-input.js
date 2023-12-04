import React, { useState } from 'react'

const HiddenInput = (props) => {
    <input
        type="hidden"
        id={props.id}
        name={props.name}
        value={useState(props.value)}
        onClick={(evt) => evt.stopPropagation()}
        {...props}
    />
}

export default HiddenInput
