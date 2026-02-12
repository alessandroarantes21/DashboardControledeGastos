let dados = JSON.parse(localStorage.getItem("dados")) || [];

function salvar() {
  localStorage.setItem("dados", JSON.stringify(dados));
}

function adicionar() {
  let descricao = document.getElementById("descricao").value;
  let valor = Number(document.getElementById("valor").value);
  let tipo = document.getElementById("tipo").value;

  if (!descricao || !valor) return;

  dados.push({ descricao, valor, tipo });
  salvar();
  render();
}

function remover(i) {
  dados.splice(i, 1);
  salvar();
  render();
}

function limpar() {
  dados = [];
  salvar();
  render();
}

function render() {
  let lista = document.getElementById("lista");
  lista.innerHTML = "";

  let totalGastos = 0;
  let totalReceitas = 0;

  dados.forEach((item, i) => {
    let li = document.createElement("li");
    li.className = item.tipo;
    li.innerHTML = `
      ${item.descricao} - R$ ${item.valor}
      <button onclick="remover(${i})">X</button>
    `;
    lista.appendChild(li);

    if (item.tipo === "gasto") totalGastos += item.valor;
    else totalReceitas += item.valor;
  });

  document.getElementById("totalGastos").innerText = totalGastos.toFixed(2);
  document.getElementById("totalReceitas").innerText = totalReceitas.toFixed(2);
  document.getElementById("saldo").innerText = (totalReceitas - totalGastos).toFixed(2);
}

render();