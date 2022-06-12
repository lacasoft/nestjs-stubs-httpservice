import { AdapterException } from '../exceptions/adapter.exception';
import {
  ArgumentsHost,
  ExceptionFilter,
  Catch,
  HttpStatus,
} from '@nestjs/common';
import { HttpStatusLabels } from '../constants/http.errors.labels';

@Catch(AdapterException)
export class AdapterExceptionFilter implements ExceptionFilter {
  catch(exception: AdapterException, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse();
    const request = context.getRequest();
    const data = exception.getDetails();
    data.path = request.url;

    if (data?.code?.toString() == 'ECONNREFUSED') {
      return this.connectionRefusedError(request, response);
    }

    response.status(data.code).json(data);
  }

  connectionRefusedError(request, response) {
    return response.status(HttpStatus.GATEWAY_TIMEOUT).json({
      code: HttpStatus.GATEWAY_TIMEOUT,
      path: request.url,
      timestamp: new Date().toISOString(),
      error: HttpStatusLabels[HttpStatus.GATEWAY_TIMEOUT],
    });
  }
}
