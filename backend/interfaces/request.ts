import { Request } from 'express';

import { IUserDocument } from './user';

export interface RequestAdvancedResults extends Request, RequestUser {
  query: {
    select?: string;
    sort?: string;
    page?: string;
    limit?: string;
    private?: string;
    regexps?: string[];
  };
}

export interface RequestUser extends Request {
  user?: IUserDocument;
}
