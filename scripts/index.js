let selectedProduct = { button: "", text: "", type: "", material: "" };
let selectedMaterial = { button: "", type: "" };
const allProducts = [
  {
    product: "square-bar",
    fields: ["L - Largura"],
    translateName: "Barra Quadrada",
    aluminio: ({first}) => {
      const weight = first * first * 0.0027;
      return weight;
    },
    latao: ({first}) => {
      const weight = first * first * 0.0085;
      return weight;
    },
    cobre: ({first}) => {
      const weight = first * first * 0.0089;
      return weight;
    },
    acoinox: ({first}) => {
      const weight = first * first * 0.0079;
      return weight;
    },
  },
  {
    product: "round-bar",
    fields: ["D - Diâmetro"],
    translateName: "Barra Redonda",
    aluminio: ({first}) => {
      const weight = (Math.pow(first, 2)) * 0.0021206;
      return weight;
    },
    latao: ({first}) => {
      const weight = (Math.pow(first, 2)) * 0.0066759;
      return weight;
    },
    cobre: ({first}) => {
      const weight = (Math.pow(first, 2)) * 0.00699004;
      return weight;
    },  
    acoinox: ({first}) => {
      const weight = (Math.pow(first, 2)) * 0.00620466;
      return weight;
    },  
  },
  {
    product: "rectangular-bar",
    fields: ["E - Espessura", "L - Largura"],
    translateName: "Barra Retangular",
    aluminio: ({first, second}) => {
      const weight = first * second * 0.0027;
      return weight;
    },
    latao: ({first, second}) => {
      const weight = first * second * 0.0085;
      return weight;
    },
    cobre: ({first, second}) => {
      const weight = first * second * 0.0089;
      return weight;
    },  
    acoinox: ({first, second}) => {
      const weight = first * second * 0.0079;
      return weight;
    },  
  },
  {
    product: "hexagonal-bar",
    fields: ["D - Diâmetro"],
    translateName: "Barra Sextavada",
    aluminio: ({first}) => {
      const weight = (Math.pow(first, 2)) * 0.0023382;
      return weight;
    },
    latao: ({first}) => {
      const weight = (Math.pow(first, 2)) * 0.007361;
      return weight;
    },   
    acoinox: ({first}) => {
      const weight = (Math.pow(first, 2)) * 0.0068414;
      return weight;
    },   
  },
  {
    product: "coils",
    fields: ["E - Espessura", "L - Largura"],
    translateName: "Bobina",
    aluminio: ({first, second}) => {
      const weight = first * second * 0.0027;
      return weight;
    },
    latao: ({first, second}) => {
      const weight = first * second * 0.0085;
      return weight;
    },
    cobre: ({first, second}) => {
      const weight = first * second * 0.0089;
      return weight;
    },
    acoinox: ({first, second}) => {
      const weight = first * second * 0.0079;
      return weight;
    },  
  },
  {
    product: "plug",
    fields: ["Di - Diâmetro Interno", "De - Diâmetro Externo"],
    translateName: "Bucha",
    bronze: ({first, second}) => {
      const weight = (Math.pow(second + 1.58, 2) - Math.pow(first, 2)) * 0.0035344;
      return weight;
    },  
  },
  {
    product: "square-plate",
    fields: ["E - Espessura", "L - Largura", "C - Comprimento"],
    translateName: "Chapa",
    aluminio: ({first, second, third}) => {
      const weight = (first * second * third * 0.0027)/1000;
      return weight;
    },
    latao: ({first, second, third}) => {
      const weight = (first * second * third * 0.0085)/1000;
      return weight;
    },
    cobre: ({first, second, third}) => {
      const weight = (first * second * third * 0.0089)/1000;
      return weight;
    },  
    acoinox: ({first, second, third}) => {
      const weight = (first * second * third * 0.0079)/1000;
      return weight;
    },  
  },
  {
    product: "checkered-plate",
    fields: ["E - Espessura", "L - Largura", "C - Comprimento"],
    translateName: "Chapa Xadrez",
    aluminio: ({first, second, third}) => {
      const weight = (first * second * third * 0.0027)/1000;
      return weight;
    },
    latao: ({first, second, third}) => {
      const weight = (first * second * third * 0.0085)/1000;
      return weight;
    },
    cobre: ({first, second, third}) => {
      const weight = (first * second * third * 0.0089)/1000;
      return weight;
    }, 
    acoinox: ({first, second, third}) => {
      const weight = (first * second * third * 0.0079)/1000;
      return weight;
    }, 
  },
  {
    product: "profile-L",
    fields: ["E - Espessura", "L - Largura"],
    translateName: "Perfil L",
    aluminio: ({first, second}) => {
      const weight = (2 * second * first - Math.pow(first, 2)) * 0.0027;
      return weight;
    },  
  },
  {
    product: "profile-U",
    fields: ["E - Espessura", "L - Largura"],
    translateName: "Perfil U",
    aluminio: ({first, second}) => {
      const weight = (3 * second * first - (2 * Math.pow((first), 2))) * 0.0027;
      return weight;
    }, 
  },
  {
    product: "billet",
    fields: ["D - Diâmetro"],
    translateName: "Tarugo",
    bronze: ({first}) => {
      const weight = Math.pow(first + 1.58, 2) * 0.0035344;
      return weight;
    },  
  },
  {
    product: "square-tube",
    fields: ["E - Espessura", "L - Largura"],
    translateName: "Tubo Quadrado",
    aluminio: ({first, second}) => {
      const weight = (Math.pow(second, 2) - Math.pow((second - first - first), 2)) * 0.0027;
      return weight;
    }, 
    acoinox: ({first, second}) => {
      const weight = (Math.pow(second, 2) - Math.pow((second - first - first), 2)) * 0.0079;
      return weight;
    }, 
  },
  {
    product: "round-tube",
    fields: ["E - Espessura", "D - Diâmetro"],
    translateName: "Tubo Redondo",
    aluminio: ({first, second}) => {
      const weight = (Math.pow(second, 2) * 0.00212058) - (Math.pow((second - first - first), 2) * 0.00212058)
      return weight;
    }, 
    latao: ({first, second}) => {
      const weight = (Math.pow(second, 2) * 0.0066759) - (Math.pow((second - first - first), 2) * 0.0066759)
      return weight;
    }, 
    cobre: ({first, second}) => {
      const weight = (Math.pow(second, 2) * 0.00699004) - (Math.pow((second - first - first), 2) * 0.00699004)
      return weight;
    },
    acoinox: ({first, second}) => {
      const weight = (Math.pow(second, 2) * 0.00620466) - (Math.pow((second - first - first), 2) * 0.00620466)
      return weight;
    },
  },
  {
    product: "rectangular-tube",
    fields: ["E - Espessura", "L1 - Lado Maior", "L2 - Lado Menor"],
    translateName: "Tubo Retangular",
    aluminio: ({first, second, third}) => {
      const weight = (second * third * 0.0027) - ((second - first - first) * (third - first - first) * 0.0027);
      return weight;
    }, 
    acoinox: ({first, second, third}) => {
      const weight = (second * third * 0.0079) - ((second - first - first) * (third - first - first) * 0.0079);
      return weight;
    }, 
  },
];

const metals = [
  {
    material: "aluminio",
    nonExistentProducts: ["billet", "plug"],
  },
  {
    material: "bronze",
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
    nonExistentProducts: ["profile-L", "profile-U", "billet", "plug"],
  },
];

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
      (this.first = Number(first)),
      (this.second = Number(second)),
      (this.third = Number(third));
  }

  adjustNumberForResult(number){
    if(number < 0){
      return ''
    } else if (number > 1000) {
      number /= 1000;
      return `<strong>${number.toLocaleString("pt-br")} T</strong>`;
    } else if (number < 1) {
      number *= 1000;
      return `<strong>${number.toLocaleString("pt-br")} g</strong>`;
    } else {
      return `<strong>${number.toLocaleString("pt-br")} Kg</strong>`;
    }
  }

  weightCalc(productName) {
    let productArea;
    allProducts.forEach(product => {
      if (product.product == productName){
        productArea = product[this.material]
      }
    });
    
    const barWeight = productArea({first: this.first, second: this.second, third: this.third});
    return this.adjustNumberForResult(barWeight);
  }
}

function validateTicknessAsSmallerSize(validate, validator) {
  const isTickness = validate.className.split(" ")[2];
  if (isTickness === "Espessura" && validator.value != "") {
    const isWidth = validator.className.split(" ")[2];
    console.log(validate, validator)
    if (
      (isWidth === "Largura" || isWidth === "Diâmetro" || isWidth === "Lado") &&
      Number(validator.value) <= Number(validate.value)
    )
      return false;
  }
  return true;
}

function ticknessSizeInvalid(field) {
  const biggerField = field.className.split(" ")[2];
  clearResult();
  window.alert(`A Espessura deve ser menor que ${biggerField}!`);
}


function changeComma(value) {
  return value.replace(',', '.');
}

function validateIsANumber(field) {
  if (field != undefined && field.value != "") {
    field.value = changeComma(field.value)
    const isNumber = Number(field.value);
    if (isNaN(isNumber)) {
      field.value = "";
      field.placeholder = "Digite apenas números.";
      return false;
    }
  }
  return true;
}

function weightCalulation() {
  const fields = document.querySelectorAll(".input");
  const [first, second, third] = fields;

  fields.forEach((field) => {
    validateIsANumber(field);
  });

  const isTicknessSizeValid = validateTicknessAsSmallerSize(first, second);
  if (!isTicknessSizeValid) {
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

  document.querySelector(".result").innerHTML = newBar.weightCalc(selectedProduct.type);
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
  const result = document.querySelector(`.result`);
  if (result) {
    result.innerText = "";
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
      const tableBody = document.getElementById("table-body");
      for (let field = 0; field < type.fields.length; field++) {
        const trMeasures = createMeasuresFields(type.fields[field]);
        tableBody.appendChild(trMeasures);
      }
      const trResult = createResultField("result");
      tableBody.appendChild(trResult);
    }
  }
}

function createTableRow() {
  const tr = document.createElement("tr");
  return tr;
}

function createTableData(field) {
  const td = document.createElement("td");
  td.id = `table-data-${field}`;
  return td;
}

function createParagraphForMeasures(field) {
  const paragraph = document.createElement("p");
  paragraph.innerText = `${field} (mm)`;
  paragraph.id = field;
  return paragraph;
}

function createInputForMeasures(field) {
  const input = document.createElement("input");
  input.className = `${field} input`;
  input.onchange = weightCalulation;
  return input;
}

function createParagraphForResult(isObs) {
  const paragraph = document.createElement("p");
  if(isObs){
    paragraph.innerText = 'OBS: Peças de 500mm'
  } else{
    paragraph.innerText = selectedProduct.type == 'square-plate' || selectedProduct.type == 'checkered-plate' || selectedProduct.type == 'billet' || selectedProduct.type == 'plug'  ? 'Peso por peça' : `Peso por metro`;
  }
  
  return paragraph;
}

function createDivForResult(className) {
  const div = document.createElement("div");
  div.className = className;
  return div;
}

function createMeasuresFields(field) {
  const tr = createTableRow();
  const td = createTableData(field);
  const paragraph = createParagraphForMeasures(field);
  td.appendChild(paragraph);
  const input = createInputForMeasures(field);
  td.appendChild(input);
  tr.appendChild(td);
  return tr;
}

function createResultField(field) {
  const tr = createTableRow();
  const td = createTableData(field);
  const paragraph = createParagraphForResult();
  td.appendChild(paragraph);
  const div = createDivForResult(field);
  td.appendChild(div);
  if(selectedProduct.type == 'billet' || selectedProduct.type == 'plug'){
    const paragraphForObs = createParagraphForResult(true);
    td.appendChild(paragraphForObs);
  }
  tr.appendChild(td);
  return tr;
}

function removeFields() {
  const tableBody = document.getElementById("table-body");
  const tableRows = document.querySelectorAll("tr");

  tableRows.forEach((row) => {
    tableBody.removeChild(row);
  });
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
  const anchorStructure = document.createElement("a");
  anchorStructure.href = "#measurements-container";
  return anchorStructure;
}

function createProductButton(productName) {
  const buttonStructure = document.createElement("button");
  buttonStructure.setAttribute("class", `product-button ${productName}__head`);
  buttonStructure.addEventListener("click", () => {
    handleSelectProduct(productName);
  });
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
