import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { AuthProvider } from './Contexts/AuthContext';
import FrontPage from './Components/FrontPage';
import UserDashboard from './Components/UserDashboard'
import LogIn from './Components/LogIn';
import SubredditPage from './Components/SubredditPage';
import SignUp from './Components/SignUp';
import SubmitPost from './Components/SubmitPost';
import SubmitLinkPost from './Components/SubmitLinkPost';
import Post from './Components/Post';
import UseFirestore from './Hooks/UseFirestore';

function App() {
  const [posts] = UseFirestore('posts');
  const uniqueLayers = posts !== null && [...new Set(posts.map(post => post.subreddit))];
  return (
    <AuthProvider>
      <Router>
          <Switch>
            <Route 
              exact path='/' 
              render={(props) => (
              <FrontPage {...props} posts={posts} uniqueLayers={uniqueLayers} />
              )}
            />
            <Route path='/user/:username' component={UserDashboard} />
            <Route path='/login' component={LogIn} />
            <Route path='/signup' component={SignUp} />
            <Route 
              exact path='/layer/:subreddit' 
              render={(props) => (
                <SubredditPage {...props} posts={posts} uniqueLayers={uniqueLayers} />
              )}
            />
            <Route path='/submitpost' component={SubmitPost} />
            <Route path='/submitlinkpost' component={SubmitLinkPost} />
            <Route path='/layer/:subreddit/:id' component={Post} />
          </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;
