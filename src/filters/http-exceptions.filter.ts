import { HttpStatusLabels } from '../constants/http.errors.labels';

import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  HttpException,
} from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse();
    const request = context.getRequest();
    const { url: path } = request;
    const cathExeption: any = exception.getResponse();
    const code =
      cathExeption.statusCode || cathExeption.status || exception.getStatus();
    const error = cathExeption.error || HttpStatusLabels[code];
    const timestamp = new Date().toISOString();
    const message = cathExeption.message || exception.message;
    const errorResponse = { code, error, path, timestamp, message };

    if (exception.getStatus() == HttpStatus.INTERNAL_SERVER_ERROR)
      response.status(HttpStatus.BAD_REQUEST).json(errorResponse);
    else response.status(exception.getStatus()).json(errorResponse);
  }
}
