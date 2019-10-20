import React from "react";
import T from "prop-types";

const PostListItem = ({ item, index }) => (
  <li className="Item">
    <h6>
      <span>{index + 1}&nbsp;</span>
      {item.title}
    </h6>
    <p>{item.body}</p>
  </li>
);

PostListItem.defaultProps = {
  item: { id: 0, title: "Немає назви", body: "Відсутній опис" },
  index: 0
};
PostListItem.displayName = "PostListItem";
PostListItem.propTypes = {
  item: T.shape({ id: T.number, title: T.string, body: T.string }).isRequired,
  index: T.number
};

export default PostListItem;
