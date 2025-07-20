// Define total-value bands
const valueBands = [
  { name: "A", lo: null, hi: 400, mult: 0.8 },
  { name: "B", lo: 400, hi: 525, mult: 0.9 },
  { name: "C", lo: 525, hi: 675, mult: 1.0 },
  { name: "D", lo: 675, hi: 900, mult: 1.1 },
  { name: "E", lo: 900, hi: null, mult: 1.2 },
];

function lookupBand(y, bands) {
  for (const { name, lo, hi, mult } of bands) {
    if ((lo === null || y >= lo) && (hi === null || y < hi)) {
      return { name, mult };
    }
  }
  throw new Error(`No band for ${y}`);
}

function calculateIncentive(y, base = 360000) {
  if (typeof y !== "number" || y < 0) {
    throw new Error("Must be a non-negative number");
  }
  const { name: band, mult } = lookupBand(y, valueBands);
  return {
    band,
    multiplier: mult,
    incentive: mult * base,
  };
}

document.getElementById("incentive-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const errorDiv = document.getElementById("error");
  const resultDiv = document.getElementById("result");
  errorDiv.textContent = "";
  resultDiv.textContent = "";

  const inputVal = parseFloat(document.getElementById("total_value").value);

  try {
    const { band, multiplier, incentive } = calculateIncentive(inputVal);
    resultDiv.innerHTML = `
      <strong>Band:</strong> ${band} <br />
      <strong>Multiplier:</strong> ${multiplier} <br />
      <strong>Incentive:</strong> ₹${incentive.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
    `;
  } catch (err) {
    errorDiv.textContent = err.message;
  }
});
