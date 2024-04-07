const Env = require('env-var')

module.exports = {
  NODE_ENV: Env.get('NODE_ENV').required().asString(),
  DB_HOST: Env.get('DB_HOST').required().asString(),
  DB_DATABASE: Env.get('DB_DATABASE').required().asString(),
  DB_USERNAME: Env.get('DB_USERNAME').required().asString(),
  DB_PASSWORD: Env.get('DB_PASSWORD').required().asString(),
  DB_PORT: Env.get('DB_PORT').required().asPortNumber(),
  APP_PORT: Env.get('APP_PORT').required().asPortNumber()
}
