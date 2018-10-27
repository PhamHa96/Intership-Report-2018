var userService = require('./../service/user.service');
var jwt = require('./../utils/jwt');
var config = require('./../config');
var message = require('./../utils/message')
module.exports = {
    createUser: createUser,
    getAllUser: getAllUser,
    getUserById: getUserById,
    updateUser: updateUser,
    deleteUser: deleteUser,
    uploadAvatar: uploadAvatar,
    getUserByEmail: getUserByEmail,
    addFriend: addFriend,
    sendMail: sendMail,
    createAdmin: createAdmin,
    inviteFriend: inviteFriend,
    deleteFriend: deleteFriend,
}

function deleteFriend(req, res) {
    getInfomationUserUsing(req.headers[config.TOKEN]).then(function (deCodeData) {
        if (deCodeData) {
            userService.deleteFriend(req.params, deCodeData._id)
                .then(function (response) {
                    res.send(response);
                })
                .catch(function (err) {
                    res.send(err);
                });
        }
    })
}

function inviteFriend(req, res) {
    getInfomationUserUsing(req.headers[config.TOKEN]).then(function (deCodeData) {
        if (deCodeData) {
            req.body.myId = deCodeData._id;
            req.body.name = deCodeData.name;
            userService.inviteFriend(req.body).then(function (response) {
                res.send(response)
            }).catch(function (err) {
                res.send(err)
            });
        }
    });
}

function sendMail(req, res) {
    getInfomationUserUsing(req.headers[config.TOKEN]).then(function (deCodeData) {
        if (deCodeData) {
            req.body.myId = deCodeData._id;
            userService.sendMail(req.body).then(function (response) {
                res.send(response)
            }).catch(function (err) {
                res.send(err)
            });
        }
    });
}

function getInfomationUserUsing(token) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, function (err, deCodeData) {
            resolve(deCodeData)
        })
    });
}

function addFriend(req, res) {
    getInfomationUserUsing(req.headers[config.TOKEN]).then(function (deCodeData) {
        if (deCodeData) {
            userService.addFriend(req.params, deCodeData._id)
                .then(function (response) {
                    res.send(response);
                })
                .catch(function (err) {
                    res.send(err);
                });
        }
    })
}

function getUserByEmail(req, res) {
    var email = req.params.email;
    userService.getUserByEmail(email)
        .then(function (response) {
            res.send(response);
        })
        .catch(function (err) {
            res.send(err);
        });
}

function uploadAvatar(req, res) {
    getInfomationUserUsing(req.headers[config.TOKEN]).then(function (deCodeData) {
        let uploadedFile = req.files.file;
        if (uploadedFile) {
            userService.uploadAvatar(deCodeData._id, uploadedFile)
                .then(function (response) {
                    res.send(response)
                })
                .catch(function (err) {
                    res.send(err);
                });
        } else {
            res.send({
                statusCode: message.STATUS_CODE.NOT_FOUND,
                message: message.ERROR_MESSAGE.USER.IMAGE_USER_NOT_FOUND
            });
        }
    });
}

function deleteUser(req, res) {
    userService.deleteUser(req.params).then(function (response) {
        res.send(response)
    }).catch(function (err) {
        res.send(err)
    });
}

function updateUser(req, res) {
    getInfomationUserUsing(req.headers[config.TOKEN]).then(function (deCodeData) {
        if (deCodeData) {
            req.body.myId = deCodeData._id;
            userService.updateUser(req.body).then(function (response) {
                res.send(response)
            }).catch(function (err) {
                res.send(err)
            });
        }
    });
}

function getUserById(req, res) {
    userService.getUserById(req.params).then(function (response) {
        res.send(response)
    }).catch(function (err) {
        res.send(err)
    });
}

function getAllUser(req, res) {
    userService.getAllUser().then(function (response) {
        res.send(response);
    }).catch(function (err) {
        res.send(err)
    })
}

function createUser(req, res) {
    userService.createUser(req.body).then(function (response) {
        res.send(response)
    }).catch(function (err) {
        res.send(err)
    });
}

function createAdmin(req, res) {
    userService.createAdmin(req.body).then(function (response) {
        res.send(response)
    }).catch(function (err) {
        res.send(err)
    });
}