export const getId = (currentComments) => {
  let id = 0;
  currentComments.forEach((comment) => {
    if (comment.replies.length > 0) {
      comment.replies.forEach((reply) =>
        id < reply.id ? (id = reply.id) : id
      );
    } else {
      if (id < comment.id) {
        id = comment.id;
      }
    }
  });
  return id + 1;
};

export const leftImprint = (comment, currentUser) => {
  const userImprint = Object.keys(comment.reactions).findIndex(
    (reaction) => reaction === currentUser.username
  );
  if (userImprint === -1) {
    return 2;
  }
  return comment.reactions[userImprint];
};