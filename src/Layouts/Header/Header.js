import { useSelector, useDispatch } from 'react-redux'
import { StyleHeader, Container, Logo, Avatar, Menu, StyledNavLink } from './../../Assets/Styles/Other/Header'
import logo from './../../Assets/Images/blog-logo.png'
import { getReduxPosts } from '../../Services/API/post'
import { setReduxPageNum } from '../../store/postSlice'

const Header = () => {
  const dispatch = useDispatch()
  const { avatar, token, pageNum, pageSize } = useSelector(state => ({
    avatar: state.post.avatarURL,
    token: state.auth.token,
    pageNum: state.post.posts.pageNum,
    pageSize: state.post.pageSize
  }))
  const goToStartPage = () => {
    dispatch(setReduxPageNum(1))
    getReduxPosts(pageNum, pageSize)
  }
  return (
    <StyleHeader>
      <Container>
        <StyledNavLink to='/'><Logo src={logo}  alt="logo" onClick={ goToStartPage } />
        </StyledNavLink>
        <Menu>
          <StyledNavLink to='/' onClick={ goToStartPage }
          >Posts</StyledNavLink>          
          <StyledNavLink to='/announcements'
          >Announcements</StyledNavLink>          
        </Menu>
        {token &&
          <StyledNavLink to='/'><Avatar src={avatar} alt="logo" onClick={goToStartPage} />
          </StyledNavLink>}
      </Container>
    </StyleHeader>
  )
}
export default Header
