import { useEffect } from 'react'
import classes from './Panel.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { setPageNum, setPageCount } from './../../store/actions/page'
import { setDataPosts } from '../../store/actions/post'
import axios from './../../axios/axios-post'

const Panel = () => {
  const dispatch = useDispatch()
  const { pageNum, pageSize, pageCount, state } = useSelector(state => ({
    pageNum: state.page.pageNum,
    pageSize: state.page.pageSize,
    pageCount: state.page.pageCount,
    state
  })
  )
  useEffect(() => {
    axios.get('/posts').then(response => {
      dispatch(setDataPosts(response.data))
      const pageCount = Math.ceil(response.data.length / pageSize)
      dispatch(setPageCount(pageCount))
    })
  }, [pageNum])
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
              : null} key={index} onClick={() => {
                dispatch(setPageNum(num))
              }}>{num}</span>
          })}
        </div>
      </div>
    </div>
  )
}
export default Panel