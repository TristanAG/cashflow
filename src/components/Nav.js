import React from 'react'
import { Link } from "react-router-dom"
import { FirebaseContext } from '../firebase'

function Nav() {
  const { user, firebase } = React.useContext(FirebaseContext)
  const [preferences, setPreferences] = React.useState({})

  return (
    <nav class="navbar container" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <Link to="/" className="navbar-item">
          <h3 className="has-text-grey">💵 cashflow.cool</h3>
        </Link>

        <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarBasicExample" class="navbar-menu">
        <div class="navbar-start">
          <Link to="/" className="navbar-item">
            Expenses
          </Link>

          <Link to="/dashboard/" className="navbar-item">
            Dashboard
          </Link>
        </div>

        <div class="navbar-end">
          <div class="navbar-item">
            <div class="buttons">
              {user
                ? <div onClick={() => firebase.logout()} className="button is-light">Log out</div>
                : <Link to="/login/" className="button is-light">Log in</Link>
              }
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Nav
