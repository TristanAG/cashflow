export default function validateCreateLink(values) {
  let errors = {}

  // description errors
    // if (!values.description) {
    //   errors.description = "Description Required"
    // } else if (values.description.length < 10) {
    //   errors.description = "Make it over 10"
    // }
  //url errors
    // if (!values.url) {
    //   errors.url = "URL required";
    // } else if (!/^(ftp|http|https):\/\/[^ "]+$/.test(values.url)) {
    //   errors.url = "URL must be valid";
    // }

  //amount errors
  if (values.amount) {
    if (isNaN(values.amount)) {
      errors.amount = "Expense must be a numeric value"
    }
  }

  if (!values.amount) {
    errors.amount = "Please enter expense amount"
  }

  return errors;
}
