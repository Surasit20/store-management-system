
//const _ = require('lodash');
const bcrypt = require('bcrypt');
const BaseController = require('./base.controller');
const RequestHandler = require('../utils/RequestHandler');
 const Logger = require('../utils/logger');
 const jwt = require('jsonwebtoken');
// const auth = require('../utils/auth');

 const logger = new Logger();
 const requestHandler = new RequestHandler(logger);

class AuthController extends BaseController {
	//สมัคร
	static async register(req, res) {
		try {
			const data = req.body;          
			const options = { where: { USER_USERNAME: data.USER_EMAIL } };
			const user = await super.getByCustomOptions(req, 'USER', options);
			const options1 = { where: { USER_USERNAME: data.USER_USERNAME } };
			const user1 = await super.getByCustomOptions(req, 'USER', options1);
			if (user) {
				requestHandler.throwError(400, 'bad request', 'invalid email account,email already existed')();
			}
			
			if (user1) {
				requestHandler.throwError(400, 'bad request', 'invalid user name account,email already existed')();
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
			const hashedPass = bcrypt.hashSync(data.USER_PASSWORD, salt);
			data.USER_PASSWORD= hashedPass;
			const createdUser = await super.add(req, 'USER');
			if (createdUser !== null) {
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
			const options = {
				where: { USER_USERNAME: req.body.USER_EMAIL },
			};
			const user = await super.getByCustomOptions(req, 'USER', options);
			if (!user) {
				requestHandler.throwError(400, 'bad request', 'invalid email address')();
			}

			await bcrypt
				.compare(req.body.USER_PASSWORD, user.USER_PASSWORD)
				.then(
					requestHandler.throwIf(r => !r, 400, 'incorrect', 'failed to login bad credentials'),
					requestHandler.throwError(500, 'bcrypt error'),
				);
			
				
				// var token = jwt.sign({user}, "", { algorithm: 'RS256' });
				requestHandler.sendSuccess(res, 'User logged in Successfully')({ user: user });
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