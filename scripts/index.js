let materialSelected = '';
let materialButtonSelected = '';
let checkOpenedNav = {status: 'close', openedNav: {classNavOpened: '', barTypeOpened: ''}};

class CalculationArea {
  constructor(type, material, value) {
    (this.type = type),
      (this.material = material),
      (this.value = value)
  }

  metals = [
    { material: "aluminio", value: 2.70 / 1000 },
    { material: "bronze", value: 8.7 / 1000 },
    { material: "cobre", value: 8.93 / 1000 },
    { material: "latao", value: 8.7 / 1000 },
    { material: "acoinox", value: 7.9 / 1000 },
  ];

  pi = 3.14;

  materialWeightWithSquareBar() {
    const squareArea = Math.pow(this.value / 10, 2) * 100;
    const takeMaterialWeight = this.metals.filter((metal) => {
      if (metal.material == this.material) {
        return metal;
      }
      return;
    });
    const barWeight = squareArea * takeMaterialWeight[0].value;
    return (barWeight);
  }

  materialWeightWithRoundBar() {
    const roundArea =
      Math.pow(this.value / 10 / 2, 2) * 100 * this.pi;
    const takeMaterialWeight = this.metals.filter((metal) => {
      if (metal.material == this.material) {
        return metal;
      }
      return;
    });
    const barWeight = roundArea * takeMaterialWeight[0].value;
    return (barWeight);
  }
}

function handleCalculationWeight(bar) {
  const material = materialSelected;
  const value = document.querySelector("." + bar + "-value").value;

  const newBar = new CalculationArea(bar, material, value);

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

function handleShowCalculationContainer({calulationContainerBar, barType}) {
  toggleNavBar(calulationContainerBar, barType);
}

function toggleHidden (classCalculationContainerBar, time) {
  setTimeout(()=>{
    document.querySelector("." + classCalculationContainerBar).toggleAttribute("hidden");
  }, time)
}

function toggleNavBar (classCalculationContainerBar, barType) {
  if(checkOpenedNav.status == 'close'){
    console.log(true)
    document.querySelector(`.${barType}`).setAttribute("class", `${barType} open-nav-bars`);
    toggleHidden (classCalculationContainerBar, 300);
    checkOpenedNav = {status: 'open', openedNav: {classNavOpened: classCalculationContainerBar, barTypeOpened: barType}};
  } else {
    if(checkOpenedNav.openedNav.barTypeOpened == barType){
      document.querySelector(`.${barType}`).setAttribute("class", `${barType} close-nav-bars`);
      toggleHidden (classCalculationContainerBar, 0);
      checkOpenedNav.status = 'close';
    } else {
      document.querySelector(`.${checkOpenedNav.openedNav.barTypeOpened}`).setAttribute("class", `${checkOpenedNav.openedNav.barTypeOpened} close-nav-bars`);
      toggleHidden (checkOpenedNav.openedNav.classNavOpened, 0);
      document.querySelector(`.${barType}`).setAttribute("class", `${barType} open-nav-bars`);
      toggleHidden (classCalculationContainerBar, 300);
      checkOpenedNav.openedNav = {classNavOpened: classCalculationContainerBar, barTypeOpened: barType}
    }
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