import React from 'react'

const MultiSelectInput = ({ value, options, onChange, ...props }) => {

    const handleChange = (option) => {
        let values = [...value]
        const index = values.indexOf(option.value)
        if (index === -1) {
            values.push(option.value)
        } else {
            values.splice(index, 1)
        }
        onChange({ target: { value: values } })
    }
    return (
        <>
{ options.map((option, index) => {
    return (
        <div key={index} className="multi-select-option">
            <input type="checkbox" value={option.value} checked={value.indexOf(option.value) !== -1} onChange={() => handleChange(option)} />
            <label>{option.label}</label>
        </div>
    )
})
}
        </>
    )
    }

export default MultiSelectInput