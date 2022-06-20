const React = require('react');


class ExchangeRow extends React.Component {

    render(){
        return (
          <tr>
            <td>{this.props.incomingRequests}</td>
            <td>{this.props.author}</td>
            <td>{this.props.isbn}</td>
            <td>{this.props.condition}</td>
            <td>{this.props.username}</td>
            <td><center><button type="button" className="req-button" onClick={this.requestBook}>Request</button></center></td>
          </tr>
        )
      }
}

export default ExchangeRow;
