import React from 'react'
import { BrowserRouter as Router, Route } from "react-router-dom"

import '../css/App.css'

import Nav from './Nav'
import Home from './Home'
import GroceryList from './GroceryList'
import RecipeDatabase from './RecipeDatabase'
import WeekPlanner from './WeekPlanner'
import MyRecipes from './MyRecipes'
import Login from './auth/Login'
import ForgotPassword from './auth/ForgotPassword'
import Dashboard from './Dashboard'

import useAuth from './auth/useAuth'
import firebase, { FirebaseContext } from '../firebase'

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
    // alert('in updatePreferences Main')
    // alert(wrd)

    //so i suppose what shall happen here is that update preferences will send this data off to firebase, then it will update state (which will in turn update context)

    // preferences.push(wrd)
    // console.log('check this')
    // console.log(preferences)

    // setPreferences(wrd)
  }

  return (
    <Router>
      <FirebaseContext.Provider value={{ user, preferences, updatePreferences, firebase }}>
        <Nav />
        <section className="content-area">
          {user &&
            <>
              <Route path="/grocery-list/" component={GroceryList} />
              <Route path="/recipe-database/" component={RecipeDatabase}/>
              <Route path="/week-planner/" component={WeekPlanner} />
              <Route path="/my-recipes/" component={MyRecipes} />
              <Route path="/dashboard/" component={Dashboard} />
            </>
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
