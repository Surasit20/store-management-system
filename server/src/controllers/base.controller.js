const _ = require('lodash');
const RequestHandler = require('../utils/RequestHandler');
// const Logger = require('../utils/logger');


// const logger = new Logger();
// const errHandler = new RequestHandler(logger);
class BaseController {
	constructor(options) {
		this.limit = 20;
		this.options = options;
	}

    /**
    * Get an element by it's id .
    *
    *
    * @return a Promise
	* @return an err if an error occur
    */

	static async getByCustomOptions(req, modelName, options) {
		let result;
		try {
			result = await req.app.get('db')[modelName].findOne(options);
		} catch (err) {
			return Promise.reject(err);
		}
		return result;
	}
	
	static async getById(req, modelName) {
		const reqParam = req.params.id;
		let result;
		try {
			result = await req.app.get('db')[modelName].findByPk({reqParam})
		} catch (err) {
			return Promise.reject(err);
		}
		return result;
	}

	static async getAll(req, modelName) {
		let result;
		try {
			result = await req.app.get('db')[modelName].findAll({   
				//  include: [
				// { model: req.app.get('db')., as: 'Teacher' }]
		})
		} catch (err) {
			return Promise.reject(err);
		}
		return result;
	}

	static async getAllInclude(req, modelName) {
		let result;
		try {
			result = await req.app.get('db')[modelName].findAll({ include: { all: true }});
		} catch (err) {
			return Promise.reject(err);
		}
		return result;
	}


	static async add(req,modelName,data){
		const reqParam = req.params.id;
		let obj = data
		let result;
		if (obj == null || obj == undefined) 
		{
			obj = req.body;
		}
		try {
			result = await req.app.get('db')[modelName].build(obj).save().then(
					 savedResource => Promise.resolve(savedResource));
		} catch (err) {
			return Promise.reject(err);
		}
		return result;

	}

	static async getById(req, modelName) {
		const reqParam = req.params.id;
		let result;
		try {
			result = await req.app.get('db')[modelName].findByPk(reqParam)
		} catch (err) {
			return Promise.reject(err);
		}
		return result;
	}

	static async deleteByIdUser(req, modelName) { 
		const reqParam = req.params.USER_ID ;
		let result;
		try {
			result = await req.app.get('db')[modelName].destroy({
				where: {
					USER_ID: reqParam
				},
			})
		} catch (err) {
			return Promise.reject(err);
		}
		return result;
	}

	static async updateByIdUser(req, modelName,data) {
		const reqParamUser = req.params.USER_ID ;
		let result;
		try {
			result = await req.app.get('db')[modelName].update(data,{
					where: {
						USER_ID: reqParamUser,
					},
				}).then(
					updatedRecored => Promise.resolve(updatedRecored),
				);
		} catch (err) {
			return Promise.reject(err);
		}
		return result;
	}
	
	static async deleteByIdMotorcycle(req, modelName) { 
		const reqParam = req.params.MOTORCYCLE_ID ;
		let result;
		try {
			result = await req.app.get('db')[modelName].destroy({
				where: {
					MOTORCYCLE_ID: reqParam
				},
			})
		} catch (err) {
			return Promise.reject(err);
		}
		return result;
	}

	static async updateByIdMotorcycle(req, modelName,data) {
		const reqParam = req.params.MOTORCYCLE_ID ;
		let result;
		try {
			result = await req.app.get('db')[modelName].update(data,{
					where: {
						MOTORCYCLE_ID: reqParam,
					},
				}).then(
					updatedRecored => Promise.resolve(updatedRecored),
				);
		} catch (err) {
			return Promise.reject(err);
		}
		return result;
	}

	static async deleteByIdSummary(req, modelName) { 
		const reqParam = req.params.SUMMARY_DAILT_INSTALLMENTS_ID;
		let result;
		try {
			result = await req.app.get('db')[modelName].destroy({
				where: {
					"SUMMARY_DAILT_INSTALLMENTS_ID": reqParam
				},
			})
		} catch (err) {
			return Promise.reject(err);
		}
		return result;
	}

	static async updateByIdSummary(req, modelName,data) {
		const reqParam = req.params.SUMMARY_DAILT_INSTALLMENTS_ID;
		let result;
		try {
			result = await req.app.get('db')[modelName].update(data,{
					where: {
						SUMMARY_DAILT_INSTALLMENTS_ID: reqParam,
					},
				}).then(
					updatedRecored => Promise.resolve(updatedRecored),
				);
		} catch (err) {
			return Promise.reject(err);
		}
		return result;
	}

	static async deleteByIdRepailData(req, modelName) { 
		const reqParam = req.params.REPAILDATA_ID ;
		let result;
		try {
			result = await req.app.get('db')[modelName].destroy({
				where: {
					REPAILDATA_ID : reqParam
				},
			})
		} catch (err) {
			return Promise.reject(err);
		}
		return result;
	}

	static async updateByIdRepailData(req, modelName,data) {
		const reqParam = req.params.REPAILDATA_ID ;
		let result;
		try {
			result = await req.app.get('db')[modelName].update(data,{
					where: {
						REPAILDATA_ID : reqParam,
					},
				}).then(
					updatedRecored => Promise.resolve(updatedRecored),
				);
		} catch (err) {
			return Promise.reject(err);
		}
		return result;
	}

	static async deleteByIdInstallment(req, modelName) { 
		const reqParam = req.params.INSTALLMENTS_ID ;
		let result;
		try {
			result = await req.app.get('db')[modelName].destroy({
				where: {
					INSTALLMENTS_ID : reqParam
				},
			})
		} catch (err) {
			return Promise.reject(err);
		}
		return result;
	}

	static async updateByIdInstallment(req, modelName,data) {
		const reqParam = req.params.INSTALLMENTS_ID ;
		let result;
		try {
			result = await req.app.get('db')[modelName].update(data,{
					where: {
						INSTALLMENTS_ID : reqParam,
					},
				}).then(
					updatedRecored => Promise.resolve(updatedRecored),
				);
		} catch (err) {
			return Promise.reject(err);
		}
		return result;
	}

	static async updateByIdMonthInstallment(req, modelName,data) {
		const reqParam = req.params.MONTH_INSTALLMENTS_ID ;
		let result;
		try {
			result = await req.app.get('db')[modelName].update(
				{ MONTH_INSTALLMENTS_STATUS: req.body.MONTH_INSTALLMENTS_STATUS},
				{where: {MONTH_INSTALLMENTS_ID : reqParam}}
				).then(
					updatedRecored => Promise.resolve(updatedRecored),
				);
		} catch (err) {
			return Promise.reject(err);
		}
		return result;
	}

}
module.exports = BaseController;