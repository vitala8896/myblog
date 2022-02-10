import React, { Component } from 'react'
import classes from './Auth.module.scss'
import { connect } from 'react-redux'
import Button from './../../../components/UI/Button/Button'
import Input from './../../../components/UI/Input/Input'
import { authLogin, authRegister } from './../../../store/actions/auth'

const validateEmail = email => {
  return String(email).toLowerCase().match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  )
}
class Auth extends Component {
  state = {
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
  }
  loginHandler = () => {
    this.props.authLogin(
      this.state.formControls.email.value,
      this.state.formControls.password.value,
      true
    )
  }
  registerHandler = () => {
    this.props.authRegister(
      this.state.formControls.email.value,
      this.state.formControls.password.value,
      this.state.formControls.firstname.value,
      this.state.formControls.lastname.value,
      +this.state.formControls.age.value,
      this.state.formControls.avatar.value,
      false
    )
  }
  submitHandler = e => {
    e.preventDefault()
  }
  validateControl(value, validation) {
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
  onChangeHandler = (event, controlName) => {
    const formControls = { ...this.state.formControls }
    const control = { ...formControls[controlName] }
    control.value = event.target.value
    control.touched = true
    control.valid = this.validateControl(control.value, control.validation)
    formControls[controlName] = control
    let isFormValid = true
    Object.keys(formControls).forEach(name => {
      isFormValid = formControls[name].valid && isFormValid
    })
    this.setState({
      formControls, isFormValid
    })
  }
  renderInputs() {
    return Object.keys(this.state.formControls).map((controlName, index) => {
      if (this.state.login) {
        if (controlName === 'firstname'
          || controlName === 'lastname'
          || controlName === 'age'
          || controlName === 'avatar'
        ) return
      }
      const control = this.state.formControls[controlName]
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
          onChange={event => this.onChangeHandler(event, controlName)}
        />)
    })
  }
  changeLogin = () => {
    this.setState({ login : !this.state.login})
  }
  render() {
    return (
      <div className={classes.Auth}>
        <div>
          <h1>Authorization</h1>
          <form onSubmit={this.submitHandler} className={classes.AuthForm}>
            {this.renderInputs()}
            <div className={classes.btn}>
              {this.state.login ?
              <Button type="success" onClick={this.loginHandler} disabled={!this.state.isFormValid}>Log in</Button>
              : <Button type="primary" onClick={this.registerHandler} disabled={!this.state.isFormValid}>Register
             </Button>
            }
            {this.state.login ? <a onClick={this.changeLogin}>go to register</a> : <a onClick={this.changeLogin}>go to login</a>}
            </div>
          </form>
        </div>
      </div>
    )
  }
}
function mapDispatchToProps(dispatch) {
  return {
    authLogin: (email, password, isLogin) => dispatch(authLogin(email, password, isLogin)),
    authRegister: (email, password, firstname,
      lastname, age, avatar, isLogin) =>
      dispatch(authRegister(email, password, firstname, lastname, age, avatar, isLogin)),
  }
}
export default connect(null, mapDispatchToProps)(Auth)