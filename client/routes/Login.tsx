const React = require('react');
import { Navigate } from "react-router-dom";

class Login extends React.Component {

  login = (e) => {
    e.preventDefault();
    fetch('/api/verifyUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        username: document.getElementById('username').value,
        password: document.getElementById('password').value,
      })
    }).then(response => response.json())
      .then(data => {
        console.log('user from server: ', data)
        return this.props.changeState(data)
      }).catch(err => console.log('client error' + err))
  }
  

  render() {
    console.log(this.props);
    let { loggedIn, error } = this.props;
    return (
      <div className="usercred-box">
        {loggedIn && <Navigate to="/" replace={true} />}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <div className="usercred-title">Book Exchange</div>
        <form className="usercred-form">
          <input type="text" placeholder="enter username" name="username" id="username" required />
          <input type="password" placeholder="enter password" name="password" id="password" required />
          <input type="submit" value="Log in" onClick={this.login}/>
        </form>
      </div>
    )
  }
}

export default Login;








