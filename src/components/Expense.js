import React from 'react'
import FirebaseContext from '../firebase/context'

function Expense({ expense, index }) {
  const { firebase } = React.useContext(FirebaseContext)
  const [isDeleting, setIsDeleting] = React.useState(false)

  function handleDeleteExpense() {
    if(window.confirm('you sure you want to delete this expense?')){
      const expenseRef = firebase.db.collection('expenses').doc(expense.id)
      expenseRef.delete().then(setIsDeleting(true)).catch(err => console.error('error deleting expense', err))
    }
  }

  return (
    <tr className="is-fullwidth">
      <td>
        <div className="tag is-light">{expense.category}</div>
      </td>
      <td>
        <b className="has-text-success">${expense.amount}</b>
      </td>
      <td>
        <p> {expense.description}</p>
      </td>
      <td className="has-text-right">
        {!isDeleting && <button className="delete" onClick={handleDeleteExpense}></button>}
      </td>
    </tr>
  )
}

export default Expense
