import React, { Component } from 'react'
import { Route, Switch, Redirect, withRouter
} from 'react-router-dom'
import classes from './App.module.scss'
import Home from './components/Page/Home/Home'
import Layout from './components/Page/hoc/Layout/Layout'
import { connect } from 'react-redux'
import Logout from './components/Logout/Logout'
import { autoLogin } from './store/actions/auth'
import Header from './components/Header/Header'
import ActivePost from './components/Posts/Active'
import Edit from './components/Posts/Edit'
import Announcements from './components/Announcements/Announcements'
import Auth from './components/Page/Auth/Auth'
import PostCreator from './components/Posts/Creator'
import ActiveAnnouncement from './components/Announcements/Active'
import AnnouncementCreator from './components/Announcements/Creator'
import EditAnnouncement from './components/Announcements/Edit'


class App extends Component {
  componentDidMount() {
    this.props.autoLogin()
  }
  render() {
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
    if (this.props.isAuthenticated) {
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
}
function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.auth.token,
    state
  }
}
function mapDispatchToProps(dispatch) {
  return {
    autoLogin: () => dispatch(autoLogin())
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))