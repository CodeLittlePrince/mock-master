const chalk = require('chalk')

const error = (msg) => {
  console.error(_format(chalk.bgRed(' ERROR '), chalk.red(msg)))
  if (msg instanceof Error) {
    console.error(msg.stack)
  }
}

const info = (msg) => {
  console.warn(_format(chalk.bgBlue.black(' INFO '), chalk.blue(msg)))
}

const warn = (msg) => {
  console.warn(_format(chalk.bgYellow.black(' WARN '), chalk.yellow(msg)))
}

const done = (msg) => {
  console.log(_format(chalk.bgGreen.black(' DONE '), chalk.green(msg)))
}

function _format (label, msg) {
  return msg.split('\n').map((line, index) => {
    return index === 0
      ? `${label} ${line}`
      : line
  }).join('\n')
}

exports.logger = {
  error,
  info,
  warn,
  done,
}