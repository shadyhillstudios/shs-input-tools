import 'react-app-polyfill/stable'
import React from 'react'
import ReactDOM from 'react-dom/client'

import InputElement from './components/input-element/index'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <>
        <InputElement
            type="text"
            id="example"
            label="Sample Input"
            placeholder="Enter Text"
            helperText="Write something above"
            defaultValue="testing"
            options={[{ value: 1, label: 'Option 1' }, { value: 2, label: 'Option 2' }]}
            required />
    </>
)
