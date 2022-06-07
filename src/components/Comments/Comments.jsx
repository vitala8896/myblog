import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import person from './../../Assets/Images/person.svg'
import CommentCreator from './Creator'
import { finishDeleteComment } from '../../Services/API/create'
import { StyleComments, Item, Img, Avatar, Dell } from '../../Assets/Styles/Comments/Comments'
import { getReduxComments } from './../../Services/API/post'

const Comments = () => {
  const dispatch = useDispatch()
  const { comments, activePost } = useSelector(state => ({
    comments: state.post.comments,
    activePost: state.post.posts.activePost
  }))
  useEffect( () => {
    dispatch(getReduxComments(activePost))     
  }, [activePost])
  const renderActiveComments = () => { 
    return comments.map((item, key) => {      
      return (
        <Item key={key}>
          <Img>
            <Avatar src={item.user.avatar? item.user.avatar:person} alt='' />
          </Img>          
          <div>
            {item.userId && item.user.firstname} {item.userId && item.user.lastname} - {item.body}
          </div>
          {item.userId === +localStorage.getItem('userId') && <Dell className="material-icons" onClick={() => { dispatch(finishDeleteComment(item.id, activePost)) }}>delete</Dell>}
        </Item>
      )
    })
  }
  useEffect(() => {
    renderActiveComments()
  }, [])
  return (
    <StyleComments>
      <CommentCreator />
      {renderActiveComments()}
    </StyleComments>
  )
}
export default Comments