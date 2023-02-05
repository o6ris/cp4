const Joi = require("joi");

const checkUser = (req, res, next) => {
  const { error } = Joi.object({
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "fr"] },
    }),
    password: Joi.string().min(8).max(25).required(),
  }).validate(req.body, { abortEarly: false });

  if (!error) {
    next();
  } else {
    res.sendStatus(401);
  }
};

const reviewSchema = Joi.object({
  id_city: Joi.number().min(1).required(),
  id_user: Joi.number().min(1).required(),
  date_post: Joi.date().optional(),
  arrival_date: Joi.date().required(),
  return_date: Joi.string().min(10).required(),
  security: Joi.number().min(0).max(10).required(),
  activities: Joi.number().min(0).max(10).required(),
  cost_of_living: Joi.number().min(0).max(10).required(),
  environement: Joi.number().min(0).max(10).required(),
  public_transportation: Joi.number().min(0).max(10).required(),
  weather: Joi.number().min(0).max(10).required(),
  shops: Joi.number().min(0).max(10).required(),
  nightlife: Joi.number().min(0).max(10).required(),
  comment: Joi.string().min(80).max(1000).required(),
});

const validateReview = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body, { abortEarly: false });

  if (error) {
    res.status(422).json({ validationErrors: error.details });
  } else {
    next();
  }
};

module.exports = {
  checkUser,
  validateReview,
};
