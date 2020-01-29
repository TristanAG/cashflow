import React from 'react'
import useFormValidation from './auth/useFormValidation'
import validateCreateLink from './auth/validateCreateLink'
import { FirebaseContext } from '../firebase'
import { Link } from "react-router-dom"
import moment from 'moment'

const INITIAL_STATE = {
  category: "",
  amount: "",
  business: "",
  paymentMethod: "",
  description: ""
}




function CreateLink(props) {
  const time = Date.now()
  const { firebase, preferences, user } = React.useContext(FirebaseContext)
  const { handleSubmit, handleChange, handleBlur, values, errors } = useFormValidation(INITIAL_STATE, validateCreateLink, handleCreateExpense, )

  const [amount, setAmount] = React.useState("")

  // alert('hi')
  // values.amount = 19

  function handleCreateExpense() {
    if(!user) {
      props.history.push('/login')
    } else {
      const { category, amount, business, paymentMethod, description } = values

      //convert amount to number here
      const amountNum = parseFloat(amount, 10)

      const expense = {
        category,
        amount: amountNum,
        business,
        paymentMethod,
        description,
        postedBy: {
          id: user.uid,
          name: user.displayName
        },
        created: Date.now(),
        monthCreated: moment(Date.now()).format('MMMM'),
        yearCreated: moment(Date.now()).format('YYYY'),
        dayCreated: moment(Date.now()).format('D'),
        actualDay: moment(Date.now()).format('dddd')
      }

      firebase.db.collection('expenses').add(expense)
    }
    values.amount = ''
    values.business = ''
    values.description = ''
    values.paymentMethod = 'Debit Card'
  }

  return (
    <div>
      <div className="columns">
        <div className="column">
          <h3 className="has-text-grey">Add Expense</h3>
        </div>
      </div>

      {user ? (
        <div className="columns">
          <div className="column">
            <div className="content">

              <form onSubmit={handleSubmit}>
                <div className="field">
                  <label className="label">Category</label>
                  <div className="control">
                    <div className="select">
                      <select
                        onChange={handleChange}
                        value={values.category}
                        name="category"
                      >
                        <option>Category</option>
                        {preferences && preferences.map(pref => (
                          <option key={pref}>{pref}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  {errors.category && <p className="has-text-danger">{errors.category}</p>}
                </div>

                <div className="field">
                  <label className="label">Amount</label>
                  <div className="control">
                    <input
                      name="amount"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.amount}
                      placeholder="How much was the expense?"
                      autoComplete="off"
                      type="text"
                      // className="input is-danger"
                      className={errors.amount ? 'input is-danger' : 'input'}
                      // className={errors.description && 'has-text-danger input'}
                    />
                  </div>
                  {errors.amount &&
                    <p className="help is-danger">
                      <span className="icon has-text-danger">
                        <i className="fas fa-ban"></i>
                      </span>
                      {errors.amount}
                    </p>}
                </div>

                <div className="field">
                  <label className="label">Business</label>
                  <div className="control">
                    <input
                      name="business"
                      onChange={handleChange}
                      value={values.business}
                      placeholder="Where did the purchase take place?"
                      autoComplete="off"
                      type="text"
                      // className={errors.url && 'has-text-danger'}
                      className="input"
                    />
                    {errors.url && <p className="has-text-danger">{errors.url}</p>}
                  </div>
                </div>

                <div className="field">
                  <label className="label">Payment Method</label>
                  <div className="control">
                    <label className="radio">
                      <input type="radio" name="paymentMethod" value="Debit Card" checked={values.paymentMethod === "Debit Card"} onChange={handleChange} />
                      <span className="radio-option"> Debit Card</span>
                    </label>
                    <label className="radio">
                      <input type="radio" name="paymentMethod" value="Credit Card" checked={values.paymentMethod === "Credit Card"} onChange={handleChange} />
                      <span className="radio-option"> Credit Card</span>
                    </label>
                    <label className="radio">
                      <input type="radio" name="paymentMethod" value="Shared Credit Card" checked={values.paymentMethod === "Shared Credit Card"} onChange={handleChange} />
                      <span className="radio-option"> Shared Credit Card</span>
                    </label>
                    <label className="radio">
                      <input type="radio" name="paymentMethod" value="Cash" checked={values.paymentMethod === "Cash"} onChange={handleChange} />
                      <span className="radio-option"> Cash</span>
                    </label>
                  </div>
                </div>

                <div className="field">
                  <label className="label">Description</label>
                  <div className="control">
                    <input
                      name="description"
                      onChange={handleChange}
                      value={values.description}
                      placeholder="Any notes about the expense"
                      autoComplete="off"
                      type="text"
                      // className={errors.url && 'has-text-danger'}
                      className="input"
                    />
                    {errors.url && <p className="has-text-danger">{errors.url}</p>}
                  </div>
                </div>
                <button className="button full-width" type="submit">Add Expense</button>
              </form>

            </div>
          </div>
        </div>
      ) :
        <Link to="/login/" className="nav-link">
          <h5 className="has-text-grey-light">login</h5>
        </Link>
      }
    </div>
  )
}

export default CreateLink
