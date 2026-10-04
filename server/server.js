require('dotenv').config();

const app = require('./src/app');

const port = process.env.SERVER_PORT || 5000;

app.listen(port, () => {
  console.log(`Cyber threat backend listening on port ${port}`);
});
