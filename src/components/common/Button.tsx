import React from 'react'
interface PropType {
    btn: string;
    onClickHandle:any
}

const Button = ({btn , onClickHandle}:PropType) => {
  return (
      <button onClick={onClickHandle}>{btn}</button>
  )
}

export default Button