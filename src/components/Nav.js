import React from 'react'
import { Link } from "react-router-dom"
import { FirebaseContext } from '../firebase'

function Nav() {
  const { user, firebase } = React.useContext(FirebaseContext)

  const [isActive, setIsActive] = React.useState(false)

  function closeNavOnMobile() {
    setIsActive(false)
  }

  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <Link to="/" className="navbar-item">
          <h3 className="has-text-grey"><span role="img" aria-label="cash emoji">💵</span> cashflow.cool</h3>
        </Link>

        <div

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
        </div>
      </div>

      <div className={isActive ? 'navbar-menu is-active' : 'navbar-menu'} id="navMenu">
        {user &&
          <div className="navbar-start">
            <Link to="/" className="navbar-item" onClick={closeNavOnMobile}>
              Expenses
            </Link>

            <Link to="/dashboard/" className="navbar-item" onClick={closeNavOnMobile}>
              Dashboard
            </Link>
          </div>
        }

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
    </nav>
  )
}

export default Nav
