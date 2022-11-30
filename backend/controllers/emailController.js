const stmp =  require('../configs/stmp');
const handleError = require('../commons/handleErrors');
const printStacktrace = handleError.PrintStacktrace;
const response = require('../models/outputModels/responseBase');
const nodeMailer = require('nodemailer');
const mailConfig = require('../commons/email/mailConfig');
const emailService = require('../services/interfaces/emailService');
const userService = require('../services/interfaces/userService');
const bcrypt = require('bcrypt');

const setPassword = (password) => {
    const salt = bcrypt.genSaltSync();
    return bcrypt.hashSync(password, salt);
};

exports.SendEmail = async (req, res) => {
    try {
        const {to, subject, body} = req.body;
        const result = await emailService.sendEmail(to, subject, body);
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
}
  
exports.FindPassword = async (req, res) => {
    try {
        const _email = req.body.email;
        const _pass = `mk${Math.floor(Math.random() * 1000)}`;
        let isUser = await userService.IfindOne({ email: _email });
        if (isUser) {
            delete isUser.password;
            const result = await emailService.sendEmail(_email, "Tìm lại MK cho tài khoản " + isUser.user_name, 
            `Mật khẩu của bạn được đặt lại thành ${_pass}` + '. Vui lòng kiểm tra mail và đăng nhập để đổi lại mật khẩu !');
            if (!result) {
                printStacktrace.errorNotFound(req, res);
            }
            else {
                const rsUpdate = await userService.IupdateOne({ _id: isUser._id }, { password: setPassword(_pass) });
                if (rsUpdate) {
                    response.ResponseBase(req, res, res.statusCode, "Thành công !", result);
                }
                else {
                    printStacktrace.throwException(req, res, ex);
                }
            }    
        }
        else {
            printStacktrace.errorNotFound(req, res);
        }
    }
    catch (ex) {
        printStacktrace.throwException(req, res, ex);
    }
}