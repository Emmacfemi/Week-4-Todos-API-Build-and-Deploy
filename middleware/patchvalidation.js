const joi = require("joi");

const patchValidateUser = (req, res, next) => {
    const schema = joi.object({
        task: joi.string().min(3).max(200),
        status: joi.boolean().default(false),
        dueDate: joi.date().allow(null, "").default(null),
    }).min(1);

    const {error} = schema.validate(req.body);

    if(error){
        return res.status(400).json({ error: error.details[0].message });
    }

    next();
    
};

module.exports = patchValidateUser;