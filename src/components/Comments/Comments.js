import React, { useContext } from "react";
import Context from "../../Context";
import "./Comments.scss";

function nestComments(projectComments) {
  let commentMap = {};
  if (projectComments) {
    projectComments.forEach((comment) => (commentMap[comment.id] = comment));
    projectComments.forEach((comment) => {
      if (comment.parent_comment_id !== null) {
        const parent = commentMap[comment.parent_comment_id];
        parent.children = [];
        parent.children.push(comment);
      }
    });
    return projectComments.filter((comment) => {
      return comment.parent_comment_id === null;
    });
  }
}
function Comment({ comment }) {
  const nestedComments = (comment.children || []).map((comment) => {
    return <Comment key={comment.id} comment={comment} type="child" />;
  });

  return (
    <div className="Nested__Comments">
      <p>{comment.text}</p>
      <p>-{comment.owner.full_name}</p>
      {nestedComments}
    </div>
  );
}
export default function Comments() {
  const contextValue = useContext(Context);
  const comments = contextValue.projectComments;
  if (comments) {
    const renderComments = nestComments(comments.projectComments);
    return renderComments.map((comment) => {
      return <Comment key={comment.id} comment={comment} />;
    });
  }
  return true;
}
