const Conversation = require('./conversation');
const User = require('./user');
const Message = require('./message');
const GroupConversation = require('./groupConversation');
const UserGroup = require('./userGroup');

// associations

User.hasMany(Conversation);
UserGroup.hasMany(GroupConversation);
Conversation.belongsTo(User, { as: 'user1' });
Conversation.belongsTo(User, { as: 'user2' });
GroupConversation.belongsTo(UserGroup);
Message.belongsTo(Conversation, { as: 'conversation' });
Message.belongsTo(GroupConversation, { as: 'groupConversation' });
GroupConversation.hasMany(Message);
Conversation.hasMany(Message);

module.exports = {
  User,
  Conversation,
  Message,
};
