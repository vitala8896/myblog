import { useEffect } from 'react'
import classes from './../../Assets/Styles/Comments/Comments.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import person from './../../Assets/Images/person.svg'
import CommentCreator from './Creator'
import { finishDeleteComment } from '../../Services/actions/create'

const Comments = () => {
  const dispatch = useDispatch()
  const { comments, activePost, users } = useSelector(state => ({
    comments: state.post.comments,
    activePost: state.post.activePost,
    users: state.post.users
  }))
  const renderActiveComments = () => {
    let com = []
    comments.forEach(item => {
      if (item.postId === activePost) {
        com.push(item)
      }
    })   
    return com.map((item, key) => {      
      return (
        <div key={key} className={classes.item}>
          <div className={classes.img}>
            <img src={users[item.userId - 1].avatar? users[item.userId - 1].avatar:person} alt='' />
          </div>          
          <div className={classes.text}>
            {item.userId && users[item.userId - 1].firstname} {item.userId && users[item.userId - 1].lastname} - {item.body}
          </div>
          {item.userId === +localStorage.getItem('userId') && <span className={"material-icons " + classes.dell} onClick={() => { dispatch(finishDeleteComment(item.id, activePost)) }}>delete</span>}
        </div>
      )
    })
  }
  useEffect(() => {
    renderActiveComments()
  })
  return (
    <div className={classes.Comments}>
      <CommentCreator />
      {renderActiveComments()}
    </div>
  )
}
export default Comments