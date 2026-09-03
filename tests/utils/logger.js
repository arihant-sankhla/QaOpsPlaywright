/**
 * Logger Utility for consistent logging across tests
 */
class Logger {
  constructor(name = 'Test', level = process.env.LOG_LEVEL || 'info') {
    this.name = name;
    this.level = level;
    this.levels = { debug: 0, info: 1, warn: 2, error: 3 };
  }

  _log(level, message, data = null) {
    const timestamp = new Date().toISOString();
    const prefix = `[${timestamp}] [${level.toUpperCase()}] [${this.name}]`;
    
    if (this.levels[level] >= this.levels[this.level]) {
      if (data) {
        console.log(`${prefix} ${message}`, data);
      } else {
        console.log(`${prefix} ${message}`);
      }
    }
  }

  debug(message, data = null) {
    this._log('debug', message, data);
  }

  info(message, data = null) {
    this._log('info', message, data);
  }

  warn(message, data = null) {
    this._log('warn', message, data);
  }

  error(message, data = null) {
    this._log('error', message, data);
  }
}

module.exports = { Logger };
