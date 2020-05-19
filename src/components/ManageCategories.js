import React from 'react'
import useFormValidation from './auth/useFormValidation'
import validatePreferences from './auth/validatePreferences'
import { FirebaseContext } from '../firebase'

function ManageCategories() {
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
  const [modal, setModal] = React.useState(false)

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
    <>
      <div className="column">
        <div className="content">
          <h3 className="has-text-primary">Category Manager</h3>
          <p className="change-month has-text-info" onClick={() => setModal(!modal)}><i className="fa fa-calendar" aria-hidden="true"></i> Add New Category</p>
          <div className={modal ? "modal is-active" : "modal"}>
            <div onClick={() => setModal(!modal)} className="modal-background"></div>
            <div className="modal-card">
              <header className="modal-card-head">
                <p className="modal-card-title">
                  <p className="has-text-info"><i className="fa fa-plus" aria-hidden="true"></i> Add New Category</p>
                </p>
                <button onClick={() => setModal(!modal)} className="delete" aria-label="close"></button>
              </header>
              <section className="modal-card-body">

              </section>
              <footer className="modal-card-foot">
                <button className="button is-success">Save</button>
                <button onClick={() => setModal(!modal)} className="button">Cancel</button>
              </footer>
            </div>
          </div>



          <table className="table is-striped is-full-width">
            <tbody>
              <tr>
                <th>Category</th>
                <th>Total Spent</th>
              </tr>

              {preferences.map((pref) => (
                <tr key={pref}>
                  <td>{pref}</td>
                  <td>
                    <div onClick={() => { handleDeleteClick(pref) }}><a className="delete is-pulled-right is-small"></a></div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>



        </div>
      </div>
      <div className="column">
        <form onSubmit={handleSubmit}>
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
    </>
  )
}

export default ManageCategories
