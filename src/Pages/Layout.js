import { useState } from 'react'
import { useSelector } from 'react-redux'
import classes from './../Assets/Styles/Other/Layout.module.scss'
import MenuToggle from './Dashboard/MenuToggle'
import Drawer from './Dashboard/Drawer'

export const Layout = props => {
  const [state, setState] = useState({
    menu: false
  })
  const { isAuthenticated } = useSelector(
    (state) => ({
      isAuthenticated: !!state.auth.token
    })
  )
  const toggleMenuHandler = () => {
    setState({
      menu: !state.menu
    })
  } 
  const menuCloseHandler = () => {
    setState({
      menu: false
    })
  }
  return (
    <div className={classes.Layout}>        
      <Drawer
        isOpen={state.menu}
        onClose={menuCloseHandler}
        isAuthenticated={isAuthenticated}
      />
      <MenuToggle
        onToggle={toggleMenuHandler}
        isOpen={state.menu}
      />
      <main>
        {props.children}
      </main>
    </div>
  )
}  

export default Layout