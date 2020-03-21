import React from 'react'
import useFormValidation from './auth/useFormValidation'
import validatePreferences from './auth/validatePreferences'
import { FirebaseContext } from '../firebase'

function Dashboard() {

  const { user, preferences, updatePreferences, firebase } = React.useContext(FirebaseContext)

  const INITIAL_STATE = {
    fact: "...hmm?",
    categories: [
      'Food',
      'Gas',
      'Videogames'
    ],
    newCategory: ''
  }

  const { handleSubmit, handleChange, handleBlur, values, errors } = useFormValidation(INITIAL_STATE, validatePreferences, handleUpdatePreferences, preferences)
  const [userPreferences, setUserPreferences] = React.useState([])
  const [newCategory, setNewCategory] = React.useState('')

  function handleUpdatePreferences() {
    const { newCategory } = values
    preferences.push(newCategory)

    firebase.db.collection('users').doc(user.uid).set({
      categories: preferences
    })

    //reset form values
    values.newCategory = ''
  }

  function handleDeleteClick(pref) {
    const res = preferences.indexOf(pref)
    preferences.splice(res, 1)
    if(window.confirm('you sure you want to delete this category?')){
      firebase.db.collection('users').doc(user.uid).set({
        categories: preferences
      })
    }
  }

  return (
    <div className="Home section">
      <div className="container">
        <div className="content">
          <h3 className="has-text-grey-light">Dashboard 📈</h3>
        </div>
      </div>
      <div className="container">
        <div className="columns">
          <div className="column is-one-third">
            <div className="content">
              <form onSubmit={handleSubmit}>
                <div className="category-list">
                  <ul>
                    {preferences.map(pref => (
                      <li key={pref} onClick={() => { handleDeleteClick(pref) }}>{pref} <a className="delete is-small"></a></li>
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
                    {errors.category && <p className="has-text-danger">{errors.category}</p>}
                  </div>
                </div>
                <button className="button full-width" type="submit">Update Categories</button>
              </form>
            </div>
          </div>
          <div className="column">
            <div className="content">
              {/* <Expenses /> */}
              <small className="has-text-primary">why am i here? ¯\_(ツ)_/¯<br/>probably should refactor the template or put something of value here<br />what else goes on a dashboard?
              <br/>category distribution quick look?</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
