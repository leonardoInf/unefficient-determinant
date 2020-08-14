function determinant(m) {
  const dimension = m[0].length;
  if (dimension == 2) {
    return m[0][0] * m[1][1] - m[0][1] * m[1][0];
  } else if (dimension == 3) {
    return sarrus(m);
  } else {
    return laplace(m, dimension);
  }
}

function sarrus(m) {
  const diagonal1 =
    m[0][0] * m[1][1] * m[2][2] +
    m[0][1] * m[1][2] * m[2][0] +
    m[0][2] * m[1][0] * m[2][1];

  const diagonal2 =
    m[2][0] * m[1][1] * m[0][2] +
    m[2][1] * m[1][2] * m[0][0] +
    m[2][2] * m[1][0] * m[0][1];

  return diagonal1 - diagonal2;
}

function laplace(m, dim) {
  const chosenRow = m[dim - 1];
  m.pop();
  var sum = 0;
  for (let i = 0; i < dim; i++) {
    var smallerMatrix = JSON.parse(JSON.stringify(m)); //deep copy
    for (let j = 0; j < dim - 1; j++) {
      smallerMatrix[j].splice(i, 1);
    }
    sum +=
      ((i + 1 + dim) % 2 == 0 ? 1 : -1) *
      chosenRow[i] *
      determinant(smallerMatrix);
  }
  return sum;
}

console.log(
  determinant([
    [0, 1, 5, 1],
    [2, 3, 0, 0.3],
    [4, 0, 2, 2],
    [1, 1, 1, 2],
  ])
);

module.exports = determinant;
