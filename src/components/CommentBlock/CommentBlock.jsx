import { useRef } from "react";
import { Comment } from "../Comment/Comment";
import "./CommentBlock.css";

export const CommentBlock = ({ comment, currentUser }) => {
  const { replies } = comment;
  const newCommentRef = useRef(null);

  return (
    <>
      <Comment
        comment={comment}
        currentUser={currentUser}
        newCommentRef={newCommentRef}
      />
      {replies.length > 0 && (
        <div className="replies">
          {replies.map((reply) => {
            return (
              <Comment
                newCommentRef={newCommentRef}
                key={reply.id}
                comment={reply}
                currentUser={currentUser}
              />
            );
          })}
        </div>
      )}
    </>
  );
};
