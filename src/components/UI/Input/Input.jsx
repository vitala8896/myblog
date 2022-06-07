
import { StyleInput } from './../../../Assets/Styles/Other/Input'

export const Input = props => {
  const isInvalid = ({ valid, touched, shouldValidate }) => {
    return !valid && shouldValidate && touched
  }
  const inputType = props.type || 'text'
  const cls = ['Input']
  const htmlFor = `${inputType}-${Math.random()}`
  if (isInvalid(props)) {
    cls.push('invalid')
  }
  return (
    <StyleInput className={cls.join(' ')}>
      <label htmlFor={htmlFor}>{props.label}</label>
      <input type={inputType} id={htmlFor}
        value={props.value} onChange={props.onChange} />
      {isInvalid(props)
        && <span>{props.errorMessage || 'Enter the correct value'}</span>}
    </StyleInput>
  )
}