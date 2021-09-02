const db = require('../db');

const GroupConversation = db.define('groupConversation', {});

GroupConversation.findConversation = async function (userId, recipients) {
  const groupConversation = await GroupConversation.findOne({
    where: {
      users: {
        [Op.and]: [userId, recipients],
      },
    },
  });

  // return conversation or null if it doesn't exist
  return groupConversation;
};

module.exports = GroupConversation;
