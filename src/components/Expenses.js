import React from 'react'
import FirebaseContext from '../firebase/context'
import Expense from './Expense'

function Expenses() {
  const { firebase, user } = React.useContext(FirebaseContext)
  const [expenses, setExpenses] = React.useState([])

  React.useEffect(() => {
    if (user) {
      const unsubscribe = getExpenses()
    }
  }, [user])

  function getExpenses() {
    firebase.db
      .collection('expenses')
      .where("postedBy.id", "==", user.uid)
      .orderBy('created', 'desc')
      .onSnapshot(handleSnapshot)
  }

  function handleSnapshot(snapshot) {
    const expenses = snapshot.docs.map(doc => {
      return { id: doc.id, ...doc.data() }
    })
    setExpenses(expenses)
    getTotal(expenses)
  }

  function getTotal(expenses) {
    console.log('hellpo')
    expenses.map((exp) => {

    })
  }

  return (
    <div>
      <p><b>total:</b></p>
      <div className="expenses-list">
        {expenses.map((expense, index) => (
          <Expense key={expense.id} expense={expense} index={index + 1} />
        ))}
      </div>
    </div>
  )
}

export default Expenses
