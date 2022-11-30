const response = require('../models/outputModels/responseBase');
const jobService = require('../services/interfaces/jobService');
const handleError = require('../commons/handleErrors');
const printStacktrace = handleError.PrintStacktrace;

exports.Load_List = async (req, res) => {
    try {
        const result = await jobService.Ifind();
        if (!result) {
            printStacktrace.errorNotFound(req, res);
        }
        else {
            response.ResponseBase(req, res, res.statusCode, "Thành công !", result);
        }
    }
    catch (ex) {
        printStacktrace.throwException(req, res, ex);
    }
};

exports.Insert = async (req, res) => {
    try {
        let reqjob = {
            job_code: req.body.job_code,
            job_name: req.body.job_name,
            description: req.body.description,
            slot: req.body.slot,
            status: req.body.status,
            start_date: req.body.start_date,
            end_date: req.body.end_date,
            image: req.body.image,
            salary_min: req.body.salary_min,
            salary_max: req.body.salary_max,
            created_at: req.body.created_at,
            updated_at: req.body.updated_at,
            deleted_at: req.body.deleted_at,
            candidate: req.body.candidate,
            technology: req.body.technology,
        };
        const result = await jobService.IinsertOne(reqjob);
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
        const result = await jobService.IupdateOne({ _id: req.params.id }, req.body);
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
        const result = await jobService.IdeleteOne({ _id: req.params.id });
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
