import { useState } from 'react'
import { useDispatch } from "react-redux"
import classes from './../Assets/Styles/Other/Auth.module.scss'
import { Button } from '../components/UI/Button/Button'
import { Input } from '../components/UI/Input/Input'
import { authLogin, authRegister } from '../Services/API/auth'


const validateEmail = email => {
  return String(email).toLowerCase().match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  )
}
const Auth = () => {
  const dispatch = useDispatch()
  const [state, setState] = useState({
    login: true,
    isFormValid: false,
    formControls: {
      firstname: {
        value: '',
        type: 'firstname',
        label: 'Name',
        errorMessage: 'Please enter a valid name',
        valid: false,
        touched: false,
        validation: {
          required: true,
          minLength: 2
        }
      },
      lastname: {
        value: '',
        type: 'lastname',
        label: 'Surname',
        errorMessage: 'Please enter a valid last name',
        valid: false,
        touched: false,
        validation: {
          required: true,
          minLength: 2
        }
      },
      age: {
        value: '',
        type: 'age',
        label: 'Age',
        errorMessage: 'Enter the correct age',
        valid: false,
        touched: false,
        validation: {
          required: true,
          minLength: 2
        }
      },
      email: {
        value: '',
        type: 'email',
        label: 'Email',
        errorMessage: 'Enter the correct email',
        valid: false,
        touched: false,
        validation: {
          required: true,
          email: true
        }
      },
      password: {
        value: '',
        type: 'password',
        label: 'Password',
        errorMessage: 'Enter the correct password',
        valid: false,
        touched: false,
        validation: {
          required: true,
          minLength: 6
        }
      },
      avatar: {
        value: 'https://s0.tchkcdn.com/i/1/1/80937_1802c6cf_1260804286_avatar_1940.jpg',
        type: 'text',
        label: 'Photo',
        errorMessage: 'Requires a correct photo',
        valid: false,
        touched: false,
        validation: {
          required: true,
          minLength: 6
        }
      }
    }
  })
  const loginHandler = () => {
    dispatch(authLogin(
      state.formControls.email.value,
      state.formControls.password.value,
      true
    ))
  }
  const registerHandler = () => {
    dispatch(authRegister(
      state.formControls.email.value,
      state.formControls.password.value,
      state.formControls.firstname.value,
      state.formControls.lastname.value,
      state.formControls.age.value,
      state.formControls.avatar.value,
      false
    ))
  }
  const submitHandler = e => {
    e.preventDefault()
  }
  const validateControl = (value, validation) => {
    if (!validation) {
      return true
    }
    let isValid = true
    if (validation.required) {
      isValid = value.trim() !== '' && isValid
    }
    if (validation.email) {
      isValid = validateEmail(value) && isValid
    }
    if (validation.minLength) {
      isValid = value.length >= validation.minLength && isValid
    }
    return isValid
  }
  const onChangeHandler = (event, controlName) => {
    const formControls = { ...state.formControls }
    const control = { ...formControls[controlName] }
    control.value = event.target.value
    control.touched = true
    control.valid = validateControl(control.value, control.validation)
    formControls[controlName] = control
    let isFormValid = true
    Object.keys(formControls).forEach(name => {
      isFormValid = formControls[name].valid && isFormValid
    })
    setState(prevState => {
      return {...prevState, formControls, isFormValid}
    })
  }
  const renderInputs = () => {
    return Object.keys(state.formControls).map((controlName, index) => {
      if (state.login) {
        if (controlName === 'firstname'
          || controlName === 'lastname'
          || controlName === 'age'
          || controlName === 'avatar'
        ) return
      }
      const control = state.formControls[controlName]
      return (
        <Input
          key={controlName + index}
          type={control.type}
          value={control.value}
          valid={control.valid}
          touched={control.touched}
          label={control.label}
          shouldValidate={!!control.validation}
          errorMessage={control.errorMessage}
          onChange={event => onChangeHandler(event, controlName)}
        />)
    })
  }
  const changeLogin = () => {
    setState(prevState => { 
      return {...prevState, login : !state.login}
    })
  }
    return (
      <div className={classes.Auth}>
        <div>
          <h1>Authorization</h1>
          <form onSubmit={submitHandler} className={classes.AuthForm}>
            {renderInputs()}
            <div className={classes.btn}>
              {state.login ?
              <Button type="success" onClick={loginHandler} disabled={state.isFormValid}>Log in</Button>
              : <Button type="primary" onClick={registerHandler} disabled={state.isFormValid}>Register
             </Button>
            }
            {state.login ? <a onClick={changeLogin}>go to register</a> : <a onClick={changeLogin}>go to login</a>}
            </div>
          </form>
        </div>
      </div>
    )
}      

export default Auth