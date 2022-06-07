import { useSelector, useDispatch } from 'react-redux'
import { StyleHeader, Container, Logo, Avatar, Menu, StyledNavLink } from '../../Assets/Styles/Other/Header'
import logo from './../../Assets/Images/blog-logo.png'
import { setReduxPageNumPosts } from '../../store/postSlice'

const Header = () => {
  const dispatch = useDispatch()
  const { avatar, token } = useSelector(state => ({
    avatar: state.post.avatarURL,
    token: state.auth.token
  }))
  const goToStartPage = () => {
    dispatch(setReduxPageNumPosts(1))
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
