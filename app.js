const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const indexRouter = require("./routes/index");
const app = express();

require('dotenv').config();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api", indexRouter);

const mongoURI = process.env.LOCAL_DB_ADDRESS;
mongoose.connect(mongoURI)
  .then(() => console.log('디비 연결'))
  .catch((err) => console.log('디비연결 에러'));

app.listen(process.env.PORT || 5055, () => {
  console.log('server on')
});



