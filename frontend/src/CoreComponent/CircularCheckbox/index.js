import React from 'react'
import './style.scss'

const CircularCheckbox = ({ isChecked, onChange }) => {
  return (
    <div className="circular-checkbox">
      <input type="checkbox" id="checkbox" checked={isChecked} onChange={onChange} />
      <label htmlFor="checkbox"></label>
    </div>
  )
}
export default CircularCheckbox
