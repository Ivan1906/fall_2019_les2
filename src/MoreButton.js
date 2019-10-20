import React from "react";
import T from "prop-types";

const MoreButton = ({ onClick }) => <button onClick={onClick}>More</button>;

MoreButton.defaultProps = { onClick: () => console.log("Click props") };
MoreButton.displayName = "MoreButton";
MoreButton.propTypes = { onClick: T.func.isRequired };

export default MoreButton;
