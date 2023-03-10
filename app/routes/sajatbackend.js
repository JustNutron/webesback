const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  
  var connection
  function kapcsolat(){
    var mysql = require('mysql')

    connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'pcosszerako_kd'
    })
    
    connection.connect()
    
  }
  
  
  app.get('/processzor', (req, res) => {
    kapcsolat()
      
    connection.query('SELECT * from processzor', (err, rows, fields) => {
      if (err) throw err
    
      res.send(rows)
    })
    
    connection.end()
  })

//--------------- Proci felvitel -----------\\
  app.post('/procifelvitel', (req, res) => {
    kapcsolat()

    connection.query('INSERT into processzor values (null, "'+req.body.bevitel1+'", "'+ req.body.bevitel2 +'", '+req.body.bevitel3+', "'+ req.body.bevitel4 +'", "'+req.body.bevitel5+'", '+ req.body.bevitel6 +', "'+ req.body.bevitel7 +'")', (err, rows, fields) => {
      if (err) console.log(err)
        else
       res.send("Sikerült a felvitel!")
      })

      connection.end()
   })


};
