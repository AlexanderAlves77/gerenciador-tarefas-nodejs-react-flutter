import React from 'react'

export const Input = (props) => {
  const { 
    srcImg, 
    altImg, 
    inputType, 
    inputName, 
    placeholder, 
    value, 
    setValue } = props
  
  return (
    <div className="input">
      <img src={srcImg} alt={altImg} />
      <input 
        type={inputType} 
        name={inputName} 
        placeholder={placeholder}
        value={value} 
        onChange={(event) => setValue(event.target.value)} 
      />
    </div>
  )
}