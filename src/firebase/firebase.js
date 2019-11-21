import app from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

import firebaseConfig from './config'

class Firebase {
  constructor() {
    app.initializeApp(firebaseConfig);
    this.auth = app.auth()
    this.db = app.firestore()
  }

  //does register method work right now?
  async register(name, email, password) {
    const newUser = await this.auth.createUserWithEmailAndPassword(
      email,
      password
    )

    this.setUserPrefs(newUser)

    return await newUser.user.updateProfile({
      displayName: name
    })
  }

  //what does this actually do?
  //oh, it returns the displayName from the user object to render on screen when they log in
  //not sure if it works perfectly.
  //does this even work? it's not actually doing anything
  // setupUser(user) {
  //   return this.db.collection('expenses').doc(user.uid).set({
  //     name: user.displayName
  //   })
  // }

  setUserPrefs(user) {
    console.log('in set user prefs')
    console.log(user.user.uid)
  }

  async login(email, password) {
    return await this.auth.signInWithEmailAndPassword(email, password)
  }

  async logout() {
    await this.auth.signOut()
  }

  async resetPassword(email) {
    await this.auth.sendPasswordResetEmail(email)
  }
}

const firebase = new Firebase()
export default firebase;
