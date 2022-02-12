import Posts from '../components/Posts/Posts'
import Panel from './Dashboard/Panel'
import Footer from '../Layouts/Footer/Footer'

const Home = () => {
    return (
      <div>  
        <Panel />
        <Posts />
        <Footer />
      </div>
    )
}
export default Home