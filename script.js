class JogoAdivinhacao {

    numeroAleatorio;
    input = document.getElementById('valorInformado');
    botaoJogar = document.getElementById("botaoJogar");
    textMensagem = document.getElementById("textMensagem");
    reiniciar = document.getElementById('botaoRecomecar');
    tentativa = 1;
    jogadas = [];

    constructor() {

        this.botaoJogar.addEventListener("click", () => this.jogar());

        this.reiniciar.addEventListener("click", () => this.recomecar());

        this.numeroAleatorio = this.obterNumeroAleatorio();

        this.reiniciar.style.display = "none";

        this.textMensagem.placeholder = "Acima, digite um nr° para tentar, boa sorte!";

    }

    jogar() {

        let valorInformado = this.input.value;

        if (!this.numeroValido(valorInformado))
            return;

        if (this.numeroAleatorio == valorInformado)
            this.exibirMensagem(true);

        else {
            this.textMensagem.value = `Tente novamente: Tentativa ${this.tentativa + 1}/5`;
            this.tentativa++;
        }

        if (this.tentativa > 5)
            this.exibirMensagem(false);

        this.input.value = "";

    }


    numeroValido(valorInformado) {

        let ehValido = true;
        let msg = "";

        if (isNaN(valorInformado)) {
            msg = `Informe apenas números, você digitou: ${valorInformado}`;
            ehValido = false;
        }
        else if (valorInformado.trim().length == 0) {
            msg = `Informe um número para jogar`;
            ehValido = false;
        }
        else if (this.jogadas.includes(valorInformado)) {
            msg = `Você ja tentou o número ${valorInformado}`;
            ehValido = false;
        }
        else if (valorInformado > 20) {
            msg = "O número máximo para jogar é 20";
            ehValido = false;
        }
        if (ehValido == false) {
            this.textMensagem.value = msg;
            this.input.value = "";
        }
        else {
            this.jogadas.push(valorInformado);
        }

        return ehValido;
    }

    exibirMensagem(venceu) {

        let msg = venceu == true ? 'Parabéns! Você acertou' : 'Fim de Jogo! O número secreto era'
        this.textMensagem.value = `${msg}: ${this.numeroAleatorio}`;
        this.reiniciar.style.display = "grid";
        this.botaoJogar.disabled = true;
    }

    recomecar() {

        this.textMensagem.value = "";
        this.input.value = "";
        this.tentativa = 1;
        this.jogadas = [];
        this.numeroAleatorio = this.obterNumeroAleatorio();
        this.reiniciar.style.display = "none";
        this.botaoJogar.disabled = false;
        this.textMensagem.placeholder = "Acima, digite um nr° para tentar, boa sorte!";

    }

    obterNumeroAleatorio() {
        return Math.floor(Math.random() * 21);
    }
}

window.addEventListener("load", () => new JogoAdivinhacao());