import React from 'react'
import classes from './../../../Assets/Styles/Other/Button.module.scss'

const Button = props => {  
  const cls = [
    classes.Button,
    classes[props.type]
  ]
  return (    
    <button
      onClick={props.onClick}
      className={cls.join(' ')}
    >
      {props.children}
    </button>
  )
}
export default Button