import { IAdapterException } from '../interfaces/adapter.exception';

export class AdapterException {
  constructor(private data: IAdapterException) {}

  getDetails(): IAdapterException {
    return this.data;
  }
}
