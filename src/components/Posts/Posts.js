import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import person from './../../Assets/Images/person.svg'
import getDate from '../myHooks/getDate'
import { Loader } from './../UI/Loader/Loader'
import axios from '../../axios/axios-post'
import { setReduxPosts, setReduxList, setReduxActivePost } from '../../store/postSlice'
import { setReduxUsers } from '../../store/userSlice'
import { setReduxPageCount } from '../../store/postSlice'
import { List, Header, Container, Item, ItemHeader, Name, Img, Date, Title, Body, ImgAndName, StyledNavLink } from '../../Assets/Styles/Posts/Post'

const Posts = () => {
  const dispatch = useDispatch()
  const { posts, users, list, loading, pageNum, pageSize, state } = useSelector(state => ({
    list: state.post.pagination.list,
    loading: state.post.loading,
    pageNum: state.post.pagination.pageNum,
    pageSize: state.post.pagination.pageSize,
    posts: state.post.posts.posts,
    users: state.user.users,
    state
  }))
  // console.log(state)
  useEffect(async () => {
    await axios.get(`/posts?_page=${pageNum}&_limit=${pageSize}&_sort=id&_order=desc`)
    .then((response) => {
      dispatch(setReduxPosts(response.data))
      let pages = Math.ceil(response.headers['x-total-count'] / pageSize)
      let pagesArray = []
      for (let i = 1; i <= pages; i++) {
        pagesArray.push(i);
      }
      dispatch(setReduxPageCount(pagesArray))
    })      
    await axios.get('/users').then(response => {
      dispatch(setReduxUsers(response.data))
    })
  }, [pageNum])  
  
  useEffect(() => {
    if (posts?.length && users?.length) {
      const list = posts.map(item => {
        let ind = item.userId - 1
        return {
          id: item.id,
          name: users[ind].firstname,
          surname: users[ind].lastname,
          avatar: users[ind].avatar,
          title: item.title,
          body: item.body,
          create: item.createdAt,
        }
      })
      dispatch(setReduxList(list))
    }
  }, [posts, users])
 
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
              <Date>{getDate(item.create)}</Date>
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