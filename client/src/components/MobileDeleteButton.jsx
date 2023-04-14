// MOBILE ONLY Delete button - conditional and only shows if the user owns the recipe
// Hidden by media query unless on mobile

import { BsTrashFill } from "react-icons/bs";

const MobileDeleteButton = (props) => {
  if (props.user.name !== props.owner) {
    return <div className="nothing"></div>;
  } else {
    return (
      <button onClick={() => props.confirmDelete()} className="modal--mobile-x">
        <BsTrashFill />
      </button>
    );
  }
};

export default MobileDeleteButton;
