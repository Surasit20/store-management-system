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
			const result = await super.getById(req, 'MOTORCYCLE');
			return res.send(result)
		} catch (error) {
			return requestHandler.sendError(req, res, error);
		}
	}
	//เสดงทั้งหมด
	static async getMotorcycle(req, res) {
		try {
			const result = await super.getAll(req, 'MOTORCYCLE');
			return res.send(result)
		} catch (error) {
			return requestHandler.sendError(req, res, error);
		}
	}
	//เพิ่มข้อมูล
    static async postMotorcycle(req, res) {
		try {
			const result = await super.add(req,'MOTORCYCLE',req.body)
			return res.send(result);
		} catch (error) {
			return requestHandler.sendError(req, res, error);
		}
	}

	//ลบข้อมูล
	static async deleteMotorcycleById(req, res) {
		try {
			const result = await super.deleteByIdMotorcycle(req,'MOTORCYCLE',req.body);
			return res.send(result);
		} catch (err) {
			return requestHandler.sendError(req, res, err);
		}
	}
	//แก้ไข
	static async updateMotorcycleById(req, res) {
		try {
			const result = await super.updateByIdMotorcycle(req,'MOTORCYCLE',req.body);
			return res.send(result);
		} catch (err) {
			return requestHandler.sendError(req, res, err);
		}
	}
}

module.exports = MotorcycleController;