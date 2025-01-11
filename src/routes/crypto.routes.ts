import { Router, Request, Response } from "express";
import { CoinId } from "../types/index.types";
import CryptoService from "../services/cryptoPrice.services";

const router = Router();

router.get("/stats", async (req: Request, res: Response) => {
  try {
    const coin = req.query.coin as CoinId;
    const stats = await CryptoService.getLatestStats(coin);
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

router.get("/deviation", async (req: Request, res: Response) => {
  try {
    const coin = req.query.coin as CoinId;
    const deviation = await CryptoService.calculateDeviation(coin);
    res.json(deviation);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

export default router;
