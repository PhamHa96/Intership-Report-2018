var winston = require('winston');
const fs = require('fs');
const path = require('path');
const moment = require('moment');
const filenameInfo = path.join(__dirname, 'file_info.log');
const filenameErr = path.join(__dirname, 'file_err.log');

try { fs.unlinkSync(filename); }
catch (ex) { }

var log = winston.createLogger({
  transports: [
    // info console log
    new(winston.transports.Console)({
      level: 'info',
      name: 'info-console',
      colorize: true,
    }),
    // info log file
    new(winston.transports.File)({
      level: 'info',
      name: 'info-file',
      filename: filenameInfo,
      colorize: true,
      timestamp: () => moment().format('YYYY-MM-DD HH-mm-ss'),
      message: a => a.timestamp() + ' :::TIME::: ' + a.message,
      json: false
    }),
    // errors log file
    new(winston.transports.File)({
      level: 'error',
      name: 'error-file',
      filename: filenameErr,
      colorize: true,
      timestamp: () => moment().format('YYYY-MM-DD HH-mm-ss'),
      json: false
    })
  ]
});

// setTimeout(function () {
//   //
//   // Remove the file, ignoring any errors
//   //
//   try { fs.unlinkSync(filename); }
//   catch (ex) { }
// }, 1000);
module.exports = log;