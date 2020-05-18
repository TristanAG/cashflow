import React from 'react'
import { FirebaseContext } from '../firebase'
import moment from 'moment'
import Expense from './Expense'

function CategoryExpenses() {
  const { user, firebase } = React.useContext(FirebaseContext)
  const [expenses, setExpenses] = React.useState([])
  const [combinedExpenses, setCombinedExpenses] = React.useState([])
  const [month, setMonth] = React.useState(moment(Date.now()).format('MMMM'))
  const [year, setYear] = React.useState(moment(Date.now()).format('YYYY'))
  const [modal, setModal] = React.useState(false)

  React.useEffect(() => {
    if (user) {
      getInitialExpenses()
    }
  }, [user])

  function getInitialExpenses() {
    const month = moment(Date.now()).format('MMMM')
    const year = moment(Date.now()).format('YYYY')
    queryExpenses(month, year)
  }

  function queryExpenses(month, year) {
    firebase.db
      .collection('expenses')
      .where("postedBy.id", "==", user.uid)
      .where("monthCreated", "==", month)
      .where("yearCreated", "==", year)
      .orderBy("category")
      .orderBy('created', 'desc')
      .onSnapshot(handleSnapshot)
  }

  function handleSnapshot(snapshot) {
    //sorted by category
    const defaultExpenses = snapshot.docs.map(doc => {
      return { id: doc.id, ...doc.data() }
    })

    combineCategories(defaultExpenses)
  }

  function combineCategories(defaultExpenses) {
    const combinedCategories = []

    let index = 0
    defaultExpenses.map(exp => {
      switch (index) {
        case 0:
          combinedCategories.push(exp)
          index++
          break
        default:
          if (combinedCategories[index - 1].category === exp.category) {
            combinedCategories[index - 1].amount += exp.amount
          } else {
            combinedCategories.push(exp)
            index++
          }
      }
    })

    //now sort them
    var sortedCategories = combinedCategories.sort(function (x, y) {
      return   y.amount - x.amount;
    });

    setExpenses(sortedCategories)
  }

  function updateExpensesList(month, year) {
    queryExpenses(month, year)
    setModal(!modal)
  }

  function updateMonthValue(e) {setMonth(e.target.value)}
  function updateYearValue(e) {setYear(e.target.value)}

  return (
    <div className="column">
      <div className="content">
        <h3 className="has-text-primary">Category Expenses</h3>
        {/* <p>{month} {year} total amount spent per category</p>
        <p className="change-month has-text-info" onClick={() => setModal(!modal)}><i className="fa fa-calendar" aria-hidden="true"></i> Change Month</p>
        <div className={modal ? "modal is-active" : "modal"}>
          <div onClick={() => setModal(!modal)} className="modal-background"></div>
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title">
                <p className="has-text-info"><i className="fa fa-calendar" aria-hidden="true"></i> Change Month</p>
              </p>
              <button onClick={() => setModal(!modal)} className="delete" aria-label="close"></button>
            </header>
            <section className="modal-card-body">
              <p>Currently showing expenses for {month} {year}</p>
              <div className="select">
                <select onChange={updateMonthValue}>
                  <option>{month}</option>
                  <option>January</option>
                  <option>February</option>
                  <option>March</option>
                  <option>April</option>
                  <option>May</option>
                  <option>June</option>
                  <option>July</option>
                  <option>August</option>
                  <option>September</option>
                  <option>October</option>
                  <option>November</option>
                  <option>December</option>
                </select>
              </div>
              &nbsp;&nbsp;
              <div className="select">
                <select onChange={updateYearValue}>
                  <option>{year}</option>
                </select>
              </div>
            </section>
            <footer className="modal-card-foot">
              <button onClick={() => updateExpensesList(month, year)} className="button is-success">Save</button>
              <button onClick={() => setModal(!modal)} className="button">Cancel</button>
            </footer>
          </div>
        </div>


        <table className="table is-striped is-full-width">
          <tbody>
            <tr>
              <th>Category</th>
              <th>Total Spent</th>
            </tr>

            {expenses.map((expense, index) => (
              <tr key={index}>
                <td>{expense.category}</td>
                <td>{expense.amount.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table> */}
      </div>
    </div>
  )
}

export default CategoryExpenses
