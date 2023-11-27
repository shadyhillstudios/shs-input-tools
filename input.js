import React from 'react'

import InfoMark from './info-mark'
import * as MASKS from './input-masks'

import DatePicker from 'react-datepicker'

import './_forms.scss'
import './_buttons.scss'


class InputElement extends React.Component {
    state = {
        value: typeof this.props.default !== 'undefined' ? this.props.default : '',
        isActive: false,
        rawValue: '',
        tempValue: ''
    }

    componentDidMount = () => {
        this.inputRef = React.createRef()

        if (this.props.isFormatted && this.props.formatMask) {
            const formattedValue = this.props.formatMask.resolve(String(this.state.value))
            const rawValue = this.props.formatMask.unmaskedValue
            this.setState({
                value: formattedValue,
                rawValue: rawValue
            })
        }
        if (this.props.default === false && this.props.type === 'valueSelect') {
            this.setState({ value: '0' })
        }
    }

    componentDidUpdate = (prevProps, prevState) => {
        if (prevProps.default !== this.props.default) {
            if (this.props.isFormatted && this.props.formatMask) {
                const formattedValue = this.props.formatMask.resolve(String(this.props.default))
                const rawValue = this.props.formatMask.unmaskedValue
                this.setState({
                    value: formattedValue,
                    rawValue: rawValue
                })
            } else if (this.props.type !== 'wysiwyg') {
                this.setState({ value: this.props.default })
            }
        }
        if (prevProps.formatMask !== this.props.formatMask && this.props.isFormatted) {
            const formattedValue = this.props.formatMask.resolve(String(this.state.value))
            const rawValue = this.props.formatMask.unmaskedValue
            this.setState({
                value: formattedValue,
                rawValue: rawValue
            })
        }

        // for masks that have a string added to the end, need to correct cursor position on first entry
        if (this.state.isActive && this.props.isFormatted && this.state.value.length === 2) {
            if (this.props.formatMask === MASKS.percentageMask) {
                let el = this.inputRef.current
                el.setSelectionRange(1, 1)
            }
        }
    }

    renderInfo = () => {
        if (this.props.infoMark && this.props.infoMark !== '') {
            return <InfoMark info={this.props.infoMark} />
        }
        return null
    }

    renderLabel = (label) => {
        if (!label) {
            return null
        }
        if (label === '') {
            return <label className="form-label">&nbsp;</label>
        } else if (label === null || !label) {
            return null
        }
        return <label className="form-label">{label}{this.props.required ? '*' : ''}</label>
    }

    handleChange = (evt) => {
        let value = evt.target.type === 'checkbox' ? evt.target.checked : evt.target.value
        if (this.props.isFormatted && this.props.formatMask) {
            const formattedValue = this.props.formatMask.resolve(value)
            const rawValue = this.props.formatMask.unmaskedValue
            this.setState({
                value: formattedValue,
                rawValue: rawValue
            })
        } else {
            this.setState({ value: value })
        }
        // TODO: check if we need to send the value to a parent? probably would be raw value
        if (this.props.onChange) {
            this.props.onChange(evt.target.id, value)
        }
    }

    handleFocus = (evt) => {
        this.setState({ isActive: true })
        if (this.props.onFocus) {
            this.props.onFocus(evt)
        }
    }

    handleBlur = (evt) => {
        this.setState({ isActive: false })
        if (this.props.onBlur) {
            this.props.onBlur(evt)
        }
    }

    renderError = () => {
        return (
            <div className="invalid-feedback">
                {this.props.errorMessage || 'This field is required'}
            </div>
        )
    }

    renderHelperText = (helperText) => {
        if (this.props.calculatedDisplay && this.state.value !== '') {
            return null
        }
        return <small className={`helper-text ${this.state.isActive ? 'visible' : 'invisible'}`}>{helperText}</small>
    }

    handleOptionClick = (option) => {
        if (this.state.value === option) {
            this.setState({ value: '' })
        } else {
            this.setState({ value: option })
        }
    }

    handleMultiOptionClick = (option) => {
        let values = this.state.value
        const idx = values.indexOf(option)
        if (idx === -1) {
            values.push(option)
        } else {
            values.splice(idx, 1)
        }
        this.setState({ value: values })
    }

    renderButtonSelect = (props, commonProps) => {
        return (
            <>
                {this.renderLabel(this.props.label)}
                <div className="option-btns">
                    {this.props.options.map((option, idx) => {
                        return (
                            <span key={idx} className={`btn btn-select ${this.state.value === option.value ? 'active' : ''}`} onClick={() => this.handleOptionClick(option.value)}>
                                {option.label}
                            </span>
                        )
                    })}
                    <input
                        type="hidden"
                        id={commonProps.id}
                        name={commonProps.name}
                        value={this.state.value} />
                </div>
            </>
        )
    }

    renderButtonMultiSelect = (props, commonProps) => {
        return (
            <>
                {this.renderLabel(this.props.label)}
                <div className="option-btns">
                    {this.props.options.map((option, idx) => {
                        return (
                            <span key={idx} className={`btn btn-select ${this.state.value.indexOf(option.value) !== -1 ? 'active' : ''}`} onClick={() => this.handleMultiOptionClick(option.value)}>
                                {option.label}
                            </span>
                        )
                    })}
                    <input
                        type="hidden"
                        id={commonProps.id}
                        name={commonProps.name}
                        value={this.state.value} />
                </div>
            </>
        )
    }

    renderSelect = (props, commonProps) => {
        return (
            <>
                {this.renderLabel(this.props.label)}
                <select {...commonProps}>
                    { this.props.includeInitialValue !== false &&
                        <option value="">
                            {this.props.initialValueLabel || 'Select a value'}
                        </option>
                    }
                    {props.options.map((option, idx) => {
                        return <option value={option} key={idx}>{option}</option>
                    })}
                </select>
            </>
        )
    }

    renderValueSelect = (props, commonProps) => {
        return (
            <>
                {this.renderLabel(this.props.label)}
                <select {...commonProps} onClick={(evt) => evt.stopPropagation()}>
                    { this.props.includeInitialValue !== false &&
                        <option disabled value="">
                            {this.props.initialValueLabel || 'Select a value'}
                        </option>
                    }
                    {props.options.map((option, idx) => {
                        return <option value={option.value} key={idx}>{option.label}</option>
                    })}
                </select>
                { this.props.helperText !== '' &&
                    <small className="helper-text">{this.props.helperText}</small>
                }
            </>
        )
    }

    setTempValue = (evt) => {
        this.setState({ tempValue: evt.target.value })
    }

    handleTempSave = (evt) => {
        if (evt.keyCode === 13) {
            evt.preventDefault()
            evt.stopPropagation()
            let { value } = this.state
            if (value !== '') {
                value = value + `|${evt.target.value}`
            } else {
                value = evt.target.value
            }
            this.setState({
                value,
                tempValue: ''
            })
        }
    }

    removeKeyword = (idx) => {
        let keywords = this.state.value.split('|')
        keywords.splice(idx, 1)
        this.setState({ value: keywords.join('|') })
    }

    handleKeyDown = (evt) => {
        if (this.props.onKeyDown && evt.keyCode === 13) {
            evt.preventDefault()
            evt.stopPropagation()
            this.props.onKeyDown(evt)
        }
    }

    renderKeywordList = (props, commonProps) => {
        let keywords = this.state.value.split('|')
        let allKeywords = []
        keywords.forEach((keyword, idx) => {
            if (keyword !== '') {
                allKeywords.push(
                    <div className="item" key={idx} onClick={() => this.removeKeyword(idx)}>
                        {keyword} <span>X</span>
                    </div>
                )
            }
        })
        return (
            <>
                {this.renderLabel(this.props.label)}
                <input
                    type="text"
                    id="tempKeyword"
                    className="form-control"
                    value={this.state.tempValue}
                    onChange={this.setTempValue}
                    onKeyDown={this.handleTempSave}
                    placeholder={this.props.placeholder} />
                <div className="selections left-align">{allKeywords}</div>
                <input
                    type="hidden"
                    id={commonProps.id}
                    name={commonProps.name}
                    value={this.state.value} />
            </>
        )
    }

    handleDateTimeChange = (dateTime) => {
        this.setState({ value: dateTime })
        if (this.props.dateType === 'date') {
            if (this.props.onChange) {
                const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' }
                const dateFormat = dateTime.toLocaleDateString(undefined, dateOptions)
                this.props.onChange(this.props.id, dateFormat)
            }
        } else if (this.props.dateType === 'time') {
            if (this.props.onChange) {
                const timeOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit' }
                const timeFormat = dateTime.toLocaleTimeString(undefined, timeOptions)
                this.props.onChange(this.props.id, timeFormat)
            }
        } else if (this.props.onChange) {
            const dateTimeOptions = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' }
            const dateTimeFormat = dateTime.toLocaleTimeString(undefined, dateTimeOptions)
            this.props.onChange(this.props.id, dateTimeFormat)
        }
    }


    renderDatePicker = (props, commonProps) => {
        return (
            <>
                {this.renderLabel(props.label)}
                <DatePicker
                    selected={this.state.value}
                    {...props.options}
                    {...commonProps}
                    onChange={this.handleDateTimeChange} />
            </>
        )
    }

    renderInput = (props, commonProps) => {
        const type = props.type || 'text'
        if (this.props.refName) {
            commonProps.ref = this.props.refName
        }
        if (type === 'checkbox') {
            // need to remove the value flag and just use checked
            delete commonProps.value
            return (
                <>
                    <input type={type} {...commonProps} checked={this.state.value} />
                    <label className="form-check-label">{this.props.label}</label>
                </>
            )
        }
        if (type === 'textarea') {
            return (
                <>
                    {this.renderLabel(this.props.label)}
                    <textarea
                        onClick={(evt) => evt.stopPropagation()}
                        readOnly={this.props.readOnly ? true : false}
                        onBlur={() => this.setState({ isActive: false })}
                        onFocus={() => this.setState({ isActive: true })}
                        autoComplete="off"
                        type={type}
                        {...commonProps} />
                </>
            )
        }
        if (type === 'file') {
            commonProps.className = 'form-control-file'
        }

        return (
            <>
                {this.renderLabel(this.props.label)}
                <input
                    onClick={(evt) => evt.stopPropagation()}
                    readOnly={this.props.readOnly ? true : false}
                    onBlur={() => this.setState({ isActive: false })}
                    onFocus={() => this.setState({ isActive: true })}
                    onKeyDown={this.handleKeyDown}
                    autoComplete={props.autoComplete ? props.autoComplete : 'off'}
                    type={type}
                    {...commonProps} />
            </>
        )
    }

    renderFormInput = (props) => {
        let commonProps = {
            value: this.state.value || '',
            rawvalue: this.state.rawValue,
            id: props.id,
            name: props.id,
            onChange: this.handleChange,
            onFocus: this.handleFocus,
            onBlur: this.handleBlur,
            className: props.type === 'checkbox' ? 'form-check-input' : 'form-control',
            placeholder: props.placeholder,
            required: props.required || false,
            disabled: props.disabled || false,
            ref: this.inputRef
        }
        if (props.min) {
            commonProps.min = props.min
        }
        if (props.max) {
            commonProps.max = props.max
        }
        switch (props.type) {
        case 'buttonSelect':
            return this.renderButtonSelect(props, commonProps)
        case 'buttonMultiSelect':
            return this.renderButtonMultiSelect(props, commonProps)
        case 'select':
            return this.renderSelect(props, commonProps)
        case 'valueSelect':
            return this.renderValueSelect(props, commonProps)
        case 'keywordList':
            return this.renderKeywordList(props, commonProps)
        case 'datePicker':
            return this.renderDatePicker(props, commonProps)
        default:
            return this.renderInput(props, commonProps)
        }
    }

    renderCalculatedDisplay = (props) => {
        if (this.props.calculatedDisplay) {
            if (this.state.value !== '') {
                return (
                    <div className="calculated">
                        {this.props.calculatedDisplay(this.state.value)}
                    </div>
                )
            }
        }
        return null
    }

    render = () => {
        return (
            <div className={`input-wrapper ${this.props.extraClass ? this.props.extraClass : ''}`} >
                {this.renderFormInput(this.props)}
                {this.renderCalculatedDisplay(this.props)}
                {this.renderError(this.props.errorMessage)}
                {this.renderHelperText(this.props.helperText)}
            </div>
        )
    }
}

export default InputElement
