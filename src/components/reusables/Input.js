import React from 'react'
import "./reusables.css"

const Input = ({text, handleChange, icon, label, fieldError }) => {
  return (
      <div>
          <div className="input-container">
            <div className="label-container">
                        <label>{label}</label>
            </div>

              <input 
              type={text} 
              onChange={handleChange}
              name={label} />
              <img src={icon} alt="" />
              
          </div>
          <div className="input-error-container">
                <p className={fieldError[label].error ? "fieldError":"noFieldError"}>
                                {fieldError[label].message}
                </p>
          </div>
      </div>
  )
}

export default Input
