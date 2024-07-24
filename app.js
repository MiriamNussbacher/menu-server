const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());


const membersRouter= require('./routes/members');
app.use('/members', membersRouter);

app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Internal Server Error!')
  })

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
