import React from 'react'

const SelectInput = (props) => {
    return (
        <>
        <select {...props}>
            { props.includeInitialValue !== false && <option value="">{props.initialValueLabel || 'Select'}</option>
            }
            {props.options.map((option, index) => {
                return (
                    <option key={index} value={option.value}>{option.label}</option>
                )
            })}
        </select>
        </>
    )
}

export default SelectInput