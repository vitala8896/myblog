import { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from 'react-router-dom'
import Comments from '../Comments/Comments'
import axios from '../../axios/axios-post'
import { finishDeletePost } from '../../Services/API/create'
import { setReduxActivePost, setReduxActivePostItem } from '../../store/postSlice'
import { setReduxUsers } from '../../store/userSlice'
import { setReduxPageNum } from '../../store/postSlice'
import { Active, Container, Title, Header, Body, Name, Dell, Icon, StyledNavLink } from '../../Assets/Styles/Posts/Active'

const ActivePost = () => {
  const dispatch = useDispatch()
  let history = useHistory()
  const { users, activePost, activePostItem, pageNum, pageSize } =
  useSelector(state => ({
    users: state.user.users,
    activePost: state.post.posts.activePost,
    activePostItem: state.post.posts.activePostItem,
    pageNum: state.post.pagination.pageNum,
    pageSize: state.post.pagination.pageSize
  }))
  useEffect( async () => {    
    const setURL = () => {
      let numURL = +history.location.pathname.replace('/posts/', '')
      dispatch(setReduxActivePost(numURL))
      return numURL
    } 
    let thisURL = activePost === 0? setURL() : activePost   
    try {
      await axios.get('/users').then(response => {
        dispatch(setReduxUsers(response.data))
      })
      await axios.get(`/posts/${thisURL}`).then(response => {
        dispatch(setReduxActivePost(response.data.id))
        dispatch(setReduxActivePostItem(response.data))
      }) 
    } catch (e) {
      console.log(e)
    }
  }, [])
  
  const dellPost = () => {    
    dispatch(finishDeletePost(activePost, pageNum, pageSize))
    dispatch(setReduxPageNum(1))
    return history.push('/')
  }
  const isAuth = () => {
    return users[activePostItem.userId-1].id === +localStorage.getItem('userId')
  }  
  const render = () => {
    if (activePostItem.id && users?.length) {
      return  <Container>
        <Header>
          <StyledNavLink to={'/'} onClick={() => {
            dispatch(setReduxPageNum(1))
          }}>
            <Name> {users[activePostItem.userId-1].firstname} {users[activePostItem.userId-1].lastname}</Name>
          </StyledNavLink>
          {isAuth() &&
            <Icon className="material-icons" onClick={() => { history.push(`/posts/${activePost}/edit`) }}>edit</Icon>
          }
        </Header>
        <Title>{activePostItem.title}</Title>
        <Body>{activePostItem.body}</Body>
        {isAuth() &&
          <Dell>
            <Icon className={"material-icons"} onClick={() => dellPost()}>delete</Icon>
          </Dell>
        }
      </Container>
    }    
  }
  return (
    <Active>
      {render()}
      <Comments />
    </Active>
  )
}
export default ActivePost