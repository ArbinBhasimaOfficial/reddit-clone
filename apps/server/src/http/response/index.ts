import type { Response } from "express";

export type ResponseFormat<T extends Record<any, any> = {}> = {
  message: string;
  statusCode: number;
  data: T | null;
};

export function formatResponse<T extends Record<string, any>>(
  args: ResponseFormat<T>,
): ResponseFormat<T> {
  return {
    message: args.message,
    statusCode: args.statusCode,
    data: args.data ?? null,
  };
}

export function sendResponse<T extends Record<string, any>>(
  args: {
      res: Response,
  }  & ResponseFormat<T>,
) {
    const {res, ...others} = args;
    return res.status(others.statusCode).json(others.data);
}
