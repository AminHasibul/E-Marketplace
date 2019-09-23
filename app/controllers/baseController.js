const utility = require('../../libs/utility/validation');
const logger = require('../../libs/helper/logger');
const crypto = require('crypto');
const Joi = require('joi');
logger.info("Writing from the user controler, Get BaseController name");
module.exports = BaseController = (controllerName, Model, option = {}) =>
 {
  logger.info("Writing from the user controler, Get BaseController name" + controllerName);
  const list_all_user = function(req, res)
  {
    logger.info("Writing from the user controler, Get BaseController name " + Model);
    Model.getAllUser(function(err, user) {
      if (err)
      {
        logger.info("Writing from the user controler, Get BaseController Err " + err);
        res.send(err);
      }
      else
      {
        console.log('res', user);
        res.send(user);
      }
    });
  };
    /*const index = async (req, res) => {

        try {
          
            logger.info("Writing from the user controler, Get BaseController 1 name" + controllerName);
            Helper.initLogPlaceHolder(req, controllerName, 'index');
            logger.info("Writing from the user controler, Get BaseController  2 cname" + controllerName);
            ///* Pagination........START..........*/
            //const pagination = Helper.pagination(req.query);

            ///* Pagination........END..........*/

            // /* WHERE condition .......START.....................*/
            /*let where = {};
            let include = [];
            let order = [];

            Helper.baseFilter(req.query, Model, where);

            if (req.query.created_at) {

                where.created_at = {
                    $gte: new Date(req.query.created_at),
                    $lt: new Date(req.query.created_at).setDate(new Date(req.query.created_at).getDate() + 1)
                };

            }
            if (req.query.updated_at) {

                where.updated_at = {
                    $gte: new Date(req.query.created_at),
                    $lt: new Date(req.query.created_at).setDate(new Date(req.query.created_at).getDate() + 1)
                };

            }

            if (option.options && option.options.where) {

                where = {
                    ...where,
                    ...option.options.where
                };

                if (option.options.where.$or) {

                    if (req.query.search_term) {

                        where.$or = {};
                        option.options.where.$or.forEach((element) => {

                            where.$or[element] = {$like: `%${req.query.search_term}%`};

                        });

                    } else {

                        Reflect.deleteProperty(where, '$or');

                    }

                }
                if (option.options.where.$and) {

                    if (req.query.search_term) {

                        where.$and = {};
                        option.options.where.$and.forEach((element) => {

                            where.$and[element] = {$like: `%${req.query.search_term}%`};

                        });

                    } else {

                        Reflect.deleteProperty(where, '$and');

                    }

                }

            }
            if (option.options && option.options.include) {

                include = [
                    ...include,
                    ...option.options.include
                ];

            }

            if (option.options && option.options.order) {

                order = [
                    ...order,
                    ...option.options.order
                ];

            }

            const data = await Model.findAndCountAll({
                where,
                include,
                order,
                limit: pagination.limit,
                offset: pagination.skip
            });

            res.status(200).json(Helper.indexSuccessPlaceHolder(data, pagination, controllerName));

        } catch (err) {

            res.status(400).json({
                success: false,
                message: `Error in Get All ${controllerName} with search`,
                error: err
            });

        }

    };
    const show = async (req, res) => {

        try {

            Helper.initLogPlaceHolder(req, controllerName, 'show');

            let include = [];

            if (option.options && option.options.include) {

                include = [
                    ...include,
                    ...option.options.include
                ];

            }
            const data = await Model.findOne({
                where: {id: req.params._id},
                include
            });

            res.status(200).json(Helper.showSuccessPlaceHolder(data, controllerName));

        } catch (err) {

            res.status(400).json({
                error: err,
                message: `error in read single ${controllerName} `,
                success: false
            });

        }

    };*/

    /* .....................edit......................................*/
    const update = async (req, res, next) => {

        try {

            Helper.initLogPlaceHolder(req, controllerName);
            const data = await Model.update(req.body, {where: {id: req.params._id}});

            if (data[0]) {

                const newData = await Model.findOne({where: {id: req.params._id}});

                res.status(200).json(Helper.updateSuccessPlaceHolder(newData, controllerName));

            } else {

                res.status(200).json({
                    success: false,
                    message: `something went wrong in update single ${controllerName}`
                });

            }

        } catch (err) {

            res.status(400).json({
                success: false,
                message: `error from  edit single ${controllerName}`,
                error: err
            });

        }

    };

    /* .....................delete......................................*/
    const destroy = async (req, res, next) => {

        console.log('ddddd');

        try {

            Helper.initLogPlaceHolder(req, controllerName);

            const data = await Model.destroy(
                {where: {id: req.params._id}}
            );

            console.log('ddddd22');
            console.log(data);

            if (data[0]) {

                const newData = await Model.findOne({where: {id: req.params._id}});

                res.status(200).json(Helper.deleteSuccessPlaceHolder(newData, controllerName));

            } else {

                res.status(200).json({
                    success: false,
                    message: `something went wrong in delete single ${controllerName}`
                });

            }

        } catch (err) {

            res.status(400).json({
                success: false,
                message: `error from  delete single ${controllerName} `,
                error: err
            });

        }

    };

    /* .....................post......................................*/
    const create = async (req, res) => {

        try {

            Helper.initLogPlaceHolder(req, controllerName);
            const data = await Model.create(req.body);

            res.status(200).json({
                success: true,
                message: `from  create single ${controllerName} `,
                data
            });

        } catch (err) {

            res.status(400).json({
                success: false,
                message: `error from  create single ${controllerName}`,
                error: err
            });

        }

    };

    return {
      list_all_user
        //create,
       // destroy,
       // index,
      // show,
       // update
    };

};