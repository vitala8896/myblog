import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import classes from './../../Assets/Styles/Posts/Posts.module.scss'
import { setList, setPageCount } from '../../Services/actions/page'
import {
  setActivePost,
  setDataPosts,
  setDataUsers,
} from '../../Services/actions/post'
import person from './../../Assets/Images/person.svg'
import { NavLink } from 'react-router-dom'
import getDate from '../myHooks/getDate'
import Loader from './../UI/Loader/Loader'
import axios from '../../axios/axios-post'
import { logout } from '../../Services/actions/auth'

const Posts = () => {
  const dispatch = useDispatch()
  const { posts, users, list, loading, pageNum, pageSize } = useSelector(state => ({
    list: state.post.list,
    loading: state.post.loading,
    pageNum: state.page.pageNum,
    pageSize: state.page.pageSize,
    posts: state.post.posts,
    users: state.post.users
  }))
  useEffect(async () => {
    await axios.get(`/posts?_page=${pageNum}&_limit=${pageSize}&_sort=id&_order=desc`)
    .then((response) => {
      dispatch(setDataPosts(response.data))
      let pages = Math.ceil(response.headers['x-total-count'] / pageSize)
      let pagesArray = []
      for (let i = 1; i <= pages; i++) {
        pagesArray.push(i);
      }
      dispatch(setPageCount(pagesArray))
    })      
    await axios.get('/users').then(response => {
      dispatch(setDataUsers(response.data))
    })
  }, [pageNum])  
  
  useEffect(() => {
    if (posts?.length && users?.length) {
      const list = posts.map(item => {
        let ind = item.userId - 1
        return {
          id: item.id,
          name: users[ind].firstname,
          surname: users[ind].lastname,
          avatar: users[ind].avatar,
          title: item.title,
          body: item.body,
          create: item.createdAt,
        }
      })
      dispatch(setList(list))
    }
  }, [posts, users])
 
  const renderList = () => {
    return list.map(item => {
      return (
        <div className={classes.item} key={item.id}>
          <NavLink
            to={'/posts/' + item.id}
            onClick={() => {
              dispatch(setActivePost(item.id));
            }}
            className={classes.link}
          >
            <div className={classes.item__header}>
              <div className={classes.imgAndName}>
                <div className={classes.img}>
                  <img src={item.avatar ? item.avatar : person} alt='' />
                </div>
                <p className={classes.name}>
                  {item.name} {item.surname}
                </p>
              </div>
              <p className={classes.date}>{getDate(item.create)}</p>
            </div>
            <p className={classes.title}>{item.title}</p>
            <p className={classes.body}>
              {item.body.substr(0, 230) + (item.body.length > 230 ? '...' : '')}
            </p>
          </NavLink>
        </div>
      )
    })
  }
  return (
    <div>
      <div className={classes.list}>
        <h1>Posts</h1>
        <div className={classes.container}>
          {loading ? <Loader /> : renderList()}
        </div>
      </div>
    </div>
  )
}
export default Posts