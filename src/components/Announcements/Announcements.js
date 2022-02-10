import { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import classes from './Announcements.module.scss'
import axios from '../../axios/axios-post'
import person from './../UI/img/person.svg'
import { NavLink } from 'react-router-dom'
import { setDataAnnouncements, setActiveAnnouncement, fetchPostsStart } from '../../store/actions/post'
import getDate from '../myHooks/getDate'
import Loader from './../UI/Loader/Loader'
import { getDataUsers } from './../../store/actions/post'
import Footer from './../Footer/Footer'

const Announcements = () => {
  const dispatch = useDispatch()
  const { announcements, users, loading } = useSelector(state => ({
    announcements: state.post.announcements,
    users: state.post.users,
    loading: state.post.loading
  }))  
  useEffect(() => {
    createList()
    renderList()
  }, [])
  const createList = async () => {
    dispatch(fetchPostsStart())   
    dispatch(getDataUsers())
    try {
      const response = await axios.get('/announcements')
      let arrList = []
      Object.keys(response.data).forEach(key => {
        let item = response.data[key]
        let userId = response.data[key].userId - 1
        arrList.push({
          id: item.id,
          name: users[userId].firstname,
          surname: users[userId].lastname,
          userId: item.userId,
          title: item.title,
          body: item.body,
          create: item.createdAt,
          key: +key
        })
      })
      dispatch(setDataAnnouncements(arrList))
    } catch (e) {
      console.log(e)
    }
  }
  const renderList = () => {
    return announcements.map((item, key) => {
      return (
        <div className={classes.item} key={key}>
          <NavLink to={'/announcements/' + (+item.key+1)} onClick={() => {
            dispatch(setActiveAnnouncement(+item.key+1))
          }} className={classes.link}>
            <div className={classes.item__header} >
              <div className={classes.imgAndName}>
                <img src={person} alt='' />
                <p className={classes.name} >
                  {item.name} {item.surname}
                </p>
              </div>
              <p>{getDate(item.create)}</p>
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
        {loading ? <Loader /> : renderList()}
      </div>
      <Footer />
    </div>
  )
}
export default Announcements