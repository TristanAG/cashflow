import React from 'react'
import { FirebaseContext } from '../firebase'
import moment from 'moment'
import Expense from './Expense'


function CategoryBreakdown() {
  const { user, firebase } = React.useContext(FirebaseContext)
  const [expenses, setExpenses] = React.useState([])
  const [combinedExpenses, setCombinedExpenses] = React.useState([])
  const [month, setMonth] = React.useState(moment(Date.now()).format('MMMM'))
  const [year, setYear] = React.useState(moment(Date.now()).format('YYYY'))

  React.useEffect(() => {
    if (user) {
      getExpenses()
    }
  }, [user])

  function getExpenses(filter) {
    const month = moment(Date.now()).format('MMMM')
    const year = moment(Date.now()).format('YYYY')

    //sort firebase query by Category
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
    // setExpenses(defaultExpenses)
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

    console.table(sortedCategories);

    setExpenses(sortedCategories)
  }

  return (
    <div>
      <p className="has-text-primary">Category Breakdown</p>
        <p>{month} {year} total amount spent per category</p>
        <table className="table is-striped is-full-width">
          <tbody>
            <tr>
              <th>Category</th>
              <th>Total Spent</th>
            </tr>

            {expenses.map((expense, index) => (
              <tr key={index}>
                {console.log(expense)}
                <td>{expense.category}</td>
                <td>{expense.amount.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
    </div>
  )
}

export default CategoryBreakdown
