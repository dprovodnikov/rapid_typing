const express = require('express');
const app = express();
const join = require('path').join;

app.use(express.static( join(__dirname, '/public') ));

let port = process.env.PORT || 8000;

app.listen(port, (err) => {
  if(err) throw err;
});

app.get('/', (req, res) => res.render('index') );