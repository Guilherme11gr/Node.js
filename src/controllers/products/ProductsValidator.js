'use-stric';

import ValidadorContract from '../../validator/ValidatorContract';

class ProductValidator {
  constructor() {
    this.contract = new ValidadorContract();
  }

  // eslint-disable-next-line
  isProductValid = ({ title, price, description, tags, slug }) => {
    this.isTitleValid(title);
    this.isPriceValid(price);
    this.isDescriptionValid(description);
    this.isTagsValid(tags);
    this.isSlugValid(slug);

    return this.contract.isValid();
  };

  isTitleValid = (title) => {
    this.contract.isRequired(title, 'title is required');
    this.contract.hasMaxLen(title, 20, 'title must be a maximum of 20 characters');
  };

  isPriceValid = (price) => {
    this.contract.isRequired(price, 'price is required');
    this.contract.isNumber(price, 'price must be a number');
    this.contract.hasMinValue(price, 1, 'price must be greater than 0');
  };

  isDescriptionValid = (description) => {
    this.contract.isRequired(description, 'description is required');
    this.contract.hasMinLen(description, 10, 'description must be a the least of 10 characters');
    this.contract.hasMaxLen(description, 100, 'description must be a maximum of 100 characters');
  };

  isTagsValid = (tags) => {
    this.contract.isRequired(tags, 'tag is required');
    this.contract.isArray(tags, 'tag must be an array');
  };

  isSlugValid = (slug) => {
    this.contract.isRequired(slug, 'slug is required');
  };

  getErrors = () => this.contract.getErrors();
}

export default ProductValidator;
