import React from 'react'
import FirebaseContext from '../firebase/context'

function Expense({ expense, index }) {
  const { firebase, user } = React.useContext(FirebaseContext)

  function handleDeleteExpense() {
    const expenseRef = firebase.db.collection('expenses').doc(expense.id)
    expenseRef.delete().then(() => {
      alert('bye bye 👋')
    }).catch(err => {
      console.error('error deleting expense', err)
    })
  }

  const postedByAuthUser = user && user.uid === expense.postedBy.id

  return (
    <div className="card">
      <p>
        <span className="has-text-success"><b>${expense.amount}</b></span> | {expense.description} | {expense.category}
      </p>
      <p>{expense.business} | {expense.paymentMethod} | {expense.postedBy.name}</p>
      {postedByAuthUser && <span className="has-text-danger has-text-right" onClick={handleDeleteExpense}>delete</span>}
    </div>
  )
}

export default Expense
