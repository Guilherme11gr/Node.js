'use-stric';

import ValidadorContract from '../validator/ValidatorContract';

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
    this.contract.isRequired(title, 'O Titulo do produto é obrigatório');
    this.contract.hasMaxLen(title, 20, 'O Titulo deve conter no Maximo 20 caracteres');
  };

  isPriceValid = (price) => {
    this.contract.isRequired(price, 'O preço do produto é obrigatorio');
    this.contract.isNumber(price, 'O preço deve ser um numero');
    this.contract.hasMinValue(price, 1, 'O preço do produto não pode ser 0');
  };

  isDescriptionValid = (description) => {
    this.contract.isRequired(description, 'A descrição do produto é obrigatoria');
    this.contract.hasMinLen(description, 10, 'A Descrição do produto deve conter no minimo 10 caracteres');
    this.contract.hasMaxLen(description, 100, 'A Descrição do produto deve conter no maximo 100 caracteres');
  };

  isTagsValid = (tags) => {
    this.contract.isRequired(tags, 'As tags são obrigatorias');
  };

  isSlugValid = (slug) => {
    this.contract.isRequired(slug, 'O Slug é obrigatorio');
  };

  getErrors = () => this.contract.getErrors();
}

export default ProductValidator;
