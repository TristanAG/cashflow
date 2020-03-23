import React from 'react'
import FirebaseContext from '../firebase/context'
import Expense from './Expense'
import moment from 'moment'

function Expenses() {

  const { firebase, user } = React.useContext(FirebaseContext)
  const [expenses, setExpenses] = React.useState([])
  const [defaultExpenses, setDefaultExpenses] = React.useState([])
  const [total, setTotal] = React.useState([])
  const [month, setMonth] = React.useState('')
  const [year, setYear] = React.useState('1999')
  const [filter, setFilter] = React.useState('month-filter')

  const filterSelected = "filter-tag tag is-white is-primary"
  const filterDefault = "filter-tag tag is-white"

  React.useEffect(() => {
    if (user) {
      getExpenses()
    }
  }, [user])

  React.useEffect(() => {
    setFilterView(filter)
  }, [expenses.length])

  function getExpenses(filter) {
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

  function handleSnapshot(snapshot) {
    const expenses = snapshot.docs.map(doc => {
      return { id: doc.id, ...doc.data() }
    })
    setDefaultExpenses(expenses)
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
    setFilter(e.target.id)
    setFilterView(e.target.id)
  }

  function setFilterView(filter) {
    const today = moment(Date.now()).format('D').toString()

    switch (filter) {
      case 'day-filter':
        const todayExpenses = []
        expenses.map(expense => {
          if (expense.dayCreated === today) {
            todayExpenses.push(expense)
          }
        })
        setExpenses(todayExpenses)
        break;

      case 'week-filter':
        const weekExpenses = []
        let lowerLimit = 0
        let upperLimit = 0

        switch (moment().format('dddd')) {
          case 'Sunday':
            lowerLimit = today - 0
            upperLimit = today + 6
            break;
          case 'Monday':
            lowerLimit = today - 1
            upperLimit = today + 5
            break;
          case 'Tuesday':
            lowerLimit = today - 2
            upperLimit = today + 4
            break;
          case 'Wednesday':
            lowerLimit = today - 3
            upperLimit = today + 3
            break;
          case 'Thursday':
            lowerLimit = today - 4
            upperLimit = today + 2
            break;
          case 'Friday':
            lowerLimit = today - 5
            upperLimit = today + 1
            break;
          case 'Saturday':
            lowerLimit = today - 6
            upperLimit = today + 0
            break;
        }

        defaultExpenses.map(expense => {
          if (expense.dayCreated >= lowerLimit && expense.dayCreated <= upperLimit) {
            weekExpenses.push(expense)

          }
        })
        setExpenses(weekExpenses)
        break;

      case 'month-filter':
        setExpenses(defaultExpenses)
        break;
    }
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
