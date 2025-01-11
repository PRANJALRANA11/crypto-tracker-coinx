import mongoose, { Document, Model } from "mongoose";
import { ICryptoPrice, CoinId } from "../types/index.types";

interface ICryptoPriceDocument extends ICryptoPrice, Document {}

interface ICryptoPriceModel extends Model<ICryptoPriceDocument> {
  calculateStandardDeviation(coinId: CoinId, limit?: number): Promise<number>;
}

const CryptoPriceSchema = new mongoose.Schema<ICryptoPriceDocument>({
  coinId: {
    type: String,
    required: true,
    enum: ["bitcoin", "matic-network", "ethereum"],
    index: true,
  },
  priceUSD: {
    type: Number,
    required: true,
  },
  marketCapUSD: {
    type: Number,
    required: true,
  },
  change24h: {
    type: Number,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
    index: true,
  },
});

CryptoPriceSchema.index({ coinId: 1, timestamp: -1 });

// for calculating standard deviation middleware
CryptoPriceSchema.statics.calculateStandardDeviation = async function (
  coinId: CoinId,
  limit: number = 100
): Promise<number> {
  const prices = await this.find({ coinId })
    .sort({ timestamp: -1 })
    .limit(limit)
    .select("priceUSD")
    .lean();

  const priceValues = prices.map((p: ICryptoPrice) => p.priceUSD);

  if (priceValues.length === 0) return 0;

  const mean =
    priceValues.reduce((a: number, b: number) => a + b) / priceValues.length;
  const variance =
    priceValues.reduce((a: number, b: number) => a + Math.pow(b - mean, 2), 0) /
    priceValues.length;
  return Math.sqrt(variance);
};

const CryptoPrice = mongoose.model<ICryptoPriceDocument, ICryptoPriceModel>(
  "CryptoPrice",
  CryptoPriceSchema
);

export default CryptoPrice;
