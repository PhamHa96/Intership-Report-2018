var message = require('./../utils/message');
var User = require('./../models/user.model');
var crypto = require('./../utils/crypto');
var jwt = require('./../utils/jwt');
var log = require('../log/log_config.js');
var moment = require('moment');
var path = require('path')
module.exports = {
    login: login,
    getUserByToken: getUserByToken,
    getUserByEmail: getUserByEmail
}
// Mô tả: hàm trả về thông tin user bằng email
function getUserByEmail(email) {
    return new Promise((resolve, reject) => {
        User.find({
            email: email
        }).exec(function (err, response) {
            if (err) {
                reject(err)
            } else {
                if (response) {
                    resolve(response)
                } else {
                    reject({
                        statuscode: message.STATUS_CODE.NOT_FOUND,
                        message: message.ERROR_MESSAGE.USER.USER_NOT_FOUND
                    })
                }
            }
        })
    })
}
// Mô tả: Lấy thông tin user qua token 1.2.a
function getUserByToken(token) {
    return new Promise((resolve, reject) => {
        if (token) {
            jwt.verify(token, function (err, decodedData) {
                if (err) {
                    reject({
                        // Lỗi 1.2.b
                        statusCode: message.STATUS_CODE.ERROR,
                        message: message.ERROR_MESSAGE.USER.USER_ERROR
                    });
                } else {
                    var email = decodedData.email
                    User.findOne({
                        email: email
                    }).exec(function (err, response) {
                        if (err) {
                             // Lỗi 1.2.b
                            reject({
                                statusCode: message.STATUS_CODE.ERROR,
                                message: message.ERROR_MESSAGE.USER.USER_ERROR
                            });
                        } else {
                            var convertUser = convertUserModelToUserResponse(response)
                            resolve(convertUser);
                        }
                    });
                }
            })
        }
    });
}
// Mô tả: Hàm xử lý đăng nhập (2)
function login(user) {
    return new Promise((resolve, reject) => {
        User.findOne({
            email: user.email
        }).exec(function (err, userModel) {
            if (userModel) {
                var pass = crypto.hashWithSalt(user.password, userModel.salt);
                // Xử lý check khi bấm đăng nhập 2.2
                if (userModel.password === pass) {
                    jwt.sign(convertUserModelToUserResponse(userModel), function (err, token) {
                        if (err) {
                            reject(err);
                        } else {
                            // Thông báo thành công 3.1
                            log.log('info', path.basename(__filename) + ':::' + moment().format() + '::: ' + message.SUCCESS_MESSAGE.USER.LOGIN_SUCCESS);
                            resolve({
                                token: token,
                                role: userModel.role,
                                statuscode: message.STATUS_CODE.SUCCES,
                                message: message.SUCCESS_MESSAGE.USER.LOGIN_SUCCESS
                            })
                        }
                    });
                } else {
                    // Báo lỗi 2.2.a.1
                    log.log('error', path.basename(__filename) + ':::' + moment().format() + ':::' + message.STATUS_CODE.ERROR + ':::' + message.ERROR_MESSAGE.USER.PASS_WRONG);
                    reject({
                        statuscode: message.STATUS_CODE.ERROR,
                        message: message.ERROR_MESSAGE.USER.PASS_WRONG
                    });
                }
            } else {
                // Báo lỗi 2.2.a.2
                log.log('error', path.basename(__filename) + ':::' + moment().format() + ':::' + message.STATUS_CODE.NOT_FOUND + ':::' + message.ERROR_MESSAGE.USER.EMAIL_NOT_FOUND);
                reject({
                    statuscode: message.STATUS_CODE.NOT_FOUND,
                    message: message.ERROR_MESSAGE.USER.EMAIL_NOT_FOUND
                });
            }
        });
    });
}
// Mô tả: Hàm convert trả về các thông tin của user (ngoại trừ pass và mã hóa pass)
function convertUserModelToUserResponse(userModel) {
    var userObj = userModel.toObject();
    delete userObj.password;
    delete userObj.salt;
    return userObj;
}