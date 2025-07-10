import { ZodError } from 'zod';

export class ZError {
  constructor(public readonly errors: string[]) {}

  static create(result): ZError {
    const errors: string[] = [];

    if (result instanceof ZodError) {
      result.errors.map((e) => {
        const campo = e.path.join('.') || 'body';

        switch (e.code) {
          case 'invalid_type':
            if (e.received === 'undefined') {
              errors.push(`${campo} is required.`);
            } else {
              errors.push(`Invalid type for ${campo}.`);
            }
            break;

          case 'too_small':
            errors.push(`${campo} must have at least ${e.minimum} characters.`);
            break;

          case 'too_big':
            errors.push(
              `${campo} exceeds the limit of ${e.maximum} characters.`,
            );
            break;

          case 'invalid_string':
            errors.push(`Invalid field ${campo}.`);
            break;

          case 'custom':
          case 'invalid_literal':
          default:
            errors.push(e.message || `Error on field ${campo}.`);
            break;
        }
      });
    }

    return new ZError(errors);
  }
}
