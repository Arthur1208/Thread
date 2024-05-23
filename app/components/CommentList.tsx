import { useState } from "react";
import Comment from "./Comment"; // Assurez-vous d'importer le composant Comment

const CommentList = ({ comments, session }) => {
  const [selectedCommentId, setSelectedCommentId] = useState(null);

  const handleCommentClick = (commentId) => {
    setSelectedCommentId(commentId);
  };

  const renderComments = (comments) => {
    return comments.map((comment) => {
      if (selectedCommentId && selectedCommentId !== comment.id) return null;
      return (
        <Comment
          key={comment.id}
          authorId={comment.authorId}
          comment={comment.caption}
          likeCount={comment.likeCount}
          likes={comment.likes}
          id={comment.id}
          session={session}
          images={comment.images}
          childComments={comment.childComments}
          postId={comment.postId}
          onCommentClick={handleCommentClick}
          showChildren={selectedCommentId === comment.id}
          selectedCommentId={selectedCommentId}
        />
      );
    });
  };

  return (
    <div className="comment-list">
      {selectedCommentId
        ? renderComments(
            comments.filter((comment) => comment.id === selectedCommentId)
          )
        : renderComments(
            comments.filter((comment) => comment.parentCommentId === null)
          )}
      {selectedCommentId && (
        <button onClick={() => setSelectedCommentId(null)}>
          Back to All Comments
        </button>
      )}
    </div>
  );
};

export default CommentList;
