import React from 'react'
import { Link } from "react-router-dom"
import { FirebaseContext } from '../firebase'

function Nav() {
  const { user, firebase } = React.useContext(FirebaseContext)
  const [preferences, setPreferences] = React.useState({})
  const [isActive, setIsActive] = React.useState(false)

  // function toggleIsActive() {
  //
  //   setIsActive(!isActive)
  // }

  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <Link to="/" className="navbar-item">
          <h3 className="has-text-grey">💵 cashflow.cool</h3>
        </Link>

        {/* <div className="navbar-menu"> */}
        {/* <a role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample" onClick={toggleIsActive}> */}
        <a
          role="button"
          aria-label="menu"
          aria-expanded="false"
          aria-expanded="false"
          data-target="navbarBasicExample"
          className={isActive ? 'navbar-burger burger is-active' : 'navbar-burger burger'}
          onClick={() => setIsActive(!isActive)}
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      {/* </div> */}


      </div>

      <div className={isActive ? 'navbar-menu is-active' : 'navbar-menu'} id="navMenu">
        <div className="navbar-start">
          <Link to="/" className="navbar-item">
            Expenses
          </Link>

          <Link to="/dashboard/" className="navbar-item">
            Dashboard
          </Link>
        </div>
        {/* <div className="navbar-end">
          hey..
        </div> */}
        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              {user
                ? <div onClick={() => firebase.logout()} className="button">Log out</div>
                : <Link to="/login/" className="button">Log in</Link>
              }
            </div>
          </div>
        </div>
      </div>


      {/* <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-start">
          <Link to="/" className="navbar-item">
            Expenses
          </Link>

          <Link to="/dashboard/" className="navbar-item">
            Dashboard
          </Link>
        </div> */}

        {/* <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              {user
                ? <div onClick={() => firebase.logout()} className="button">Log out</div>
                : <Link to="/login/" className="button">Log in</Link>
              }
            </div>
          </div>
        </div> */}
      {/* </div> */}

    </nav>
  )
}

export default Nav
