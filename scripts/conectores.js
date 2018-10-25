"use strict"

var coordenacao = {
    'Aditivos': [
        'e',
        'nem',
        'não só...mas também',
        'não só...mas ainda',
        'não só...como',
        'não apenas...como',
        'que'
    ],
    'Adversativos': [
        'mas',
        'porém',
        'entretanto',
        'todavia',
        'contudo',
        'no entanto',
        'não obstante'
    ],
    'Alternativos': [
        'ou',
        'ou...ou',
        'ora...ora',
        'já...já',
        'quer...quer',
        'seja...seja'
    ],
    'Conclusivos': [
        'pois (após o verbo)',
        'portanto',
        'logo',
        'assim',
        'por isso',
        'por conseguinte',
        'desse modo',
        'dessa forma'
    ],
    'Explicativos': [
        'pois (antes do verbo)',
        'que (após infinitivo)',
        'já que',
        'porque',
        'porquanto'
    ]
};

var subordinacao = {
        'Causais': [
            'como (oração anteposta à OP)',
            'porque',
            'porquanto',
            'na medida em que',
            'haja vista',
            'dado que',
            'já que',
            'visto que',
            'uma vez que'
        ],
        'Consecutivos': [
            'tal que',
            'tanto que',
            'tão que',
            'de modo que',
            'de forma que',
            'de sorte que'
        ],
        'Concessivos': [
            'conquanto',
            'embora',
            'malgrado',
            'ainda que',
            'apesar de que',
            'posto que',
            'mesmo que',
            'se bem que'
        ],
        'Condicionais': [
            'caso',
            'se',
            'somente se',
            'apenas se',
            'desde que',
            'a menos que',
            'contanto que'
        ],
        'Comparativos': [
            'como',
            'igual a',
            'tal qual',
            'tanto quanto',
            'mais (do) que',
            'menos (do) que'
        ],
        'Conformativos': [
            'como',
            'conforme',
            'segundo',
            'consoante',
            'de acordo com'
        ],
        'Temporais': [
            'já',
            'mal',
            'agora',
            'enquanto',
            'quando',
            'desde que',
            'logo que',
            'assim que',
            'ao mesmo tempo que'
        ],
        'Proporcionais': [
            'à medida que',
            'à proporção que',
            'ao passo que',
            'quanto (mais / menos)...(mais / menos)'
        ],
        'Finais': [
            'para que',
            'a fim de'
        ]
};

var conectores = new Array();
var respostas = new Array();
var mapaInverso = new Map();
var conectorSorteado;
var tiposSorteado;
var numeroAcertos = 0;
var numeroErros = 0;

window.addEventListener('load', inicializa);

function inicializa() {
    for(let tipo in coordenacao) {
        conectores = conectores.concat(coordenacao[tipo]);
    }

    for(let tipo in subordinacao) {
        conectores = conectores.concat(subordinacao[tipo]);
    }

    inicializaMapaInverso();

    inicializaSelecaoDeTipos();
}

function inicializaMapaInverso() {
    for(let conector of conectores) {
        mapaInverso.set(conector, buscaTipos(conector));
    }

    sortear_conector();
}

function buscaTipos(conector) {
    let tiposDoConector = new Array();

    for(let tipo in coordenacao) {
        if(coordenacao[tipo].includes(conector)) {
            tiposDoConector.push(tipo);
        }
    }

    for(let tipo in subordinacao) {
        if(subordinacao[tipo].includes(conector)) {
            tiposDoConector.push(tipo);
        }
    }

    return tiposDoConector;
}

function inicializaSelecaoDeTipos() {
    let selectTiposConectores = document.getElementById('tipoConector');

    let optionInicial = document.createElement('option');
    optionInicial.value = '';
    optionInicial.innerHTML = '';
    optionInicial.selected = true;
    selectTiposConectores.appendChild(optionInicial);

    let grupoCoordenacao = document.createElement('optgroup');
    grupoCoordenacao.label = 'Coordenação';
    selectTiposConectores.appendChild(grupoCoordenacao);
    for(let tipo in coordenacao) {
        let option = document.createElement('option');
        option.value = tipo;
        option.innerHTML = tipo;
        grupoCoordenacao.appendChild(option);
    }

    let grupoSubordinacao = document.createElement('optgroup');
    grupoSubordinacao.label = 'Subordinação';
    selectTiposConectores.appendChild(grupoSubordinacao);
    for(let tipo in subordinacao) {
        let option = document.createElement('option');
        option.value = tipo;
        option.innerHTML = tipo;
        grupoSubordinacao.appendChild(option);
    }
}

function responder_e_sortear() {
    if(document.getElementById('tipoConector').value == '') {
        return;
    }

    responder();
    sortear_conector();
}

function sortear_conector() {
    if(conectores.length == 0) {
        return;
    }

    let indice = Math.floor(Math.random() * conectores.length);

    conectorSorteado = conectores[indice];
    tiposSorteado = mapaInverso.get(conectorSorteado);

    document.getElementById('conector').innerHTML = conectorSorteado;
    conectores.splice(indice, 1);
}

function responder() {
    if(conectorSorteado == null) {
        return;
    }

    let resposta = document.getElementById('tipoConector').value;
    let tbodyRespostas = document.getElementById('tbodyRespostas');

    let tr = document.createElement('tr');

    let respostaCorreta = tiposSorteado.includes(resposta);
    if(respostaCorreta) {
        tr.classList.add('correto');
        numeroAcertos++;
        document.getElementById('numeroAcertos').innerHTML = numeroAcertos;
    } else {
        tr.classList.add('incorreto');
        numeroErros++;
        document.getElementById('numeroErros').innerHTML = numeroErros;
    }

    tbodyRespostas.appendChild(tr);

    adicionaColunaTabelaResposta(tr, conectorSorteado);
    adicionaColunaTabelaResposta(tr, tiposSorteado.join(', '));
    adicionaColunaTabelaResposta(tr, resposta);

    conectorSorteado = null;
    tiposSorteado = null;
    document.getElementById('tipoConector').value = '';
}

function adicionaColunaTabelaResposta(tr, valor) {
    let td = document.createElement('td');
    td.innerHTML = valor;
    tr.appendChild(td);
}
