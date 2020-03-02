import ParsableError from './ParsableError';

describe('ParsableError', () => {
  describe('parseErrorMessage', () => {
    it('should return bag message if response not exists', () => {
      expect(ParsableError.parseErrorMessage(new Error('Foo'))).toBe('Foo');
    });

    it('should return bag message if data not exists', () => {
      const e: any = new Error('Foo');
      e.response = {};
      expect(ParsableError.parseErrorMessage(e)).toBe('Foo');
    });

    it('should return bag message if error response not exists', () => {
      const e: any = new Error('Foo');
      e.response = { data: {} };
      expect(ParsableError.parseErrorMessage(new Error('Foo'))).toBe('Foo');
    });

    it('should return bag message if response is string', () => {
      const e: any = new Error('Foo');
      e.response = 'Foo bar';
      expect(ParsableError.parseErrorMessage(e)).toBe('Foo');
    });

    it('should return bag message if error response is empty object', () => {
      const e: any = new Error('Foo');
      e.response = { data: { error: {} } };
      expect(ParsableError.parseErrorMessage(e)).toBe('Foo');
    });

    it('should return bag message if error response is empty string', () => {
      const e: any = new Error('Foo');
      e.response = { data: { error: 'Bar' } };
      expect(ParsableError.parseErrorMessage(e)).toBe('Foo');
    });

    it('should return bag message if error message is empty string', () => {
      const e: any = new Error('Foo');
      e.response = { data: { error: { message: '' } } };
      expect(ParsableError.parseErrorMessage(e)).toBe('Foo');
    });

    it('should return error message if error message exists', () => {
      const e: any = new Error('Foo');
      e.response = { data: { error: { message: 'Bar' } } };
      expect(ParsableError.parseErrorMessage(e)).toBe('Bar');
    });
  });

  describe('parseErrorCode', () => {
    it('should return unknown code if response not exists', () => {
      expect(ParsableError.parseErrorCode(new Error('Foo'))).toBe('UNKNOWN');
    });

    it('should return unknown code if data not exists', () => {
      const e: any = new Error('Foo');
      e.response = {};
      expect(ParsableError.parseErrorCode(e)).toBe('UNKNOWN');
    });

    it('should return unknown code if error response not exists', () => {
      const e: any = new Error('Foo');
      e.response = { data: {} };
      expect(ParsableError.parseErrorCode(new Error('Foo'))).toBe('UNKNOWN');
    });

    it('should return unknown code if response is string', () => {
      const e: any = new Error('Foo');
      e.response = 'Foo bar';
      expect(ParsableError.parseErrorCode(e)).toBe('UNKNOWN');
    });

    it('should return bag message if error response is empty string', () => {
      const e: any = new Error('Foo');
      e.response = { data: { error: 'Bar' } };
      expect(ParsableError.parseErrorCode(e)).toBe('UNKNOWN');
    });

    it('should return unknown code if error message is empty string', () => {
      const e: any = new Error('Foo');
      e.response = { data: { error: { code: '' } } };
      expect(ParsableError.parseErrorCode(e)).toBe('UNKNOWN');
    });

    it('should return AUTHORIZATION code if error message exists', () => {
      const e: any = new Error('Foo');
      e.response = { data: { error: { code: 'AUTHORIZATION' } } };
      expect(ParsableError.parseErrorCode(e)).toBe('AUTHORIZATION');
    });
  });
});
