export default function validateCreateLink(values) {
  let errors = {}

  //amount errors
  if (values.amount) {
    if (isNaN(values.amount)) {
      errors.amount = "Expense must be a numeric value"
    }
  }

  if (!values.amount) {
    errors.amount = "Please enter expense amount"
  }

  if (!values.category || values.category === 'Category') {
    errors.category = "Please select a category first!"
  }

  return errors;
}
