let materialSelected = 'aluminio';
let materialButtonSelected = {button: document.querySelector(".button-aluminio"), type: "aluminio"};
let checkOpenedNav = {status: 'close', openedNav: {classNavOpened: '', barTypeOpened: ''}};
const metals = [
  { material: "aluminio", value: 2.7 / 1000 },
  { material: "bronze", value: 8.7 / 1000 },
  { material: "cobre", value: 8.93 / 1000 },
  { material: "latao", value: 8.7 / 1000 },
  { material: "acoinox", value: 7.9 / 1000 },
];
const pi = 3.14;

window.addEventListener("DOMContentLoaded", ()=>{
  materialButtonSelected.button.setAttribute('class', `material-button__buttons button-aluminio button-aluminio-active`);
})

class CalculationArea {
  constructor(type, material, value) {
    (this.type = type),
      (this.material = material),
      (this.value = value)
  }

  materialWeightWithSquareBar() {
    const squareArea = Math.pow(this.value / 10, 2) * 100;
    const takeMaterialWeight = metals.filter((metal) => {
      if (metal.material == this.material) {
        return metal;
      }
      return;
    });
    const barWeight = squareArea * takeMaterialWeight[0].value;
    return (barWeight.toFixed(3).replace(".", ","));
  }

  materialWeightWithRoundBar() {
    const roundArea = Math.pow(this.value / 10 / 2, 2) * 100 * pi;
    const takeMaterialWeight = metals.filter((metal) => {
      if (metal.material == this.material) {
        return metal;
      }
      return;
    });
    const barWeight = roundArea * takeMaterialWeight[0].value;
    return (barWeight.toFixed(3).replace(".", ","));
  }
}

function handleCalculationWeight(bar) {
  const material = materialSelected;
  const value = document.querySelector("." + bar + "-value").value;

  const newBar = new CalculationArea(bar, material, value);

  switch (bar) {
    case "square-bar":
      document
        .getElementById(`show-result-${bar}`)
        .innerHTML = `<b>Peso total: ${newBar.materialWeightWithSquareBar()} Kg</b>`;
      break;
    case "round-bar":
        document
        .getElementById(`show-result-${bar}`)
        .innerHTML = `<b>Peso total: ${newBar.materialWeightWithRoundBar()} Kg</b>`;
      break;
    default:
      alert("Erro ao Calcular os Quantitativos");
      break;
  }
}

function handleSelectMaterial (material) {
  if(materialButtonSelected.button != document.querySelector(".button-" + material) && materialSelected != ''){
    materialButtonSelected.button.setAttribute('class', `material-button__buttons button-${materialButtonSelected.type}`);
  } 
  materialSelected = material;
  materialButtonSelected = {button: document.querySelector(".button-" + material), type: material};
  materialButtonSelected.button.setAttribute('class', `material-button__buttons button-${material} button-${material}-active`);
}

function handleShowCalculationContainer({calulationContainerBar, barType}) {
  toggleNavBar(calulationContainerBar, barType);
}

function toggleNavBar (classCalculationContainerBar, barType) {
  if(checkOpenedNav.status == 'close'){
    document.querySelector("." + classCalculationContainerBar).setAttribute("class", `open-nav-bars`);
    toggleHidden (`open-nav-bars`, barType, 600);
    checkOpenedNav = {status: 'open', openedNav: {classNavOpened: classCalculationContainerBar, barTypeOpened: barType}};
  } else {
    if(checkOpenedNav.openedNav.barTypeOpened == barType){
      document.querySelector("." + classCalculationContainerBar).setAttribute("class", `close-nav-bars`);
      toggleHidden (`close-nav-bars`, barType, 800);
      checkOpenedNav.status = 'close';
    } else {
      document.querySelector("." + checkOpenedNav.openedNav.classNavOpened).setAttribute("class", `close-nav-bars`);
      toggleHidden (`close-nav-bars`, checkOpenedNav.openedNav.barTypeOpened, 800);
      document.querySelector("." + classCalculationContainerBar).setAttribute("class", `open-nav-bars`);
      toggleHidden (`open-nav-bars`, barType, 600);
      checkOpenedNav.openedNav = {classNavOpened: classCalculationContainerBar, barTypeOpened: barType};
    }
  }
}

function toggleHidden (status, barType, time) {
  if(status == "open-nav-bars"){
    setTimeout(()=>{
      document.querySelector(`.${status}`).setAttribute("class", `product-structure__body ${barType}__body`);
    }, time)
  } else {
    setTimeout(()=>{
      document.querySelector(`.${status}`).setAttribute("class", `product-structure__body ${barType}__body hidden-product-body`);
    }, time)
  }
}