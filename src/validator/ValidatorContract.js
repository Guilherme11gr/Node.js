'use-stric';

class ValidadorContract { /* eslint-disable */
  constructor() {
    this.errors = [];
  }

  isRequired = (value, message) => !value || value.length <= 0 ? this.errors.push({ message }) : null;

  hasMinLen = (value, min, message) => !value || value.length < min ? this.errors.push({ message }) : null;

  hasMaxLen = (value, max, message) => value.length > max ? this.errors.push({ message }) : null;

  isFixedLen = (value, len, message) => value.length != len ? this.errors.push({ message }) : null;

  isNumber = (value, message) => typeof value === 'number' ? this.errors.push({ message }) : null;

  hasMinValue = (value, min, message) => value < min ? this.errors.push({ message }) : null

  isEmail = (value, message) => {
    const reg = new RegExp(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/);
    !reg.test(value) ? this.errors.push({ message }) : null
  }

  getErrors = () => this.errors;

  clear = () => this.errors = [];

  isValid = () => this.errors.length === 0;
}

export default ValidadorContract;
