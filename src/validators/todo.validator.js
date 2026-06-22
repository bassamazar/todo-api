const Joi = require('joi');

const todoSchema = Joi.object({
    title: Joi.string().min(3).required().messages({
        'string.base': 'Title must be a string',
        'string.min': 'Title must be at least 3 characters',
        'any.required': 'Title is required'
    }),
    description: Joi.string().optional(),
    completed: Joi.boolean().optional()
});

const validateTodo = (req, res, next) => {
    const { error } = todoSchema.validate(req.body, { abortEarly: false });
    
    if (error) {
        return res.status(400).json({
            message: "Validation failed",
            errors: error.details.map(err => ({
                field: err.path[0],
                message: err.message
            }))
        });
    }
    next(); // إذا كانت البيانات صحيحة، ننتقل للـ Controller
};

module.exports = { validateTodo };