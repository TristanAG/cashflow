import React from 'react'
import useFormValidation from './useFormValidation'
import validateLogin from './validateLogin'
import firebase from '../../firebase'
import { Link } from 'react-router-dom'

const INITIAL_STATE = {
  name: "",
  email: "",
  password: ""
}

//alright so each of these functions comes from the useFormValidation file... it's interesting how this is all working
//i mean, it seems a bit more complex than im used to... but manageable. i get what's going on... so like, when you
//execute the function here, it's like the code is in this file, but it actually exists in useFormValidation. pretty neat.
function Login(props) {
  const {
    handleChange,
    handleBlur,
    handleSubmit,
    values,
    errors,
    isSubmitting
  } = useFormValidation(INITIAL_STATE, validateLogin, authenticateUser)

  //login is the state variable, and setLogin is the setter
  //setLogin gets called when the button is clicked below
  //and it looks like when you call a state function, you have access to the previous state on that piece of state (login)
  const [login, setLogin] = React.useState(true)
  const [firebaseError, setFirebaseError] = React.useState(null)

  async function authenticateUser() {
    const { name, email, password } = values

    try {
      const response = login
        ? await firebase.login(email, password)
        : await firebase.register(name, email, password)
      props.history.push('/')
    } catch (err) {
      console.error('Authentication Error', err)
      setFirebaseError(err.message)
    }

  }

  return (
    <section className="login section">
      <div className="container">
        <div className="columns">
          <div className="column is-two-thirds">
            <div className="content">
              <h3 className="has-text-grey-light">{login ? "login" : "create account"}</h3>
              <div>
                <form onSubmit={handleSubmit}>
                  {!login &&
                    <div className="field">
                      <label className="label">Name</label>
                      <div className="control">
                        <input
                          className="input"
                          type="text"
                          placeholder="name"
                          autoComplete="off"
                          name="name"
                          value={values.name}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  }
                  <div className="field">
                    <label className="label">Email</label>
                    <div className="control">
                      <input
                        // className="input"
                        className={errors.email ? "input error-input" : "input"}
                        type="text"
                        placeholder="email"
                        autoComplete="off"
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </div>
                  </div>
                  {errors.email && <p className="has-text-danger">{errors.email}</p>}
                  <div className="field">
                    <label className="label">Password</label>
                    <div className="control">
                      <input
                        className={errors.password ? "input error-input" : "input"}
                        type="password"
                        placeholder="choose a password"
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </div>
                  </div>
                  {errors.password && <p className="has-text-danger">{errors.password}</p>}
                  {firebaseError && <p className="has-text-danger">{firebaseError}</p>}
                  <br />
                  <button
                    className="button is-primary"
                    type="submit"
                    value="Submit"
                    disabled={isSubmitting}
                    style={{
                      marginRight: '18px',
                      background: isSubmitting && 'grey'
                    }}>
                      submit
                  </button>
                  <button
                    className="button"
                    type="button"
                    onClick={() => setLogin(prevLogin => !prevLogin)}>
                      {login ? "need to create an account?" : "already have an account?"}
                  </button>
                </form>
                <Link className="forgot-password" to="/forgot">forgot password?</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Login
