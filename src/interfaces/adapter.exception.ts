export interface IAdapterException {
  code: number;
  path: string | null;
  timestamp: string;
  error: string;
  message: string;
  data: any;
}
