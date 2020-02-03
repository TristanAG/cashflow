import React from 'react'
import ExpenseList from './ExpenseList'
import AddExpense from './AddExpense'
import Expenses from './Expenses'
import FirebaseContext from '../firebase/context'

function Home() {
  const { firebase, user } = React.useContext(FirebaseContext)

  return (
    <div className="Home section">
      <div className="container">
        {user &&
          <div className="columns">
            <div className="column is-one-half form-area">
              <div className="content">
                <AddExpense />
              </div>
            </div>
            <div className="column">
              <div className="content">
                <Expenses />
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  )
}

export default Home
