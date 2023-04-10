import React, { useState, useRef } from 'react'
import Card from '../UI/Card'
import styles from './AddUser.module.css'
import Button from '../UI/Button'
import ErrorModal from '../UI/ErrorModal'
import Wrapper from '../Helpers/Wrapper'

const AddUser = (props) => {
  const nameInputRef = useRef() 
  const ageInputRef = useRef() 

  const [error, setError] = useState()

  const addUserHandler = (e) => {
    e.preventDefault()
    const inputName = nameInputRef.current.value
    const inputAge = ageInputRef.current.value

    if (inputName.trim().length === 0 || inputAge.trim().length === 0) {
      setError({
        title: 'Invalid Input',
        message: 'Please enter a valid name and age',
      })
      return
    }

    if (+inputAge < 1) {
      setError({
        title: 'Invalid age',
        message: 'Please enter a valid age',
      })
      return
    }

    props.onAddUser(inputName, inputAge)
    nameInputRef.current.value = ''
    ageInputRef.current.value = ''
  }

  const errorHandler = () => {
    setError(null)
  }

  return (
    <Wrapper>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onModalClick={errorHandler}
        />
      )}
      <Card className={styles.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            ref={nameInputRef}
          ></input>
          <label htmlFor="age">Age (years)</label>
          <input
            id="age"
            type="number"
            ref={ageInputRef}
          ></input>
          <Button type="submit">AddUser</Button>
        </form>
      </Card>
    </Wrapper>
  )
}

export default AddUser
