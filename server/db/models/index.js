const Conversation = require('./conversation');
const User = require('./user');
const Message = require('./message');
const GroupConversation = require('./groupConversation');

// associations

User.hasMany(Conversation);
User.hasMany(GroupConversation);

Conversation.belongsTo(User, { as: 'user1' });
Conversation.belongsTo(User, { as: 'user2' });
GroupConversation.belongsTo(User, { as: 'users' });

Message.belongsTo(Conversation, { as: 'conversation' });
Message.belongsTo(GroupConversation, { as: 'groupConversation' });

Conversation.hasMany(Message);
GroupConversation.hasMany(Message);

User.belongsToMany(GroupConversation, { through: 'group_users' });
GroupConversation.belongsToMany(User, { through: 'group_users' });

module.exports = {
  User,
  Conversation,
  Message,
};
