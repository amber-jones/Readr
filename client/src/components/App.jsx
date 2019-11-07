import React from 'react';
import axios from 'axios';
import Container from '@material-ui/core/Container';
import TypoGraphy from '@material-ui/core/Typography';
import Login from './Login.jsx';
import NavBar from './NavBar.jsx';
import SuggestionView from './SuggestionView.jsx';
import testBook from './TestBook';

class App extends React.Component {
  // --------handles what happens after the user clicks Login

  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      bookSuggestion: testBook,
      user: null,
    };

    this.getBookSuggestion = this.getBookSuggestion.bind(this);
  }

  /* Sends request to server to get a book suggestion from google books API.
  * If the book suggestion is already in the logged in user's
  * "yes" or "no" list, resend the getBookSuggestion request.
  * We could also do this server side, by getting the response and checking
  * the user's database. Send back the first item in the Query to Googls API
  * */

  componentDidMount() {
    axios.get('/auth/user').then((response) => {
      console.log(response.data)
      if (response.data.user) {
        console.log('THERE IS A USER');
        this.setState({
          isLoggedIn: true,
          user: response.data.user,
        })
      } else {
        this.setState({
          isLoggedIn: false,
          user: null,
        });
      }
    });
  };

  getBookSuggestion() {
    // return axios.get('/book').then((retrievedBook) => {
    //   return retrievedBook;
    // });

    const { bookSuggestion } = this.state;
    return bookSuggestion;
  }

  render() {
    const { bookSuggestion } = this.state;
    const { isLoggedIn } = this.state;
    return (
      <div className="App">
        {/* this container centers content on the page. Width is inherited by the rest of app. */}
        <Container component="main" maxWidth="sm">
          <TypoGraphy variant="h2"> Readr </TypoGraphy>
          <div>
            {isLoggedIn === false ? (
              <Login />) : null }
          </div>
          {/* conditional rendering of the components based on if the user is logged in */}
          {isLoggedIn ? (
            <div>
              <header>
                <NavBar />
              </header>
              <br />
              <SuggestionView
                getBookSuggestion={this.getBookSuggestion}
                bookSuggestion={bookSuggestion}
              />
            </div>
          ) : null }
        </Container>
      </div>
    );
  }
}

export default App;
