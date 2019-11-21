export default function validatePreferences(values) {
  let errors = {}

  // email related errors
  if (!values.fact) {
    errors.fact = "Email required"
  } 

  return errors;
}
