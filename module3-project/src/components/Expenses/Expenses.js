import React, { useState } from 'react'
import Card from '../UI/Card'
import './Expenses.css'
import ExpensesChart from './ExpensesChart'
import ExpensesFilter from './ExpensesFilter'
import ExpensesList from './ExpensesList'

const Expenses = (props) => {
  const [filteredYear, setFilteredYear] = useState('2023')

  const filterChangeHandler = (selectedYear) => {
    setFilteredYear(selectedYear)
  }

  // const renderExpenses = props.items.map((d) => (
  //   <ExpenseItem key={d.id} title={d.title} amount={d.amount} date={d.date} />
  // ))

  const filteredExpenses = props.items.filter((expense) => {
    return expense.date.getFullYear().toString() === filteredYear
  })

  

  return (
    <Card className="expenses">
      <ExpensesFilter
        selected={filteredYear}
        onChangeFilter={filterChangeHandler}
      />
      <ExpensesChart expenses={filteredExpenses}/>
      <ExpensesList items={filteredExpenses}/>
    </Card>
  )
}

export default Expenses
