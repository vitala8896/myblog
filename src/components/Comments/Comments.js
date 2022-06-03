import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import person from './../../Assets/Images/person.svg'
import CommentCreator from './Creator'
import axios from '../../axios/axios-post'
import { finishDeleteComment } from '../../Services/API/create'
import { setReduxComments } from '../../store/postSlice'
import { StyleComments, Item, Img, Avatar, Dell } from '../../Assets/Styles/Comments/Comments'

const Comments = () => {
  const dispatch = useDispatch()
  const { comments, activePost, users } = useSelector(state => ({
    comments: state.post.comments,
    activePost: state.post.posts.activePost,
    users: state.user.users
  }))
  useEffect(async () => {
    await axios.get(`/comments?postId=${activePost}&_sort=createdAt&_order=desc`).then(response => {
      dispatch(setReduxComments(response.data))
    })      
  }, [activePost])
  const renderActiveComments = () => { 
    return comments.map((item, key) => {      
      return (
        <Item key={key}>
          <Img>
            <Avatar src={users[item.userId - 1].avatar? users[item.userId - 1].avatar:person} alt='' />
          </Img>          
          <div>
            {item.userId && users[item.userId - 1].firstname} {item.userId && users[item.userId - 1].lastname} - {item.body}
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