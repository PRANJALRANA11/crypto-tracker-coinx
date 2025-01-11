import axios from "axios";
import {
  CoinId,
  ICryptoPrice,
  IStats,
  IDeviation,
  ICoinGeckoResponse,
} from "../types/index.types";
import CryptoPrice from "../models/cryptoPrice.models";

class CryptoService {
  // fetch the price
  static async fetchCryptoPrices(coins: CoinId[]): Promise<ICryptoPrice[]> {
    try {
      const response = await axios.get<ICoinGeckoResponse>(
        `${process.env.COINGECKO_API_URL}/simple/price`,
        {
          params: {
            ids: coins.join(","),
            vs_currencies: "usd",
            include_market_cap: true,
            include_24hr_change: true,
            x_cg_demo_api_key: process.env.COINGECKO_API_KEY,
          },
        }
      );

      return Object.entries(response.data).map(([coinId, data]) => ({
        coinId: coinId as CoinId,
        priceUSD: data.usd,
        marketCapUSD: data.usd_market_cap,
        change24h: data.usd_24h_change,
        timestamp: new Date(),
      }));
    } catch (error) {
      console.error("Error fetching crypto prices:", error);
      throw error;
    }
  }

  // for cron job updates
  static async updatePrices(): Promise<ICryptoPrice[]> {
    const coins: CoinId[] = ["bitcoin", "matic-network", "ethereum"];
    try {
      const prices = await this.fetchCryptoPrices(coins);
      const savedPrices = await Promise.all(
        prices.map((price) => new CryptoPrice(price).save())
      );
      console.log("Prices updated successfully:", savedPrices);
      return savedPrices;
    } catch (error) {
      console.error("Error updating prices:", error);
      throw error;
    }
  }

  // get the latest stats of price
  static async getLatestStats(coinId: CoinId): Promise<IStats> {
    try {
      const stats = await CryptoPrice.findOne({ coinId })
        .sort({ timestamp: -1 })
        .lean();

      if (!stats) {
        throw new Error("No data found for the specified coin");
      }

      return {
        price: stats.priceUSD,
        marketCap: stats.marketCapUSD,
        "24hChange": stats.change24h,
      };
    } catch (error) {
      console.error("Error getting latest stats:", error);
      throw error;
    }
  }

  static async calculateDeviation(coinId: CoinId): Promise<IDeviation> {
    try {
      const deviation = await CryptoPrice.calculateStandardDeviation(coinId);
      return { deviation: Number(deviation.toFixed(2)) };
    } catch (error) {
      console.error("Error calculating deviation:", error);
      throw error;
    }
  }
}

export default CryptoService;
