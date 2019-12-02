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
    // <div className="card">
    //   <p>
    //     <span className="has-text-success"><b>${expense.amount}</b></span> | {expense.description} | <span class="tag is-light">{expense.category}</span>
    //   </p>
    //   <p>{expense.business} | {expense.paymentMethod} | {expense.postedBy.name}</p>
    //   {postedByAuthUser && <span className="has-text-danger has-text-right" onClick={handleDeleteExpense}>delete</span>}
    // </div>

    <div className="card">
      <div class="columns">
        <div class="column is-one-fifth">
          <p><b className="has-text-success">${expense.amount}</b></p>
          {/* <p> {expense.description}</p> */}
        </div>


        <div class="column is-two-fifths">
          {/* <p>{expense.business} | {expense.paymentMethod} | {expense.postedBy.name}</p> */}
          <p> {expense.description}</p>
        </div>
        <div class="column">
          <span class="tag is-light">{expense.category}</span>
        </div>

        <div class="column has-text-right">
          <button class="delete" onClick={handleDeleteExpense}></button>
        </div>
      </div>
    </div>


  )
}

export default Expense
