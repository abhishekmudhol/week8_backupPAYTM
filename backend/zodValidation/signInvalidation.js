const z = require('zod');

const signinValidation = z.object({
    username: z.string().email(),
	password: z.string()
})

module.exports = signinValidation