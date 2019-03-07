'use-stric';

import ValidadorContract from '../../validator/ValidatorContract';

class OrderValidator {
  constructor() {
    this.contract = new ValidadorContract();
  }

  // eslint-disable-next-line
  isOrderValid = ({ number, customer, status, items }) => {
    this.isNumberValid(number);
    this.isCustumerValid(customer);
    this.isItemValid(items);

    return this.contract.isValid();
  };

  isNumberValid = (number) => {
    this.contract.isRequired(number, 'name is required');
  };

  isCustumerValid = (customer) => {
    this.contract.isRequired(customer, 'customer id is required');
    this.contract.isString(customer, 'customer id must be a string');
  };

  isStatusValid = (status) => {
    this.contract.isRequired(status, 'status is required');
    const enumOptions = ['created', 'done'];
    this.contract.isEqualTo(enumOptions, status, 'status must be "created" or "done"');
  };

  isItemValid = (items) => {
    this.contract.isRequired(items, 'items is required');
    this.contract.isArray(items, 'items must be an array');
    this.isItemDeepValid(items);
  };

  isItemDeepValid = (items) => {
    items.forEach((item) => {
      const { quantity, price, product } = item;

      this.contract.isRequired(quantity, 'quantity is required');
      this.contract.isNumber(quantity, 'quantity must be a number');

      this.contract.isRequired(price, 'price is required');
      this.contract.isNumber(price, 'price must be a number');

      this.contract.isRequired(product, 'product is required');
    });
  };

  getErrors = () => this.contract.getErrors();
}

export default OrderValidator;
