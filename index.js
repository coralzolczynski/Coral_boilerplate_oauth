const express   = require('express');
const morgan    = require('morgan');
const mongoose  = require('mongoose');
const cors      = require('cors');

const app = express();

// database setup
mongoose.connect('mondodb://localhost:auth/auth', { useNewUrlParser: true, useCreateIndex: true });

// middleware set-up
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// if we are in production serve our clients build folder
// this folder is created during production only
if(process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}

// routes setup
const routes = require('./routes');
app.use(routes);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`Server stated on Port ${PORT}`));