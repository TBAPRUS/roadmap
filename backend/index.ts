import * as express from 'express';
import * as cookieParser from 'cookie-parser';
import * as path from 'path';

import * as morgan from 'morgan'; // Logger
import * as dotenv from 'dotenv'; // Env vars
import * as fileUpload from 'express-fileupload';

import * as mongoSanitize from 'express-mongo-sanitize';
import * as helmet from 'helmet';
import * as xss from 'xss-clean';
import * as rateLimit from 'express-rate-limit';
import * as hpp from 'hpp';

import { errorHandler } from './middleware/error';

// Set env vars
dotenv.config({ path: './config/config.env' });

import { db } from './config/db';

db();

import { router } from './routes/index';

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(express.json());

app.use(cookieParser());

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(fileUpload());

// Sanitize data
app.use(mongoSanitize());

// Set security headers
app.use(helmet());

// Prevent XSS attacks
app.use(xss());

// Prevent http param pollution
app.use(hpp());

// Rate limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 mins
  max: 100,
});
app.use(limiter);

app.use(express.static(path.join(__dirname, 'public')));

// Routs
app.use(router);

app.use(errorHandler);

const PORT: number = parseInt(process.env.PORT) || 80;

const server = app.listen(PORT, () =>
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);

process.on('unhandledRejection', (err: { message: string }, promis) => {
  console.log(`Error: ${err.message}`);
});
