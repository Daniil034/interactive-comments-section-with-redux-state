import { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateComment } from "../../features/comments/commentsSlice";
import { Button } from "../Button/Button";
import "./CommentText.css";

export const CommentText = ({
  content,
  id,
  replyingTo,
  editComment,
  setEditComment,
}) => {
  const [textarea, setTextarea] = useState(content);
  const textareaRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (textareaRef.current !== null) {
      textareaRef.current.style.height = "96px";
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = scrollHeight + "px";
    }
  });

  const handleInput = (e) => {
    setTextarea(e.target.value);
  };

  const handleUpdateComment = () => {
    if (textarea.trim() === "") {
      alert("Your message cannot be empty!");
    } else {
      dispatch(
        updateComment({
          id,
          content: textarea,
        })
      );
      setEditComment(false);
    }
  };

  const commentContent = (
    <>
      {replyingTo && (
        <span className="comment-text__replying-to">{`@${replyingTo} `}</span>
      )}
      {content}
    </>
  );

  const commentTextArea = (
    <>
      <textarea
        ref={textareaRef}
        className="comment-text__textarea"
        name="comment-text__textarea"
        onChange={handleInput}
        value={textarea}
      ></textarea>
    </>
  );

  return (
    <>
      <div className="comment-text">
        {editComment ? commentTextArea : commentContent}
      </div>
      {editComment && (
        <div className="comment-text__update-button">
          <Button text={"update"} action={handleUpdateComment} />
        </div>
      )}
    </>
  );
};
