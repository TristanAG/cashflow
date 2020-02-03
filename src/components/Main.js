import React from 'react'
import { BrowserRouter as Router, Route } from "react-router-dom"

import '../css/App.css'
import firebase, { FirebaseContext } from '../firebase'
import useAuth from './auth/useAuth'

import Nav from './Nav'
import Home from './Home'
import Dashboard from './Dashboard'
import Login from './auth/Login'
import ForgotPassword from './auth/ForgotPassword'

function Main() {
  const [preferences, setPreferences] = React.useState([])
  const user = useAuth()

  React.useEffect(() => {
    if (user) {
      const unsubscribe = loadUserPreferences()
    }
  }, [user])

  function loadUserPreferences() {
    firebase.db.collection('users').doc(user.uid).onSnapshot(handleSnapshot)
  }

  function handleSnapshot(snapshot) {
    setPreferences(snapshot.data().categories)
  }

  function updatePreferences(wrd) {
    //do i still need to be here?
    // alert('in updatePreferences Main')
  }

  return (
    <Router>
      <FirebaseContext.Provider value={{ user, preferences, updatePreferences, firebase }}>
        <Nav />
        <section className="content-area">
          {user &&
            <><Route path="/dashboard/" component={Dashboard} /></>
          }
          <Route path="/" exact component={Home} />
          <Route path="/login/" component={Login} />
          <Route path="/forgot/" component={ForgotPassword} />
        </section>
      </FirebaseContext.Provider>
    </Router>
  )
}

export default Main
