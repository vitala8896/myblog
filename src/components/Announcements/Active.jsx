import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { finishDeleteAnnouncement } from '../../Services/API/create'
import { setReduxActiveAnnouncement } from '../../store/postSlice'
import { Active, Container, H1, Icon, Header, Body, Name, Dell, StyledNavLink } from '../../Assets/Styles/Announcements/Active'
import { getActiveAnnouncement } from './../../Services/API/post'

const ActiveAnnouncement = () => {
  const dispatch = useDispatch()
  let history = useHistory()
  const { activeAnnouncement, activeAnnouncementItem, users } =
  useSelector( state => ({
    activeAnnouncement: state.post.announcements.activeAnnouncement,
    activeAnnouncementItem: state.post.announcements.activeAnnouncementItem
  }))
  useEffect( async () => {    
    const setURL = () => {
      let numURL = +history.location.pathname.replace('/announcements/', '')
      dispatch(setReduxActiveAnnouncement(numURL))
      return numURL
    } 
    let thisURL = activeAnnouncement === 0? setURL() : activeAnnouncement  
    dispatch(getActiveAnnouncement(thisURL))
  }, [])    
  const dellAnnouncement = () => {    
    dispatch(finishDeleteAnnouncement(activeAnnouncement))
    return history.push('/announcements')
  }
  const isAuth = () => {
    return activeAnnouncementItem.userId === +localStorage.getItem('userId')
  }  
  const render = () => {
    if (activeAnnouncementItem.id) {
      return (
        <Container>
          <Header>
            <StyledNavLink to={'/announcements'}>
              <Name> 
              {activeAnnouncementItem.user.firstname} {activeAnnouncementItem.user.lastname}</Name>
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
      ) 
    }    
  }
  return (
    <Active>
      {render()}
    </Active>
  )
}
export default ActiveAnnouncement