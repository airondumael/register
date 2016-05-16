import React, {Component, PropTypes} from 'react'
import {reduxForm, propTypes, startSubmit, stopSubmit} from 'redux-form'
import moment from 'moment'

// form helpers
import FormInput from './common/FormInput'
import FormSelect from './common/FormSelect'

// some data used for the input options
import titles from '../constants/titles'
import {UK_POST_CODE} from '../constants/regexp'

// fields for registration form
export const form_fields = [ 
  'title',
  'firstName',
  'surname',
  'street',
  'town',
  'postCode',
  'dateOfBirth',
  'above18'
]

// validation rules
// will be called on form data changes
// I used a function in validating because this are just simple rules 
// but there is also a good library to make this more declarative 
// [redux-form-validation](https://www.npmjs.com/package/redux-form-validation)
const validate = values => {
  const errors = {}

  if (!values.firstName) {
    errors.firstName = 'Please enter First Name.'
  }
  // we can also check the length of the input
  else if (values.firstName.length < 3) {
    errors.firstName = 'First Name must be atleast 3 characters.'
  }

  if (!values.surname) {
    errors.surname = 'Please enter Surname.'
  }

  if (!values.street) {
    errors.street = 'Please enter Street.'
  }

  if (!values.town) {
    errors.town = 'Please enter Town.'
  }

  if (!values.postCode) {
    errors.postCode = 'Please enter Post Code.'
  }
  // let's try UK post code validation using regex
  else if (!values.postCode.match(UK_POST_CODE)) { 
    errors.postCode = 'Please enter valid Post Code.'
  }

  if (!values.dateOfBirth) {
    errors.dateOfBirth = 'Please enter Date of Birth.'
  }
  // checks if registrant is 18+ base on DOB
  else if (moment().diff(moment(values.dateOfBirth, 'YYYY-M-D'), 'year') < 18) {
    errors.dateOfBirth = 'This service is only for 18+.'
  }

  return errors
}

class RegistrationForm extends Component {
  constructor(props) {
    super(props)

    // set inital state
    this.state = {
      submitted: false
    }
  }

  componentWillMount() {
    // here we can prefill the form
    this.props.initializeForm({
      title: 'Mr.'
    })
  }

  handleSubmit(data, dispatch) {
    // here is where you dispatch events

    // by returning promise
    // it will make this.props.submitting to true until it's resolved
    // this allows us to show client that something is happening in the background
    return new Promise((resolve, reject) => {
      // lets simulate 2 second API request
      setTimeout(() => {
        resolve()

        this.setFormSubmitted(true)
      }, 2000)
    })
  }

  resetForm(resetForm) {
    this.setFormSubmitted(false)
    resetForm()
  }

  setFormSubmitted(value) {
    this.setState(Object.assign({}, this.state, {
      submitted: value
    }))
  }

  render() {
    const {submitted} = this.state
    const { resetForm, handleSubmit, submitting, fields, invalid} = this.props
    const {
        title,
        firstName,
        surname,
        street,
        town,
        postCode,
        dateOfBirth,
        above18
    } = fields

    return (
      // binded this to this.handleSubmit beacause
      // somewhere in the process context this for handleSubmit becomes undefined
      <form onSubmit={handleSubmit(this.handleSubmit.bind(this))} className="pure-form pure-form-aligned">
        {!submitted && <fieldset>
          <legend>Register</legend>

          <FormSelect inputData={title} defaultValue="Mr." options={titles} label="Title" classes="pure-control-group" />
          <FormInput inputData={firstName} type="text"  label="First Name" placeholder="John" classes="pure-control-group" />
          <FormInput inputData={surname} type="text"  label="Surname" placeholder="Doe" classes="pure-control-group" />
          <FormInput inputData={street} type="text"  label="Street" placeholder="5th Street" classes="pure-control-group" />
          <FormInput inputData={town} type="text"  label="Town" placeholder="Small Town" classes="pure-control-group" />
          <FormInput inputData={postCode} type="text"  label="Post Code" placeholder="EC1A 1BB" classes="pure-control-group" />
          <FormInput inputData={dateOfBirth} type="date"  label="Date of Birth" classes="pure-control-group" />

          <div className="pure-controls">
            <label for="cb" className="pure-checkbox">
              {/* if there is error in date of birth's validation (age below 18 or no DOB) disable checkbox */}
              <input type="checkbox" {...above18} disabled={!dateOfBirth || dateOfBirth.error} /> I'm 18+ years of age.
            </label>

            {/* disable submit if already submitting || not all fields are valid || above18 not checked */}
            <button type="submit" disabled={submitting || invalid || !above18.checked || submitted} className="pure-button pure-button-primary">
              {submitting && <img className="loader" src="images/ajax-loader.gif" />}
              Register
            </button>
          </div>
        </fieldset>}

        {submitted && <fieldset>
          <legend>Submitted</legend>
          <table className="pure-table stretch">
            <thead>
              <tr>
                <th>Field</th>
                <th>Value</th>
              </tr>
            </thead>

            <tbody>
              <tr class="pure-table-odd">
                <td>Title</td>
                <td>{fields.title.value}</td>
              </tr>
              <tr class="pure-table-odd">
                <td>First Name</td>
                <td>{fields.firstName.value}</td>
              </tr>
              <tr class="pure-table-odd">
                <td>Surname</td>
                <td>{fields.surname.value}</td>
              </tr>
              <tr class="pure-table-odd">
                <td>Street</td>
                <td>{fields.street.value}</td>
              </tr>
              <tr class="pure-table-odd">
                <td>Town</td>
                <td>{fields.town.value}</td>
              </tr>
              <tr class="pure-table-odd">
                <td>Post Code</td>
                <td>{fields.postCode.value}</td>
              </tr>
              <tr class="pure-table-odd">
                <td>Date of Birth</td>
                <td>{moment(fields.dateOfBirth.value, 'YYYY-M-D').format('MMMM DD YYYY')}</td>
              </tr>
            </tbody>
          </table>
          <div className="pureControls">
            <button 
              type="button"
              className="pure-button pure-u-1"
              onClick={this.resetForm.bind(this, resetForm)}>
              Reset Form to Try Again
            </button>
          </div>
        </fieldset>}
      </form>
    )
  }
}

// merge redux-form propTypes with registration form props
RegistrationForm.propTypes = Object.assign({}, propTypes, {
  // other propTypes here
})

RegistrationForm = reduxForm({
  form: 'registration',
  fields: form_fields,
  validate
})(RegistrationForm)

export default RegistrationForm
