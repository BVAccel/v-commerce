
export const money = (value) => {
  var str = String(parseFloat(value) / 100);
  str += (str.indexOf('.') < 0) ? '.00' : '00';
  return `$${str.substring(0, str.indexOf('.') + 3)}`;
}

export const moneyWithoutDecimals = value => {
  const dollars = parseFloat(value) / 100;
  const str = String(dollars);
  if (value % 100 === 0) {
    return '$' + str;
  }
  if (dollars < 1) {
    return '$' + dollars.toFixed(2);
  }
  if (str.includes('.')) {
    return '$' + str.substring(0, str.indexOf('.') + 3);
  }
  return '$' + str.substring(0, str.length - 2);
}