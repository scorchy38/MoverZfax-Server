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

mongoose.connect('mongodb+srv://shubhsaras:shubhsaras38@moverzfax.2op18.mongodb.net/<dbname>?retryWrites=true&w=majority', {
  useNewUrlParser: true, useUnifiedTopology: true 
}, () => {
  console.log('Success');

})
const PORT = 5005;

app.listen(PORT,  console.log(`Server started on port ${PORT}`));
// https://whispering-meadow-64251.herokuapp.com/ | https://git.heroku.com/whispering-meadow-64251.git
