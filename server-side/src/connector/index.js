var mysql = require('mysql')

class Connector {
  constructor () {
    console.log('MySQL: constructor')

    this.connection = null

    const config = {
      connectionLimit: process.env.DATABASE_LIMIT,
      host: process.env.DATABASE_HOST,
      port: process.env.DATABASE_PORT,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      debug: process.env.DATABASE_DEBUG
    }

    this.pool = mysql.createPool(config)
    // console.log('MySQL: config', config)
  }

  async _open () {
    await new Promise((resolve, reject) => {
      this.pool.getConnection((err, connection) => {
        if (err) {
          return reject(err)
        }
        this.connection = connection
        resolve(connection)
      })
    })
  }

  async query (queryStatement, callback) {
    await this._open()

    this.connection.query(queryStatement, (err, rows, fields) => {
      if (err) {
        // eslint-disable-next-line
        callback(['Error while performing Query.', err], null)
      } else {
        callback(null, ['The solution is: ', rows])
      }
    })
  }
}

export default Connector
