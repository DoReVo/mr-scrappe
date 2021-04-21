import winston, { format, Logger, transports } from 'winston'
const { combine, json, errors, cli } = format

let logger: Logger

// Development environment logger
const devLogger = winston.createLogger({
  transports: [new transports.Console()],
  format: combine(errors({ stack: true }), cli()),
  handleExceptions: true,
})

// Production environment logger
const prodLogger = winston.createLogger({
  transports: [new transports.Console()],
  format: combine(errors({ stack: true }), json()),
  handleExceptions: true,
})

if (process.env.NODE_ENV === 'development') logger = devLogger
else logger = prodLogger

export { logger }
