// Component with like functionality
// When the user likes a component their user ID is pushed to an array in the recipe object
// If the user already has the function liked, their ID is sliced out of the array

// For the sake of this codebase just pretend that "pizza" means "recipe"

import { useSelector } from "react-redux";
import "./styles.css";
import toast from "react-hot-toast";

const Like = (props) => {
  // Global user state
  const { user } = useSelector((state) => state.auth);

  // Onclick handler for liking recipes
  const handleLikeClick = (_id, user_id, refresh, setRefresh) => {
    props.likePizza(_id, user_id, refresh, setRefresh);
    toast("You love this recipe!", { duration: 2000 });
  };

  // Handler for unliking recipes
  const handleUnLikeClick = (_id, user_id, refresh, setRefresh) => {
    props.likePizza(_id, user_id, refresh, setRefresh);
    toast("You no longer love this recipe.", { duration: 2000 });
  };

  // Return JSX -----------------------------------------------
  // Conditionally renders the heart depending on if user has the recipe liked or not
  // Why waste 3kb on a heart icon when you can copy and paste 100 lines of CSS and tweak it? /s
  if (!props.likers.includes(user._id)) {
    return (
      <div
        className="pizza--like-container"
        onClick={() =>
          handleLikeClick(props._id, user._id, props.refresh, props.setRefresh)
        }
      >
        <div className="pizza--like-heart-empty">
          <h2 className="heart-text">{props.likers.length}</h2>
        </div>
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
        <div className="pizza--like-heart">
          <h2 className="heart-text">{props.likers.length}</h2>
        </div>
      </div>
    );
  }
};

export default Like;
