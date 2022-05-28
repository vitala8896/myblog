import { useSelector, useDispatch } from 'react-redux'
import classes from './../../Assets/Styles/Other/Header.module.scss'
import { NavLink } from 'react-router-dom'
import logo from './../../Assets/Images/blog-logo.png'
import { getReduxPosts } from '../../Services/API/post'
import { setReduxPageNum } from '../../store/pageSlice'

const Header = () => {
  const dispatch = useDispatch()
  const { avatar, token, pageNum, pageSize } = useSelector(state => ({
    avatar: state.page.avatarURL,
    token: state.auth.token,
    pageNum: state.page.pageNum,
    pageSize: state.page.pageSize
  }))
  const goToStartPage = () => {
    dispatch(setReduxPageNum(1))
    getReduxPosts(pageNum, pageSize)
  }
  return (
    <div className={classes.header}>
      <div className={classes.container}>
        <NavLink to='/'><img src={logo} className={classes.appLogo} alt="logo" onClick={goToStartPage} /></NavLink>
        <ul className={classes.menu}>
          <li><NavLink to='/' onClick={
            goToStartPage
          }
            >Posts</NavLink>
          </li>
          <li><NavLink to='/announcements'
          >Announcements</NavLink>
          </li>
        </ul>
        {token &&
          <NavLink to='/'><img src={avatar} className={classes.avatar} alt="logo" onClick={goToStartPage} />
          </NavLink>}
      </div>
    </div>
  )
}
export default Header
