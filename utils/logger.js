import fs from 'fs';
import winston, { format } from 'winston';

import CONFIG from '../config';

import 'winston-daily-rotate-file';


// Use LOG_DIR from env
const LOG_DIR = process.env.LOG_DIR || 'logs';
const LOG_LEVEL = process.env.LOG_LEVEL || 'debug';

// Create log directory if it does not exist
if (!fs.existsSync(LOG_DIR)) {
  fs.mkdirSync(LOG_DIR);
}

// Ignore log messages if they have { private: true }
const ignorePrivate = format((info/* , opts */) => {
  // console.log("info: %o \n opts: %o", info, opts)
  if (info.private) { return false; }
  if (CONFIG.LOGGING_DATA_OUTPUT === 'false')
    delete info.dataOutput;

  return info;
});

/**
 * Create a new winston logger.
 */
const logger = winston.createLogger({
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    verbose: 3,
    silly: 4,
    verify: 5,
    sync: 6,
    config: 7,
    configBackup: 8,
    configCopy: 9,
    configUndo: 10,
    configDelete: 11,
    dns: 12,
    login: 13,
    debug: 14,
  },
  transports: [
    new winston.transports.Console({
      format: format.combine(format.colorize(), ignorePrivate(), format.simple()),
      level: 'info'
    }),
    new winston.transports.DailyRotateFile({
      format: format.combine(format.timestamp(), ignorePrivate(), format.json()),
      maxFiles: '15d',
      maxSize: '1mb',
      level: LOG_LEVEL,
      dirname: LOG_DIR,
      datePattern: 'YYYY-MM-DD',
      filename: '%DATE%-log.json'
    })
  ]
});

const colors = {
  verbose: 'white',
  info: 'green',
  warn: 'yellow',
  error: 'red',
  debug: 'white',
  silly: 'white',
  verify: 'brown',
  sync: 'chocolate',
  config: 'gold',
  configCopy: 'gray',
  configUndo: 'greenYellow',
  configDelete: 'indianRed',
  dns: 'lavender',
  configBackup: 'bisque',
  login: 'cadetblue'
};

winston.addColors(colors);


export const logStream = {
  /**
   * A writable stream for winston logger.
   *
   * @param {any} message
   */
  write(message) {
    logger.info(message.toString());
  }
};

export default logger;
