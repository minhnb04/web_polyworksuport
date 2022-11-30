const response = require('../models/outputModels/responseBase');
const userJobService = require('../services/interfaces/userJobService');
const userService = require('../services/interfaces/userService');
const documentCVService = require('../services/interfaces/documentCVService');
const jobService = require('../services/interfaces/jobService');
const handleError = require('../commons/handleErrors');
const printStacktrace = handleError.PrintStacktrace;

exports.Load_List = async (req, res) => {
    try {
        const result = await userJobService.Ifind();
        if (!result) {
            printStacktrace.errorNotFound(req, res);
        }
        else {
            const lstUserJob = [];
            result.forEach(async x => {
                var us = await userService.IfindById(x.user_id);
                var cv = await userService.IfindById(x.user_id);
                var jobb = await userService.IfindById(x.user_id);
                lstUserJob.push({
                    x,
                    user: us,
                    documentCV: cv,
                    job: jobb,
                });
            })
            response.ResponseBase(req, res, res.statusCode, "Thành công !", lstUserJob);
        }
    }
    catch (ex) {
        printStacktrace.throwException(req, res, ex);
    }
};

exports.Insert = async (req, res) => {
    try {
        let reqUserJob = {
            user_id: req.body.user_id,
            cv_id: req.body.cv_id,
            job_id: req.body.job_id,
            status: req.body.status,
            created_at: req.body.created_at,
            updated_at: req.body.updated_at,
            deleted_at: req.body.deleted_at,
        };
        const result = await userJobService.IinsertOne(reqUserJob);
        if (result) {
            response.ResponseBase(req, res, res.statusCode, "Thành công !");
        }
        else {
            printStacktrace.errorBadRequest(req, res);
        }
    }
    catch (ex) {
        printStacktrace.throwException(req, res, ex);
    }
};

exports.Update = async (req, res) => {
    try {
        const result = await userJobService.IupdateOne({ _id: req.params.id }, req.body);
        if (result) {
            response.ResponseBase(req, res, res.statusCode, "Cập nhật thành công !");
        }
        else {
            printStacktrace.errorBadRequest(req, res);
        }
    }
    catch (ex) {
        printStacktrace.throwException(req, res, ex);
    }
};

exports.Delete = async (req, res) => {
    try {
        const result = await userJobService.IdeleteOne({ _id: req.params.id });
        if (result) {
            response.ResponseBase(req, res, res.statusCode, "Xóa thành công !");
        }
        else {
            printStacktrace.errorBadRequest(req, res);
        }
    }
    catch (ex) {
        printStacktrace.throwException(req, res, ex);
    }
};
