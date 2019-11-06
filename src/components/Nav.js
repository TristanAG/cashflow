import React from 'react'
import { Link } from "react-router-dom"
import { FirebaseContext } from '../firebase'

function Nav() {
  const { user, firebase } = React.useContext(FirebaseContext)

  return (
    <div className="nav section">
      <div className="container">
        <div className="columns is-mobile">
          <div className="column">
            <div className="content">
              <Link to="/"><h3 className="has-text-grey">💵 cashflow.cool</h3></Link>
            </div>
          </div>
          <div className="column">
            <div className="content has-text-right">
              {user ? (
                <>
                  <div>{user.displayName}</div>
                  <Link to="/" className="nav-link">
                    <h5 className="has-text-grey-light">expenses</h5>
                  </Link>
                  <Link to="/dashboard/" className="nav-link">
                    <h5 className="has-text-grey-light">dashboard</h5>
                  </Link>
                  <div onClick={() => firebase.logout()}>
                    <h5 className="has-text-grey-light">logout</h5>
                  </div>
                </>
              ) : <Link to="/login/" className="nav-link">
                <h5 className="has-text-grey-light">login</h5>
              </Link>}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Nav
