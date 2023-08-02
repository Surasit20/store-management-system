//const Joi = require('joi');
//const jwt = require('jsonwebtoken');
const _ = require('lodash');
const BaseController = require('../controllers/base.controller');
const RequestHandler = require('../utils/RequestHandler');
 const Logger = require('../utils/logger');
// const auth = require('../utils/auth');

 const logger = new Logger();
 const requestHandler = new RequestHandler(logger);

class UsersController extends BaseController {
	//แสดงอันเดียว
	static async getUserById(req, res) {
		try {
			const result = await super.getById(req, 'USER');
			return res.json({"status": "ok",result});
		} catch (error) {
			return requestHandler.sendError(req, res, error);
		}
	}
	//เสดงทั้งหมด
	static async getUser(req, res) {
		try {
			const result = await super.getAll(req, 'USER');
			return res.send(result)
		} catch (error) {
			return requestHandler.sendError(req, res, error);
		}
	}
	//เพิ่มข้อมูล
    static async postUser(req, res) {
		try {
			const result = await super.add(req,'USER',req.body)
			return res.send(result);
		} catch (error) {
			return requestHandler.sendError(req, res, error);
		}
	}

	//ลบข้อมูล
	static async deleteUserById(req, res) {
		try {
			const result = await super.deleteByIdUser(req,'USER',req.body);
			return res.send(result);
		} catch (err) {
			return requestHandler.sendError(req, res, err);
		}
	}
	//แก้ไข
	static async updateUserById(req, res) {
		try {
			const result = await super.updateByIdUser(req,'USER',req.body);
			return res.send(result);
		} catch (err) {
			return requestHandler.sendError(req, res, err);
		}
	}
}

module.exports = UsersController;