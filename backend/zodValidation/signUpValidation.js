const z = require('zod');

const userValidationSchema = z.object({
    username: z.string()
        .min(3, 'Username must be at least 3 characters long')
        .max(100, 'Username must be at most 30 characters long')
        .trim() // Trims leading and trailing spaces
        //.lowercase() // Converts to lowercase
        .email(), // Ensures it's a valid email format
    password: z.string()
        .min(8, 'Password must be at least 8 characters long')
        .trim(), // Trims leading and trailing spaces
    firstName: z.string()
        .max(50, 'First name must be at most 50 characters long')
        .trim(), // Trims leading and trailing spaces
    lastName: z.string()
        .max(50, 'Last name must be at most 50 characters long')
        .trim() // Trims leading and trailing spaces
    });

module.exports = userValidationSchema