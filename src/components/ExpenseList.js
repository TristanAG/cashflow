import React from 'react'
import Expense from './Expense'

function ExpenseList({ expenses }) {
  return (
    <div>
      {expenses.map((expense, index) => (
        <Expense key={expense.id} expense={expense} index={index + 1} />
      ))}
    </div>
  )
}

export default ExpenseList
