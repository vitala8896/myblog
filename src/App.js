import { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { Route, Switch, Redirect, withRouter
} from 'react-router-dom'
import './../src/Assets/Styles/App.module.scss'
import Home from './Pages/Home'
import Layout from './Pages/Layout'
import Logout from './components/Logout/Logout'
import Header from './Layouts/Header/Header'
import ActivePost from './components/Posts/Active'
import Edit from './components/Posts/Edit'
import Announcements from './components/Announcements/Announcements'
import Auth from './Pages/Auth'
import PostCreator from './components/Posts/Creator'
import ActiveAnnouncement from './components/Announcements/Active'
import AnnouncementCreator from './components/Announcements/Creator'
import EditAnnouncement from './components/Announcements/Edit'
import { autoLogin } from './store/authSlice'


const App = () => {
  const dispatch = useDispatch()
  const { isAuthenticated } = useSelector(state => ({
    isAuthenticated: !!state.auth.token
  }))  
  useEffect(() => {
    autoLogin()
    dispatch(autoLogin())
  }, [])
    let routes = (
      <Switch>
        <Route path="/posts/:postId" component={ActivePost} />
        <Route path="/" exact component={Home} />
        <Route path="/announcements/:announcementId" component={ActiveAnnouncement} />
        <Route path="/announcements" exact component={Announcements} />
        <Route path="/auth" component={Auth}/>
        <Redirect to="/" />
      </Switch>
    )
    if (isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/post-creator" component={PostCreator} />
          <Route path="/announcement-creator" component={AnnouncementCreator} />
          <Route path="/posts/:postId/edit" component={Edit} />
          <Route path="/announcements/:announcementId/edit" component={EditAnnouncement} />
          <Route path="/posts/:postId" component={ActivePost} />
          <Route path="/announcements/:announcementId" component={ActiveAnnouncement} />
          <Route path="/announcements" exact component={Announcements} />
          <Route path="/" exact component={Home} />
          <Route path="/logout" component={Logout} />
          <Redirect to="/" />
        </Switch>
      )
    }
    return (
      <Layout>
        <Header/>
        {routes}
      </Layout>      
    )
}
export default withRouter(App)