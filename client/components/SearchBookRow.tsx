const React = require('react');

class SearchBookRow extends React.Component {
  constructor(props) {
    super(props);

  this.requestBook = this.requestBook.bind(this);
  }
  // ONCLICK REQUEST
  // Add logged in user id to requester section in table
  // Alert user book has been successfully requested
  // Outgoing book request should render in My Requests page

 requestBook = (e) => {
    e.preventDefault();
    fetch('/api/requestBook', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ 
        userId: this.props.userId, 
        isbn: this.props.isbn, 
        username: this.props.username
      })
    })
      .then(response => response.json())
      .then(data => console.log("data returned from request book controller:", data))

  }

  render(){
    return (
      <tr>
        <td>{this.props.title}</td>
        <td>{this.props.author}</td>
        <td>{this.props.isbn}</td>
        <td>{this.props.condition}</td>
        <td>{this.props.username}</td>
        <td><center><button type="button" className="req-button" onClick={this.requestBook}>Request</button></center></td>
      </tr>
    )
  }
}

export default SearchBookRow;