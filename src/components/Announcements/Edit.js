import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { finishDeleteAnnouncement, finishUpdateAnnouncement } from '../../Services/API/create'
import { createAnnouncement } from '../../store/createSlice'
import { EditAnnouncements, Container, Name, Header, Title, Body, Icon, Dell, StyledNavLink } from '../../Assets/Styles/Announcements/Edit'

const EditAnnouncement = () => {
  const dispatch = useDispatch()
  let history = useHistory()
  const { activeAnnouncementItem, users } =
    useSelector(state => ({
      activeAnnouncementItem: state.post.announcements.activeAnnouncementItem,
      users: state.user.users
    }))
    const [title, setTitle] = useState(activeAnnouncementItem.title)
    const [body, setBody] = useState(activeAnnouncementItem.body)  

    const dellAnnouncement = () => {
      dispatch(finishDeleteAnnouncement(activeAnnouncementItem.id))
      return history.push('/announcements')
    }
    const isAuth = () => {
      return activeAnnouncementItem.userId === +localStorage.getItem('userId')
    }
    const titleHandle = e => {
      let val = e.target.value
      setTitle(val)
    }
    const bodyHandle = e => {
      let val = e.target.value
      setBody(val)
    }
    const getItem = () => {
      let announcementItem = {
        title, body,
        userId: +localStorage.getItem('userId'),
        createdAt: new Date().toISOString(),
        updatedAt: new Date(new Date().getTime() + (2 * 365 * 3600 * 24 * 1000)).toISOString()
      }
      dispatch(createAnnouncement(announcementItem))
    }
    return (
      <EditAnnouncements>
        <Container>
          <Header>
            <StyledNavLink to={'/announcements'}>
              <Name>{users[activeAnnouncementItem.userId-1].firstname} {users[activeAnnouncementItem.userId-1].lastname}</Name>
            </StyledNavLink>            
            {isAuth() &&
              <Icon className="material-icons" onClick={() => {
              getItem()
              dispatch(finishUpdateAnnouncement(activeAnnouncementItem.id))
              history.push('/announcements')
              }}>done_all</Icon>
            }
          </Header>
          <h1><Title value={title} onChange={e => { titleHandle(e) }}/></h1>
          <Body value={body} onChange={e => { bodyHandle(e) }}/>
          {isAuth() &&
            <Dell>
              <Icon className={"material-icons"} onClick={() => dellAnnouncement()}>delete</Icon>
            </Dell>
          }
        </Container>
      </EditAnnouncements>
    )
}
export default EditAnnouncement