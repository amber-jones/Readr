import React from 'react';
import axios from 'axios';
import { Typography, Paper, Tab, Tabs, CircularProgress } from '@material-ui/core';
import FollowingUser from './BookListItem.jsx';

class FollowingView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      followers: null,
      following: null,
    };

    this.getFollowers = this.getFollowers.bind(this);
    this.getFollowing = this.getFollowing.bind(this);
  }

  componentDidMount() {
    this.getFollowers();
    this.getFollowing();
  }

  // Request to server to get a new book suggestion
  getFollowers() {
    return axios.get('/readr/followers')
      .then((followers) => {
        console.log(followers.data);
        this.setState({ followers });
      })
      .catch((error) => console.log(error));
  }

  getFollowing() {
    return axios.post('/readr/following')
      .then((following) => {
        console.log(following.data);
        this.setState({ following });
      })
      .catch((error) => console.log(error));
  }

  render() {
    const { followers, following } = this.state;
    return (
      <div>
        {followers || following === null ? (
          <div
            style={{
              position: 'absolute',
              left: '50%',
              top: '40%',
              transform: 'translate(-50%, -40%)',
            }}
          >
            <CircularProgress />
          </div>
        ) : (
          <div>
            <Paper className={classes.root}>
              <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                centered
              >
                <Tab label="Following"  {...a11yProps(0)}/>
                <Tab label="Followers"  {...a11yProps(1)}/>
              </Tabs>
            </Paper>
            <TabPanel value={value} index={0}>
              {Object.keys(followers).map((follower) => (
                <FollowingUser follower={followers[follower]} />
              ))}
            </TabPanel>
            <TabPanel value={value} index={1}>
                Item Two
            </TabPanel>
          </div>
        )}
      </div>
    );
  }
}

export default FollowingView;
