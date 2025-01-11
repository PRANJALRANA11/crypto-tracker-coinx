import dotenv from "dotenv";
import connectDB from "./db/index.db";
import { app } from "./app";
import startPriceUpdateJob from "./utils/cryptoPriceCronJob";
dotenv.config({
  path: "./.env",
});

// connect to database
connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
  });

// cron job
startPriceUpdateJob();
