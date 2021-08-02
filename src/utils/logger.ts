import * as winston from 'winston'
import * as DailyRotateFile from 'winston-daily-rotate-file'

interface Config {
  bussiness: string
}

const createLogger = ({ bussiness }: Config) =>
  winston.createLogger({
    transports: [
      new winston.transports.Console(),
      new DailyRotateFile({
        filename: `%DATE%.log`,
        datePattern: 'YYYY-MM-DD',
        maxSize: '20m',
        dirname: `./logs/${bussiness}`,
      }),
    ],
  })

export const logRequest = createLogger({
  bussiness: 'request',
})

export const logError = createLogger({
  bussiness: 'server-error',
})
