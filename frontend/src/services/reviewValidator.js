const validateReview = (review) => {
  if (review.comment.length < 80 || review.comment.length > 1000) {
    return {
      status: false,
      errorMessage: "Enter between 80 and 1000 characters",
    };
  }
  return { status: true };
};

export default validateReview;
