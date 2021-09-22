export enum LogLevel {
    Debug = 'debug',
    Verbose = 'notice',
    Info = 'info',
    Warn = 'warning',
    Error = 'error',
  }

export type LoggerMessage = {
    startTimeStamp: number,
    duration: number,
    routeName: string,
    level: LogLevel
}

export interface IWinstonLogger {
    log(logMessage: LoggerMessage): void
}