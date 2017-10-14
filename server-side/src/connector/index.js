var mysql = require('mysql')

class Connector {
  constructor () {
    console.log('MySQL: constructor')
    
    this.mysql = mysql;
    this.connection = null

    this.config = {
      host: 'db',
      port: 3306,
      user: 'wordpress',
      password: 'wordpress',
      database: 'wordpress'
    }

    console.log('MySQL: config', this.config)
  }

  _open () {
    //console.log('MySQL: opening:', this.config)
    this.connection = this.mysql.createConnection(this.config)
    // console.log('MySQL: createConnection:', this.connection)

    this.connection.connect(err => {
      // console.log('MySQL: connecting')
      if (err) console.log(err);
      console.log('MySQL: connected')
    })
  }

  _close () {
    // console.log('MySQL: disconnecting', this.connection)
    this.connection.end()
    console.log('MySQL: disconnected')
  }

  query (queryStatement, callback) {
    this._open();
    // console.log('MySQL: quering', this.connection)
    this.connection.query(queryStatement, (err, rows, fields) => {
      this._close()

      if (err) {
        callback(['Error while performing Query.', err], null);
      } else {
        callback(null, ['The solution is: ', rows]);
      }
    })
  }
}

export default Connector
