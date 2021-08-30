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
  previewTextBold: {
    fontSize: 12,
    fontWeight: 'bold',
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
  noCount: {
    display: 'none',
  },
}));

const ChatContent = (props) => {
  const classes = useStyles();

  const { conversation } = props;
  const { latestMessageText, otherUser, notificationCount } = conversation;

  return (
    <Box className={classes.root}>
      <Box>
        <Typography className={classes.username}>
          {otherUser.username}
        </Typography>
        <Typography
          className={
            notificationCount > 0
              ? classes.previewTextBold
              : classes.previewText
          }
        >
          {latestMessageText}
        </Typography>
      </Box>
      <Box>
        <div
          className={
            notificationCount > 0 ? classes.notificationCount : classes.noCount
          }
        >
          {notificationCount}
        </div>
      </Box>
    </Box>
  );
};

export default ChatContent;
