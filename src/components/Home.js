import React from 'react'

import CreateExpense from './CreateExpense'
import Expenses from './Expenses'
import FirebaseContext from '../firebase/context'

function Home() {
  const { firebase, user } = React.useContext(FirebaseContext)

  return (
    <div className="Home section">
      <div className="container">
        {user ?
          <div className="columns">
            <div className="column is-one-half form-area">
              <div className="content">
                <CreateExpense />
              </div>
            </div>
            <div className="column">
              <div className="content">
                <Expenses />
              </div>
            </div>
          </div>
          :
          <>
            <div className="columns">

                <div className="home-hero">
                  <div className="content">
                    <h1 className="has-text-grey"><span role="img" aria-label="cash emoji">💵</span> cashflow.cool</h1>
                    <p><i>Create your categories, track your spending, see where your money's going. Personal finance is cool</i> 😎</p>
                  </div>
              </div>
            </div>

            <div className="columns">
              <div className="column is-one-quarter">
                <div className="content text">
                  <p>Manage and categorize your expenses in your Dashboard</p>
                </div>
              </div>
              <div className="column">
                <div className="content">
                  <div className="card center">
                    <img src="./images/first.png" />
                  </div>
                </div>
              </div>
            </div>

            <div className="columns">
              <div className="column is-one-half">
                <div className="content">
                  <div className="card center">
                    <img src="./images/second.png" />
                  </div>
                </div>
              </div>
              <div className="column">
                <div className="content text">
                  <p>Add your own categories to track what's relevant to you</p>
                </div>
              </div>
            </div>

            <div className="columns">
              <div className="column is-one-third">
                <div className="content text">
                  <p>Zoom in for monthly, weekly, or daily views of your spending</p>
                </div>
              </div>
              <div className="column">
                <div className="content">
                  <div className="card center">
                    <img src="./images/third.png" />
                  </div>
                </div>
              </div>
            </div>

            <div className="columns">
              <div className="column is-two-thirds">
                <div className="content">
                  <div className="card center">
                    <img src="./images/fourth.png" />
                  </div>
                </div>
              </div>
              <div className="column">
                <div className="content text">
                  <p>View how much money you've put towards your categories // determine where most of your money is going and gain insight</p>
                </div>
              </div>
            </div>
          </>
        }
      </div>
    </div>
  )
}

export default Home
