require('dotenv').config();
const express = require('express')
const { APP_PORT } = require('./config/app');
const routes = require('./routes/v1');
const db = require('./models')
const app = express()
const port = APP_PORT

db.sequelize.authenticate()
 .then(() => console.log('Database connected'))
 .catch((err) => console.error('Error connecting to database:', err));

// const port = process.env.PORT

//Routes
app.use('/api/v1', routes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})