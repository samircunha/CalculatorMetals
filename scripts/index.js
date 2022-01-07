class CalculationArea {
  constructor(type, material, value, length, amount) {
    (this.type = type),
      (this.material = material),
      (this.value = value),
      (this.length = length),
      (this.amount = amount);
  }

  metals = [
    { material: "aluminio", value: 2.71 / 1000 },
    { material: "bronze", value: 8.7 / 1000 },
    { material: "cobre", value: 8.93 / 1000 },
    { material: "latao", value: 8.7 / 1000 },
  ];

  pi = 3.14;

  materialWeightWithSquareBar() {
    const squareArea = Math.pow(this.value / 10, 2) * (this.length * 100);
    const takeMaterialWeight = this.metals.filter((metal) => {
      if (metal.material == this.material) {
        return metal;
      }
      return;
    });
    const barWeight = squareArea * takeMaterialWeight[0].value * this.amount;
    return (barWeight);
  }

  materialWeightWithRoundBar() {
    const roundArea =
      Math.pow(this.value / 10 / 2, 2) * (this.length * 100) * this.pi;
    const takeMaterialWeight = this.metals.filter((metal) => {
      if (metal.material == this.material) {
        return metal;
      }
      return;
    });
    const barWeight = roundArea * takeMaterialWeight[0].value * this.amount;
    return (barWeight);
  }
}

function handleCalculationWeight(bar) {
  const material = document.querySelector("." + bar + "-material").value;
  const value = document.querySelector("." + bar + "-value").value;
  const length = Number(document.querySelector("." + bar + "-length").value);
  const amount = Number(document.querySelector("." + bar + "-amount").value);

  const newBar = new CalculationArea(bar, material, value, length, amount);

  switch (bar) {
    case "square":
      document
        .getElementById(`show-result-${bar}`)
        .innerHTML = `<b>Peso total: ${newBar.materialWeightWithSquareBar()} Kg</b>`;
      break;
    case "round":
        document
        .getElementById(`show-result-${bar}`)
        .innerHTML = `<b>Peso total: ${newBar.materialWeightWithRoundBar()} Kg</b>`;
      break;
    default:
      alert("Erro ao Calcular os Quantitativos");
      break;
  }
}

function handleShowCalculationContainer(attribute) {
  document.querySelector("." + attribute).toggleAttribute("hidden");
}
