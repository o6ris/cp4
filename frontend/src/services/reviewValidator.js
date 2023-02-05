const validateReview = (review) => {
  if (review.comment.length < 80 || review.comment.length > 1000) {
    return {
      status: false,
      errorMessage: "Your comment must contain 80 to 1000 characters",
    };
  }
  return { status: true };
};

export default validateReview;
