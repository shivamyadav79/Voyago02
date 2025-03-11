// controllers/moderatorController.js
export const reportUser = async (req, res) => {
    // Here you would typically log the report or update user status
    res.status(200).json({ message: 'User reported to admin for review.' });
  };
  
  export const deleteMessageByModerator = async (req, res) => {
    // This would normally validate moderator permissions and delete a message
    res.status(200).json({ message: 'Message deleted by moderator.' });
  };
  