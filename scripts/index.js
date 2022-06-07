let selectedProduct = { button: "", text: "", type: "", material: "" };
let selectedMaterial = { button: "", type: "" };
const allProducts = [
  {
    product: "square-bar",
    fields: ["L - Largura"],
    translateName: "Barra Quadrada",
  },
  {
    product: "round-bar",
    fields: ["D - Diâmetro"],
    translateName: "Barra Redonda",
  },
  {
    product: "rectangular-bar",
    fields: ["E - Espessura", "L - Largura"],
    translateName: "Barra Retangular",
  },
  {
    product: "hexagonal-bar",
    fields: ["D - Diâmetro"],
    translateName: "Barra Sextavada",
  },
  {
    product: "coils",
    fields: ["E - Espessura", "L - Largura"],
    translateName: "Bobina",
  },
  {
    product: "plug",
    fields: ["Di - Diâmetro Interno", "De - Diâmetro Externo"],
    translateName: "Bucha",
  },
  {
    product: "square-plate",
    fields: ["E - Espessura", "L - Largura", "C - Comprimento"],
    translateName: "Chapa",
  },
  {
    product: "checkered-plate",
    fields: ["E - Espessura", "L - Largura", "C - Comprimento"],
    translateName: "Chapa Xadrez",
  },
  {
    product: "profile-L",
    fields: ["E - Espessura", "L - Largura"],
    translateName: "Perfil L",
  },
  {
    product: "profile-U",
    fields: ["E - Espessura", "L - Largura"],
    translateName: "Perfil U",
  },
  { product: "billet", fields: ["D - Diâmetro"], translateName: "Tarugo" },
  {
    product: "square-tube",
    fields: ["E - Espessura", "L - Largura"],
    translateName: "Tubo Quadrado",
  },
  {
    product: "round-tube",
    fields: ["E - Espessura", "D - Diâmetro"],
    translateName: "Tubo Redondo",
  },
  {
    product: "rectangular-tube",
    fields: ["E - Espessura", "L1 - Lado Maior", "L2 - Lado Menor"],
    translateName: "Tubo Retangular",
  },
];

const metals = [
  {
    material: "aluminio",
    value: 2.7 / 1000,
    nonExistentProducts: ["billet", "plug"],
  },
  {
    material: "bronze",
    value: 8.7 / 1000,
    nonExistentProducts: [
      "square-plate",
      "checkered-plate",
      "square-bar",
      "round-bar",
      "hexagonal-bar",
      "rectangular-bar",
      "coils",
      "profile-L",
      "profile-U",
      "round-tube",
      "square-tube",
      "rectangular-tube",
    ],
  },
  {
    material: "cobre",
    value: 8.93 / 1000,
    nonExistentProducts: [
      "hexagonal-bar",
      "profile-L",
      "profile-U",
      "billet",
      "plug",
      "square-tube",
      "rectangular-tube",
    ],
  },
  {
    material: "latao",
    value: 8.7 / 1000,
    nonExistentProducts: [
      "profile-L",
      "profile-U",
      "billet",
      "plug",
      "square-tube",
      "rectangular-tube",
    ],
  },
  {
    material: "acoinox",
    value: 7.9 / 1000,
    nonExistentProducts: ["profile-L", "profile-U", "billet", "plug"],
  },
];
const pi = 3.14;

window.addEventListener("DOMContentLoaded", () => {
  creatingFormats();
  for ({ product } of allProducts) {
    document
      .querySelector(`.${product}`)
      .setAttribute("class", `hidden ${product}`);
  }
});
class WeightCalculator {
  constructor(type, material, first, second, third) {
    (this.type = type),
      (this.material = material),
      (this.first = first),
      (this.second = second),
      (this.third = third);
  }

  weightCalc(product) {
    let productArea = "";
    switch (product) {
      case "square-bar":
        productArea = Math.pow(this.first / 10, 2) * 100;
        break;
      case "round-bar":
        productArea = Math.pow(this.first / 10 / 2, 2) * 100 * pi;
        break;
      case "square-plate":
        productArea =
          (this.second / 10) * (this.first / 10) * (this.third / 10);
        break;
      case "hexagonal-bar":
        if (this.material == "aluminio") {
          productArea = (Math.pow(this.first, 2) * 0.002339) / 0.0027;
        } else {
          productArea = (Math.pow(this.first, 2) * 0.007361) / 0.0087;
        }
        break;
      case "rectangular-bar":
        productArea = (this.second / 10) * (this.first / 10) * 100;
        break;
      case "coils":
        productArea = (this.second / 10) * (this.first / 10) * 100;
        break;
      case "profile-L":
        productArea =
          ((this.second / 10) * (this.first / 10) +
            (this.second / 10 - this.first / 10) * (this.second / 10)) *
          100;
        break;
      case "profile-U":
        productArea =
          ((this.second / 10) * (this.first / 10) +
            (this.second / 10) * (this.first / 10) +
            ((this.second - this.first * 2) / 10) * (this.first / 10)) *
          100;
        break;
      case "billet":
        productArea =
          (Math.pow(Number(this.first) + 1.58, 2) * 0.0035343) / 0.0087;
        break;
      case "plug":
        productArea =
          ((Math.pow(Number(this.second) + 1.58, 2) -
            Math.pow(Number(this.first - 1.58), 2)) *
            0.0035343) /
          0.0087;
        break;
      case "square-tube":
        productArea = (this.second * 2 - this.first * 2) * 2 * this.first;
        break;
      case "round-tube":
        productArea =
          ((Math.pow(this.second / 10, 2) -
            Math.pow(Number(this.second - this.first * 2) / 10, 2)) *
            0.212058) /
          0.0027;
        break;
      case "rectangular-tube":
        productArea =
          (Number(this.second) + Number(this.third) - this.first * 2) *
          2 *
          this.first;
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
    return barWeight.toLocaleString("pt-br");
  }
}

function validateTicknessAsSmallerSize(validate, validator){
  const isTickness = validate.className.split(' ')[2];
  if (isTickness === 'Espessura' && validator.value != ''){
    const isWidth = validator.className.split(' ')[2];
    if((isWidth === 'Largura' || isWidth === 'Diâmetro' || isWidth === 'Lado')  && validator.value <= validate.value)
      return false;
  }
  return true;
}

function ticknessSizeInvalid(field){
  const biggerField = field.className.split(' ')[2]
  window.alert(`A Espessura deve ser menor que ${biggerField}!`);
}

function validateIsANumber(field){
  if(field != undefined && field.value != ''){
    const isNumber = Number(field.value);
    if (isNaN(isNumber)){
      console.log(field.value)
      field.value = '';
      field.placeholder = 'Digite apenas números.'
      return false;
    } 
  }
  return true;
}

function weightCalulation() {
  const fields = document.querySelectorAll(".input");
  const [first, second, third] = fields;

  fields.forEach(field => {
    validateIsANumber(field);
  });

  const isTicknessSizeValid = validateTicknessAsSmallerSize(first, second);
  if(!isTicknessSizeValid){
    ticknessSizeInvalid(second);
    return;
  }

  const newBar = new WeightCalculator(
    selectedProduct.type,
    selectedProduct.material,
    first.value,
    second?.value,
    third?.value
  );

  document.querySelector(".result").innerHTML = `<strong>${newBar.weightCalc(
    selectedProduct.type
  )} Kg</strong>`;
}

function handleSelectProduct(product) {
  if (
    selectedProduct.button != document.querySelector("." + product) &&
    selectedProduct.type != ""
  ) {
    removeAttributeFromPreviousProduct();
  }
  selectedProduct = {
    button: document.querySelector("." + product),
    text: document.querySelector("." + product + "__head__description"),
    type: product,
    material: selectedMaterial.type,
  };
  addingAttributeInProduct();
  clearResult();
  changeProductImage(product);
  createMeasurementFields(product);
}

function handleSelectMaterial(material) {
  if (
    selectedMaterial.button != document.querySelector(".button-" + material) &&
    selectedMaterial.type != ""
  ) {
    removeAttributeFromPreviousMaterial();
  }
  selectedMaterial = {
    button: document.querySelector(".button-" + material),
    type: material,
  };
  addingAttributeInMaterial();
  selectingMaterialProducts(material);
  removeProductImage();
  removeFields();
}

function removeAttributeFromPreviousProduct() {
  if (selectedProduct.type == "") return;
  if (checkFirstSelectProdutoAfterChangeMaterial()) return;
  selectedProduct.button.setAttribute(
    "class",
    `product-structure ${selectedProduct.type}`
  );
  selectedProduct.text.setAttribute(
    "class",
    `${selectedProduct.type}__head__description`
  );
}

function removeAttributeFromPreviousMaterial() {
  selectedMaterial.button.setAttribute(
    "class",
    `material-button__buttons button-${selectedMaterial.type}`
  );
}

function addingAttributeInProduct() {
  selectedProduct.button.setAttribute(
    "class",
    `product-structure ${selectedProduct.type} button-active`
  );
  selectedProduct.text.setAttribute(
    "class",
    `${selectedProduct.type}__head__description button-active`
  );
}

function addingAttributeInMaterial() {
  selectedMaterial.button.setAttribute(
    "class",
    `material-button__buttons button-${selectedMaterial.type} button-active`
  );
}

function checkFirstSelectProdutoAfterChangeMaterial() {
  const attributesLength = document.querySelectorAll(".button-active");
  if (attributesLength.length == 1) return true;
  else return false;
}

function selectingMaterialProducts(material) {
  removeAttributeFromPreviousProduct();
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

function showAllProducts() {
  for ({ product } of allProducts) {
    document
      .querySelector(`.${product}`)
      .setAttribute("class", `product-structure ${product}`);
  }
}

function hiddenNonExistentProducts(material) {
  for (metal of metals) {
    if (metal.material == material) {
      for (product of metal.nonExistentProducts) {
        try {
          document
            .querySelector(`.${product}`)
            .setAttribute("class", `hidden ${product}`);
        } catch (ex) {
          continue;
        }
      }
    }
  }
}

// Muda a imagem 3d.
function changeProductImage(type) {
  const img = document.querySelector(`.img3d`);
  for ({ product } of allProducts) {
    if (product == type) {
      img.src = `./assets/3d/${product}.png`;
    }
  }
}

function removeProductImage() {
  const img = document.querySelector(`.img3d`);
  img.src = ``;
}

// LIMPA O CAMPO DO RESULTADO QUANDO TROCA DE PRODUTO.
function clearResult() {
  const result = document.querySelector(`.result`)
  if(result){
    result.innerText = '';
  } else {
    return;
  }
}

// Funclções que criam os campos para cálculo do peso dos materiais na área 'calcule por medidas'.
// INÍCIO.
function createMeasurementFields(product) {
  removeFields();
  for (type of allProducts) {
    if (type.product == product) {
      const tableBody = document.getElementById('table-body');
      for (let field = 0; field < type.fields.length; field++) {
        const trMeasures = createMeasuresFields(type.fields[field]);
        tableBody.appendChild(trMeasures);
      }
      const trResult = createResultField('result');
      tableBody.appendChild(trResult);
    }
  }
}

function createTableRow(){
  const tr = document.createElement("tr");
  return tr;
}

function createTableData(field){
  const td = document.createElement("td");
  td.id = `table-data-${field}`
  return td;
}

function createParagraphForMeasures(field){
  const paragraph = document.createElement("p");
  paragraph.innerText = `${field} (mm)`;
  paragraph.id = field;
  return paragraph;
}

function createInputForMeasures(field){
  const input = document.createElement("input");
  input.className = `${field} input`;
  input.onchange = weightCalulation;
  return input;
}

function createParagraphForResult(){
  const paragraph = document.createElement("p");
  paragraph.innerText = `Peso por metro`;
  return paragraph;
}

function createDivForResult(className){
  const div = document.createElement("div");
  div.className = className;
  return div;
}

function createMeasuresFields(field){
  const tr = createTableRow();
  const td = createTableData(field);
  const paragraph = createParagraphForMeasures(field);
  td.appendChild(paragraph);
  const input = createInputForMeasures(field);
  td.appendChild(input);
  tr.appendChild(td);
  return tr;
}

function createResultField(field){
  const tr = createTableRow();
  const td = createTableData(field);
  const paragraph = createParagraphForResult();
  td.appendChild(paragraph);
  const div= createDivForResult(field);
  td.appendChild(div);
  tr.appendChild(td);
  return tr;
}

function removeFields() {
  const tableBody = document.getElementById('table-body');
  const tableRows = document.querySelectorAll('tr');

  tableRows.forEach(row => {
    tableBody.removeChild(row);
  })
}
// FIM.

// Funcões para criar os formatos na área "escolha o formato". 
// INÍCIO
function creatingFormats() {
  const container = document.querySelector(".formats-options");
  allProducts.map((product) => {
    const productStructure = createProductStructure(product);
    container.appendChild(productStructure);
  });
}
function createProductStructure(product) {
  const paragraph = createProductParagraph(
    product.product,
    product.translateName
  );
  const image = createProductImage(product.product, product.translateName);
  const button = createProductButton(product.product);
  const anchor = createProductAnchor();
  const div = createProductDiv(product.product);
  const productStructure = organizingProductStructure(
    div,
    anchor,
    button,
    image,
    paragraph
  );
  return productStructure;
}
function createProductDiv(productName) {
  const divStructure = document.createElement("div");
  divStructure.setAttribute("class", `product-structure ${productName}`);
  return divStructure;
}

function createProductAnchor() {
  const anchorStructure = document.createElement('a');
  anchorStructure.href = '#measurements-container';
  return anchorStructure;
}

function createProductButton(productName) {
  const buttonStructure = document.createElement("button");
  buttonStructure.setAttribute("class", `product-button ${productName}__head`);
  buttonStructure.addEventListener('click', ()=>{
    handleSelectProduct(productName)
  }) 
  return buttonStructure;
}
function createProductImage(productName, translateProductName) {
  const imageStructure = document.createElement("img");
  imageStructure.setAttribute("class", `${productName}__head__image`);
  imageStructure.setAttribute("src", `./assets/${translateProductName}.png`);
  return imageStructure;
}
function createProductParagraph(productName, translateProductName) {
  const paragraphStructure = document.createElement("p");
  paragraphStructure.setAttribute("class", `${productName}__head__description`);
  paragraphStructure.innerText = translateProductName;
  return paragraphStructure;
}
function organizingProductStructure(div, anchor, button, image, paragraph) {
  button.appendChild(image);
  button.appendChild(paragraph);
  div.appendChild(button);
  anchor.appendChild(div);
  return anchor;
}
// FIM
