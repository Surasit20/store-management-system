
const _ = require('lodash');
const bcrypt = require('bcrypt');
const BaseController = require('../controllers/base.controller');
const RequestHandler = require('../utils/RequestHandler');
 const Logger = require('../utils/logger');
// const auth = require('../utils/auth');

 const logger = new Logger();
 const requestHandler = new RequestHandler(logger);

class AuthController extends BaseController {
	//สมัคร
	static async register(req, res) {
		try {
			const data = req.body;
			const options = { where: { USER_EMAIL: data.email } };
			const user = await super.getByCustomOptions(req, 'USER', options);

			if (user) {
				requestHandler.throwError(400, 'bad request', 'invalid email account,email already existed')();
			}

			// async.parallel([
			// 	function one(callback) {
			// 		email.sendEmail(
			// 			callback,
			// 			config.sendgrid.from_email,
			// 			[data.email],
			// 			' iLearn Microlearning ',
			// 			`please consider the following as your password${randomString}`,
			// 			`<p style="font-size: 32px;">Hello ${data.name}</p>  please consider the following as your password: ${randomString}`,
			// 		);
			// 	},
			// ], (err, results) => {
			// 	if (err) {
			// 		requestHandler.throwError(500, 'internal Server Error', 'failed to send password email')();
			// 	} else {
			// 		logger.log(`an email has been sent at: ${new Date()} to : ${data.email} with the following results ${results}`, 'info');
			// 	}
			// });
			const saltRounds = 10;
			const salt = bcrypt.genSaltSync(saltRounds);
			const hashedPass = bcrypt.hashSync(data.password, salt);
			data.password = hashedPass;
			const createdUser = await super.add(req, 'USER');
			if (!(_.isNull(createdUser))) {
				requestHandler.sendSuccess(res, 'email with your password sent successfully', 201)();
			} else {
				requestHandler.throwError(422, 'Unprocessable Entity', 'unable to process the contained instructions')();
			}

		} catch (error) {
			return requestHandler.sendError(req, res, error);
		}
	}
	//เข้าสู่ระบบ
	static async login(req, res) {
		try {
			const result = await super.getAll(req, 'USER');
			return res.send(result)
		} catch (error) {
			return requestHandler.sendError(req, res, error);
		}
	}
	//รีเฟด
    static async refreshToken(req, res) {
		try {
			const result = await super.add(req,'USER',req.body)
			return res.send(result);
		} catch (error) {
			return requestHandler.sendError(req, res, error);
		}
	}
}

module.exports  = AuthController;