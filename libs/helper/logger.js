const appRoot = require('app-root-path');
const {createLogger,transports} = require('winston');
const {format} = require('winston');
const moment  = require ('moment');
const config  = require ('config');
const dateFormat = require('../utility/dateformat');

const { combine, label, timestamp, printf } = format;

const myFormat = printf(info => `${info.timestamp} [${info.level}]: ${info.label} - ${info.message}`);

module.exports = options = {
  file: {
    level: 'info',
    name: 'file.info',
    filename: `${appRoot}/logs/app.log`,
    handleExceptions: true,
    json: false,
    maxsize: 5242880, // 5MB
    maxFiles: 100,
    colorize: true,
    colorize: false,
    timestamp :true,
  },
  errorFile: {
    level: 'error',
    name: 'file.error',
    filename: `${appRoot}/logs/error.log`,
    handleExceptions: true,
    json: false,
    maxsize: 5242880, // 5MB
    maxFiles: 100,
    colorize: true,
    colorize: false,
    timestamp :true,
  },
  console: {
    level: 'debug',
    handleExceptions: true,
    json: false,
    //colorize: true,
  },
};
module.exports =  configs = {
  levels: {
    error: 0,
    debug: 1,
    warn: 2,
    data: 3,
    info: 4,
    verbose: 5,
    silly: 6
  },
  colors: {
    error: 'red',
    debug: 'blue',
    warn: 'yellow',
    data: 'grey',
    info: 'green',
    verbose: 'cyan',
    silly: 'magenta'
  }
};



// your centralized logger object
const logger = createLogger({
    level: 'info',
    format: combine(
      label({ label: 'main'}),
      timestamp(),
      myFormat
    ),
  transports: [
    new (transports.Console)(options.console),
    new (transports.File)(options.errorFile),
    new (transports.File)(options.file)
  ],
  levels: configs.levels,
  //colors: configs.colors, not supported to the upgraded version
  exitOnError: false
})
function handleLog(message, level) {
    var date = new Date().toLocaleString();
    date= dateFormat(date, "dddd, mmmm dS, yyyy, h:MM:ss TT");
    //date = date.toString('YYYY-MMB-DD HH:mm:ss');
    const logData = {
      timestamp:date,
      message,
    }
  
    return logger[level](logData)
  }
  function info(message) {
    handleLog(message, 'info');
  }

module.exports =
 {
  info
}
/*
const configs = {
    levels: {
      error: 0,
      debug: 1,
      warn: 2,
      data: 3,
      info: 4,
      verbose: 5,
      silly: 6
    },
    colors: {
      error: 'red',
      debug: 'blue',
      warn: 'yellow',
      data: 'grey',
      info: 'green',
      verbose: 'cyan',
      silly: 'magenta'
    }
  };
  //winston.emitErrs = true;
  
  exports.logger = new winston.createLogger({
    transports: [
      new winston.transports.File({
        filename:  `${appRoot}/logs/error.log`,
        handleExceptions: true,
        json: false,
        maxsize: 5242880, //5MB
        maxFiles: 5,
        colorize: false,
        timestamp :true,
      }),
      new winston.transports.Console({
        handleExceptions: true,
        json: false,
        colorize: true,
        timestamp :true,
        prettyPrint: true,
      })
       /*new winston.transports.Logentries({
          //token: config.get('LOGENTRIES.TOKEN'),
          handleExceptions: true,
          json: false,
          colorize: true,
          timestamp :true,
          prettyPrint: true,
       })
    ],
    //levels: configs.levels,
    //colors: configs.colors,
    exitOnError: false
  });*/