//const Joi = require('joi');
//const jwt = require('jsonwebtoken');
const _ = require('lodash');
const BaseController = require('../controllers/base.controller');
const RequestHandler = require('../utils/RequestHandler');
 const Logger = require('../utils/logger');
// const auth = require('../utils/auth');

 const logger = new Logger();
 const requestHandler = new RequestHandler(logger);

class InstallmentController extends BaseController {
	//แสดงอันเดียว
	static async getInstallmentById(req, res) {
		try {
			const result = await super.getById(req, 'INSTALLMENTS');
			return res.send(result)
		} catch (error) {
			return requestHandler.sendError(req, res, error);
		}
	}
	//เสดงทั้งหมด
	static async getInstallment(req, res) {
		try {
			const result = await super.getAll(req, 'INSTALLMENTS');
			return res.send(result)
		} catch (error) {
			return requestHandler.sendError(req, res, error);
		}
	}
	//เพิ่มข้อมูล
    static async postInstallment(req, res) {
		try {
			console.log(req.body)
			const result = await super.add(req,'INSTALLMENTS',req.body)
			return res.send(result);
		} catch (error) {
			return requestHandler.sendError(req, res, error);
		}
	}

	//ลบข้อมูล
	static async deleteInstallmentById(req, res) {
		try {
			const result = await super.deleteByIdInstallment(req,'INSTALLMENTS',req.body);
			return res.send(result);
		} catch (err) {
			return requestHandler.sendError(req, res, err);
		}
	}
	//แก้ไข
	static async updateInstallmentById(req, res) {
		try {
			const result = await super.updateByIdInstallment(req,'INSTALLMENTS',req.body);
			return res.send(result);
		} catch (err) {
			return requestHandler.sendError(req, res, err);
		}
	}
}

module.exports = InstallmentController;