const userTypes = ["user", "admin"];
const Joi = require("joi");
const validateCar = (car) => {
  const schema = Joi.object({
    carModel: Joi.string().min(3).required(),
    price: Joi.number().required(),
    phoneNumber: Joi.string().length(11).pattern(/^\d+$/).required(),
    maxPictures: Joi.number().min(1).max(10).required(),
    pictures: Joi.array().items(Joi.string()),
  });

  return schema.validate(car);
};
module.exports = {
  userTypes,
  validateCar,
};
