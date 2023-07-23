//const Joi = require('joi');
//const jwt = require('jsonwebtoken');
const _ = require('lodash');
const BaseController = require('../controllers/base.controller');
const RequestHandler = require('../utils/RequestHandler');
 const Logger = require('../utils/logger');
// const auth = require('../utils/auth');

 const logger = new Logger();
 const requestHandler = new RequestHandler(logger);

class SummaryController extends BaseController {
	//แสดงอันเดียว
	static async getSummaryById(req, res) {
		try {
			const result = await super.getById(req, 'SUMMARY_DAILT_INSTALLMENTS');
			return res.send(result)
		} catch (error) {
			return requestHandler.sendError(req, res, error);
		}
	}
	//เสดงทั้งหมด
	static async getSummary(req, res) {
		try {
			const result = await super.getAll(req, 'SUMMARY_DAILT_INSTALLMENTS');
			return res.send(result)
		} catch (error) {
			return requestHandler.sendError(req, res, error);
		}
	}
	//เพิ่มข้อมูล
    static async postSummary(req, res) {
		try {
			const result = await super.add(req,'SUMMARY_DAILT_INSTALLMENTS',req.body)
			return res.send(result);
		} catch (error) {
			return requestHandler.sendError(req, res, error);
		}
	}

	//ลบข้อมูล
	static async deleteSummaryById(req, res) {
		try {
			const result = await super.deleteByIdSummary(req,'SUMMARY_DAILT_INSTALLMENTS',req.body);
			return res.send(result);
		} catch (err) {
			return requestHandler.sendError(req, res, err);
		}
	}
	//แก้ไข
	static async updateSummaryById(req, res) {
		try {
			const result = await super.updateByIdSummary(req,'SUMMARY_DAILT_INSTALLMENTS',req.body);
			return res.send(result);
		} catch (err) {
			return requestHandler.sendError(req, res, err);
		}
	}
}

module.exports = SummaryController;