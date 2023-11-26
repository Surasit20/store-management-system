//const Joi = require('joi');
//const jwt = require('jsonwebtoken');
const _ = require('lodash');
const BaseController = require('../controllers/base.controller');
const RequestHandler = require('../utils/RequestHandler');
 const Logger = require('../utils/logger');
// const auth = require('../utils/auth');

 const logger = new Logger();
 const requestHandler = new RequestHandler(logger);

class RepailDataController extends BaseController {
	//แสดงอันเดียว
	static async getRepailDataById(req, res) {
		try {
			const result = await super.getById(req, 'REPAILDATA');
			return res.json({"status": "ok",result});
		} catch (error) {
			return requestHandler.sendError(req, res, error);
		}
	}
	//เสดงทั้งหมด
	static async getRepailData(req, res) {
		try {
			const result = await super.getAll(req, 'REPAILDATA');
			return res.send(result)
		} catch (error) {
			return requestHandler.sendError(req, res, error);
		}
	}
	//เพิ่มข้อมูล
    static async postRepailData(req, res) {
		try {
			const result = await super.add(req,'REPAILDATA',req.body)
			return res.send(result);
		} catch (error) {
			return requestHandler.sendError(req, res, error);
		}
	}

	//ลบข้อมูล
	static async deleteRepailDataById(req, res) {
		try {
			const result = await super.deleteByIdRepailData(req,'REPAILDATA',req.body);
			return res.send(result);
		} catch (err) {
			return requestHandler.sendError(req, res, err);
		}
	}
	//แก้ไข
	static async updateRepailDataById(req, res) {
		try {
			const result = await super.updateByIdRepailData(req,'REPAILDATA',req.body);
			return res.send(result);
		} catch (err) {
			return requestHandler.sendError(req, res, err);
		}
	}
}

module.exports = RepailDataController;