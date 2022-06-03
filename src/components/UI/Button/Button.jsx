import { StyleButton  } from './../../../Assets/Styles/Other/Button'

export const Button = props => {  
  return (    
    <StyleButton
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </StyleButton>
  )
}