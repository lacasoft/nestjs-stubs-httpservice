import {
  HealthCheckService,
  MemoryHealthIndicator,
  TypeOrmHealthIndicator,
  HealthCheckResult,
} from '@nestjs/terminus';
import { Injectable } from '@nestjs/common';
import { HealthCheckException } from '../exceptions/health.check.exception';

@Injectable()
export class HealthIndicator {
  constructor(
    private health: HealthCheckService,
    private memory: MemoryHealthIndicator,
    private db: TypeOrmHealthIndicator,
  ) {}

  async isHealthy(): Promise<HealthCheckResult> {
    try {
      return await this.health.check([
        async () => this.memory.checkHeap('memory_heap', 200 * 1024 * 1024),
        async () => this.memory.checkRSS('memory_rss', 3000 * 1024 * 1024),
        async () => this.db.pingCheck('database', { timeout: 3000 }),
      ]);
    } catch (error) {
      throw new HealthCheckException(error?.response);
    }
  }
}
