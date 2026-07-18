const joi = require("joi");

const patchValidateUser = (req, res, next) => {
    const schema = joi.object({
        task: joi.string().min(4).max(100).required(),
        completed: joi.boolean().default(false)
    }).min(1);

    const {error} = schema.validate(req.body);
    if(error) return res.status(400).json({ error: error.details[0].message });
    next();
    
};

module.exports = patchValidateUser;