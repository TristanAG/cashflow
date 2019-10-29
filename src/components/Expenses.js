import React from 'react'
import FirebaseContext from '../firebase/context'
import Expense from './Expense'

function Expenses() {
  const { firebase, user } = React.useContext(FirebaseContext)
  const [expenses, setExpenses] = React.useState([])

  //something about this empty array as a dependency lets it hook into the
  //onMount or soemthing?


  // React.useEffect(() => {
  //   const unsubscribe = getExpenses()
  // }, [])

  if (user) {
    getExpenses()
  }


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
  }

  return (
    <div>
      <div className="expenses-list">
        {expenses.map((expense, index) => (
          <Expense key={expense.id} expense={expense} index={index + 1} />
        ))}
      </div>
    </div>
  )
}

export default Expenses
