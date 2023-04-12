import React from "react";
import { useSelector } from "react-redux";
import "./styles.css";

const Like = (props) => {
  const { user } = useSelector((state) => state.auth);

  if (!props.likers.includes(user._id)) {
    return (
        <div
          className="pizza--like-container"
          onClick={() =>
            props.likePizza(
              props._id,
              user._id,
              props.refresh,
              props.setRefresh
            )
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
            props.likePizza(
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
