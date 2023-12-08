import React, { useState } from 'react'

import Label from './elements/label'
import HelperText from './elements/helper-text'

import TextInput from './text-input'
import TextAreaInput from './text-area-input'
import ValueSelectInput from './value-select-input'
import SelectInput from './select-input'
import MultiSelectInput from './multi-select-input'
import CheckboxInput from './checkbox-input'
import CheckboxToggle from './checkbox-toggle'


import './assets/scss/input-element.scss'
import './assets/icons'

const InputElement = ({ id, type, label, defaultValue, onChange, onFocus, onBlur, extraClass, placeholder, required, disabled, min, max, readOnly, helperText, options, includeInitialValue, initialValueLabel }) => {
    const [value, setValue] = useState(defaultValue !== 'undefined' ? defaultValue : '')
    const [isActive, setIsActive] = useState(false)

    const handleChange = (evt) => {
        if (evt.target.type === 'checkbox') {
            const tempValue = evt.target.checked ? evt.target.value : true
            setValue(tempValue)
            if (onChange) {
                onChange(id, tempValue)
            }
            return
        }
        const tempValue = evt.target.value
        setValue(tempValue)
        if (onChange) {
            onChange(id, tempValue)
        }
    }

    const handleFocus = (evt) => {
        setIsActive(true)
        if (onFocus) {
            onFocus(evt)
        }
    }

    const handleBlur = (evt) => {
        setIsActive(false)
        if (onBlur) {
            onBlur(evt)
        }
    }

    let commonProps = {
        value: value,
        type: type,
        id: id,
        name: id,
        onChange: handleChange,
        onFocus: handleFocus,
        onBlur: handleBlur,
        includeInitialValue: includeInitialValue || true,
        initialValueLabel: initialValueLabel || null,
        options: options || [],
        className: `${extraClass ? extraClass : ''}`,
        placeholder: placeholder || null,
        required: required || false,
        disabled: disabled || false,
        min: min || null,
        max: max || null
    }
// make case checkbox that isn't really a checkbox but an on/off switch using Font Awesome icons + hidden input
    const renderInput = () => {
        switch (type) {
        case 'text':
            return <TextInput {...commonProps} />
        case 'textarea':
            return <TextAreaInput {...commonProps} />
        case 'valueSelect':
            return <ValueSelectInput {...commonProps} />
        case 'select':
            return <SelectInput {...commonProps} />
        case 'multiSelect':
            const { type, ...multiSelectProps } = commonProps
            return <MultiSelectInput {...multiSelectProps} />
        case 'checkbox':
            return <CheckboxInput {...commonProps} />
        case 'checkboxToggle':
            return <CheckboxToggle {...commonProps} />
        default:
            return <TextInput {...commonProps} />
        }
    }

    return (
        <div className="shs-input-element">
            <Label label={label} required={required} />
            {renderInput()}
            <HelperText helperText={helperText} isActive={isActive} />
        </div>
    )
}

export default InputElement
