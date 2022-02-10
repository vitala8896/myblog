import classes from './Header.module.scss'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setPageNum } from './../../store/actions/page'
import logo from './../UI/img/blog-logo.png'
import { getList } from './../../store/actions/post'

const Header = () => {
  const dispatch = useDispatch()
  const { avatar, token } = useSelector(state => ({
    avatar: state.page.avatarURL,
    token: state.auth.token
  }))
  const goToStartPage = () => {
    dispatch(setPageNum(1))
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
        {token ?
          <NavLink to='/'><img src={avatar} className={classes.avatar} alt="logo" onClick={goToStartPage} />
          </NavLink> : null
        }
      </div>
    </div>
  )
}
export default Header
