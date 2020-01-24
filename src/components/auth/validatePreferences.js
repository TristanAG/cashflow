export default function validatePreferences(values, preferences) {
  let errors = {}

  const categoryAlreadyExists = (preferences.indexOf(values.newCategory) > -1)

  if (categoryAlreadyExists) {
    errors.category = "This category is already in the list... "
  }

  if (!values.fact) {
    errors.fact = "Email required"
  }

  return errors
}
