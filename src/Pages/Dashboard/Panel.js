import { useDispatch, useSelector } from 'react-redux'
import classes from './../../Assets/Styles/Other/Panel.module.scss'
import { setPageNum } from '../../Services/actions/page'

const Panel = () => {
  const dispatch = useDispatch()
  const { pageNum, pageCount } = useSelector(state => ({
    pageNum: state.page.pageNum,
    pageCount: state.page.pageCount
  }))  
  return (
    <div className={classes.panel}>
      <div className={classes.container}>
        <div className={classes.pagination}>
          { pageCount.map(num => {
            return <span className={pageNum === num
              ? classes.selectedPage
              : ''} key={num} onClick={() => {
                dispatch(setPageNum(num))
              }}>{num}</span>
          })}
        </div>
      </div>
    </div>
  )
}
export default Panel