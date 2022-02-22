import classes from './../../../Assets/Styles/Other/Button.module.scss'

export const Button = props => {  
  const cls = [
    classes.Button,
    classes[props.type]
  ]
  return (    
    <button
      onClick={props.onClick}
      className={cls.join(' ')}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  )
}