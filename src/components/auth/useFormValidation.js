import React from 'react'

//custom hook

function useFormValidation(initialState, validate, authenticate, preferences) {
  //values set here on setValues using the initial state from dashboard component
  const [values, setValues] = React.useState(initialState)
  const [errors, setErrors] = React.useState({})
  const [isSubmitting, setSubmitting] = React.useState(false)

  //useEffect hook is there to check if state has changed!
  //so ok, the callback seems to only run by watching the errors state it looks like

  React.useEffect((isSubmitting, authenticate) => {
    if(isSubmitting) {
      const noErrors = Object.keys(errors).length === 0
      if (noErrors) {
        // console.log('authenticate', values)
        authenticate()
        setSubmitting(false)
      } else {
        setSubmitting(false)
      }
    }
  }, [errors])


  //alright so it looks like we are just reducing the number of times we would handleChange and keeping it in the reusable hook
  //that's pretty cool!
  function handleChange(event) {
    event.persist()
    setValues(previousValues => ({
      ...previousValues,
      [event.target.name]: event.target.value,
    }))
  }

  function handleBlur() {
    const validationErrors = validate(values)
    setErrors(validationErrors)
  }

  function handleSubmit(event) {
    event.preventDefault()
    console.log('in handle submit')
    console.log(event.target.values)

    const validationErrors = validate(values, preferences)
    setErrors(validationErrors)
    setSubmitting(true)
    //so it seems like right after this function runs, that's when you would clear the data, right?
    // setValues('')

  }

  return { handleChange, handleBlur, handleSubmit, values, errors, isSubmitting }
}

export default useFormValidation
