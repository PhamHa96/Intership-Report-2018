var crypto = require('crypto');
// Mô tả: Hàm sinh chuỗi ngẫu nhiên
function genRandStr(string_lenght){
    return crypto.randomBytes(64)
    .toString('base64')
    .slice(0, string_lenght)
    .replace(/\+/g, '0')
    .replace(/\//g, '0')
}
// Mô tả: Hàm sinh chuỗi ngẫu nhiên (mặc định 20 ký tự)
function genSalt(){
    return genRandStr(20);
}
// Mô tả: mã hóa password
function hashWithSalt(password, salt) {
    return crypto.pbkdf2Sync(password, salt, 1000, 128, 'sha1').toString('base64');
}

module.exports = {
    hashWithSalt: hashWithSalt,
    genSalt: genSalt,
    genRandStr: genRandStr
};