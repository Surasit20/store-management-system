const _ = require('lodash');
const BaseController = require('./base.controller');
const RequestHandler = require('../utils/RequestHandler');
 const Logger = require('../utils/logger');


 const logger = new Logger();
 const requestHandler = new RequestHandler(logger);

class MonthInstallmentsController extends BaseController {
	
	static async getMonthInstallmentsById(req, res) {
		try {

			const result = await super.getById(req,'MONTH_INSTALLMENTS');
			return res.json({"status": "ok",result});
		} catch (error) {
			return requestHandler.sendError(req, res, error);
		}
	}
	//เสดงทั้งหมด
	static async getMonthInstallments(req, res) {
		try {
			//const include = {model:"INSTALLMENTS"}
			const result = await super.getAll(req, 'MONTH_INSTALLMENTS');
			return res.send(result)
		} catch (error) {
			return requestHandler.sendError(req, res, error);
		}
	}
	//เพิ่มข้อมูล
    static async postMonthInstallments(req, res) {
		try {
			const optionsMotorcycle = {
				where: { MOTORCYCLE_REGISTRATION_NUMBER: req.body.MOTORCYCLE_REGISTRATION_NUMBER },
			};
			const motorycle = await super.getByCustomOptions(req, 'MOTORCYCLE', optionsMotorcycle);

			const optionsInstallments = {
				where: { MOTORCYCLE_ID: parseInt(motorycle.MOTORCYCLE_ID) },
			};

			const installments = await super.getByCustomOptions(req,'INSTALLMENTS',optionsInstallments)

			req.body = {...req.body, 
				INSTALLMENTS_ID: installments.INSTALLMENTS_ID,
				MONTH_INSTALLMENTS_STATUS: 1,
				MONTH_INSTALLMENTS_MONEY: installments.INSTALLMENTS_MONEY,						
			}
			const result = await super.add(req,'MONTH_INSTALLMENTS',req.body)
			return res.send(result);
		} catch (error) {
			return requestHandler.sendError(req, res, error);
		}
	}

	//ลบข้อมูล
	static async deleteMonthInstallmentsById(req, res) {
		try {
			const result = await super.deleteByIdMotorcycle(req,'MONTH_INSTALLMENTS');
			return res.send(result);
		} catch (err) {
			return requestHandler.sendError(req, res, err);
		}
	}
	//แก้ไข
	static async updateByIdMonthInstallment(req, res) {
		try {
			const result = await super.updateByIdMonthInstallment(req,'MONTH_INSTALLMENTS',req.body);
			return res.send(result);
		} catch (err) {
			return requestHandler.sendError(req, res, err);
		}
	}
}

module.exports = MonthInstallmentsController;