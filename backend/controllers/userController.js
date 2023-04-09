const response = require('../models/outputModels/responseBase');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userService = require('../services/interfaces/userService');
const roleService = require('../services/interfaces/roleService');
const handleError = require('../commons/handleErrors');
const printStacktrace = handleError.PrintStacktrace;
const model = require('../models/Model');

// Create function
const setPassword = async (password) => {
    const salt = bcrypt.genSaltSync();
    return bcrypt.hashSync(password, salt);
};

const checkUser = async (password, passwordHash) => {
    const match = await bcrypt.compareSync(password, passwordHash);
    return match;
}

const encodedToken = (_isUser) => {
    let _token = jwt.sign({
        iss: 'Nguyen Ngoc Tien',
        sub: _isUser, //Thong tin user
        iat: new Date().getDate(),
        exp: new Date().getDate()+3
    }, process.env.JWT_SECRET);
    return _token;
}

exports.Load_List = async (req, res) => {
    try {
        const result = await userService.Ifind();
        if (!result) {
            printStacktrace.errorNotFound(req, res);
        }
        else {
            result.forEach(x => {
                x = delete x.password;
            });
            response.ResponseBase(req, res, res.statusCode, "Thành công !", result);
        }
    }
    catch (ex) {
        printStacktrace.throwException(req, res, ex);
    }
};

exports.Load_By_Company = async (req, res) => {
    try {
        const result = await userService.Ifind();
        if (!result) {
            printStacktrace.errorNotFound(req, res);
        }
        else {
            var rsJob = result.filter(x => x.company_code == req.params.company_code);
            response.ResponseBase(req, res, res.statusCode, "Thành công !", rsJob);
        }
    }
    catch (ex) {
        printStacktrace.throwException(req, res, ex);
    }
};

exports.Find_By_Id = async (req, res) => {
    try {
        const result = await userService.IfindById(req.params.id);
        if (!result) {
            printStacktrace.errorNotFound(req, res);
        }
        else {
            delete result.password;
            response.ResponseBase(req, res, res.statusCode, "Thành công !", result);
        }
    }
    catch (ex) {
        printStacktrace.throwException(req, res, ex);
    }
};

exports.Login = async (req, res) => {
    try {
        let RequestUser = {
            user_name: req.body.user_name,
            password: req.body.password
        };
        let reqUserName = { user_name: req.body.user_name };
        let isUser = await userService.ILogin(reqUserName);
        if (!isUser) {
            printStacktrace.errorNotFound(req, res);
        }
        else {
            let check = await checkUser(RequestUser.password, isUser.password);
            if (check) {
                let _token = encodedToken(isUser);
                if (!_token) {
                    printStacktrace.errorInternalServer(req, res);
                }
                else {
                    delete isUser.password;
                    let userInfo = {
                        UserInfo: isUser,
                        Role: await roleService.IfindOne({role_code: isUser.role_code})
                    };
                    res.setHeader('Authorization', _token);
                    response.ResponseBase(req, res, res.statusCode, "Đăng nhập thành công !", userInfo);
                }
            }
            else {
                printStacktrace.errorBadRequest(req, res);
            }
        }
    }
    catch (ex) {
        printStacktrace.throwException(req, res, ex);
    }
}

exports.Register = async (req, res) => {
    try {
        let RequestUser = {
            user_name: req.body.user_name,
            password: req.body.password,
            full_name: req.body.full_name,
            dob: req.body.dob,
            email: req.body.email,
            address: req.body.address,
            gender: req.body.gender,
            admin: req.body.admin,
            active: req.body.active,
            image: req.body.image,
            isVIP: req.body.isVIP,
            company_code: req.body.company_code,
            //01: ADMIN, 02: NGUOI DUNG, 03: QUAN LY
            role_code: req.body.role_code,
            created_at: req.body.created_at,
            updated_at: req.body.updated_at,
            deleted_at: req.body.deleted_at,
        };
        let isUser = await userService.IfindOne({ user_name: req.body.user_name });
        if (!isUser) {
            RequestUser.password = await setPassword(req.body.password);
            const result = await userService.IRegister(RequestUser);
            if (result) {
                response.ResponseBase(req, res, res.statusCode, "Đăng kí thành công !");
            }
            else {
                printStacktrace.errorBadRequest(req, res);
            }
        }
        else {
            response.ResponseBase(req, res, 400, "Tên tài khoản đã tồn tại. Đăng kí thất bại !")
        }
    }
    catch (ex) {
        printStacktrace.throwException(req, res, ex);
    }
};

exports.Update = async (req, res) => {
    try {
        delete req.body.password
        const result = await userService.IupdateOne({ _id: req.params.id }, req.body);
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


exports.ChangePassword = async (req, res) => {
    try {
        let requestUser = {
            user_name: req.body.user_name,
            password: req.body.password,
            new_password: req.body.new_password
        };
        let reqUserName = { user_name: req.body.user_name };
        let isUser = await userService.ILogin(reqUserName);
        if (!isUser) {
            printStacktrace.errorNotFound(req, res);
        }
        else {
            let check = await checkUser(requestUser.password, isUser.password);
            if (check) {
                delete isUser.password;
                const result = await userService.IupdateOne({ _id: req.params.id }, { password: await setPassword(requestUser.new_password) });
                if (result) {
                    response.ResponseBase(req, res, res.statusCode, "Đổi mật khẩu thành công !", isUser);
                }
                else {
                    printStacktrace.errorBadRequest(req, res);
                }
            }
            else {
                printStacktrace.errorBadRequest(req, res);
            }
        }
    }
    catch (ex) {
        printStacktrace.throwException(req, res, ex);
    }
};


exports.Delete = async (req, res) => {
    try {
        const result = await userService.IdeleteOne({ _id: req.params.id });
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
