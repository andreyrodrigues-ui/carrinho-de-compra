
const botoes = document.querySelectorAll(".btnProduto");
const listaCarrinho = document.querySelector("#listaCarrinho");
const elementoTotal = document.querySelector("#total");
const btnEsvaziar = document.querySelector("#btnEsvaziar");

let total = 0;
const carrinho = [];

function atualizarCarrinho() {
    listaCarrinho.innerHTML = "";

    carrinho.forEach(function(produto) {
        const item = document.createElement("li");
        const nome = document.createElement("span");
        const controles = document.createElement("div");
        const btnMenos = document.createElement("button");
        const quantidade = document.createElement("span");
        const btnMais = document.createElement("button");
        const btnRemover = document.createElement("button");
        const preco = document.createElement("span");

        item.classList.add("itemCarrinho");
        nome.classList.add("nomeProduto");
        controles.classList.add("controlesQuantidade");
        btnMenos.classList.add("btnQuantidade");
        btnMais.classList.add("btnQuantidade");
        btnRemover.classList.add("btnRemover");
        quantidade.classList.add("quantidade");
        preco.classList.add("precoProduto");

        nome.textContent = produto.nome;
        btnMenos.textContent = "−";
        btnMais.textContent = "+";
        btnRemover.textContent = "🗑";
        btnRemover.title = "Remover produto";
        quantidade.textContent = produto.quantidade;

        preco.textContent = `R$ ${(produto.preco * produto.quantidade).toFixed(2).replace(".", ",")}`;

        btnMenos.addEventListener("click", function() {
            produto.quantidade--;
            total -= produto.preco;

            if (produto.quantidade === 0) {
                carrinho.splice(carrinho.indexOf(produto), 1);
            }

            total = Math.max(0, Number(total.toFixed(2)));
            atualizarCarrinho();
        });

        btnMais.addEventListener("click", function() {
            produto.quantidade++;
            total += produto.preco;
            total = Number(total.toFixed(2));
            atualizarCarrinho();
        });

        btnRemover.addEventListener("click", function() {
            total -= produto.preco * produto.quantidade;

            carrinho.splice(carrinho.indexOf(produto), 1);

            total = Math.max(0, Number(total.toFixed(2)));
            atualizarCarrinho();
        });

        controles.appendChild(btnMenos);
        controles.appendChild(quantidade);
        controles.appendChild(btnMais);
        controles.appendChild(btnRemover);

        item.appendChild(nome);
        item.appendChild(controles);
        item.appendChild(preco);

        listaCarrinho.appendChild(item);
    });

    elementoTotal.textContent = `R$ ${total.toFixed(2).replace(".", ",")}`;
}



botoes.forEach(function(botao) {
    botao.addEventListener("click", function() {
        const nome = botao.dataset.nome;
        const preco = parseFloat(botao.dataset.preco);

        const produtoExistente = carrinho.find(function(produto) {
            return produto.nome === nome;
        });

        if (produtoExistente) {
            produtoExistente.quantidade++;
        } else {
            carrinho.push({
                nome: nome,
                preco: preco,
                quantidade: 1
            });
        }

        total += preco;
        total = Number(total.toFixed(2));

        atualizarCarrinho();
    });
});

btnEsvaziar.addEventListener("click", function() {
    carrinho.length = 0;
    listaCarrinho.innerHTML = "";
    total = 0;
    elementoTotal.textContent = "R$ 0,00";
});
