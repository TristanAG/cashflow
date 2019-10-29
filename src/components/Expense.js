import React from 'react'
// import distanceInWordsToNow from 'date-fns/distance_in_words_to_now'
// import { distanceInWordsToNow } from 'date-fns'
// import { format, formatDistance, formatRelative, subDays } from 'date-fns'
// import { moment } from 'moment'
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
        <span className="has-text-success"><b>{expense.amount}</b></span> | {expense.description} | {expense.category}
      </p>
      <p>{expense.business} | {expense.paymentMethod} | {expense.postedBy.name}</p>
      {postedByAuthUser && <p className="has-text-danger has-text-right" onClick={handleDeleteExpense}>delete</p>}
    </div>
  )
}

export default Expense
