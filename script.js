// script.js

// Elementos do formulário
const form = document.getElementById('enderecoForm');
const cepInput = document.getElementById('cep');
const logradouroInput = document.getElementById('logradouro');
const numeroInput = document.getElementById('numero');
const ufInput = document.getElementById('uf');
const complementoInput = document.getElementById('complemento');

// Máscara automática para CEP
cepInput.addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, ''); // Remove tudo que não é dígito
    
    // Aplica a máscara usando regex com grupos de captura
    if (value.length > 0) {
        value = value.replace(/^(\d{5})(\d{0,3})/, '$1-$2');
    }
    
    e.target.value = value;
    
    // Feedback visual durante digitação
    if (value.length === 9) {
        e.target.classList.add('success');
        e.target.classList.remove('error');
    } else {
        e.target.classList.remove('success', 'error');
    }
});

// Converter UF para maiúsculo automaticamente
ufInput.addEventListener('input', function(e) {
    let value = e.target.value.toUpperCase();
    
    // Permite apenas letras
    value = value.replace(/[^A-Z]/g, '');
    
    e.target.value = value;
    
    // Feedback visual
    if (value.length === 2) {
        e.target.classList.add('success');
        e.target.classList.remove('error');
    } else {
        e.target.classList.remove('success', 'error');
    }
});

// Permitir apenas dígitos no campo número
numeroInput.addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, ''); // Remove tudo que não é dígito
    e.target.value = value;
    
    // Feedback visual
    if (value.length > 0) {
        e.target.classList.add('success');
        e.target.classList.remove('error');
    } else {
        e.target.classList.remove('success', 'error');
    }
});

// Feedback visual para logradouro
logradouroInput.addEventListener('input', function(e) {
    const value = e.target.value.trim();
    
    if (value.length >= 5) {
        e.target.classList.add('success');
        e.target.classList.remove('error');
    } else {
        e.target.classList.remove('success', 'error');
    }
});

// Funções de validação
function validarCEP(cep) {
    // Regex para validar CEP no formato 00000-000
    const cepRegex = /^(\d{5})-(\d{3})$/;
    return cepRegex.test(cep);
}

function validarLogradouro(logradouro) {
    return logradouro.trim().length >= 5;
}

function validarNumero(numero) {
    // Deve conter apenas dígitos e não ser vazio
    const numeroRegex = /^\d+$/;
    return numeroRegex.test(numero);
}

function validarUF(uf) {
    // Regex para validar UF (exatamente 2 letras maiúsculas)
    const ufRegex = /^[A-Z]{2}$/;
    return ufRegex.test(uf);
}

function mostrarErro(campo, mensagem) {
    campo.classList.add('error', 'shake');
    campo.classList.remove('success');
    
    alert(mensagem);
    
    // Remove a animação após completar
    setTimeout(() => {
        campo.classList.remove('shake');
    }, 500);
    
    // Foca no campo com erro
    campo.focus();
}

function mostrarSucesso(campo) {
    campo.classList.add('success', 'pulse-success');
    campo.classList.remove('error');
    
    setTimeout(() => {
        campo.classList.remove('pulse-success');
    }, 300);
}

// Controle do envio do formulário
form.addEventListener('submit', function(e) {
    e.preventDefault(); // Impede o envio padrão
    
    // Coleta os valores dos campos
    const cep = cepInput.value.trim();
    const logradouro = logradouroInput.value.trim();
    const numero = numeroInput.value.trim();
    const uf = ufInput.value.trim();
    const complemento = complementoInput.value.trim();

    // Validações
    
    // Validar CEP
    if (!cep) {
        mostrarErro(cepInput, 'Erro: O campo CEP é obrigatório!');
        return;
    }
    if (!validarCEP(cep)) {
        mostrarErro(cepInput, 'Erro: CEP deve estar no formato 00000-000!');
        return;
    }

    // Validar Logradouro
    if (!logradouro) {
        mostrarErro(logradouroInput, 'Erro: O campo Logradouro é obrigatório!');
        return;
    }
    if (!validarLogradouro(logradouro)) {
        mostrarErro(logradouroInput, 'Erro: Logradouro deve ter no mínimo 5 caracteres!');
        return;
    }

    // Validar Número
    if (!numero) {
        mostrarErro(numeroInput, 'Erro: O campo Número é obrigatório!');
        return;
    }
    if (!validarNumero(numero)) {
        mostrarErro(numeroInput, 'Erro: O campo Número deve conter apenas dígitos!');
        return;
    }

    // Validar UF
    if (!uf) {
        mostrarErro(ufInput, 'Erro: O campo UF é obrigatório!');
        return;
    }
    if (!validarUF(uf)) {
        mostrarErro(ufInput, 'Erro: UF deve conter exatamente 2 letras maiúsculas (ex: SP, RJ, MG)!');
        return;
    }

    // Se chegou até aqui, todos os campos são válidos
    
    // Feedback visual de sucesso para todos os campos obrigatórios
    mostrarSucesso(cepInput);
    mostrarSucesso(logradouroInput);
    mostrarSucesso(numeroInput);
    mostrarSucesso(ufInput);

    // Exibir mensagem de sucesso
    setTimeout(() => {
        alert('Endereço cadastrado com sucesso!');
        
        // Opcional: Limpar o formulário após sucesso
        // form.reset();
        
        // Opcional: Exibir dados cadastrados
        console.log('Dados cadastrados:', {
            cep: cep,
            logradouro: logradouro,
            numero: numero,
            uf: uf,
            complemento: complemento || 'Não informado'
        });
        
    }, 500);
});

// Remover classes de erro/sucesso quando o usuário começar a digitar novamente
[cepInput, logradouroInput, numeroInput, ufInput].forEach(input => {
    input.addEventListener('focus', function() {
        this.classList.remove('error');
    });
});

// Validação em tempo real (opcional - para melhor UX)
cepInput.addEventListener('blur', function() {
    const value = this.value.trim();
    if (value && !validarCEP(value)) {
        this.classList.add('error');
    }
});

logradouroInput.addEventListener('blur', function() {
    const value = this.value.trim();
    if (value && !validarLogradouro(value)) {
        this.classList.add('error');
    }
});

numeroInput.addEventListener('blur', function() {
    const value = this.value.trim();
    if (value && !validarNumero(value)) {
        this.classList.add('error');
    }
});

ufInput.addEventListener('blur', function() {
    const value = this.value.trim();
    if (value && !validarUF(value)) {
        this.classList.add('error');
    }
});