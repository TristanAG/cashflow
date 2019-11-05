import React from 'react'
import FirebaseContext from '../firebase/context'
import Expense from './Expense'
import moment from 'moment'

function Expenses() {
  const { firebase, user } = React.useContext(FirebaseContext)
  const [expenses, setExpenses] = React.useState([])
  const [total, setTotal] = React.useState([])
  const [month, setMonth] = React.useState('')

  //use effect hook has its dependency, which is like the didComponentUpdate() lifecycle. so basically, it's dependency is the 'user' variable
  //this variable first has a state of null, so therefore, we only execute the function / unsubscribe if use is not null (is present)
  //pretty cool! learned something for sure here...

  React.useEffect(() => {
    if (user) {
      const unsubscribe = getExpenses()
    }
  }, [user])

  function getExpenses() {

    //config
    //get current month
    const month = moment(Date.now()).format('MMMM')
    setMonth(month)

    firebase.db
      .collection('expenses')
      .where("postedBy.id", "==", user.uid)
      .where("monthCreated", "==", month)
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

  //haha, it's not very pretty, but it works!
  function getTotal(expenses) {
    let total = 0
    expenses.map((exp) => {
      const num = parseInt(exp.amount)
      total += num
    })
    setTotal(total.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'))
  }

  return (
    <div className="expenses-list">
      <h3>🍂 {month} Expenses</h3>
      <p><b>amount spent:</b> <span className="has-text-success">${total}</span></p>
      <div>
        {expenses.map((expense, index) => (
          <Expense key={expense.id} expense={expense} index={index + 1} />
        ))}
      </div>
    </div>
  )
}

export default Expenses
