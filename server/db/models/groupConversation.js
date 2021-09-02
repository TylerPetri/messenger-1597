const db = require('../db');

const GroupConversation = db.define('groupConversation', {});

GroupConversation.findConversation = async function (userId, recipients) {
  const groupConversation = await GroupConversation.findOne({
    where: {
      idArray: {
        [Op.in]: userId,
        [Op.in]: recipients,
      },
    },
  });

  // return conversation or null if it doesn't exist
  return groupConversation;
};

module.exports = GroupConversation;
