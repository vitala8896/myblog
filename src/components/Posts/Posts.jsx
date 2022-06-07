import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import person from './../../Assets/Images/person.svg'
import { Loader } from '../UI/Loader/Loader'
import { setReduxPostsList, setReduxActivePost } from '../../store/postSlice'
import { List, Header, Container, Item, ItemHeader, Name, Img, DateItem, Title, Body, ImgAndName, StyledNavLink } from '../../Assets/Styles/Posts/Post'
import { getReduxPosts } from './../../Services/API/post'

const Posts = () => {
  const dispatch = useDispatch()
  const { posts, list, loading, pageNum, pageSize } = useSelector(state => ({
    list: state.post.pagination.posts.list,
    loading: state.post.loading,
    pageNum: state.post.pagination.posts.pageNum,
    pageSize: state.post.pagination.posts.pageSize,
    posts: state.post.posts.posts
  }))
  useEffect(() => {   
    dispatch(getReduxPosts(pageNum, pageSize))
  }, [pageNum])  
  
  useEffect(() => {
    if (posts?.length) {
      const list = posts.map(item => {
        return {
          id: item.id,
          name: item.user.firstname,
          surname: item.user.lastname,
          avatar: '',
          title: item.title,
          body: item.body,
          create: item.createdAt,
        }
      })
      dispatch(setReduxPostsList(list))
    }
  }, [posts])
 
  const renderList = () => {    
    return list.map(item => {
      return (
        <Item key={item.id}>
          <StyledNavLink
            to={'/posts/' + item.id}
            onClick={() => {
              dispatch(setReduxActivePost(item.id));
            }}            
          >
            <ItemHeader>
              <ImgAndName>
                <Img>
                  <img src={item.avatar ? item.avatar : person} alt='' />
                </Img>
                <Name>
                  {item.name} {item.surname}
                </Name>
              </ImgAndName>
              <DateItem>{new Date(item.create).toLocaleDateString('')}</DateItem>
            </ItemHeader>
            <Title>{item.title}</Title>
            <Body>
              {item.body.substr(0, 230) + (item.body.length > 230 ? '...' : '')}
            </Body>
          </StyledNavLink>
        </Item>
      )
    })
  }
  return (
    <div>
      <List>
        <Header>Posts</Header>
        <Container>
          {loading ? <Loader /> : renderList()}
        </Container>
      </List>
    </div>
  )
}
export default Posts