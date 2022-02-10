import { useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import classes from './Edit.module.scss'
import { NavLink, useHistory } from 'react-router-dom'
import { setPageNum } from '../../store/actions/page'
import { createAnnouncement, finishUpdateAnnouncement } from './../../store/actions/create'

const EditAnnouncement = () => {
  const dispatch = useDispatch()
  
  let history = useHistory()
  const { index, users, announcements } =
    useSelector(state => ({
      index: state.post.activeAnnouncement - 1,
      announcements: state.post.announcements,
      users: state.post.users
    }))
  const [title, setTitle] = useState(announcements[index].title)
  const [body, setBody] = useState(announcements[index].body)
  const isAuth = () => {
    return users[announcements[index].userId - 1].id === +localStorage.getItem('userId')
  }
  const titleHandle = e => {
    let val = e.target.value
    setTitle(val)
  }
  const bodyHandle = e => {
    let val = e.target.value
    setBody(val)
  }
  const getItem = () => {
    let announcementItem = {
      title, body,
      userId: +localStorage.getItem('userId'),
      createdAt: new Date().toISOString(),
      updatedAt: new Date(new Date().getTime() + (2 * 365 * 3600 * 24 * 1000)).toISOString()
    }
    dispatch(createAnnouncement(announcementItem))
  }
  return (
    <div className={classes.editAnnouncement}>
      <div className={classes.container}>
        <div className={classes.header}>
          <NavLink to={'/'} onClick={() => {
            dispatch(setPageNum(1))
          }} className={classes.link}>
            <p className={classes.name}>{users[announcements[index].userId - 1].firstname} {users[announcements[index].userId - 1].lastname}</p>
          </NavLink>
          {isAuth() &&
            <span className="material-icons" onClick={() => {
            getItem()
            dispatch(finishUpdateAnnouncement(announcements[index].id))
            history.push('/')
            }}>done_all</span>
          }
        </div>
        <h1><input value={title} onChange={e => { titleHandle(e) }}/></h1>
        <textarea className={classes.body} value={body} onChange={e => { bodyHandle(e) }}/>
      </div>
    </div>
  )
}
export default EditAnnouncement