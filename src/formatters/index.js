import stylishDiff from './stylish.js';
import plainDiff from './plain.js';

const formatter = {
  json: JSON.stringify,
  stylish: stylishDiff,
  plain: plainDiff,
};

export default (tree, format) => formatter[format](tree);
