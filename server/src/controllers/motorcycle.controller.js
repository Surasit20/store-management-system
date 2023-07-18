//const Joi = require('joi');
//const jwt = require('jsonwebtoken');
const _ = require('lodash');
const BaseController = require('./base.controller');
const RequestHandler = require('../utils/RequestHandler');
 const Logger = require('../utils/logger');
// const auth = require('../utils/auth');

 const logger = new Logger();
 const requestHandler = new RequestHandler(logger);

class MotorcycleController extends BaseController {
	
	static async getMotorcycleById(req, res) {
		try {
			const result = await super.getById(req,'Motorcycle');
			return res.send(result)
		} catch (error) {
			return requestHandler.sendError(req, res, error);
		}
	}

    static async postMotorcycle(req, res) {
		try {
			const reqParam = req.params.id;
			const result = await super.create(req, 'Motorcycles',req.body);
			return requestHandler.sendSuccess(res, 'Motorcycle Data Extracted')({ result });
		} catch (error) {
			return requestHandler.sendError(req, res, error);
		}
	}


	static async deleteMotorcycleById(req, res) {
		try {
			const result = await super.deleteById(req, 'Motorcycles');
			return requestHandler.sendSuccess(res, 'Motorcycle Deleted Successfully')({ result });
		} catch (err) {
			return requestHandler.sendError(req, res, err);
		}
	}

	// static async getProfile(req, res) {
	// 	try {
	// 		const tokenFromHeader = auth.getJwtToken(req);
	// 		const user = jwt.decode(tokenFromHeader);
	// 		const options = {
	// 			where: { id: user.payload.id },
	// 		};
	// 		const userProfile = await super.getByCustomOptions(req, 'Users', options);
	// 		const profile = _.omit(userProfile.dataValues, ['createdAt', 'updatedAt', 'last_login_date', 'password']);
	// 		return requestHandler.sendSuccess(res, 'User Profile fetched Successfully')({ profile });
	// 	} catch (err) {
	// 		return requestHandler.sendError(req, res, err);
	// 	}
	// }
}

module.exports = MotorcycleController;