import "./Button.css";

export const Button = ({ text, action }) => {
  const handleClick = (e) => {
    e.preventDefault();
    action();
  };

  return (
    <input
      className={`button ${
        text === "send"
          ? "button__blue add-comment__button"
          : text === "reply"
          ? "button__blue"
          : text === "update"
          ? "button__blue"
          : text === "NO, CANCEL"
          ? "button__cancel"
          : text === "YES, DELETE"
          ? "button__delete"
          : "none"
      }`}
      type="submit"
      name="send-button"
      value={`${text}`}
      onClick={handleClick}
    />
  );
};
