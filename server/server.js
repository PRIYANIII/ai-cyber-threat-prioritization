require('dotenv').config();

const app = require('./src/app');
const { connectDatabase, getDatabaseStatus } = require('./src/config/db');

const port = process.env.SERVER_PORT || 5000;

async function startServer() {
  await connectDatabase();

  app.listen(port, () => {
    const database = getDatabaseStatus();
    console.log(`Cyber threat backend listening on port ${port}`);

    if (!database.connected) {
      console.error(
        'MongoDB is unavailable. Start MongoDB locally or set MONGO_URI to a reachable MongoDB Atlas cluster.',
      );
    }
  });
}

startServer();
