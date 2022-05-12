import { useState } from 'react'
import { useDispatch } from 'react-redux'
import classes from './../../Assets/Styles/Posts/Creator.module.scss'
import { createControl, validate, validateForm } from '../UI/form/formFramework'
import { createPost, finishCreatePost } from '../../Services/actions/create'
import Button from '../UI/Button/Button'
import Input from '../UI/Input/Input'
import Textarea from '../UI/Textarea/Textarea'
import Auxiliary from '../../Pages/Auxiliary'



const createFormControl = () => {
  return {
    postName: createControl({
      label: 'Post title',
      errorMessage: 'The field cannot be empty',
      validation: {
        required: true,
        minLength: 6
      }
    }, { required: true }),
    description: createOptionControl(1)
  }
}
const createOptionControl = number => {
  return createControl({
    label: 'Description',
    errorMessage: 'The field cannot be empty',
    id: number,
    validation: {
      required: true,
      minLength: 6
    }
  }, { required: true })
}
const PostCreator = () => {
  const dispatch = useDispatch()
  const [state, setState] = useState({
    isFormValid: false,
    formControls: createFormControl()
  })  
  const submitHandler = e => {
    e.preventDefault()
  }
  const createPostHandler = e => {
    e.preventDefault()
    const { postName, description } = state.formControls
    const postItem = {
      title: postName.value,
      body: description.value,
      userId: +localStorage.getItem('userId'),
      createdAt: new Date().toISOString(),
      updatedAt: new Date(new Date().getTime() + (2 * 365 * 3600 * 24 * 1000)).toISOString()
    }
    dispatch(createPost(postItem))
    setState(prevState => {
      return {...prevState, isFormValid: !postItem.title,
      formControls: createFormControl()
    }})
    dispatch(finishCreatePost())
  }
  const changeHandler = (value, controlName) => {
    const formControls = { ...state.formControls }
    const control = { ...formControls[controlName] }
    control.touched = true
    control.value = value
    control.valid = validate(control.value, control.validation)
    formControls[controlName] = control
    setState(prevState => {
      return {...prevState, formControls,
      isFormValid: validateForm(formControls)
    }})
  }
  const renderControls = () => {
    return Object.keys(state.formControls).map(
      (controlName, index) => {
        const control = state.formControls[controlName]
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
                onChange={e => changeHandler(e.target.value, controlName)}
              /> :
              <Textarea
                label={control.label}
                value={control.value}
                valid={control.valid}
                shouldValidate={!!control.validation}
                touched={control.touched}
                errorMessage={control.errorMessage}
                onChange={e => changeHandler(e.target.value, controlName)}
              />
            }
          </Auxiliary>
        )
      })
  }
  return (      
    <div className={classes.Creator}>
        <h1>Create a post</h1>
        <form onSubmit={submitHandler} className={classes.form}>
          {renderControls()}
          <Button type="success" onClick={createPostHandler
          } disabled={!state.isFormValid}>Create a post</Button>
      </form>
    </div>
  )
}



export default PostCreator