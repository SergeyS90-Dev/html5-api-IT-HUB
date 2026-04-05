onmessage = function (e) {
  let num = Number(e.data);

  function heavyCalc(n) {
    let result = 0;
    for (let i = 0; i < 1e8; i++) {
      result += i % n;
    }
    return result;
  }

  const res = heavyCalc(num);
  postMessage(res);
};