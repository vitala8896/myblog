import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import classes from './../../Assets/Styles/Announcements/Edit.module.scss'
import { NavLink, useHistory } from 'react-router-dom'
import { setPageNum } from '../../Services/actions/page'
import { createAnnouncement, finishUpdateAnnouncement, finishDeleteAnnouncement, finishUpdatePost } from './../../Services/actions/create'

const EditAnnouncement = () => {
  const dispatch = useDispatch()
  let history = useHistory()
  const { users, activeAnnouncement, activeAnnouncementItem } =
    useSelector(state => ({
      activeAnnouncement: state.post.activeAnnouncement,
      activeAnnouncementItem: state.post.activeAnnouncementItem,
      users: state.post.users
    }))
    const [title, setTitle] = useState(activeAnnouncementItem.title)
    const [body, setBody] = useState(activeAnnouncementItem.body)  

    const dellAnnouncement = () => {
      dispatch(finishDeleteAnnouncement(activeAnnouncementItem.id))
      return history.push('/announcements')
    }
    const isAuth = () => {
      return activeAnnouncementItem.userId === +localStorage.getItem('userId')
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
      <div className={classes.editPost}>
        <div className={classes.container}>
          <div className={classes.header}>
            <NavLink to={'/announcements'} className={classes.link}>
              <p className={classes.name}>{activeAnnouncementItem.userId.firstname} {activeAnnouncementItem.userId.lastname}</p>
            </NavLink>
            {isAuth() &&
              <span className="material-icons" onClick={() => {
              getItem()
              dispatch(finishUpdateAnnouncement(activeAnnouncementItem.id))
              history.push('/announcements')
              }}>done_all</span>
            }
          </div>
          <h1><input value={title} onChange={e => { titleHandle(e) }}/></h1>
          <textarea className={classes.body} value={body} onChange={e => { bodyHandle(e) }}/>
          {isAuth() &&
            <div className={classes.dell}>
              <span className={"material-icons"} onClick={() => dellAnnouncement()}>delete</span>
            </div>
          }
        </div>
      </div>
    )
}
export default EditAnnouncement