import React, { Component } from 'react'
import classes from './Creator.module.scss'
import { createControl, validate, validateForm } from '../UI/form/formFramework'
import { connect } from 'react-redux'
import { createPost, finishCreatePost } from '../../store/actions/create'
import Button from '../UI/Button/Button'
import Input from '../UI/Input/Input'
import Textarea from '../UI/Textarea/Textarea'
import Auxiliary from '../Page/hoc/Auxiliary/Auxiliary'


function createFormControl() {
  return {
    postName: createControl({
      label: 'Post title',
      errorMessage: 'The field cannot be empty'
    }, { required: true }),
    description: createOptionControl(1)
  }
}
function createOptionControl(number) {
  return createControl({
    label: 'Description',
    errorMessage: 'The field cannot be empty',
    id: number
  }, { required: true })
}
class PostCreator extends Component {
  state = {
    isFormValid: false,
    formControls: createFormControl()
  }
  submitHandler = event => {
    event.preventDefault()
  }
  createPostHandler = event => {
    event.preventDefault()
    const { postName, description } = this.state.formControls
    const postItem = {
      title: postName.value,
      body: description.value,
      userId: +localStorage.getItem('userId'),
      createdAt: new Date().toISOString(),
      updatedAt: new Date(new Date().getTime() + (2 * 365 * 3600 * 24 * 1000)).toISOString()
    }
    this.props.createPost(postItem)
    this.setState({
      isFormValid: !postItem.title,
      formControls: createFormControl()
    })
    this.props.finishCreatePost()
  }
  changeHandler = (value, controlName) => {
    const formControls = { ...this.state.formControls }
    const control = { ...formControls[controlName] }
    control.touched = true
    control.value = value
    control.valid = validate(control.value, control.validation)
    formControls[controlName] = control
    this.setState({
      formControls,
      isFormValid: validateForm(formControls)
    })
  }
  renderControls() {
    return Object.keys(this.state.formControls).map(
      (controlName, index) => {
        const control = this.state.formControls[controlName]
        return (
          <Auxiliary key={controlName + index}>
            {controlName !== 'description'?
              <Input
                label={control.label}
                value={control.value}
                valid={control.valid}
                shouldValidate={!!control.validation}
                touched={control.touched}
                errorMessage={control.errorMessage}
                onChange={event => this.changeHandler(event.target.value, controlName)}
              /> :
              <Textarea
                label={control.label}
                value={control.value}
                valid={control.valid}
                shouldValidate={!!control.validation}
                touched={control.touched}
                errorMessage={control.errorMessage}
                onChange={event => this.changeHandler(event.target.value, controlName)}
              />
            }
          </Auxiliary>
        )
      })
  }
  render() {
    return (      
      <div className={classes.Creator}>
          <h1>Create a post</h1>
          <form onSubmit={this.submitHandler} className={classes.form}>
            {this.renderControls()}
            <Button type="success" onClick={this.createPostHandler} disabled={this.props.post.length === 0}>Create a post</Button>
        </form>
      </div>
    )
  }
}
function mapStateToProps(state) {
  return {
    post: state.create.post
  }
}
function mapDispatchToProps(dispatch) {
  return {
    createPost: item => dispatch(createPost(item)),
    finishCreatePost: () => dispatch(finishCreatePost())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(PostCreator)