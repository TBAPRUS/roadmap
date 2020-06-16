import { Response } from 'express';
import { Ipagination } from './middleware';

export interface ResponseAdvancedResults<T> extends Response {
  advancedResults: {
    success: boolean;
    count: number;
    data: T[];
    pagination: Ipagination;
  };
}
