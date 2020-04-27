import React from 'react'
import { FirebaseContext } from '../firebase'
import moment from 'moment'
import Expense from './Expense'


function CategoryBreakdown() {
  const { user, firebase } = React.useContext(FirebaseContext)
  const [expenses, setExpenses] = React.useState([])
  const [combinedExpenses, setCombinedExpenses] = React.useState([])

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
      // .where("monthCreated", "==", month)
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
    let indexOffset = 0

    defaultExpenses.map((exp, i) => {
      if (indexOffset === 0) {
        combinedCategories.push(exp)

        // console.log(combinedCategories[i].amount)
        // combinedCategories[i].amount += 333
        // console.log(combinedCategories[i].amount)
        indexOffset++
      }

      if (indexOffset > 0) {

        //you gotta stash the index somehow... don't let it increment
        console.log(combinedCategories[indexOffset - 1].category)

        if (combinedCategories[indexOffset - 1].category === exp.category) {
          console.log('hit')
          //do the add
          console.log(combinedCategories[indexOffset - 1].amount)
          combinedCategories[indexOffset - 1].amount += exp.amount
          console.log(combinedCategories[indexOffset - 1].amount)
        } else {
          combinedCategories.push(exp)
          indexOffset++
        }

        // combinedCategories.push(exp)
      }
    })

    // console.log(combinedCategories)
    setExpenses(combinedCategories)
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
