import React, {Component, PropTypes} from 'react'

// Component for generic Select
class FormSelect extends Component {
  render () {
    const {inputData, options, label, classes} = this.props
    return (
      <div className={classes}>
        {label && <label>{label}</label>}

        <select 
          className={inputData.touched && inputData.error ? "error" : ""} 
          // required syntax for reset form to work
          // undefined will not change value to first empty option
          // when resetting
          value={inputData.value || ''} 
          {...inputData}>

            {options.map(option => {
              return <option value={option.value} key={option.value}>{option.label}</option>
            })}

        </select>

        {/* show validation error */}
        {inputData.touched && inputData.error && <div className="validation-error">{inputData.error}</div>}
      </div>
    )
  }
}

// Props validation
FormSelect.propTypes = {
  inputData: PropTypes.object.isRequired
}

export default FormSelect
