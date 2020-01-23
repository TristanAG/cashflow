export default function validatePreferences(values, preferences) {
  let errors = {}

  const categoryIsAlreadyThere = (preferences.indexOf(values.newCategory) > -1)

  if (categoryIsAlreadyThere) {
    errors.category = "This category is already in the list... "
  }

  if (!values.fact) {
    errors.fact = "Email required"
  }

  return errors
}
