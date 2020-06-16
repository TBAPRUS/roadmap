import { Request, Response } from 'express';

export const AsyncHandler = (
  fn: (req: Request, res: Response, next) => void
) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
