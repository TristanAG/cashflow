import React from 'react'
import useFormValidation from './auth/useFormValidation'
import validatePreferences from './auth/validatePreferences'
import { FirebaseContext } from '../firebase'

function Dashboard() {
  const INITIAL_STATE = {
    fact: "...hmm?"
  }

  const { user, preferences, updatePreferences, firebase } = React.useContext(FirebaseContext)
  const { handleSubmit, handleChange, handleBlur, values, errors } = useFormValidation(INITIAL_STATE, validatePreferences, handleUpdatePreferences)
  const [userPreferences, setUserPreferences] = React.useState({})

  React.useEffect(() => {
    if (user) {
      const unsubscribe = initPreferences()

    }
  }, [user])

  function initPreferences() {
    setUserPreferences(preferences)
    // const { category, amount, business, paymentMethod, description } = values
  }

  function handleUpdatePreferences() {
    alert('hey!')

    const { fact } = values

    const preferences = {
      fact: 'now im cloud firestore riiiiiick!'
    }

    firebase.db.collection('users').doc(user.uid).set({
      preferences
    })

    updatePreferences(preferences)

  }

  function updateContext() {

  }

  return (
    <div className="Home section">
      <div className="container">
        <h3 className="has-text-grey-light">Dashboard 📈</h3>
      </div>
      <div className="container">
          <div className="columns">
            <div className="column is-one-third">
              <div className="content">
                {preferences.fact}
                <form onSubmit={handleSubmit}>

                  <div className="field">
                    <label className="label">Fact</label>
                    <div className="control">
                      <input
                        name="fact"
                        onChange={handleChange}
                        value={values.fact}
                        placeholder="Just a fact"
                        autoComplete="off"
                        type="text"
                        // className={errors.url && 'has-text-danger'}
                        className="input"
                      />
                      {/* {errors.fact && <p className="has-text-danger">{errors.fact}</p>} */}
                    </div>
                  </div>
                  <button className="button full-width" type="submit">Update Preferences</button>
                </form>
              </div>
            </div>
            <div className="column">
              <div className="content">
                {/* <Expenses /> */}
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Dashboard
