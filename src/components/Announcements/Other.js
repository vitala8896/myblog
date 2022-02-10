import { useEffect } from 'react'
import classes from './Other.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { setActiveAnnouncement } from '../../store/actions/post'

const OtherAnnouncements = () => {
  const dispatch = useDispatch()
  const { otherAnnouncements } =
    useSelector(state => ({
      otherAnnouncements: state.post.otherAnnouncements
    }))
  useEffect(() => {
    renderOtherAnnouncements()
  })
  const renderOtherAnnouncements = () => {
    return otherAnnouncements.map((item, key) => {
      return <NavLink to={'/announcements/' + (item.key+1)} onClick={() => {
        dispatch(setActiveAnnouncement(item.key+1))
      }} className={classes.otherAnnouncements} key={key}>
        <p className={classes.name}>{item.name} {item.surname}</p>
        <h5>{item.title}</h5>
      </NavLink>
    })
  }
  return (
    <div className={classes.otherWrapper}>
      {renderOtherAnnouncements()}
    </div>
  )
}
export default OtherAnnouncements