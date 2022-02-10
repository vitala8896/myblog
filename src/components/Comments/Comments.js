import { useEffect } from 'react'
import classes from './Comments.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import person from './../UI/img/person.svg'
import CommentCreator from './Creator'
import { finishDeleteComment } from '../../store/actions/create'
import { setDataComments } from '../../store/actions/post'
import axios from './../../axios/axios-post'

const Comments = () => {
  const dispatch = useDispatch()
  const { comments, activePost, posts, users } = useSelector(state => ({
    comments: state.post.comments,
    activePost: state.post.activePost,
    posts: state.post.posts,
    users: state.post.users
  }))
  const renderActiveComments = () => {
    let com = []
    comments.forEach(item => {
      if (item.postId === posts[activePost - 1].id) {
        com.push(item)
      }
    })   
    return com.map((item, key) => {
      return (
        <div key={key} className={classes.item}>
          <img src={person} alt='' />
          <div>
            {users[item.userId - 1].firstname} {users[item.userId - 1].lastname} - {item.body}
          </div>
          {item.userId === +localStorage.getItem('userId') && <span className={"material-icons " + classes.dell} onClick={() => { dispatch(finishDeleteComment(item.id, activePost)) }}>delete</span>}
        </div>
      )
    })
  }
  useEffect(() => {
    renderActiveComments()
  }, [])
  return (
    <div className={classes.Comments}>
      <CommentCreator />
      {renderActiveComments()}
    </div>
  )
}
export default Comments