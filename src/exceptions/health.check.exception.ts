import { IHealthCheckException } from '../interfaces/health.exception';

export class HealthCheckException {
  constructor(private data: IHealthCheckException) {}

  getDetails(): IHealthCheckException {
    return this.data;
  }
}
