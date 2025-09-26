import { config } from "dotenv";
config();

import app from "./src/app";
import { config as conf } from "./src/config/config";
import connectDB from "./src/config/db";

const startServer = async () => {
  const port = conf.port || 3000;
  await connectDB();
  app.listen(port, () => console.log("started ", port));
};

startServer();
