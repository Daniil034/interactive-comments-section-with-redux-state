import { useRef, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addComment, addReply } from "../../features/comments/commentsSlice";
import { getId } from "../../app/functions";
import { Button } from "../Button/Button";
import { store } from "../../app/store";
import "./AddCommentSection.css";

export const AddCommentSection = ({
  currentUser,
  purpose,
  comment,
  setShowReply,
}) => {
  const { image } = currentUser;
  const [textArea, setTextArea] = useState(
    comment ? `@${comment.user.username} ` : ""
  );
  const userImagePNG = new URL(`../../data/images/avatars/${image.png.slice(17)}`, import.meta.url).href;
  const userImageWEBP = useRef();
  const textAreaRef = useRef(null);
  const dispatch = useDispatch();
  const currentComments = store.getState().comments;

  useEffect(() => {
    textAreaRef.current.style.height = "96px";
    const ScrollHeight = textAreaRef.current.scrollHeight;
    textAreaRef.current.style.height = ScrollHeight + "px";
  });

  const handleInput = (e) => {
    setTextArea(e.target.value);
  };

  const handleSubmit = () => {
    if (!textArea.trim()) {
      alert("Your message cannot be empty!");
    } else {
      dispatch(
        addComment({
          id: getId(currentComments),
          content: textArea,
          createdAt: "0 seconds ago",
          score: 0,
          user: {
            image: {
              png: image.png,
              webp: image.webp,
            },
            username: currentUser.username,
          },
          replies: [],
        })
      );
      setTextArea("");
    }
  };

  const handleReply = () => {
    if (!textArea.trim() || textArea.trim().split(" ").length < 2) {
      alert("Your message cannot be empty!");
    } else {
      dispatch(
        addReply({
          id: comment.id,
          content: {
            id: getId(currentComments),
            content: textArea.split(" ").slice(1).join(" "),
            createdAt: "0 seconds ago",
            score: 0,
            replyingTo: comment.user.username,
            user: currentUser,
          },
        })
      );
      setShowReply(false);
      document
        .getElementById(`${comment.id}`)
        .scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  };

  const onImageError = () =>
    (userImageWEBP.current.src = `../../data/images/avatars/${image.webp.slice(17)}`);

  return (
    <form className="add-comment" onSubmit={handleSubmit}>
      <div className="add-comment__user-image">
        <img
          ref={userImageWEBP}
          src={userImagePNG}
          alt="user avatar"
          onError={onImageError}
        />
      </div>
      <textarea
        ref={textAreaRef}
        className="add-comment__text-area"
        name="add-comment-text-area"
        onChange={handleInput}
        placeholder="Add a comment…"
        value={textArea}
      ></textarea>
      <div className="add-comment__button">
        {purpose === "send" ? (
          <Button action={handleSubmit} text={"send"} />
        ) : (
          <Button action={handleReply} text={"reply"} />
        )}
      </div>
    </form>
  );
};
