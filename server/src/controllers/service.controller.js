//const Joi = require('joi');
//const jwt = require('jsonwebtoken');
const _ = require('lodash');
const BaseController = require('./base.controller');
const RequestHandler = require('../utils/RequestHandler');
 const Logger = require('../utils/logger');
// const auth = require('../utils/auth');
const MailerService = require("../service/mailer.js")

 const logger = new Logger();
 const requestHandler = new RequestHandler(logger);

class ServiceController extends BaseController {
	//แสดงอันเดียว
	static async sendNotification(req, res) {
		try {
			await MailerService(req.app);
			return res.status(200)
		} catch (error) {
			return requestHandler.sendError(req, res, error);
		}
	}
}

module.exports = ServiceController;