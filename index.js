const express = require('express');
const { handler } = require('./controller');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('*', async (req, res) => {
  try {
    res.send(await handler(req));
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
});

app.post('*', async (req, res) => {
  try {
    res.send(await handler(req));
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, (err) => {
  if (err) console.log(err);
  console.log(`Server is running at port ${port}`);
});
