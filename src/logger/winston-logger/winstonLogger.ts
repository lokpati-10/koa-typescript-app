import { IWinstonLogger, LoggerMessage } from '../../types'
import winston, { Logger } from 'winston'

export class WinstonLogger implements IWinstonLogger {
  protected logger: Logger
  protected static instance: WinstonLogger

  static getInstance() {
    if (!this.instance) this.instance = new WinstonLogger(winston)
    return this.instance
  }

  constructor(_winston: typeof winston) {
    this.logger = winston.createLogger({
      transports: [
        new winston.transports.File({
          filename: 'info.txt',
          dirname: 'log'
        })
      ],
      format: winston.format.json()
    })
  }

  log(logMessage: LoggerMessage) {
    const { level, ...rest } = logMessage
    this.logger.log(level, '', rest)

    Promise.resolve()
  }
}

export const createWinstonLogger = () => WinstonLogger.getInstance()
