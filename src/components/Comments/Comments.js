import React, { useContext, useState } from "react";
import Context from "../../Context";
import "./Comments.scss";
import ProjectApiService from "../../services/project-api-service";
import HelperFunctions from "../../utils/js/helpers";

function nestComments(projectComments) {
  let commentMap = {};
  if (projectComments) {
    projectComments.forEach((comment) => (commentMap[comment.id] = comment));
    projectComments.forEach((comment) => {
      if (comment.parent_comment_id !== null) {
        const parent = commentMap[comment.parent_comment_id];
        // need to figure out how to also set equal to parent.children || [] so all comments are included
        parent.children = [];
        parent.children.push(comment);
      }
    });

    const mappedProjectComments = projectComments.filter((comment) => {
      return comment.parent_comment_id === null;
    });

    return mappedProjectComments;
  }
}
function Comment({ comment }) {
  const contextValue = useContext(Context);
  const [renderReplyInput, setRenderReplyInput] = useState(false);
  const [replyComment, setReplyComment] = useState("");

  const nestedComments = (comment.children || []).map((comment) => {
    return <Comment key={comment.id} comment={comment} type="child" />;
  });

  function handleClick() {
    setReplyComment("");
    setRenderReplyInput(!renderReplyInput);
  }

  function handleChange(e) {
    const comment = e.target.value;
    setReplyComment(comment);
  }

  function handleSubmit(e) {
    const newCommentBody = {
      projectId: contextValue.currentPage.id,
      newComment: replyComment,
      submitterId: contextValue.currentUser.id,
      parentCommentOwnerId: comment.id,
    };
    e.preventDefault();
    setRenderReplyInput(!renderReplyInput);

    ProjectApiService.postProjectComment(newCommentBody).then((data) => {
      contextValue.updateProjectComments(data);
    });
  }
  return (
    <div className="Comment__Section">
      <p>{comment.text}</p>
      <p className="Comment__Owner">
        -
        {comment.owner
          ? HelperFunctions.capitalCaseName(comment.owner.full_name, " ")
          : HelperFunctions.capitalCaseName(
              contextValue.currentUser.full_name,
              " "
            )}
      </p>
      <form onSubmit={(e) => handleSubmit(e)}>
        {renderReplyInput ? (
          <>
            <input type="text" required onChange={(e) => handleChange(e)} />
            <input type="submit" />
            <button onClick={() => handleClick()}>Delete</button>
          </>
        ) : (
          <button onClick={() => handleClick()} type="submit">
            Reply
          </button>
        )}
      </form>

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
      return (
        <Comment key={`${comment.id}` + Math.random()} comment={comment} />
      );
    });
  }
  return true;
}
