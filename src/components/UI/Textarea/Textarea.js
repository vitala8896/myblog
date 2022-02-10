import React from 'react'
import classes from './Textarea.module.scss'

const Textarea = props => {
  const isInvalid = ({valid, touched, shouldValidate}) => {
    return !valid && shouldValidate && touched
  }
  const textareaType = props.type || 'text'
  const cls = [classes.Textarea]
  const htmlFor = `${textareaType}-${Math.random()}`
  if (isInvalid(props)) {
    cls.push(classes.invalid)
  }
 return (
   <div className={cls.join(' ')}>
     <label htmlFor={htmlFor}>{props.label}</label>
     <textarea type={textareaType} id={htmlFor}
       value={props.value} onChange={props.onChange} />
     {isInvalid(props)
       ? <span>{props.errorMessage || 'Enter the correct value'}</span>
       : null}     
   </div>
 )
}
export default Textarea