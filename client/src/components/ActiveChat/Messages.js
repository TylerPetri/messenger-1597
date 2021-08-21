import React from 'react';
import { Box } from '@material-ui/core';
import { SenderBubble, OtherUserBubble } from '../ActiveChat';
import moment from 'moment';

const Messages = (props) => {
  const { messages, otherUser, userId } = props;

  function displayNewMessagesAtBottom() {
    const sorted = messages.sort((a, b) => {
      if (b.createdAt > a.createdAt) return -1;
      if (a.createdAt > b.createdAt) return 1;
      return 0;
    });
    return sorted;
  }

  return (
    <Box>
      {displayNewMessagesAtBottom().map((message) => {
        const time = moment(message.createdAt).format('h:mm');

        return message.senderId === userId ? (
          <SenderBubble key={message.id} text={message.text} time={time} />
        ) : (
          <OtherUserBubble
            key={message.id}
            text={message.text}
            time={time}
            otherUser={otherUser}
          />
        );
      })}
    </Box>
  );
};

export default Messages;
