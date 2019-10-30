import React from 'react'
import firebase from '../../firebase'

function useAuth() {
  const [authUser, setAuthUser] = React.useState(null)

  React.useEffect(() => {
    //this is a listener, so we need to 'unsubscribe' once we're done with it
    const unsubscribe = firebase.auth.onAuthStateChanged(user => {
      if (user) {
        // console.log(user)
        setAuthUser(user)
      } else {
        setAuthUser(null)
      }
    })

    return () => unsubscribe()
  }, [])

  return authUser
}

export default useAuth
