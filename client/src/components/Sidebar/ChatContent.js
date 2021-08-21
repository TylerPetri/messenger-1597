import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    marginLeft: 20,
    flexGrow: 1,
  },
  username: {
    fontWeight: 'bold',
    letterSpacing: -0.2,
  },
  previewText: {
    fontSize: 12,
    color: '#9CADC8',
    letterSpacing: -0.17,
  },
  notificationCount: {
    height: 19,
    width: 'max-content',
    padding: '3px 7px',
    marginTop: 7,
    borderRadius: 20,
    fontSize: 10,
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: '#3A8DFF',
    textAlign: 'center',
  },
}));

const ChatContent = (props) => {
  const classes = useStyles();

  const { conversation } = props;
  const { latestMessageText, otherUser } = conversation;

  function logs() {
    console.log(conversation);
  }

  return (
    <Box className={classes.root}>
      <Box>
        <Typography className={classes.username}>
          {otherUser.username}
        </Typography>
        <Typography className={classes.previewText}>
          {latestMessageText}
        </Typography>
      </Box>
      <button onClick={logs}>logs</button>
      <Box>
        <div className={classes.notificationCount}>12</div>
      </Box>
    </Box>
  );
};

export default ChatContent;
