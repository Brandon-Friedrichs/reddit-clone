import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { AuthProvider } from './Contexts/AuthContext';
import FrontPage from './Components/FrontPage';
import UserDashboard from './Components/UserDashboard'
import LogIn from './Components/LogIn';
import SignUp from './Components/SignUp';
import SubmitPost from './Components/SubmitPost';
import Post from './Components/Post';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <Route exact path='/' component={FrontPage} />
          <Route path='/dashboard' component={UserDashboard} />
          <Route path='/login' component={LogIn} />
          <Route path='/signup' component={SignUp} />
          <Route path='/submitpost' component={SubmitPost} />
          <Route path='/post/:id' component={Post} />
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;
