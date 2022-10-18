// Basic Forms
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'
import {useRef, useState} from 'react'

function UsernameForm({onSubmitUsername, onSubmitAddress, onSubmitCompany}) {
  const inputElement = useRef()
  const [error, setError] = useState(null)
  const [inputValue, setInputValue] = useState('')
  // 🐨 add a submit event handler here (`handleSubmit`).
  // 💰 Make sure to accept the `event` as an argument and call
  // `event.preventDefault()` to prevent the default behavior of form submit
  // events (which refreshes the page).
  // 📜 https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault
  //
  // 🐨 get the value from the username input (using whichever method
  // you prefer from the options mentioned in the instructions)
  // 💰 For example: event.target.elements[0].value
  // 🐨 Call `onSubmitUsername` with the value of the input

  const handleSubmit = event => {
    event.preventDefault()

    onSubmitUsername(event.target.elements.username.value)
  }

  const handleSubmitRef = event => {
    event.preventDefault()

    onSubmitAddress(inputElement.current.value)
  }

  const handleSubmitControlled = event => {
    event.preventDefault()

    onSubmitCompany(inputValue)
  }

  const isValid = input => input === input.toLowerCase()

  const handleUncontrolledChange = event => {
    setError(isValid(event.target.value) ? null : 'Address must be lower case')
  }

  const handleControlledChange = event => {
    setInputValue(event.target.value.toLowerCase())
  }

  // 🐨 add the onSubmit handler to the <form> below

  // 🐨 make sure to associate the label to the input.
  // to do so, set the value of 'htmlFor' prop of the label to the id of input
  return (
    <form onSubmit={handleSubmitControlled}>
      <div>
        <label htmlFor="username">Username:</label>
        <input id="username" type="text" />
      </div>
      <div>
        <label htmlFor="address">Address:</label>
        <input
          onChange={handleUncontrolledChange}
          ref={inputElement}
          id="address"
          type="text"
        />
        {error && (
          <p style={{color: 'red', margin: 0}} role="alert">
            {error}
          </p>
        )}
      </div>
      <div>
        <label htmlFor="company">Company:</label>
        <input
          value={inputValue}
          onChange={handleControlledChange}
          id="company"
          type="text"
        />
      </div>
      <button disabled={!!error} type="submit">
        Submit
      </button>
    </form>
  )
}

function App() {
  const onSubmitUsername = username => alert(`You entered: ${username}`)
  const onSubmitAddress = address => alert(`You entered: ${address}`)
  const onSubmitCompany = company => alert(`You entered: ${company}`)
  return (
    <UsernameForm
      onSubmitUsername={onSubmitUsername}
      onSubmitAddress={onSubmitAddress}
      onSubmitCompany={onSubmitCompany}
    />
  )
}

export default App
