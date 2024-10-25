export const groupByArray = function (xs, key) {
  return xs.reduce(function (rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};

export const calcBmi = (weight, height) => {
  return (weight / (height * height)).toFixed(1);
};
