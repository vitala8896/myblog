import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import axios from '../../axios/axios-post'
import { finishDeleteAnnouncement } from '../../Services/API/create'
import { setReduxActiveAnnouncement, setReduxActiveAnnouncementItem } from '../../store/postSlice'
import { setReduxUsers } from '../../store/userSlice'
import { Active, Container, H1, Icon, Header, Body, Name, Dell, StyledNavLink } from '../../Assets/Styles/Announcements/Active'

const ActiveAnnouncement = () => {
  const dispatch = useDispatch()
  let history = useHistory()
  const { activeAnnouncement, activeAnnouncementItem, users, state } =
  useSelector(state => ({
    activeAnnouncement: state.post.announcements.activeAnnouncement,
    activeAnnouncementItem: state.post.announcements.activeAnnouncementItem,
    users: state.user.users,
    state
  }))
  // console.log(state) 
  useEffect( async () => {    
    const setURL = () => {
      let numURL = +history.location.pathname.replace('/announcements/', '')
      dispatch(setReduxActiveAnnouncement(numURL))
      return numURL
    } 
    let thisURL = activeAnnouncement === 0? setURL() : activeAnnouncement  
    try {
      await axios.get('/users').then(response => {
        dispatch(setReduxUsers(response.data))
      })
      await axios.get(`/announcements/${thisURL}`).then(response => {
        dispatch(setReduxActiveAnnouncement(response.data.id))
        dispatch(setReduxActiveAnnouncementItem(response.data))
      }) 
    } catch (e) {
      console.log(e)
    }
  }, [])    
  const dellAnnouncement = () => {    
    dispatch(finishDeleteAnnouncement(activeAnnouncement))
    return history.push('/announcements')
  }
  const isAuth = () => {
    return activeAnnouncementItem.userId === +localStorage.getItem('userId')
  }  
  const render = () => {
    if (activeAnnouncementItem.id && users?.length) {
      return  <Container>
        <Header>
          <StyledNavLink to={'/announcements'}>
            <Name> 
            {users[activeAnnouncementItem.userId-1].firstname} {users[activeAnnouncementItem.userId-1].lastname}</Name>
          </StyledNavLink>
          {isAuth() &&
            <Icon className="material-icons" onClick={() => { history.push(`/announcements/${activeAnnouncement}/edit`) }}>edit</Icon>
          }
        </Header>
        <H1>{activeAnnouncementItem.title}</H1>
        <Body>{activeAnnouncementItem.body}</Body>
        {isAuth() &&
          <Dell>
            <Icon className={"material-icons"} onClick={() => dellAnnouncement()}>delete</Icon>
          </Dell>
        }
      </Container>
    }    
  }
  return (
    <Active>
      {render()}
    </Active>
  )
}
export default ActiveAnnouncement