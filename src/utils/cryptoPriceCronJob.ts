import cron from "node-cron";
import CryptoService from "../services/cryptoPrice.services";

const startPriceUpdateJob = (): void => {
  // Run every 2 hours
  cron.schedule("0 */2 * * *", async () => {
    console.log("Running price update job...");
    try {
      await CryptoService.updatePrices();
      console.log("Price update job completed successfully");
    } catch (error) {
      console.error("Price update job failed:", error);
    }
  });
};

export default startPriceUpdateJob;
