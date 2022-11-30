const response = require('../models/outputModels/responseBase');
const documentCVService = require('../services/interfaces/documentCVService');
const handleError = require('../commons/handleErrors');
const printStacktrace = handleError.PrintStacktrace;

exports.Load_List = async (req, res) => {
    try {
        const result = await documentCVService.Ifind();
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
        let reqdocumentCV = {
            document_name: req.body.document_name,
            document_code: req.body.document_code,
            document_link: req.body.document_link,
            status: req.body.status,
            user_id: req.body.user_id,
            created_at: req.body.created_at,
            updated_at: req.body.updated_at,
            deleted_at: req.body.deleted_at,
        };
        const result = await documentCVService.IinsertOne(reqdocumentCV);
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
        const result = await documentCVService.IupdateOne({ _id: req.params.id }, req.body);
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

exports.FindByUser = async (req, res) => {
    try {
        const result = await documentCVService.IfindMany({ user_id: req.params.user_id });
        if (result.length > 0) {
            response.ResponseBase(req, res, res.statusCode, "Thành công !", result);
        }
        else {
            printStacktrace.errorNotFound(req, res);
        }
    }
    catch (ex) {
        printStacktrace.throwException(req, res, ex);
    }
};

exports.Delete = async (req, res) => {
    try {
        const result = await documentCVService.IdeleteOne({ _id: req.params.id });
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
