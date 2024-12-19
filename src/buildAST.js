import _ from 'lodash';

const buildAST = (data1, data2) => {
  const keys = _.union(Object.keys(data1), Object.keys(data2));
  const sortedKeys = _.sortBy(keys);

  const children = sortedKeys.map((key) => {
    if (!(key in data1)) {
      return {
        type: 'added',
        key,
        value: data2[key],
      };
    } if (!(key in data2)) {
      return {
        type: 'removed',
        key,
        value: data1[key],
      };
    } if (
      typeof data1[key] === 'object'
      && !Array.isArray(data1[key])
      && typeof data2[key] === 'object'
      && !Array.isArray(data2[key])
    ) {
      return {
        type: 'nested',
        key,
        children: buildAST(data1[key], data2[key]),
      };
    } if (data1[key] !== data2[key]) {
      return {
        type: 'changed',
        key,
        oldValue: data1[key],
        newValue: data2[key],
      };
    }
    return {
      type: 'unchanged',
      key,
      value: data1[key],
    };
  });

  return children;
};

const getDiffTree = (data1, data2) => ({
  type: 'root',
  children: buildAST(data1, data2),
});

export default getDiffTree;
