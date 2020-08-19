const Joi = require("joi");

const validatePlan = (plan) => {
    const schema = Joi.object().keys({
        name: Joi.string().required(),
        price: Joi.number().positive().allow(0).required(),
        type: Joi.string().valid("monthly", "yearly").required(),
        userId: Joi.number().positive().required()
    });

    return schema.validate(plan,  {
        allowUnknown: true
    });
}

exports.validate = validatePlan;