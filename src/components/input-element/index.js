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
import RenderKeywordList from './keyword-input'
import RangeSlider from './range-input'
import SearchInput from './search-input'

import './assets/scss/input-element.scss'


const InputElement = ({ id, type, label, defaultValue, onChange, onFocus, onBlur, extraClass, placeholder, required, disabled, min, max, step, readOnly, helperText, options, includeInitialValue, initialValueLabel, multiple, accept, minLength, maxLength, arialabel, pattern }) => {
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

    const renderLabel = () => {
        if (type === 'checkbox') {
            return null
        } else {
            return <Label label={label} required={required} />
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
        max: max || null,
        step: step || null,
        multiple: multiple || false,
        accept: accept || null,
        minLength: minLength || null,
        maxLength: maxLength || null,
        readOnly: readOnly || false,
        arialabel: arialabel || null,
        pattern: pattern || null
    }

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
            return <CheckboxInput {...commonProps} label={label} />
        case 'checkboxToggle':
            return <CheckboxToggle {...commonProps} />
        case 'keyword':
            return <RenderKeywordList {...commonProps} />
        case 'range':
            return <RangeSlider {...commonProps} />
        case 'search':
            return <SearchInput {...commonProps} />
        default:
            return <TextInput {...commonProps} />
        }
    }
// add label ternary to renderInput for checkbox as {renderLabel()}

    return (
        <div className="shs-input-element">
            {renderLabel()}
            {renderInput()}
            <HelperText helperText={helperText} isActive={isActive} />
        </div>
    )
}

export default InputElement
