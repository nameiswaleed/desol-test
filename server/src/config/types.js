const userTypes = ["user", "admin"];
const Joi = require("joi");
const validateCar = (car) => {
  const schema = Joi.object({
    carModel: Joi.string().min(3).required(),
    price: Joi.number().integer().min(1).required(),
    phoneNumber: Joi.string()
      .pattern(/^\+(?:[0-9] ?){6,14}[0-9]$/)
      .required(),
    maxPictures: Joi.number().integer().min(1).max(10).required(),
    pictures: Joi.array().items(),
    //   ,
  });

  return schema.validate(car);
};
module.exports = {
  userTypes,
  validateCar,
};
