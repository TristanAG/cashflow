import React from 'react'
import FirebaseContext from '../firebase/context'

function Expense({ expense, index }) {
  const { firebase, user } = React.useContext(FirebaseContext)

  function handleDeleteExpense() {
    if(window.confirm('you sure you want to delete this expense?')){
      const expenseRef = firebase.db.collection('expenses').doc(expense.id)
      // expenseRef.delete().then(() => {
      //   alert('bye bye 👋')
      // }).catch(err => {
      //   console.error('error deleting expense', err)
      // })
      expenseRef.delete().catch(err => console.error('error deleting expense', err))
    }
  }

  const postedByAuthUser = user && user.uid === expense.postedBy.id

  return (
    <div className="card">
      <div className="columns">
        <div className="column is-one-fifth">
          <p><b className="has-text-success">${expense.amount}</b></p>
        </div>

        <div className="column is-two-fifths">
          <p> {expense.description}</p>
        </div>
        <div className="column">
          <span className="tag is-light">{expense.category}</span>
        </div>

        <div className="column has-text-right">
          <button className="delete" onClick={handleDeleteExpense}></button>
        </div>
      </div>
    </div>


  )
}

export default Expense
