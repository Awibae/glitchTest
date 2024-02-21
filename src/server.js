const stoppable = require('stoppable');

const mongoose = require('mongoose');

const app = require('./app');

const port = parseInt(process.env.PORT || 8080);

mongoose.set("strictQuery", false);
mongoose.connect('mongodb+srv://AlexDB:Alexander1028@senecaweb.oozwx6e.mongodb.net/?retryWrites=true&w=majority')
  .then(() => console.log('Connected to the MongoDB Database!'
  )).catch((error) => {
    console.log(error);
});

const server = stoppable(
  app.listen(port, () => {
    console.log(`Server started on port ${ port }`);
  })
);
