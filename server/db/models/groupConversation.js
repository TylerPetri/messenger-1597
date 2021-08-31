const db = require('../db');

const GroupConversation = db.define('groupConversation', {});

GroupConversation.findConversation = async function (userId) {
  const groupConversation = await GroupConversation.findOne({
    where: {
      idArray: {
        [Op.in]: userId,
      },
    },
  });

  // return conversation or null if it doesn't exist
  return groupConversation;
};

module.exports = GroupConversation;
