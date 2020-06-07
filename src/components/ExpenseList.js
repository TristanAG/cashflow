import React from 'react'
import Expense from './Expense'

function ExpenseList({ expenses }) {
  return (
    <div className="columns">
      {expenses.map((expense, index) => ({
        return (
          // <div className="column">
            <Expense key={expense.id} expense={expense} index={index + 1} />
          // </div>
        )
      }))}
    </div>
  )
}

export default ExpenseList
