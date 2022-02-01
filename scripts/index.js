let materialSelected = 'aluminio';
let materialButtonSelected = {button: document.querySelector(".button-aluminio"), type: "aluminio"};
let checkOpenedNav = {status: 'close', openedNav: {classNavOpened: '', barTypeOpened: ''}};
const allProducts = ["square-plate", "square-bar", "round-bar", "hexagonal-bar", "rectangular-bar", "coils", "profile-L", "profile-T", "profile-U", "billet", "plug"]; 
const metals = [
  { material: "aluminio", value: 2.7 / 1000, nonExistentProducts: ["billet", "plug"] },
  { material: "bronze", value: 8.7 / 1000,  nonExistentProducts: ["square-plate", "square-bar", "round-bar", "hexagonal-bar", "rectangular-bar", "profile-L", "profile-T", "profile-U"] },
  { material: "cobre", value: 8.93 / 1000,  nonExistentProducts: ["square-bar", "round-bar", "hexagonal-bar", "profile-L", "profile-T", "profile-U", "billet", "plug"] },
  { material: "latao", value: 8.7 / 1000,  nonExistentProducts: ["profile-L", "profile-T", "profile-U", "billet", "plug"] },
  { material: "acoinox", value: 7.9 / 1000,  nonExistentProducts: ["profile-L", "profile-T", "profile-U", "billet", "plug"] },
];
const pi = 3.14;

window.addEventListener("DOMContentLoaded", ()=>{
  materialButtonSelected.button.setAttribute('class', `material-button__buttons button-aluminio button-aluminio-active`);
  selectProducts("aluminio");
})

class WeightCalculator {
  constructor(type, material, value, length, tickness) {
    (this.type = type),
      (this.material = material),
      (this.value = value),
      (this.length = length),
      (this.tickness = tickness)
  }

  weightCalc(product) {
    let productArea = '';
    switch (product) {
      case "square-bar":
        productArea = Math.pow(this.value / 10, 2) * 100;
        break;
      case "round-bar":
        productArea = Math.pow(this.value / 10 / 2, 2) * 100 * pi;
        break;
      case "square-plate":
        productArea = (this.value / 10) * (this.tickness / 10) * (this.length / 10);
        break;
      case "hexagonal-bar":
        productArea = Math.pow(this.value / 10, 2) * 100;
        break;
      case "rectangular-bar":
        productArea = (this.value / 10) * (this.tickness / 10) * 100;
        break;
      case "coils":
        productArea = (this.value / 10) * (this.tickness / 10) * 100;
        break;
      case "profile-L":
        productArea = ((this.value / 10) * (this.tickness / 10) + (this.value / 10 - this.tickness / 10) * (this.tickness / 10)) * 100;
        break;
      case "profile-T":
        productArea = ((this.value / 10) * (this.tickness / 10) + (this.value / 10 - this.tickness / 10) * (this.tickness / 10)) * 100;
        break;
      case "profile-U":
        productArea = ((this.value / 10) * (this.tickness / 10) + (this.value / 10) * (this.tickness / 10) + ((this.value - this.tickness * 2) / 10) * (this.tickness / 10)) * 100;
        break;
      case "billet":
        productArea = Math.pow(this.value / 10 / 2, 2) * pi * 100;
        break;
      case "plug":
        productArea = (Math.pow(this.value / 10 / 2, 2) - Math.pow(this.tickness / 10 / 2, 2)) * pi * 100;
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
  const value = document.querySelector("." + product + "-value").value;
  const length = document.querySelector("." + product + "-length")?.value;
  const tickness = document.querySelector("." + product + "-tickness")?.value;
  
  if(tickness > value) {
    document
    .getElementById(`show-result-${product}`)
    .innerHTML = `<b>A expessura deve ser maior que a largura!</b>`;
    return;
  }

  const newBar = new WeightCalculator(product, material, value, length, tickness);

  document
    .getElementById(`show-result-${product}`)
    .innerHTML = `<b>Peso total: ${newBar.weightCalc(product)} Kg</b>`;
}

function handleSelectMaterial (material) {
  if(materialButtonSelected.button != document.querySelector(".button-" + material)){
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