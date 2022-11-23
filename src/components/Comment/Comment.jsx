import { useState } from "react";
import { ScoreCounter } from "../ScoreCounter/ScoreCounter";
import { CommentHeader } from "../CommentHeader/CommentHeader";
import { CommentActionButtons } from "../CommentActionButtons/CommentActionButtons";
import { CommentText } from "../CommentText/CommentText";
import { AddCommentSection } from "../AddCommentSection/AddCommentSection";
import { ModalDelete } from "../ModalDelete/ModalDelete";
import "./Comment.css";

export const Comment = ({ currentUser, comment, newCommentRef }) => {
  const [showReply, setShowReply] = useState(false);
  const [modalVisibility, setModalVisibility] = useState(false);
  const [editComment, setEditComment] = useState(false);
  const { content, createdAt, score, user, replyingTo, id } = comment;
  const userImage = user.image;
  const username = user.username;

  const handleEditComment = (e) => {
    e.preventDefault();
    setEditComment(true);
  };

  return (
    <div ref={newCommentRef} className="comment" id={comment.id}>
      <div className="comment-main">
        <ScoreCounter
          score={score}
          comment={comment}
          currentUser={currentUser}
        />
        <CommentHeader
          userImage={userImage}
          username={username}
          createdAt={createdAt}
          currentUser={currentUser}
        />
        <CommentActionButtons
          currentUser={currentUser}
          user={user}
          setShowReply={setShowReply}
          setModalVisibility={setModalVisibility}
          handleEditComment={handleEditComment}
        />
        <CommentText
          content={content}
          id={id}
          replyingTo={replyingTo}
          editComment={editComment}
          setEditComment={setEditComment}
        />
      </div>
      {showReply && (
        <AddCommentSection
          newCommentRef={newCommentRef}
          currentUser={currentUser}
          purpose={"reply"}
          comment={comment}
          setShowReply={setShowReply}
        />
      )}
      {modalVisibility && (
        <ModalDelete
          setModalVisibility={setModalVisibility}
          comment={comment}
        />
      )}
    </div>
  );
};
