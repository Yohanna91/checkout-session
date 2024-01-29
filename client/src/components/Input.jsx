import React from 'react'

const Input = ({ type, label, placeholder, onChangeHandler}) => {
  return (
    <div>
    <label htmlFor="email">{label}</label>
    <input 
        className="block border border-1 border-gray-300 p-2 w-full" 
        type={type} 
        id={label}
        placeholder={placeholder} 
        onChange={onChangeHandler}
        />
  </div>
  )
}

export default Input