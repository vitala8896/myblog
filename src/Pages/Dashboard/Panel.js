import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import classes from './../../Assets/Styles/Other/Panel.module.scss'
import { setPageNum, setPageCount } from '../../Services/actions/page'
import { setDataPosts, setDataUsers} from '../../Services/actions/post'
import axios from '../../axios/axios-post'

const Panel = () => {
  const dispatch = useDispatch()
  const { pageNum, pageSize, pageCount, posts, users } = useSelector(state => ({
    pageNum: state.page.pageNum,
    pageSize: state.page.pageSize,
    pageCount: state.page.pageCount,
    posts: state.post.posts,
    users: state.post.users
  })
  )
  useEffect(() => {  
    users.length === 0 &&
    axios.get('/users').then(response => {
      dispatch(setDataUsers(response.data))
    })
    posts.length === 0 &&
    axios.get('/posts').then(response => {      
      dispatch(setDataPosts(response.data.reverse()))
      const pageCount = Math.ceil(response.data.length / pageSize)
      dispatch(setPageCount(pageCount))
    })     
  }, [])
  let pages = []
  for (let i = 1; i <= pageCount; i++) {
    pages.push(i)
  }
  return (
    <div className={classes.panel}>
      <div className={classes.container}>
        <div className={classes.pagination}>
          {pages.map((num, index) => {
            return <span className={pageNum === num
              ? classes.selectedPage
              : ''} key={index} onClick={() => {
                dispatch(setPageNum(num))
              }}>{num}</span>
          })}
        </div>
      </div>
    </div>
  )
}
export default Panel