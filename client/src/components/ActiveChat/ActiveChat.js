import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import { Input, Header, Messages } from './index';
import { connect } from 'react-redux';
import axios from 'axios';
import { markAsRead } from '../../store/utils/thunkCreators';
import socket from '../../socket';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexGrow: 8,
    flexDirection: 'column',
  },
  chatContainer: {
    marginLeft: 41,
    marginRight: 41,
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    justifyContent: 'space-between',
  },
}));

const ActiveChat = (props) => {
  const classes = useStyles();
  const { user, markAsRead } = props;
  const conversation = props.conversation || {};

  useEffect(() => {
    const messageRead = async () => {
      if (conversation.otherUser) {
        const body = {
          otherUserId: conversation.otherUser.id,
          conversationId: conversation.id,
        };
        await axios.patch('/api/messages/readMessages', body);
        markAsRead(conversation.id);
      }
    };

    socket.emit('viewing-conversation', {
      userId: user.id,
      convoId: conversation.id,
    });

    messageRead();
  }, [conversation.otherUser, conversation.id, markAsRead, user.id]);

  return (
    <Box className={classes.root}>
      {conversation.otherUser && (
        <>
          <Header
            username={conversation.otherUser.username}
            online={conversation.otherUser.online || false}
          />
          <Box className={classes.chatContainer}>
            <Messages
              messages={conversation.messages}
              otherUser={conversation.otherUser}
              userId={user.id}
              otherUserReadCount={conversation.otherUserReadCount}
            />
            <Input
              otherUser={conversation.otherUser}
              conversationId={conversation.id}
              user={user}
            />
          </Box>
        </>
      )}
    </Box>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
    conversation:
      state.conversations &&
      state.conversations.find(
        (conversation) =>
          conversation.otherUser.username === state.activeConversation
      ),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    markAsRead: (id) => {
      dispatch(markAsRead(id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ActiveChat);
