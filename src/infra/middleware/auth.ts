import { Request, Response, NextFunction } from 'express';

const apiKey = process.env.API_KEY;

const auth = (req: Request, res: Response, next: NextFunction) => {
  const providedApiKey = req.headers['api-key'];

  if (!providedApiKey || providedApiKey !== apiKey) {
    return res.status(401).json({ error: 'API key inválida' });
  }

  next();
};

export { auth };
