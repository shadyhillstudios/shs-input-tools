# SHS Input Tools
## Description
This repository starts the development of tools used widely on all SHS related projects.  The input element takes a range of input cases and input formats then distills them into a single, versatile component. 

## Installation
```bash
npm install @shs/input
``` 
## Example Usage
```html
import InputElement from '@shs/input';

        <InputElement
            type="valueSelect"
            name="example"
            id="example"
            label="Sample Input"
            placeholder="Enter Text"
            helperText="Write something above"
            defaultValue="testing"
            options={[{ value: 1, label: 'Option 1' }, { value: 2, label: 'Option 2' }]}
            required />
```
## Properties
### InputElement Types
The input element can be used for the following input types:
- `text`
- `textarea`
- `email`
- `phone`
- `select`
- `checkbox`
- `value select`
- `date`
- `time`
- `multiselect`
- `range`
- `file`

### Common Properties
Common Properties Include:
- `id` - The id of the input element
- `type` - The type of the input element
- `name` - The name of the input element
- `label` - The label of the input element
- `value` - The value of the input element
- `placeholder` - The placeholder of the input element
- `disabled` - The disabled state of the input element
- `required` - The required state of the input element
- `readonly` - The readonly state of the input element
- `onBlur` - The blur event of the input element
- `onChange` - The change event of the input element
- `onFocus` - The focus event of the input element
- `onKeyDown` - The keydown event of the input element
- `className` - The style class name of the input element
- `defaultValue` - The default value of the input element
- `options` - An array of value options for the input element (label, value)
- `min` - The minimum value of the range element
- `max` - The maximum value of the range element
- `step` - The step value of the range element
- `ariaLabel` - The aria label of the input element
- `extraClass` - adds an additional class to the input element
- `maxLength` - The maximum length of the input element
- `minLength` - The minimum length of the input element
- `pattern` - The regex pattern of the input element
- `accept` - The file types accepted by the input element

## Dependencies
- `react`
- `react-dom`
- `scss`

## License
MIT License

