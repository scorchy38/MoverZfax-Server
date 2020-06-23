const express = require('express');
const app = express();
const mongoose = require('mongoose');

const postsRoute = require('./routes/posts');
const moverRoute = require('./routes/movers');
const bodyParser = require('body-parser');

app.use(bodyParser.json());


app.use('/posts', postsRoute);
app.use('/movers',moverRoute);

app.get('/', (req, res) => {
  res.send('We are on just starting');
});

mongoose.connect('localhost:27017', {
  useNewUrlParser: true
}, () => {
  console.log('Success');

})
app.listen(27017);
