import { Controller, Get, UseFilters } from '@nestjs/common';
import { HealthCheck, HealthCheckResult } from '@nestjs/terminus';
import { HealthIndicator } from './health/health';
import { HealthCheckExceptionFilter } from './filters/health-check-exception.filter';

@Controller('{{ mainModule }}')
export class AppController {
  constructor(private healthIndicator: HealthIndicator) {}

  @Get('health')
  @HealthCheck()
  @UseFilters(HealthCheckExceptionFilter)
  async isHealth(): Promise<HealthCheckResult> {
    return await this.healthIndicator.isHealthy();
  }
}
