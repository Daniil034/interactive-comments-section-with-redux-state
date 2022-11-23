import { useDispatch } from "react-redux";
import { removeComment } from "../../features/comments/commentsSlice";
import { Button } from "../Button/Button";
import "./ModalDelete.css";

export const ModalDelete = ({ setModalVisibility, comment }) => {
  const dispatch = useDispatch();

  const handleDelete = (e) => {
    dispatch(
      removeComment({
        id: comment.id,
      })
    );
  };

  const handleCancelDelete = () => {
    setModalVisibility(false);
  };

  return (
    <div
      className="modal-delete__overlay"
      onClick={() => setModalVisibility(false)}
    >
      <div className="modal-delete__block" onClick={(e) => e.stopPropagation()}>
        <h3 className="modal-delete__header">Delete comment</h3>
        <p className="modal-delete__text">
          Are you sure you want to delete this comment? This will remove the
          comment and can’t be undone.
        </p>
        <div className="modal-delete__buttons">
          <Button text={"NO, CANCEL"} action={handleCancelDelete} />
          <Button text={"YES, DELETE"} action={handleDelete} />
        </div>
      </div>
    </div>
  );
};
