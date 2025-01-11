import express from "express";
import startPriceUpdateJob from "./utils/cryptoPriceCronJob";
import router from "./routes/crypto.routes";

const app = express();

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use("/api/v1/", router);
// cron job
startPriceUpdateJob();

export { app };
