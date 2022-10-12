const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);

const lodash = require('lodash');

class BaseController {
  params(req, ...whitelist) {
    let data = {
      ...req.request,
    };
    if (whitelist.length > 0) {
      data = lodash.pick(data, ...whitelist);
    }
    return data;
  }

  /**
   * Returns params with validation
   * Throw ValidationError when req input violates the schema
   */
  attemptParams(req, schema) {
    return Joi.attempt(this.params(req, ...Object.keys(schema)), Joi.object(schema));
  }
}

module.exports = BaseController;
