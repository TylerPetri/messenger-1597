export const markAsReadInStore = (state, id) => {
  return state.map((convo) => {
    if (convo.id === id) {
      return {
        ...convo,
        notificationCount: 0,
      };
    } else {
      return {
        ...convo,
      };
    }
  });
};

export const addMessageToStore = (state, payload) => {
  const { message, sender } = payload;
  // if sender isn't null, that means the message needs to be put in a brand new convo
  if (sender !== null) {
    const newConvo = {
      id: message.conversationId,
      otherUser: sender,
      messages: [message],
    };
    newConvo.latestMessageText = message.text;
    return [newConvo, ...state];
  }

  return state.map((convo) => {
    if (convo.id === message.conversationId) {
      const newMessages = [...convo.messages, message];
      return {
        ...convo,
        messages: newMessages,
        latestMessageText: message.text,
        notificationCount:
          message.senderId === convo.otherUser.id &&
          message.read === false &&
          convo.notificationCount + 1,
      };
    } else {
      return convo;
    }
  });
};

export const addViewingStatusToStore = (state, payload) => {
  const { userId, convoId } = payload;

  return state.map((convo) => {
    if (convo.otherUser.id === userId && convo.id === convoId) {
      // last message read for avatar bubble, realtime update
      let x = convo.messages.length - 1;
      while (x >= 0 && convo.messages[x].senderId === userId) {
        x--;
      }

      const convoCopy = { ...convo };
      convoCopy.otherUser.viewing = true;
      convoCopy.otherUserReadCount = x + 1;
      return convoCopy;
    } else {
      const convoCopy = { ...convo };
      convoCopy.otherUser.viewing = false;
      return convoCopy;
    }
  });
};

export const addOnlineUserToStore = (state, id) => {
  return state.map((convo) => {
    if (convo.otherUser.id === id) {
      const convoCopy = { ...convo };
      convoCopy.otherUser.online = true;
      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const removeOfflineUserFromStore = (state, id) => {
  return state.map((convo) => {
    if (convo.otherUser.id === id) {
      const convoCopy = { ...convo };
      convoCopy.otherUser.online = false;
      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const addSearchedUsersToStore = (state, users) => {
  const currentUsers = {};

  // make table of current users so we can lookup faster
  state.forEach((convo) => {
    currentUsers[convo.otherUser.id] = true;
  });

  const newState = [...state];
  users.forEach((user) => {
    // only create a fake convo if we don't already have a convo with this user
    if (!currentUsers[user.id]) {
      let fakeConvo = { otherUser: user, messages: [] };
      newState.push(fakeConvo);
    }
  });

  return newState;
};

export const addNewConvoToStore = (state, recipientId, message) => {
  return state.map((convo) => {
    if (convo.otherUser.id === recipientId) {
      const newMessages = [...convo.messages, message];
      return {
        ...convo,
        id: message.conversationId,
        messages: newMessages,
        latestMessageText: message.text,
      };
    } else {
      return convo;
    }
  });
};
