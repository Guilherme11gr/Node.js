'use-stric';

import ValidadorContract from '../../validator/ValidatorContract';

class CustomerValidator {
  constructor() {
    this.contract = new ValidadorContract();
  }

  isCustumerValid = ({ name, email, password }) => {
    this.isNameValid(name);
    this.isEmailValid(email);
    this.isPasswordValid(password);

    return this.contract.isValid();
  };

  isNameValid = name => this.contract.isRequired(name, 'name is required');

  isEmailValid = (email) => {
    this.contract.isRequired(email, 'email is required');
    this.contract.isEmail(email, 'email must be valid');
  };

  isPasswordValid = (password) => {
    this.contract.isRequired(password, 'password is required');
    this.contract.hasMinLen(password, 8, 'password must be a the least of 8 characters');
  };

  getErrors = () => this.contract.getErrors();
}

export default CustomerValidator;
