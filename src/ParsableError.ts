export default class ParsableError {
  private error: any;

  constructor(error: any) {
    this.error = error;
  }

  private isResponseExist(): boolean {
    return typeof this.error.response === 'object';
  }

  private isResponseDataExist(): boolean {
    return typeof this.error.response.data === 'object';
  }

  private isErrorObjectExist(): boolean {
    return typeof this.error.response.data.error === 'object';
  }

  private isErrorMessageExist(): boolean {
    return !!this.error.response.data.error.message;
  }

  private isErrorCodeExist(): boolean {
    return !!this.error.response.data.error.code;
  }

  public hasErrorMessage(): boolean {
    if (!this.isResponseExist()) return false;
    if (!this.isResponseDataExist()) return false;
    if (!this.isErrorObjectExist()) return false;
    if (!this.isErrorMessageExist()) return false;
    return true;
  }

  private hasErrorCode(): boolean {
    if (!this.isResponseExist()) return false;
    if (!this.isResponseDataExist()) return false;
    if (!this.isErrorObjectExist()) return false;
    if (!this.isErrorCodeExist()) return false;
    return true;
  }

  public getMessage(): string {
    if (this.hasErrorMessage()) return this.error.response.data.error.message;
    return this.error.message;
  }

  public getCode(): string {
    if (this.hasErrorCode()) return this.error.response.data.error.code;
    return 'UNKNOWN';
  }

  public static parseErrorMessage(error: any): string {
    const pError = new ParsableError(error);
    return pError.getMessage();
  }

  public static parseErrorCode(error: any): string {
    const pError = new ParsableError(error);
    return pError.getCode();
  }
}
