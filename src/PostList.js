import React from "react";
import T from "prop-types";
import PostListItem from "./PostListItem";

export const PostList = ({ Items }) => (
  <ul>
    {Items.map((item, index) => (
      <PostListItem key={item.id} item={item} index={index} />
    ))}
  </ul>
);

PostList.defaultProps = {
  Items: []
};
PostList.displayName = "PostList";
PostList.propTypes = {
  Items: T.arrayOf(T.shape({ id: T.number, title: T.string, body: T.string }))
};
