import { useState } from 'react'
import classes from './../../Assets/Styles/Comments/Creator.module.scss'
import person from './../../Assets/Images/person.svg'
import { useSelector, useDispatch } from 'react-redux'
import { createComment, finishCreateComment } from './../../Services/actions/create'

const CommentCreator = () => {
  const dispatch = useDispatch()
  const [value, setValue] = useState('')
  const { activePost, users } = useSelector(state => ({
    activePost: state.post.activePost,
    users: state.post.users
  }))
  const onChangeHandler = e => {
    setValue(e.target.value)
    const item = {
      postId: activePost,
      body: e.target.value,
      userId: +localStorage.getItem('userId'),
      createdAt: new Date().toISOString(),
      updatedAt: new Date(new Date().getTime() + (2 * 365 * 3600 * 24 * 1000)).toISOString()
    }
    dispatch(createComment(item))
  }
  const userId = () => {
    let userId = +localStorage.getItem('userId') - 1
    return userId
  }
  return (
    <>
      {localStorage.getItem('userId') &&
        <div className={classes.Creator}>
          <div className={classes.header}>
            <img src={ userId() ? users[userId()].avatar : person} alt='' />
            <p>{users[userId()].firstname} {users[userId()].lastname + ' - '}</p>
          </div>
          <input
            value={value}
            placeholder={'Enter your comment'}
            onChange={e => onChangeHandler(e)}
            className={classes.input} />
          <span onClick={() => {
            dispatch(finishCreateComment(activePost))
            setValue('')
          }
          } className="material-icons">add</span>
        </div>
      }
    </>

  )
}
export default CommentCreator