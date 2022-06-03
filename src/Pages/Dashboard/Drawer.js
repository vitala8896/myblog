import React from 'react'
import { StyleDrawer, List, StyledNavLink } from './../../Assets/Styles/Other/Drawer'
import { Backdrop } from '../../components/UI/Backdrop/Backdrop'


const Drawer = props => {
  const clickHandler = () => {
    props.onClose()
  }
  const renderLinks = links => {
    return links.map((link, index) => {
      return (
        <div key={index}>
          <StyledNavLink
            to={link.to}
            exact={link.exact}
            activeClassName={StyleDrawer.active}
            onClick={clickHandler}
          >
            {link.label}
          </StyledNavLink>
          {index % 2? <hr/>:''}
        </div>
      )
    })
  }
  const cls = ['Drawer']
  if (!props.isOpen) {
    cls.push('close')
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
    <div>  
      <StyleDrawer className={cls.join(' ')}>
        <List>
          {renderLinks(links)}
        </List>
      </StyleDrawer>
      {props.isOpen && <Backdrop onClick={props.onClose} />}
    </div>
  )
}

export default Drawer