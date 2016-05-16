import React, {Component, PropTypes} from 'react'

// Component for generic Inputs
class FormInput extends Component {
  render () {
    const {inputData, type, placeholder, label, classes} = this.props
    return (
      <div className={classes}>
        {label && <label>{label}</label>}

        <input 
          type={type || 'text'} 
          className={inputData.touched && inputData.error ? "error" : ""} 
          placeholder={placeholder} 
          {...inputData} />

        {/* show validation error */}
        {inputData.touched && inputData.error && <div className="validation-error">{inputData.error}</div>}
      </div>
    )
  }
}

// Props validation
FormInput.propTypes = {
  inputData: PropTypes.object.isRequired
}

export default FormInput
