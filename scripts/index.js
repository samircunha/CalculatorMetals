let selectedProduct = { button: "", text: "", type: "", material: "" };
let selectedMaterial = { button: "", type: "" };
let checkOpenedNav = {
  status: "close",
  openedNav: { classNavOpened: "", barTypeOpened: "" },
};
let utilizedMeasures = [];
const allProducts = [
  { product: "square-bar", fields: ["L - Largura"] },
  { product: "round-bar", fields: ["D - Diâmetro"] },
  { product: "rectangular-bar", fields: ["E - Espessura", "L - Largura"] },
  { product: "hexagonal-bar", fields: ["D - Diâmetro"] },
  { product: "coils", fields: ["E - Espessura", "L - Largura"] },
  {
    product: "plug",
    fields: ["Di - Diâmetro Interno", "De - Diâmetro Externo"],
  },
  {
    product: "square-plate",
    fields: ["E - Espessura", "L - Largura", "C - Comprimento"],
  },
  {
    product: "checkered-plate",
    fields: ["E - Espessura", "L - Largura", "C - Comprimento"],
  },
  { product: "profile-L", fields: ["E - Espessura", "L - Largura"] },
  { product: "profile-U", fields: ["E - Espessura", "L - Largura"] },
  { product: "billet", fields: ["D - Diâmetro"] },
  { product: "square-tube", fields: ["E - Espessura", "L - Largura"] },
  { product: "round-tube", fields: ["E - Espessura", "D - Diâmetro"] },
  {
    product: "rectangular-tube",
    fields: ["E - Espessura", "L1 - Lado Maior", "L2 - Lado Menor"],
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

function weightCalulation() {
  const fields = document.querySelectorAll(".input");
  const [first, second, third] = fields;

  // if (tickness > width) {
  //   document.getElementById(
  //     `show-result-${product}`
  //   ).innerHTML = `A largura deve ser maior que a espessura!`;
  //   return;
  // }

  const newBar = new WeightCalculator(
    selectedProduct.type,
    selectedProduct.material,
    first.value,
    second?.value,
    third?.value
  );

  document.querySelector(".result").innerHTML = `<b>${newBar.weightCalc(
    selectedProduct.type
  )} Kg</b>`;
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
  if (checkOpenedNav.openedNav.barTypeOpened != "") {
    clearFields();
  }
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

function createMeasurementFields(product) {
  removeFields();
  for (type of allProducts) {
    if (type.product == product) {
      for (let field = 0; field < type.fields.length; field++) {
        const tableData = document.getElementById(
          `table-data-${type.fields[field]}`
        );

        const paragraph = document.createElement("p");
        paragraph.innerText = `${type.fields[field]} (mm)`;
        paragraph.id = type.fields[field];

        const input = document.createElement("input");
        input.setAttribute("class", `${type.fields[field]} input`);
        input.onchange = weightCalulation;

        tableData.appendChild(paragraph);
        tableData.appendChild(input);
      }
    }
  }
}

function removeFields() {
  const fieldsForRemove = [
    "E - Espessura",
    "L - Largura",
    "C - Comprimento",
    "D - Diâmetro",
    "Di - Diâmetro Interno",
    "De - Diâmetro Externo",
    "L1 - Lado Maior",
    "L2 - Lado Menor",
  ];
  for (field of fieldsForRemove) {
    const tableData = document.getElementById(`table-data-${field}`);

    const paragraph = document.getElementById(`${field}`);
    const input = document.getElementsByClassName(`${field}`);

    if (paragraph) {
      tableData.removeChild(paragraph);
      tableData.removeChild(input[0]);
    }
  }
}

function clearFields() {
  const product = checkOpenedNav.openedNav.barTypeOpened;
  for (measure of utilizedMeasures) {
    if (measure.value >= 0) {
      try {
        document.querySelector("." + product + "-" + measure.type).value = "";
      } catch (error) {
        return;
      }
    }
  }
  document.getElementById(`show-result-${product}`).innerHTML = "";
}
