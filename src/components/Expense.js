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
    <div className={!isDeleting ? "card" : "card is-deleting"}>
      <div className="columns">
        <div className="column is-one-fifth">
          <p><b className="has-text-success">${expense.amount}</b></p>
          <span className="tag is-light">{expense.category}</span>
        </div>
        <div className="column is-three-fifths">
          <p> {expense.description}</p>
        </div>
        <div className="column has-text-right">
          {!isDeleting && <button className="delete" onClick={handleDeleteExpense}></button>}
        </div>
      </div>
    </div>


  )
}

export default Expense
