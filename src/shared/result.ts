export type ResultProps<T> = {
  isSuccess: boolean;
  error?: string;
  data?: T;
};

export class Result<T> {
  readonly data: T;
  readonly error: string;

  private readonly _isSuccess: boolean;

  constructor({ isSuccess, error, data }: ResultProps<T>) {
    this._isSuccess = isSuccess;
    this.data = (data ?? {}) as T;
    this.error = error ?? ({} as string);
  }

  getValue(): T {
    return this.data;
  }

  isSuccess(): boolean {
    return this._isSuccess;
  }

  isFailure(): boolean {
    return !this._isSuccess;
  }

  getError(): string {
    return this.error;
  }

  static success<T>(value?: T): Result<T> {
    return new Result<T>({ isSuccess: true, data: value });
  }

  static failure<T>(error: string): Result<T> {
    return new Result<T>({ isSuccess: false, error });
  }
}
