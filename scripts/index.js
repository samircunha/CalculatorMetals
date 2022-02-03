let materialSelected = '';
let materialButtonSelected = {button: "", type: ""};
let checkOpenedNav = {status: 'close', openedNav: {classNavOpened: '', barTypeOpened: ''}};
const allProducts = ["square-plate", "square-bar", "round-bar", "hexagonal-bar", "rectangular-bar", "coils", "profile-L", "profile-T", "profile-U", "billet", "plug", "round-tube", "square-tube", "rectangular-tube"]; 
const metals = [
  { material: "aluminio", value: 2.7 / 1000, nonExistentProducts: ["billet", "plug"] },
  { material: "bronze", value: 8.7 / 1000,  nonExistentProducts: ["square-plate", "square-bar", "round-bar", "hexagonal-bar", "rectangular-bar","coils", "profile-L", "profile-T", "profile-U", "round-tube", "square-tube", "rectangular-tube"] },
  { material: "cobre", value: 8.93 / 1000,  nonExistentProducts: ["hexagonal-bar", "profile-L", "profile-T", "profile-U", "billet", "plug", "square-tube", "rectangular-tube"] },
  { material: "latao", value: 8.7 / 1000,  nonExistentProducts: ["profile-L", "profile-T", "profile-U", "billet", "plug", "square-tube", "rectangular-tube"] },
  { material: "acoinox", value: 7.9 / 1000,  nonExistentProducts: ["profile-L", "profile-T", "profile-U", "billet", "plug"] },
];
const pi = 3.14;

window.addEventListener("DOMContentLoaded", ()=>{
  for(product of allProducts){
    document.querySelector(`.${product}`).setAttribute("class", `hidden ${product}`);

  }
})

class WeightCalculator {
  constructor(type, material, width, diameter, length, tickness) {
    (this.type = type),
      (this.material = material),
      (this.width = width),
      (this.diameter = diameter),
      (this.length = length),
      (this.tickness = tickness)
  }

  weightCalc(product) {
    let productArea = '';
    switch (product) {
      case "square-bar":
        productArea = Math.pow(this.width / 10, 2) * 100;
        break;
      case "round-bar":
        productArea = Math.pow(this.diameter / 10 / 2, 2) * 100 * pi;
        break;
      case "square-plate":
        productArea = (this.width / 10) * (this.tickness / 10) * (this.length / 10);
        break;
      case "hexagonal-bar":
        if(this.material == "aluminio"){
          productArea = Math.pow(this.diameter, 2) * 0.002339 / 0.0027;
        } else {
          productArea = Math.pow(this.diameter, 2) * 0.007361 / 0.0087;
        }
        break;
      case "rectangular-bar":
        productArea = (this.width / 10) * (this.tickness / 10) * 100;
        break;
      case "coils":
        productArea = (this.width / 10) * (this.tickness / 10) * 100;
        break;
      case "profile-L":
        productArea = ((this.width / 10) * (this.tickness / 10) + (this.width / 10 - this.tickness / 10) * (this.tickness / 10)) * 100;
        break;
      case "profile-T":
        productArea = ((this.width / 10) * (this.tickness / 10) + (this.width / 10 - this.tickness / 10) * (this.tickness / 10)) * 100;
        break;
      case "profile-U":
        productArea = ((this.width / 10) * (this.tickness / 10) + (this.width / 10) * (this.tickness / 10) + ((this.width - this.tickness * 2) / 10) * (this.tickness / 10)) * 100;
        break;
      case "billet":
        productArea = Math.pow((Number(this.diameter) + 1.58), 2) * 0.0035343 / 0.0087;
        break;
      case "plug":
        productArea = (Math.pow((Number(this.diameter) + 1.58), 2) - Math.pow((Number(this.tickness - 1.58)), 2)) * 0.0035343 / 0.0087;
        break;
      case "square-tube":
        productArea = (this.width * 2 - this.tickness * 2) * 2 * this.tickness;
        break;
        case "round-tube":
          productArea = (Math.pow(this.diameter / 10, 2) - Math.pow((Number(this.diameter - this.tickness * 2)) / 10, 2)) * 0.212058 / 0.0027;
          break;
        case "rectangular-tube":
          productArea = ((Number(this.width) + Number(this.diameter)) - (this.tickness * 2)) * 2 * this.tickness;
          break;
      default:
        alert("Erro ao Calcular os Quantitativos");
        break;
    }
    const takeMaterialWeight = metals.filter((metal) => {
      if (metal.material == this.material) {
        return metal;
      }
      return;
    });
    const barWeight = productArea * takeMaterialWeight[0].value;
    return (barWeight.toFixed(3).replace(".", ","));
  }
}

function handleCalculationWeight(product) {
  const material = materialSelected;
  const width = document.querySelector("." + product + "-width")?.value;
  const diameter = document.querySelector("." + product + "-diameter")?.value;
  const length = document.querySelector("." + product + "-length")?.value;
  const tickness = document.querySelector("." + product + "-tickness")?.value;

  if(tickness > width) {
    document
    .getElementById(`show-result-${product}`)
    .innerHTML = `<b>A largura deve ser maior que a espessura!</b>`;
    return;
  }

  const newBar = new WeightCalculator(product, material, width, diameter, length, tickness);

  document
    .getElementById(`show-result-${product}`)
    .innerHTML = `<b>Peso total: ${newBar.weightCalc(product)} Kg</b>`;

  if(material == "bronze") {
    document
    .getElementById(`show-desc-${product}`)
    .innerHTML = `OBS: Peça de 500 mm`
  }
}

function handleSelectMaterial (material) {
  if(materialButtonSelected.button != document.querySelector(".button-" + material) && materialSelected != ''){
    materialButtonSelected.button.setAttribute('class', `material-button__buttons button-${materialButtonSelected.type}`);
  } 
  materialSelected = material;
  materialButtonSelected = {button: document.querySelector(".button-" + material), type: material};
  materialButtonSelected.button.setAttribute('class', `material-button__buttons button-${material} button-${material}-active`);
  selectProducts(material)
}

function selectProducts(material) {
  showAllProducts();
  switch (material) {
    case "aluminio":
      hiddenNonExistentProducts("aluminio");
      break;
    case "bronze":
      hiddenNonExistentProducts("bronze");
      break;
      case "cobre":
        hiddenNonExistentProducts("cobre");
        break;
      case "latao":
        hiddenNonExistentProducts("latao");
        break;
      case "acoinox":
        hiddenNonExistentProducts("acoinox");
        break;
    default:
      break;
  }
}

function showAllProducts(){
  for(product of allProducts){
    document.querySelector(`.${product}`).setAttribute("class", `product-structure ${product}`);
  }
}

function hiddenNonExistentProducts (material) {
  for (metal of metals) {
    if(metal.material == material){
      for (product of metal.nonExistentProducts){
        document.querySelector(`.${product}`).setAttribute("class", `hidden ${product}`);
      }
    }
  }
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