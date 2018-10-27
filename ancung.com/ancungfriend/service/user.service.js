var User = require('./../models/user.model');
var crypto = require('./../utils/crypto');
var message = require('./../utils/message');
var _ = require('lodash');
var nodemailer = require('nodemailer');
var config = require('./../config');
var handlebars = require('handlebars');
var fs = require('fs');
var genericService = require('./../service/generic.service');
var partyService = require('./../service/party.service');
var restaurantService = require('./../service/restaurant.service');
var log = require('../log/log_config.js');
var moment = require('moment');
var path = require('path')
module.exports = {
    getAllUser: getAllUser,
    getUserById: getUserById,
    updateUser: updateUser,
    deleteUser: deleteUser,
    uploadAvatar: uploadAvatar,
    getUserByEmail: getUserByEmail,
    createUser: createUser,
    addFriend: addFriend,
    sendMail: sendMail,
    createAdmin: createAdmin,
    inviteFriend: inviteFriend,
    deleteFriend: deleteFriend,
    getAllUserById1:getAllUserById1
}
// Mô tả: (4) Xử lý nút UnFriend
function deleteFriend(req, myId) {
    return new Promise((resolve, reject) => {
        User.findOne({
            _id: req.id
        }).exec(function (err, userFriend) {
            if (userFriend) {
                User.findOne({
                    _id: myId
                }).exec(function (err, response) {
                    if (err) {
                        reject(err)
                    } else {
                        if (response) {
                            //Kiểm tra đã kết bạn hay chưa
                            var checkMadeFriends = response.friend.filter(function(item){
                                return item.id_friend == req.id
                            });
                            if (checkMadeFriends.length == 0) {
                                reject({
                                    statusCode: message.STATUS_CODE.ERROR,
                                    message: message.ERROR_MESSAGE.USER.USER_EXIST
                                })
                            } else {
                                var dataRemovedUser = response.friend.filter(function (item) {
                                    return item.id_friend != req.id
                                })
                                response.friend = dataRemovedUser;
                                response.save(function (err, response) {
                                    if (err) {
                                        reject(err)
                                    } else {
                                        deleteFriend({ id: myId }, req.id);
                                        log.log('info', path.basename(__filename) + ':::' + moment().format() + ':::' + 
                                        message.STATUS_CODE.SUCCES + ':::' + message.SUCCESS_MESSAGE.USER.USER_FRIEND_DELETED);   
                                        resolve({
                                            // Thông báo thành công 4.2.a
                                            statusCode: message.STATUS_CODE.SUCCES,
                                            message: message.SUCCESS_MESSAGE.USER.USER_FRIEND_DELETED
                                        });
                                    }
                                })
                            }
                        } else {
                             // // Báo lỗi 4.1.a.1
                             log.log('err', path.basename(__filename) + ':::' + moment().format() + ':::' + 
                             message.STATUS_CODE.NOT_FOUND + ':::' + message.ERROR_MESSAGE.USER.USER_NOT_FOUND);   
                            reject({
                                statusCode: message.STATUS_CODE.NOT_FOUND,
                                message: message.ERROR_MESSAGE.USER.USER_NOT_FOUND
                            })
                        }
                    }
                });
            } else {
                 // // Báo lỗi 4.1.a.2
                 log.log('err', path.basename(__filename) + ':::' + moment().format() + ':::' + 
                 message.STATUS_CODE.NOT_FOUND + ':::' + message.ERROR_MESSAGE.USER.USER_FRIEND_NOT_FOUND);   
                reject({
                    message: message.STATUS_CODE.NOT_FOUND,
                    message: message.ERROR_MESSAGE.USER.USER_FRIEND_NOT_FOUND
                })
            }
        })
    });
}
// Mô tả: Hàm mời bạn bè
function inviteFriend(req) {
    // Cấu hình đọc file template html
    var readHTMLFile = function (path, callback) {
        fs.readFile(path, { encoding: 'utf-8' }, function (err, html) {
            if (err) {
                throw err;
                callback(err);
            }
            else {
                callback(null, html);
            }
        });
    };
    // Cấu hình người gửi mail
    var transporter = nodemailer.createTransport({ // config mail server
        service: config.MAIL.SERVICE,
        auth: {
            user: config.MAIL.USERNAME,
            pass: config.MAIL.PASSWORD
        }
    });
    return new Promise((resolve, reject) => {
        User.findOne({
            _id: req.myId
        }).exec(function (err, userData) {
            if (err) {
                reject(err)
            } else {
                partyService.getPartyById({ id: req.idParty }).then((party) => {
                    restaurantService.getRestaurantById({id: party.idRestaurant}).then(function(restaurant){
                        if(restaurant){
                            readHTMLFile(__dirname + './../public/templateMail/mailv2.html', function (err, html) {
                                var template = handlebars.compile(html);
                                var replacements = {
                                    username: userData.name,
                                    titel: party.titel,
                                    timeStart: party.timeStart,
                                    timeEnd: party.timeEnd,
                                    dateStart: party.dateStart,
                                    urlParty: req.linkUrl,
                                    description: party.field,
                                    currentnumber: party.currentNumber,
                                    numberMax: party.numberMax,
                                    linkUrl:req.linkUrl,
                                    restaurant: restaurant.name,
                                    address: restaurant.address
                                };
                                var urlTemplate = template(replacements);
                                var nameUserSend = userData.name.toUpperCase();
                                var nameParty = party.titel.toUpperCase();
                                // Cấu hình người nhận mail
                                var mailOptions = {
                                    from: config.MAIL.USERNAME,
                                    to: req.email,
                                    subject: nameUserSend + ' ĐÃ MỜI BẠN THAM GIA BỮA TIỆC ' + nameParty,
                                    html: urlTemplate
                                };
                                // set 
                                // getUserByEmail(req.email).then((user) => {
                                //     User.findOne({
                                //         _id: user._id
                                //     }).exec(function (err, res) {
                                //         res.isInvite = true;
                                //         res.save();
                                //     })
                                // })
                                transporter.sendMail(mailOptions, function (err, info) {
                                    if (err) {
                                        reject(err)
                                    } else {
                                        if (info) {
                                            resolve({
                                                statusCode: message.STATUS_CODE.ACCEPTED,
                                                message: message.SUCCESS_MESSAGE.USER.SENT_MAIL
                                            });
                                        }
                                    }
                                });
                            });
                        }else{
                            reject({
                                statusCode: message.statusCode.NOT_FOUND,
                                message: message.ERROR_MESSAGE.RESTAURANT.NOT_FOUND
                            })
                        }
                    })
                }).catch((err) => {
                    reject(err)
                })
            }
        });
    });
}
// Mô tả: Hàm gửi mail
function sendMail(req) {
    // Cấu hình đọc file template html
    var readHTMLFile = function (path, callback) {
        fs.readFile(path, { encoding: 'utf-8' }, function (err, html) {
            if (err) {
                throw err;
                callback(err);
            }
            else {
                callback(null, html);
            }
        });
    };
    // Cấu hình người gửi mail
    var transporter = nodemailer.createTransport({ // config mail server
        service: config.MAIL.SERVICE,
        auth: {
            user: config.MAIL.USERNAME,
            pass: config.MAIL.PASSWORD
        }
    });
    return new Promise((resolve, reject) => {
        User.findOne({
            _id: req.myId
        }).exec(function (err, userData) {
            if (err) {
                reject(err)
            } else {
                readHTMLFile(__dirname + './../public/templateMail/mailv1.html', function (err, html) {
                    var template = handlebars.compile(html);
                    var replacements = {
                        username: "Ha Pham",
                        titel: "Ăn Cùng Bạn Bè"
                    };
                    var urlTemplate = template(replacements);
                    var nameUserSend = userData.name.toUpperCase();
                    // Cấu hình người nhận mail
                    var mailOptions = {
                        from: config.MAIL.USERNAME,
                        to: req.email,
                        subject: nameUserSend + ' ĐÃ MỜI BẠN GIA NHẬP CÙNG VỚI ANCUNG',
                        html: urlTemplate
                    };
                    transporter.sendMail(mailOptions, function (err, info) {
                        if (err) {
                            reject(err)
                        } else {
                            if (info) {
                                resolve({
                                    statusCode: message.STATUS_CODE.ACCEPTED,
                                    message: message.SUCCESS_MESSAGE.USER.SENT_MAIL
                                });
                            }
                        }
                    });
                });
            }
        });
    });
}
// Mô tả: Hàm gửi lời mời kết bạn
function addFriend(req, myId) {
    return new Promise((resolve, reject) => {
        User.findOne({
            _id: req.id
        }).exec(function (err, userFriend) {
            if (userFriend) {
                User.findOne({
                    _id: myId
                }).exec(function (err, response) {
                    if (err) {
                        reject(err)
                    } else {
                        if (response) {
                            //Kiểm tra đã kết bạn hay chưa 3.1
                            var checkMadeFriends = _.filter(response.friend, { id_friend: req.id });
                            if (checkMadeFriends.length == 0) {
                                response.friend.push({
                                    id_friend: req.id,
                                    follow: true
                                });
                                response.save(function (err, dataFriend) {
                                    if (err) {
                                        reject(err)
                                    } else {
                                        //gọi lại hàm kết bạn lại
                                        addFriend({ id: myId }, req.id)
                                        log.log('info', path.basename(__filename) + ':::' + moment().format() + ':::' + 
                                        message.STATUS_CODE.SUCCES + ':::' + message.SUCCESS_MESSAGE.USER.MAKE_FRIEND_SUCCES);   
                                        resolve({
                                            // Thông báo thành công 3.2.a
                                            statusCode: message.STATUS_CODE.SUCCES,
                                            message: message.SUCCESS_MESSAGE.USER.MAKE_FRIEND_SUCCES
                                        });
                                    }
                                })
                            } else {
                                // Báo lỗi 3.1.a.1
                                log.log('error', path.basename(__filename) + ':::' + moment().format() + ':::' + 
                                message.STATUS_CODE.ERROR + ':::' + message.ERROR_MESSAGE.USER.USER_EXIST);                        
                                reject({
                                    statusCode: message.STATUS_CODE.ERROR,
                                    message: message.ERROR_MESSAGE.USER.USER_EXIST
                                })
                            }
                        } else {
                            // Báo lỗi 3.1.a.2
                            log.log('error', path.basename(__filename) + ':::' + moment().format() + ':::' + 
                            message.STATUS_CODE.NOT_FOUND + ':::' + message.ERROR_MESSAGE.USER.USER_NOT_FOUND);   
                            reject({
                                statusCode: message.STATUS_CODE.NOT_FOUND,
                                message: message.ERROR_MESSAGE.USER.USER_NOT_FOUND
                            })
                        }
                    }
                });
            } else {
                // Báo lỗi 3.1.a.3
                log.log('error', path.basename(__filename) + ':::' + moment().format() + ':::' + 
                message.STATUS_CODE.NOT_FOUND + ':::' + message.ERROR_MESSAGE.USER.USER_FRIEND_NOT_FOUND);   
                reject({
                    message: message.STATUS_CODE.NOT_FOUND,
                    message: message.ERROR_MESSAGE.USER.USER_FRIEND_NOT_FOUND
                })
            }
        })
    });
}
// Mô tả: Hàm upload avatar
function uploadAvatar(id, file) {
    return new Promise((resolve, reject) => {
        User.findOne({ _id: id }).exec(function (err, response) {
            if (err) {
                reject(err);
            } else {
                var path = './../public/avatar/avatar_' + id;
                if (response) {
                    if (response.image) {
                        // xóa ảnh củ
                        fs.unlinkSync('public/avatar/' + response.image);
                        //lưu Ảnh mới
                        genericService.uploadImage(file, path);
                        response.image = 'avatar_' + id + '.png';
                        response.save(function (err, response) {
                            if (err) {
                                reject(err)
                            } else {
                                resolve({
                                    statusCode: message.STATUS_CODE.SUCCES,
                                    message: message.SUCCESS_MESSAGE.USER.USER_AVATAR_UPDATED
                                });
                            }
                        })
                    } else {
                        genericService.uploadImage(file, path);
                        response.image = 'avatar_' + id + '.png';
                        response.save(function (err, response) {
                            if (err) {
                                reject(err)
                            } else {
                                resolve({
                                    statusCode: message.STATUS_CODE.SUCCES,
                                    message: message.SUCCESS_MESSAGE.USER.USER_AVATAR_UPDATED
                                });
                            }
                        })
                    }
                }
            }
        });
    });
}
// Mô tả: Hàm trả về thông tin user theo email
function getUserByEmail(email) {
    return new Promise((resolve, reject) => {
        User.findOne({
            email: email
        }).exec(function (err, response) {
            if (err) {
                reject({
                    message: err.message
                });
            } else {
                resolve(response);
            }
        });
    });
}
// Mô tả: Hàm xóa user
function deleteUser(request) {
    return new Promise((resolve, reject) => {
        User.findOne({
            _id: request.id
        }).exec(function (err, response) {
            if (err) {
                reject(err);
            } else {
                if (response) {
                    User.remove({
                        _id: request.id
                    }).exec(function (err, response) {
                        if (err) {
                            reject({
                                statusCode: message.STATUS_CODE.NOT_FOUND,
                                message: message.ERROR_MESSAGE.USER.NOT_FOUND
                            });
                        } else {
                            resolve({
                                statusCode: message.STATUS_CODE.SUCCES,
                                message: message.SUCCESS_MESSAGE.USER.DELETED
                            });
                        }
                    });
                } else {
                    reject({
                        statusCode: message.STATUS_CODE.NOT_FOUND,
                        message: message.ERROR_MESSAGE.USER.NOT_FOUND
                    })
                }
            }
        });
    });
}
// Mô tả: Hàm chỉnh sửa thông tin user
function updateUser(request) {
    return new Promise((resolve, reject) => {
        User.findOne({
            _id: request.myId
        }).exec(function (err, response) {
            if (err) {
                reject(err);
            } else {
                if (response) {
                    response.name = request.name || response.name;
                    response.password = request.password ? crypto.hashWithSalt(request.password, response.salt) : response.password;
                    response.email = request.email || response.email;
                    response.phone = request.phone || response.phone;
                    response.birtdate = request.birtdate || response.birtdate;
                    response.sex = request.sex || response.sex;
                    response.address = request.address || response.address;
                    response.role = response.role;
                    response.save(function (err, response) {
                        if (err) {
                            reject(err)
                        } else {
                            resolve(response)
                        }
                    });
                } else {
                    reject({
                        statusCode: message.STATUS_CODE.NOT_FOUND,
                        message: message.ERROR_MESSAGE.USER.USER_NOT_FOUND
                    });
                }
            }
        });
    });
}
// Mô tả: Hàm trả về thông tin user qua id
function getUserById(req) {
    return new Promise((resolve, reject) => {
        User.findOne({
            _id: req.id
        }).exec(function (err, response) {
            if (err) {
                reject({
                    message: err.message
                });
            } else {
                if (response) {
                    resolve(response)
                } else {
                    reject({
                        statusCode: message.STATUS_CODE.NOT_FOUND,
                        message: message.ERROR_MESSAGE.NOT_FOUND
                    });
                }
            }
        });
    });
}
// Mô tả: Hàm trả về tất cả user hiện có 2.1
async function getAllUser() {
    let result = await User.find({});
    return result;
}
// Mô tả: Hàm trả về user thông qua id
async function getAllUserById1(id) {
    let result = await User.find({_id:id});
    return result;
}
// Mô tả: Hàm xử lý đăng ký (2)
function createUser(request) {
    var checkEmail = validateEmail(request.email);
    return new Promise((resolve, reject) => {
        User.findOne({
            email: request.email
        }).exec(function (err, userModel) {
            if (err) {
                reject(err);
            } else {
                if (checkEmail) {
                    if (!userModel) {
                        var salt = crypto.genSalt();
                         // Xử lý đăng nhập 2.2
                        var newUser = new User({
                            email: request.email,
                            name: request.name,
                            salt: salt,
                            password: crypto.hashWithSalt(request.password, salt), // Thực hiện mã hóa password 2.2.a.2
                            sex: request.sex,
                            phone: request.phone,
                            birtdate: request.birtdate,
                            role: "USER",
                            createAt: new Date()
                        });
                        newUser.save(function (err, response) {
                            if (err) {
                                reject(err);
                            } else {
                                // Thông báo thành công 3.1
                                log.log('info', path.basename(__filename) + ':::' + moment().format() + '::: ' + message.SUCCESS_MESSAGE.USER.CREATED);               
                                resolve({
                                    statusCode: message.STATUS_CODE.CREATED,
                                    message: message.SUCCESS_MESSAGE.USER.CREATED
                                });
                            }
                        });
                    } else {
                        //  Báo lỗi 2.2.a.2
                        log.log('error', path.basename(__filename) + ':::' + moment().format() + ':::' + message.STATUS_CODE.NOT_FOUND + ':::' + message.ERROR_MESSAGE.USER.EMAIL_EXIST);                        
                        reject({
                            statusCode: message.STATUS_CODE.NOT_FOUND,
                            message: message.ERROR_MESSAGE.USER.EMAIL_EXIST
                        });
                    }
                } else {
                    //  Báo lỗi 2.2.a.1
                    log.log('error', path.basename(__filename) + ':::' + moment().format() + ':::' + message.STATUS_CODE.NOT_FOUND + ':::' + message.ERROR_MESSAGE.USER.EMAIL_ERROR);                    
                    reject({
                        statusCode: message.STATUS_CODE.ERROR,
                        message: message.ERROR_MESSAGE.USER.EMAIL_ERROR
                    });
                }

            }
        });
    });
}
// Mô tả: Hàm tạo mới user quyền Admin
function createAdmin(request) {
    var checkEmail = validateEmail(request.email);
    return new Promise((resolve, reject) => {
        User.findOne({
            email: request.email
        }).exec(function (err, userModel) {
            if (err) {
                reject(err);
            } else {
                if (checkEmail) {
                    if (!userModel) {
                        var salt = crypto.genSalt();
                        var newUser = new User({
                            email: request.email,
                            name: request.name,
                            salt: salt,
                            password: crypto.hashWithSalt(request.password, salt),
                            sex: request.sex,
                            phone: request.phone,
                            birtdate: request.birtdate,
                            role: "ADMIN",
                            createAt: new Date()
                        });
                        newUser.save(function (err, response) {
                            if (err) {
                                reject(err);
                            } else {
                                resolve({
                                    statusCode: message.STATUS_CODE.CREATED,
                                    message: message.SUCCESS_MESSAGE.USER.CREATED
                                });
                            }
                        });
                    } else {
                        reject({
                            statusCode: message.STATUS_CODE.NOT_FOUND,
                            message: message.ERROR_MESSAGE.USER.EMAIL_EXIST
                        });
                    }
                } else {
                    reject({
                        statusCode: message.STATUS_CODE.ERROR,
                        message: message.ERROR_MESSAGE.USER.EMAIL_ERROR
                    });
                }

            }
        });
    });
}

// Mô tả: Hàm check email hợp lệ
function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
