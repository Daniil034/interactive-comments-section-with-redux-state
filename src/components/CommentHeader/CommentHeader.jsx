import { useRef } from "react";
import "./CommentHeader.css";

export const CommentHeader = ({
  userImage,
  username,
  createdAt,
  currentUser,
}) => {
  const userImagePNG = new URL(
    `../../data/images/avatars/${userImage.png.slice(17)}`,
    import.meta.url
  ).href;
  console.log(userImage.png);
  const userImageWEBP = useRef();
  const onImageError = () => {
    userImageWEBP.current.src = new URL(
      `../../data/images/avatars/${userImage.webp.slice(17)}`,
      import.meta.url
    ).href;
  };
  const you = <p className="comment-header__you">you</p>;
  return (
    <div className="comment-header">
      <div className="comment-header__img">
        <img
          ref={userImageWEBP}
          src={userImagePNG}
          alt="user avatar"
          onError={onImageError}
        />
      </div>
      <div className="comment-header__username">
        {username}
        {username === currentUser.username && you}
      </div>
      <p className="comment-header__created-at">{createdAt}</p>
    </div>
  );
};
