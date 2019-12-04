import React from 'react'
import useFormValidation from './auth/useFormValidation'
import validatePreferences from './auth/validatePreferences'
import { FirebaseContext } from '../firebase'

function Dashboard() {
  const INITIAL_STATE = {
    fact: "...hmm?",
    categories: [
      'Food',
      'Gas',
      'Videogames'
    ],
    newCategory: 'meee'

  }

  const { user, preferences, updatePreferences, firebase } = React.useContext(FirebaseContext)
  const { handleSubmit, handleChange, handleBlur, values, errors } = useFormValidation(INITIAL_STATE, validatePreferences, handleUpdatePreferences)
  const [userPreferences, setUserPreferences] = React.useState({})
  const [newCategory, setNewCategory] = React.useState('')

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
    alert('in handleUpdatePreferences!')

    const { categories, newCategory } = values

    const preferences = {
      // newCategory: 'now im cloud firestore riiiiiick!'
      newCategory: categories.push(newCategory)
      // categories1: categories[1]
    }

    firebase.db.collection('users').doc(user.uid).set({
      preferences
    })

    updatePreferences(preferences)

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
                {preferences.newCategory}
                <form onSubmit={handleSubmit}>

                  <div className="category-list">
                    <ul>
                      {values.categories.map(category => (
                        <li key={category}>{category} <a className="delete is-small"></a></li>
                      ))}
                    </ul>
                  </div>

                  <div className="field">
                    <label className="label">New Category</label>
                    <div className="control">
                      <input
                        name="newCategory"
                        onChange={handleChange}
                        value={values.newCategory}
                        placeholder="add new category"
                        autoComplete="off"
                        type="text"
                        // className={errors.url && 'has-text-danger'}
                        className="input"
                      />
                      {/* {errors.fact && <p className="has-text-danger">{errors.fact}</p>} */}
                    </div>
                  </div>
                  <button className="button full-width" type="submit">Update Categories</button>
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
