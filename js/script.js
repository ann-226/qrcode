// Scanner
const scanner = new Html5QrcodeScanner("reader", {
  qrbox: {
    width: 250,
    height: 250,
  },
  fps: 100,
});

scanner.render(success, error);

function success(result) {
  console.log(result);
  document.getElementById("result").innerHTML = `
    <h2>Success!</h2>
    <p><a href="${result}">${result}</p>

    `;
  // scanner.clear();
  // document.getElementById("reader").remove();
}
function error(err) {
  console.log(err);
}

// Scanner

const goods = {
  51: { name: "Knauf Гипсокартон Влага 2500*1200*12,5 (56шт/палета)", price: 398.0, discount: 2.5 },
  330512458: {
    name: "Knauf Гипсокартон Потолок 2500*1200*9,5 (68шт/палета)",
    price: 320.0,
    discount: 0,
  },
  123456789: {
    name: "Knauf Гипсокартон Стена 2500*1200*12,5 (56шт/палета)",
    price: 331.0,
    discount: 3.15,
  },
  22233345: { name: "Knauf Гипсокартон Стена 2500*1200*12,5 Подкладка", price: 200.0, discount: 0 },
  22233346: { name: "Knauf Гипсокартон Стена 2500*1200*16,5 Подкладка", price: 210.0, discount: 0 },
};
// Create localStorage.cargo
if (!localStorage.getItem("cargo")) {
  localStorage.setItem("cargo", JSON.stringify([]));
}

let tbody = document.querySelector(".list");
let result = document.querySelector(".price_result");
updateList();

function addNewGoodsToCargo(id, count, good) {
  cargo.push([id, good.name, count, good.price, good.discount]);
}

function updateList() {
  tbody.innerHTML = "";
  if (!localStorage.getItem("cargo")) {
    localStorage.setItem("cargo", JSON.stringify([]));
  }
  let cargo = JSON.parse(localStorage.getItem("cargo"));
  console.log(`From updateList Cargo.length= ${cargo.length}`);
  let total = 0;

  if (cargo.length) {
    for (let i = 0; i < cargo.length; i++) {
      tbody.insertAdjacentHTML(
        "beforeend",
        `
      <tr>
              <td>${cargo[i][1]}</td>
              <td>${cargo[i][2]}</td>
              <td>${cargo[i][3]}</td>
              <td class="flex-row">
                <div>${cargo[i][4]}</div>
                <div>${cargo[i][2] * cargo[i][3] - cargo[i][4]}</div>
              </td>

        </tr>    `
      );
      total += cargo[i][2] * cargo[i][3] - cargo[i][4];
    }
    result.textContent = `${Math.round(total * 100) / 100} `;
  }
}

document.getElementById("clear").addEventListener("click", () => {
  localStorage.clear();

  updateList();
});

document.getElementById("add-all").addEventListener("click", () => {
  if (!localStorage.getItem("cargo")) {
    localStorage.setItem("cargo", JSON.stringify([]));
  }
  let cargo = JSON.parse(localStorage.getItem("cargo"));
  for (let key in goods) {
    cargo.push([key, goods[key].name, 2, goods[key].price, goods[key].discount]);
    localStorage.setItem("cargo", JSON.stringify(cargo));
  }
  updateList();
  console.log(cargo.length);
});
