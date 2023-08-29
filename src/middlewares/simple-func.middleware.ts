import { Request, Response, NextFunction } from 'express'

export function simpleFunc(req: Request, res: Response, next: NextFunction) {
  next();
} 