const React = require('react');

class MyBookRow extends React.Component {

  deleteMyOldBook = () => {
    fetch('/api/deleteOldBook', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ myOldBookId: this.props.old_book_id })
    })
      .then(response => response.json())
      .then((data) => {
        return this.props.rerender();
      });
  }
  render() {
    return (
      <tr>
        <td>{this.props.title}</td>
        <td>{this.props.author}</td>
        <td>{this.props.isbn}</td>
        <td>{this.props.condition}</td>
        <td><center><button type="button" class="req-button" onClick={this.deleteMyOldBook}>delete</button></center></td>
      </tr>
    )
  }
}

export default MyBookRow;








