import React from 'react'
import FirebaseContext from '../firebase/context'
import Expense from './Expense'
import moment from 'moment'

function Expenses() {
  const { firebase, user } = React.useContext(FirebaseContext)
  const [expenses, setExpenses] = React.useState([])
  const [total, setTotal] = React.useState([])
  const [month, setMonth] = React.useState('')
  const [year, setYear] = React.useState('1999')

  React.useEffect(() => {
    if (user) {
      const unsubscribe = getExpenses()
    }
  }, [user])

  function getExpenses() {

    const month = moment(Date.now()).format('MMMM')
    const year = moment(Date.now()).format('YYYY')
    setMonth(month)
    setYear(year)

    firebase.db
      .collection('expenses')
      .where("postedBy.id", "==", user.uid)
      .where("monthCreated", "==", month)
      .where("yearCreated", "==", year)
      .orderBy('created', 'desc')
      .onSnapshot(handleSnapshot)
  }

  function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  }

  function handleSnapshot(snapshot) {
    const expenses = snapshot.docs.map(doc => {
      return { id: doc.id, ...doc.data() }
    })
    setExpenses(expenses)
    getTotal(expenses)
  }

  function getTotal(expenses) {
    let total = 0
    expenses.map((exp) => {
      const expense = parseFloat(exp.amount)
      total += expense
    })

    setTotal(total.toFixed(2).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'))
  }

  return (
    <div className="expenses-list">
      <h3>🍂 {month} {year} Expenses</h3>
      <p><b>amount spent:</b> <span className="has-text-success"><b>${total}</b></span></p>
      <div>
        {expenses.map((expense, index) => (
          <Expense key={expense.id} expense={expense} index={index + 1} />
        ))}
      </div>
    </div>
  )
}

export default Expenses
