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
  const [filter, setFilter] = React.useState('month-filter')

  const filterSelected = "filter-tag tag is-white is-primary"
  const filterDefault = "filter-tag tag is-white"

  React.useEffect(() => {
    if (user) {
      getExpenses(filter)
    }
  }, [user, expenses])

  function getExpenses(filter) {

    const month = moment(Date.now()).format('MMMM')
    const year = moment(Date.now()).format('YYYY')
    const day = moment(Date.now()).format('D')

    setMonth(month)
    setYear(year)

    switch (filter) {
      case 'month-filter':
        firebase.db
          .collection('expenses')
          .where("postedBy.id", "==", user.uid)
          .where("monthCreated", "==", month)
          .where("yearCreated", "==", year)
          .orderBy('created', 'desc')
          .onSnapshot(handleSnapshot)
        break

      case 'week-filter':
        alert('week filter')
        break

      case 'day-filter':
        firebase.db
          .collection('expenses')
          .where("postedBy.id", "==", user.uid)
          .where("monthCreated", "==", month)
          .where("dayCreated", "==", day)
          .where("yearCreated", "==", year)
          .orderBy('created', 'desc')
          .onSnapshot(handleSnapshot)
        // alert(day)
        break;
    }


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
      return (
        total += expense
      )
    })

    setTotal(total.toFixed(2).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'))
  }

  function handleFilter(e) {
    // e.target.classList.add('is-primary')
    //first update the state so you change filter to whatever the id is
    // console.log(e.target.id)
    setFilter(e.target.id)
    getExpenses(e.target.id)
  }

  return (
    <div className="expenses-list">
      <h3 className="has-text-grey">{month} {year}</h3>
      <p>{month} total spending: <span className="has-text-success"><b>${total}</b></span></p>
      <div className="filter has-text-grey">
        <small>FILTER:</small>
        <span id="day-filter" className={filter === "day-filter" ? filterSelected : filterDefault} onClick={handleFilter}>Day</span>
        <span id="week-filter" className={filter === "week-filter" ? filterSelected : filterDefault} onClick={handleFilter}>Week</span>
        <span id="month-filter" className={filter === "month-filter" ? filterSelected : filterDefault} onClick={handleFilter}>Month</span>
      </div>
      <div>
        {expenses.map((expense, index) => (
          <Expense key={expense.id} expense={expense} index={index + 1} />
        ))}
      </div>
    </div>
  )
}

export default Expenses
