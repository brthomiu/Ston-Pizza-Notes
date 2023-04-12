import { useSelector } from "react-redux";
import "./styles.css";
import toast from "react-hot-toast";

const Like = (props) => {
  // Global user state
  const { user } = useSelector((state) => state.auth);

  // Onclick handler for liking recipes
  const handleLikeClick = (_id, user_id, refresh, setRefresh) => {
    props.likePizza(_id, user_id, refresh, setRefresh);
    toast("You love this recipe!", {  duration: 2000});
  };

  const handleUnLikeClick = (_id, user_id, refresh, setRefresh) => {
    props.likePizza(_id, user_id, refresh, setRefresh);
    toast("You no longer love this recipe.", {  duration: 2000});
  };

  if (!props.likers.includes(user._id)) {
    return (
      <div
        className="pizza--like-container"
        onClick={() =>
          handleLikeClick(props._id, user._id, props.refresh, props.setRefresh)
        }
      >
        <div className="pizza--like-heart-empty"></div>
      </div>
    );
  } else {
    return (
      <div
        className="pizza--like-container"
        onClick={() =>
          handleUnLikeClick(
            props._id,
            user._id,
            props.refresh,
            props.setRefresh
          )
        }
      >
        <div className="pizza--like-heart"></div>
      </div>
    );
  }
};

export default Like;
