/* eslint-disable no-unused-vars */
import morgan from 'morgan';
import expressFileUpload from 'express-fileupload';
import { json, urlencoded } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { helpers, genericErrors, constants } from '../app/utils';
import apiV1Routes from '../app/routes/v1';

const {
  GenericHelper: { errorResponse, successResponse }
} = helpers;
const { WELCOME, TEMPORAL_PROJECT_RUNNING, v1 } = constants;
const { notFoundApi } = genericErrors;

const appConfig = (app) => {
  app.use(morgan('combined', { stream: logger.stream }));
  app.use(helmet());
  app.use(cors());
  app.use(
    json({
      verify: (req, res, buf) => {
        req.rawBody = buf;
      }
    })
  );
  app.use(urlencoded({ extended: true }));
  app.use(expressFileUpload({ useTempFiles: true }));
  app.get('/', (req, res) => successResponse(res, { message: WELCOME }));
  app.use(v1, apiV1Routes);
  app.use((req, res, next) => {
    next(notFoundApi);
  });
  app.use((err, req, res, next) => errorResponse(req, res, err));
};

export default appConfig;
