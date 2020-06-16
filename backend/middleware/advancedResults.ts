import { Model, Document } from 'mongoose';
import { AsyncHandler } from './async';
import { ResponseAdvancedResults } from '../interfaces/response';
import { RequestAdvancedResults, RequestUser } from '../interfaces/request';
import { Ipagination } from '../interfaces/middleware';

export function advancedResults<T>(
  model: Model<Document>,
  populate?: string,
  regexps?: string[],
  privateRes?: string
) {
  return AsyncHandler(
    async (
      req: RequestAdvancedResults,
      res: ResponseAdvancedResults<T>,
      next
    ) => {
      let query;

      let removeFields: string[] = ['select', 'sort', 'page', 'limit'];

      if (regexps) {
        removeFields = [...removeFields, ...regexps];
      }

      const reqQuery = { ...req.query };

      removeFields.forEach((param) => delete reqQuery[param]);

      let quertStr: string = JSON.stringify(reqQuery);

      quertStr = quertStr.replace(
        /\b(gt|gte|lt|lte|in)\b/g,
        (match: string) => `$${match}`
      );

      const parseQueryStr = JSON.parse(quertStr);

      if (privateRes) {
        if (!req.user) {
          parseQueryStr[privateRes] = 'public';
        } else if (req.user.role !== 'admin') {
          parseQueryStr[privateRes] = 'public';
        }
      }

      if (regexps) {
        regexps.forEach((regexp) => {
          if (req.query[regexp]) {
            parseQueryStr[regexp] = {
              $regex: new RegExp(req.query[regexp], 'i'),
            };
          }
        });
      }

      query = model.find(parseQueryStr);
      if (req.query.select) {
        const fields: string = req.query.select.split(',').join(' ');
        query = query.select(fields);
      }

      if (req.query.sort) {
        const sortBy: string = req.query.sort.split(',').join(' ');
        query.sort(sortBy);
      } else {
        query = query.sort('name');
      }

      const page: number = parseInt(req.query.page, 10) || 1;
      const limit: number = parseInt(req.query.limit, 10) || 10;
      const startIndex: number = (page - 1) * limit;
      const endIndex: number = page * limit;
      const total: number = await model.countDocuments(parseQueryStr);

      query = query.skip(startIndex).limit(limit);

      if (populate) {
        query.populate(populate);
      }

      let results = await query;
      const pagination: Ipagination = {};

      if (endIndex < total) {
        pagination.next = {
          page: page + 1,
          limit,
        };
      }

      if (startIndex > 0) {
        pagination.prev = {
          page: page - 1,
          limit,
        };
      }

      res.advancedResults = {
        success: true,
        count: results.length,
        data: results,
        pagination,
      };

      next();
    }
  );
}
