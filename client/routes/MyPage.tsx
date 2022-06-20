const React = require('react');
import MyBookRow from '../components/MyBookRow';

class MyPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      myoldbooks: [],
    }
    this.getMyOldBooks();
    this.rerender = this.rerender.bind(this);
    this.getMyOldBooks = this.getMyOldBooks.bind(this);
    this.addOldBook = this.addOldBook.bind(this);
  }

  getMyOldBooks = () => {
    fetch(`/api/getMyOldBookList/${this.props.userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({ myoldbooks: data });
      });
  }

  addOldBook = (e) => {
    e.preventDefault();
    fetch('/api/addOldBook', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ 
        isbn: document.getElementById('isbn').value, 
        condition: document.getElementById('condition').value, 
        userId: this.props.userId 
      })
    })
      .then(response => response.json())
      .then((data) => {
        window.location.href = window.location.href;
      });
  }

  rerender = () => {
    this.getMyOldBooks();
    window.location.href = window.location.href;
  }

  render() {
    let table;
    const rows = [];
    if (this.state.myoldbooks.length > 0) {
      rows.push(
        <tr>
          <th key={0}>Title</th>
          <th key={1}>Author</th>
          <th key={2}>ISBN</th>
          <th key={3}>Condition</th>
          <th key={4}></th>
        </tr>)
      for (let i = 0; i < this.state.myoldbooks.length; i++) {
        rows.push(<MyBookRow
          {...this.state.myoldbooks[i]}
          key={i}
          rerender={this.rerender}
        />)
      }
      table = <table className="result-table">{rows}</table>
    }
    return (
      <div className="search-box">
        <form className="search-form">
          <input type="text" placeholder="Add book by isbn" name="isbn" id="isbn" required />
          <select id="condition" name="condition">
            <option value="Like New">Like New</option>
            <option value="Fine">Fine</option>
            <option value="Very Good">Very Good</option>
            <option value="Good">Good</option>
            <option value="Fair">Fair</option>
            <option value="Poor">Poor</option>
          </select>
          <input type="submit" value="Add" onClick={this.addOldBook} />
        </form>
        <div class="result-box">
          {table}
        </div>
      </div>
    )
  }
}

export default MyPage;








