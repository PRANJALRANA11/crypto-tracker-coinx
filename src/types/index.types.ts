export type CoinId = "bitcoin" | "matic-network" | "ethereum";

export interface ICryptoPrice {
  coinId: CoinId;
  priceUSD: number;
  marketCapUSD: number;
  change24h: number;
  timestamp: Date;
}

export interface IStats {
  price: number;
  marketCap: number;
  "24hChange": number;
}

export interface IDeviation {
  deviation: number;
}

export interface ICoinGeckoResponse {
  [key: string]: {
    usd: number;
    usd_market_cap: number;
    usd_24h_change: number;
  };
}
