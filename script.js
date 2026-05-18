// 1. Função para trocar as páginas
function mostrarPagina(idDaPagina) {
    // Esconde todas as abas
    const paginas = document.querySelectorAll('.pagina');
    paginas.forEach(pagina => {
        pagina.classList.remove('ativa');
    });

    // Mostra apenas a aba clicada
    document.getElementById(idDaPagina).classList.add('ativa');
}

// 2. Lógica do Simulador
const tempInput = document.getElementById('temp');
const umiArInput = document.getElementById('umi-ar');
const umiSoloInput = document.getElementById('umi-solo');

const tempVal = document.getElementById('temp-val');
const umiArVal = document.getElementById('umi-ar-val');
const umiSoloVal = document.getElementById('umi-solo-val');

const statusTexto = document.getElementById('status-texto');
const statusEmoji = document.getElementById('status-emoji');

function calcularEstufa() {
    // Pega os valores atuais das barras
    const temp = parseInt(tempInput.value);
    const umiAr = parseInt(umiArInput.value);
    const umiSolo = parseInt(umiSoloInput.value);

    // Atualiza os números no HTML
    tempVal.textContent = temp;
    umiArVal.textContent = umiAr;
    umiSoloVal.textContent = umiSolo;

    let problemas = [];

    // Regras de cultivo para o morango
    if (temp < 15) problemas.push("Muito frio");
    if (temp > 25) problemas.push("Muito quente");
    
    if (umiAr < 60) problemas.push("Ar muito seco");
    if (umiAr > 80) problemas.push("Risco de fungos (Ar muito úmido)");

    if (umiSolo < 65) problemas.push("Falta água no solo");
    if (umiSolo > 85) problemas.push("Solo encharcado (Desperdício de água)");

    // Exibe o resultado
    if (problemas.length === 0) {
        statusTexto.textContent = "Equilíbrio Sustentável Perfeito! Os morangos estão no clima ideal, sem desperdício de recursos.";
        statusTexto.style.color = "#2E7D32"; // Verde
        statusEmoji.textContent = "🍓✨🌱";
    } else {
        statusTexto.textContent = "Alerta Ambiental/Produção: " + problemas.join(" | ");
        statusTexto.style.color = "#D32F2F"; // Vermelho
        
        // Altera o emoji dependendo do problema
        if (temp > 25 || umiSolo < 65) {
            statusEmoji.textContent = "🥀☀️"; // Murchando
        } else if (temp < 15) {
            statusEmoji.textContent = "🥶🧊"; // Congelando
        } else {
            statusEmoji.textContent = "🍄💧"; // Fungos / Excesso
        }
    }
}

// Fica "escutando" as mudanças nas barras para atualizar em tempo real
tempInput.addEventListener('input', calcularEstufa);
umiArInput.addEventListener('input', calcularEstufa);
umiSoloInput.addEventListener('input', calcularEstufa);

// Inicia o simulador já atualizado
calcularEstufa();