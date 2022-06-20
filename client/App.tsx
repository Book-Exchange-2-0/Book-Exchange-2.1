const React = require('react');
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
//will house all the react components
import Nav from './components/Nav.jsx';
import Root from './routes/Root.js';
import Login from './routes/Login.js';
import Register from './routes/Register.js';
import MyPage from './routes/MyPage.js';
import Search from './routes/Search.js';
import NotFound from './routes/NotFound.js';
import Exchange from './routes/Exchange.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: true,
      userId: 1,
      error: null
    };
    this.changeState = this.changeState.bind(this);
    this.logOut = this.logOut.bind(this);
  }
  // METHOD TO UPDATE STATE USERID FOR LOGGED IN USER
  // componentDidMount() {
  //   fetch('/')
  // }

  changeState (data) {
    if (data.err) {
      console.log('error foundddd')
      this.setState({loggedIn: false, error: "Please Try Again"});
    } else if (data.loggedIn) {
      const newState = {
            ...this.state,
            loggedIn: true, 
            userId: data.user.user_id
      }
      this.setState(newState);
    } else {
      this.setState({loggedIn: false, error: "Please Try Again"});
    }
  }

  logOut () {
    this.setState({loggedIn: false, userId: null, error: null});
  }
  
  render() {
    return (
      <div>
        <div className="header-container">
          <h1><a href="">The Book Exchange</a></h1>
          <hr className="bottom-hr" />
        </div>
        <Router>
          {/* NAV will always be rendered */}
          <Nav logOut={this.logOut} loggedIn={this.state.loggedIn} userId={this.state.userId} />
          <Routes>
            <Route path="/login" element={<Login changeState={this.changeState} loggedIn={this.state.loggedIn} userId={this.state.userId} error={this.state.error} />}></Route>
            <Route path="/register" element={<Register changeState={this.changeState} loggedIn={this.state.loggedIn} userId={this.state.userId} error={this.state.error} />}></Route>
            <Route path="/mypage" element={<MyPage loggedIn={this.state.loggedIn} userId={this.state.userId} />}></Route>
            <Route path="/search" element={<Search loggedIn={this.state.loggedIn} userId={this.state.userId} />}></Route>
            <Route path="/" element={<Root />}></Route>
            <Route path="/:id" element={<NotFound />}></Route>
            <Route path="/exchange" element={<Exchange loggedIn={this.state.loggedIn} userId={this.state.userId}/>}></Route>
          </Routes>
        </Router>
      </div>
    )
  }
}

export default App;