import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { finishCreateComment } from '../../Services/API/create'
import { createComment } from '../../store/createSlice'
import { Creator, Input, Add } from '../../Assets/Styles/Comments/Creator'

const CommentCreator = () => {
  const dispatch = useDispatch()
  const [value, setValue] = useState('')
  const { activePost } = useSelector(state => ({
    activePost: state.post.posts.activePost
  }))
  const onChangeHandler = e => {
    setValue(e.target.value)
    const timeToUpdate = 2 * 365 * 3600 * 24 * 1000    
    const item = {
      postId: activePost,
      body: e.target.value,
      userId: +localStorage.getItem('userId'),
      createdAt: new Date().toISOString(),
      updatedAt: new Date(new Date().getTime() + timeToUpdate).toISOString()
    }
    dispatch(createComment(item))
  }
  return (
    <>
      {localStorage.getItem('userId') &&
        <Creator>
          <Input
            value={value}
            placeholder='Enter your comment'
            onChange={e => onChangeHandler(e)}
          />
          <Add onClick={() => {
            dispatch(finishCreateComment(activePost))
            setValue('')
          }
          } className="material-icons">add</Add>
        </Creator>
      }
    </>
  )
}
export default CommentCreator