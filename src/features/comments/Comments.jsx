import "./Comments.css";
import { CommentBlock } from "../../components/CommentBlock/CommentBlock";

export const Comments = ({ currentUser, currentComments }) => {
  return (
    <div className="comments-container">
      {currentComments.map((comment) => (
        <CommentBlock
          comment={comment}
          key={comment.id}
          currentUser={currentUser}
        />
      ))}
    </div>
  );
};
