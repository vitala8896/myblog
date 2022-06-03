import { useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from 'react-router-dom'
import { finishDeletePost, finishUpdatePost } from '../../Services/API/create'
import { setReduxPageNum } from '../../store/postSlice'
import { createPost } from '../../store/createSlice'
import { EditPost, Container, Name, Header, Title, Body, Icon, Dell, StyledNavLink } from '../../Assets/Styles/Posts/Edit'

const Edit = () => {
  const dispatch = useDispatch()  
  let history = useHistory()
  const { activePostItem, users } =
    useSelector(state => ({
      activePostItem: state.post.posts.activePostItem,
      users: state.user.users
    }))
  const [title, setTitle] = useState(activePostItem.title)
  const [body, setBody] = useState(activePostItem.body)  
  const isOtherPosts = () => {
    dispatch(finishDeletePost(activePostItem.id))
    dispatch(setReduxPageNum(1))
    return history.push('/')
  }
  const isAuth = () => {
    return activePostItem.userId === +localStorage.getItem('userId')
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
    let postItem = {
      title, body,
      userId: +localStorage.getItem('userId'),
      createdAt: new Date().toISOString(),
      updatedAt: new Date(new Date().getTime() + (2 * 365 * 3600 * 24 * 1000)).toISOString()
    }
    dispatch(createPost(postItem))
  }
  return (
    <EditPost>
      <Container>
        <Header>
          <StyledNavLink to={'/'} onClick={() => {
            dispatch(setReduxPageNum(1))
          }}>
            <Name>{users[activePostItem.userId-1].firstname} {users[activePostItem.userId-1].lastname}</Name>
          </StyledNavLink>
          {isAuth() &&
            <Icon className="material-icons" onClick={() => {
            getItem()
            dispatch(finishUpdatePost(activePostItem.id))
            history.push('/')
            }}>done_all</Icon>
          }
        </Header>
        <h1><Title value={title} onChange={e => { titleHandle(e) }}/></h1>
        <Body value={body} onChange={e => { bodyHandle(e) }}/>
        {isAuth() &&
          <Dell>
            <Icon className={"material-icons"} onClick={() => isOtherPosts()}>delete</Icon>
          </Dell>
        }
      </Container>
    </EditPost>
  )
}
export default Edit