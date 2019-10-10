import React from 'react'
import useFormValidation from './auth/useFormValidation'
import validateCreateLink from './auth/validateCreateLink'

//this is the current INITIAL_STATE... what do I want it to be for my app?
/*
  date //handled with firebase
  name //handled with firebase

    category
    amount

  business
  payment method (card / debit card / credit card)
  desc


*/

//change description to be amount

// const INITIAL_STATE = {
//   amount: "",
//   url: ""
// }

const INITIAL_STATE = {
  category: "",
  amount: "",
  business: "",
  paymentMethod: "",
  description: ""
}



function CreateLink(props) {
  const { handleSubmit, handleChange, values, errors } = useFormValidation(INITIAL_STATE, validateCreateLink, handleCreateLink)

  const [amount, setAmount] = React.useState("")

  function handleCreateLink() {
    console.log('link created!')
  }

  return (
    <div>
      <div className="columns">
        <div className="column">
          Add Expense
        </div>
      </div>
      <div className="columns">
        <div className="column is-half">
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
                      <option>🥕 Groceries</option>
                      <option>🥡 Eating Out</option>
                      <option>🍻 Drinks</option>
                      <option>🎸 Music</option>
                      <option>🎮 Videogames</option>
                      <option>⚕️ Medical</option>
                      <option>🐈 Animals</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="field">
                <label className="label">Amount</label>
                <div className="control">
                  <input
                    name="amount"
                    onChange={handleChange}
                    value={values.amount}
                    placeholder="How much was the expense?"
                    autoComplete="off"
                    type="text"
                    className="input"
                    // className={errors.description && 'has-text-danger input'}
                  />
                </div>
              </div>
              {errors.description && <p className="has-text-danger">{errors.description}</p>}

              {/* payment method should be a drop down or a radio button maybe  */}

              <div className="field">
                <label className="label">Business</label>
                <div className="control">
                  <input
                    name="business"
                    onChange={handleChange}
                    value={values.url}
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
    </div>
  )
}

export default CreateLink
