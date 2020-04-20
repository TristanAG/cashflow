import React from 'react'
import { FirebaseContext } from '../firebase'
import moment from 'moment'
import Expense from './Expense'


function CategoryBreakdown() {
  const { user, firebase } = React.useContext(FirebaseContext)
  const [expenses, setExpenses] = React.useState([])

  React.useEffect(() => {
    if (user) {
      getExpenses()
    }
  }, [user])

  function getExpenses(filter) {
    const month = moment(Date.now()).format('MMMM')
    const year = moment(Date.now()).format('YYYY')

    // setMonth(month)
    // setYear(year)

    firebase.db
      .collection('expenses')
      .where("postedBy.id", "==", user.uid)
      // .where("monthCreated", "==", month)
      .where("yearCreated", "==", year)
      .orderBy('created', 'desc')
      .onSnapshot(handleSnapshot)
  }

  function handleSnapshot(snapshot) {
    const expenses = snapshot.docs.map(doc => {
      return { id: doc.id, ...doc.data() }
    })
    // setDefaultExpenses(expenses)
    setExpenses(expenses)
    // getTotal(expenses)
  }

  return (
    <div>
      <p className="has-text-primary">Category Breakdown</p>
        <table className="table is-striped is-full-width">
          <tbody>

            {expenses.map((expense, index) => (
              // <Expense key={expense.id} expense={expense} index={index + 1} />
              <tr>
                <td>{expense.category}</td>
                <td>{expense.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
    </div>
  )
}

export default CategoryBreakdown
