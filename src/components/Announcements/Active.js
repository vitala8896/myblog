import { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import classes from './../../Assets/Styles/Announcements/Active.module.scss'
import { NavLink, useHistory } from 'react-router-dom'
import { setActiveAnnouncement, setDataUsers, setActiveAnnouncementItem } from '../../Services/actions/post'
import { finishDeleteAnnouncement } from '../../Services/actions/create'
import axios from '../../axios/axios-post'

const ActiveAnnouncement = () => {
  const dispatch = useDispatch()
  let history = useHistory()
  const { activeAnnouncement, activeAnnouncementItem, users } =
  useSelector(state => ({
    activeAnnouncement: state.post.activeAnnouncement,
    activeAnnouncementItem: state.post.activeAnnouncementItem,
    users: state.post.users
  }))
  useEffect( async () => {    
    const setURL = () => {
      let numURL = +history.location.pathname.replace('/announcements/', '')
      dispatch(setActiveAnnouncement(numURL))
      return numURL
    } 
    let thisURL = activeAnnouncement === 0? setURL() : activeAnnouncement  
    try {
      await axios.get('/users').then(response => {
        dispatch(setDataUsers(response.data))
      })
      await axios.get(`/announcements/${thisURL}`).then(response => {
        dispatch(setActiveAnnouncement(response.data.id))
        dispatch(setActiveAnnouncementItem(response.data))
      }) 
    } catch (e) {
      console.log(e)
    }
  }, [])    
  const dellAnnouncement = () => {    
    dispatch(finishDeleteAnnouncement(activeAnnouncement))
    return history.push('/announcements')
  }
  const isAuth = () => {
    return activeAnnouncementItem.userId === +localStorage.getItem('userId')
  }  
  const render = () => {
    if (activeAnnouncementItem.id && users?.length) {
      return  <div className={classes.container}>
        <div className={classes.header}>
          <NavLink to={'/announcements'}  className={classes.link}>
            <p className={classes.name}> 
            {users[activeAnnouncementItem.userId-1].firstname} {users[activeAnnouncementItem.userId-1].lastname}</p>
          </NavLink>
          {isAuth() &&
            <span className="material-icons" onClick={() => { history.push(`/announcements/${activeAnnouncement}/edit`) }}>edit</span>
          }
        </div>
        <h1>{activeAnnouncementItem.title}</h1>
        <p className={classes.body}>{activeAnnouncementItem.body}</p>
        {isAuth() &&
          <div className={classes.dell}>
            <span className={"material-icons"} onClick={() => dellAnnouncement()}>delete</span>
          </div>
        }
      </div>
    }    
  }
  return (
    <div className={classes.activePost}>
      {render()}
    </div>
  )
}
export default ActiveAnnouncement