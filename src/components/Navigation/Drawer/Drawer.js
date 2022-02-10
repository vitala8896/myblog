import React from 'react'
import classes from './Drawer.module.scss'
import { NavLink } from 'react-router-dom'
import Backdrop from '../../UI/Backdrop/Backdrop'


const Drawer = props => {
  const clickHandler = () => {
    props.onClose()
  }
  const renderLinks = (links) => {
    return links.map((link, index) => {
      return (
        <div key={index}>
          <li>
          <NavLink
            to={link.to}
            exact={link.exact}
            activeClassName={classes.active}
            onClick={clickHandler}
          >
            {link.label}
          </NavLink>
          </li>
          {index % 2? <hr/>:''}
        </div>
      )
    })
  }
  const cls = [classes.Drawer]
  if (!props.isOpen) {
    cls.push(classes.close)
  }
  const links = [
    { to: '/', label: 'Posts', exact: true },
    { to: '/announcements', label: 'Announcements', exact: true }
  ]
  if (props.isAuthenticated) {
    links.push(
      { to: '/post-creator', label: 'Create a post', exact: false },
      { to: '/announcement-creator', label: 'Create a announcement', exact: false },
      { to: '/logout', label: 'Exit', exact: false })
  } else {
    links.push({ to: '/auth', label: 'Authorization', exact: false })
  }
  return (
    <React.Fragment>  
      <div className={classes.header}></div>
      <nav className={cls.join(' ')}>
        <ul>
          {renderLinks(links)}
        </ul>
      </nav>
      {props.isOpen
        ? <Backdrop onClick={props.onClose} />
        : null
      }
    </React.Fragment>
  )
}

export default Drawer