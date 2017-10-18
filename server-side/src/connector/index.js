var mysql = require('mysql')

class Connector {
  constructor () {
    console.log('MySQL: constructor')

    this.connection = null

    const config = {
      connectionLimit: 100,
      host: 'db',
      port: 3306,
      user: 'wordpress',
      password: 'wordpress',
      database: 'wordpress',
      debug: false
    }

    this.pool = mysql.createPool(config)
    console.log('MySQL: config', config)
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
