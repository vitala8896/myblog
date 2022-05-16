import { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import classes from './../../Assets/Styles/Announcements/Announcements.module.scss'
import axios from '../../axios/axios-post'
import person from './../../Assets/Images/person.svg'
import { NavLink } from 'react-router-dom'
import { setDataAnnouncements, setActiveAnnouncement, fetchPostsStart, setDataUsers } from '../../Services/actions/post'
import getDate from '../myHooks/getDate'
import Loader from './../UI/Loader/Loader'

const Announcements = () => {
  const dispatch = useDispatch()
  const { announcements, users, loading, state } = useSelector(state => ({
    announcements: state.post.announcements,
    users: state.post.users,
    loading: state.post.loading,
    state
  }))
  // console.log(state)
  useEffect(async() => {
    await createList()
    await renderList()
  }, [])
  const createList = async () => {
    dispatch(fetchPostsStart())
    try {
      await axios.get('/users').then(response => {
        dispatch(setDataUsers(response.data))
      })
      await axios.get(`/announcements?_sort=id&_order=desc`).then(response => {
      dispatch(setDataAnnouncements(response.data))    
      })      
    } catch (e) {
      console.log(e)
    }
  }
  const renderList = () => {
    return announcements.map((item, key) => {
      let userId = item.userId - 1
      return (
        <div className={classes.item} key={key}>
          <NavLink to={'/announcements/' + item.id} onClick={() => {
            dispatch(setActiveAnnouncement(item.id))
          }} className={classes.link}>
            <div className={classes.item__header} >
              <div className={classes.imgAndName}>
                <img src={person} alt='' />
                <p className={classes.name} >
                  {users[userId].firstname} {users[userId].lastname}
                </p>
              </div>
              <p>{getDate(item.createdAt)}</p>
            </div>
            <p className={classes.title}>{item.title}</p>
            <p className={classes.body}>{item.body.substr(0, 600)}</p>
          </NavLink>
        </div>
      )
    })
  }
  return (
    <div className={classes.Announcements}>
      <h1>Announcements</h1>
      <div className={classes.container}>
        {loading ?<Loader /> : renderList()}
      </div>
    </div>
  )
}
export default Announcements