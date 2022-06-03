import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from '../../axios/axios-post'
import person from './../../Assets/Images/person.svg'
import getDate from '../myHooks/getDate'
import { Loader } from './../UI/Loader/Loader'
import { setReduxAnnouncements, setReduxActiveAnnouncement, fetchPostsStart } from '../../store/postSlice'
import { setReduxUsers } from '../../store/userSlice'
import { StyleAnnouncements, Container, Item, Name, Title, Body, ItemHeader, ImgAndName, StyledNavLink, Img, Date, H1 } from '../../Assets/Styles/Announcements/Announcements'

const Announcements = () => {
  const dispatch = useDispatch()
  const { announcements, users, loading } = useSelector(state => ({
    announcements: state.post.announcements.announcements,
    users: state.user.users,
    loading: state.post.loading
  }))
  // console.log(announcements)
  useEffect(async() => {
    await createList()
    await renderList()
  }, [])
  const createList = async () => {
    dispatch(fetchPostsStart())
    try {
      await axios.get('/users').then(response => {
        dispatch(setReduxUsers(response.data))
      })
      await axios.get(`/announcements?_sort=id&_order=desc`).then(response => {
      dispatch(setReduxAnnouncements(response.data))    
      })      
    } catch (e) {
      console.log(e)
    }
  }
  const renderList = () => {
    return announcements.map((item, key) => {
      let userId = item.userId - 1
      return (
        <Item key={key}>
          <StyledNavLink to={'/announcements/' + item.id} onClick={() => {
            dispatch(setReduxActiveAnnouncement(item.id))
          }}>
            <ItemHeader>
              <ImgAndName>
                <Img src={person} alt='' />
                <Name>
                  {users[userId].firstname} {users[userId].lastname}
                </Name>
              </ImgAndName>
              <Date>{getDate(item.createdAt)}</Date>
            </ItemHeader>
            <Title>{item.title}</Title>
            <Body>{item.body.substr(0, 600)}</Body>
          </StyledNavLink>
        </Item>
      )
    })
  }
  return (
    <StyleAnnouncements>
      <H1>Announcements</H1>
      <Container>
        {loading ?<Loader /> : renderList()}
      </Container>
    </StyleAnnouncements>
  )
}
export default Announcements