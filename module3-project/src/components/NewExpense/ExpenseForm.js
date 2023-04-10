import React, { useState } from 'react'
import './ExpenseForm.css'

const ExpenseForm = (props) => {

  // const [inputTitle, setInputTitle] = useState('');
  // const [inputAmount, setinputAmount] = useState('');
  // const [inputDate, setinputDate] = useState('');

  const [userInput, setUserInput] = useState({
    inputTitle: '',
    inputAmount: '',
    inputDate: ''
  })

  const titleChangeHandler = (event) => {
    // document.getElementById('').addEventListener('click', (event) => {})
    // setInputTitle(event.target.value)
    setUserInput((prevState) => {
      return { ...prevState, inputTitle: event.target.value }
    })
  }

  const amountChangeHandler = (event) => {
    setUserInput((prevState) => {
      return { ...prevState, inputAmount: event.target.value }
    })
  }

  const dateChangeHandler = (event) => {
    setUserInput((prevState) => {
      return { ...prevState, inputDate: event.target.value }
    })
  }

  const submitHandler = (event) => {
    event.preventDefault();

    const expenseData = {
      title: userInput.inputTitle,
      amount: +userInput.inputAmount,
      date: new Date(userInput.inputDate)
    }

    props.onSaveExpenseData(expenseData)
    setUserInput({inputTitle:'', inputAmount:'', inputDate:''})
  }

  return (
    <form onSubmit={submitHandler}>
      <div className="new-expense__controls">
        <div className="new-expense__control">
          <label>Title</label>
          <input type="text" value={userInput.inputTitle} onChange={titleChangeHandler}/>
        </div>
        <div className="new-expense__control">
          <label>Amount</label>
          <input type="number" min="0.1" step="0.1" value={userInput.inputAmount} onChange={amountChangeHandler}/>
        </div>
        <div className="new-expense__control">
          <label>Date</label>
          <input type="date" min="2019-01-01" max="2023-12-31" value={userInput.inputDate} onChange={dateChangeHandler}/>
        </div>
      </div>
      <div className="new-expense__actions">
        <button type="submit">Add Expense</button>
      </div>
    </form>
  )
}

export default ExpenseForm
