import React from 'react'

const ValueSelectInput = (props) => {
    if (!props.options || props.options.length === 0) {
        return null
    }

    return (
        <select {...props}>
            { props.includeInitialValue !== false &&
                <option disabled value="">
                    { props.initialValueLabel || 'Select a value' }
                </option>
            }
            { props.options.map((option, idx) => {
                return <option value={option.value} key={idx}>{option.label}</option>
            })}
        </select>
    )
}

export default ValueSelectInput
