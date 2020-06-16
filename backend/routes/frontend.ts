import * as express from 'express';

export default (req: express.Request, res: express.Response, next) => {
  res.render('index');
};
