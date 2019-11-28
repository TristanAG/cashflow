import React from 'react'
import LinkList from './LinkList'
import CreateLink from './CreateLink'
import Expenses from './Expenses'
import FirebaseContext from '../firebase/context'

function Home() {
  const { firebase, user } = React.useContext(FirebaseContext)

  return (
    <div className="Home section">
      <div className="container">
        {user &&
          <div className="columns">
            <div className="column is-one-third">
              <div className="content">
                <CreateLink />
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
