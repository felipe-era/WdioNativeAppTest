import allureReporter from '@wdio/allure-reporter';
import WebviewPage from '../pageobjects/webview.page';
import { expect } from 'chai';
import LoginPage from '../pageobjects/login.page';
import FormsPage from '../pageobjects/forms.page';
import CopilotPage from '../pageobjects/copilot.page';
import dadosTeste from '../data/usuarios.json';
import NavComponent from '../pageobjects/nav.component';
import HomePage from '../pageobjects/home.page';
import SwipePage from '../pageobjects/swipe.page';
import GesturePage from '../pageobjects/gesture.page';

afterEach('Anexar screenshot ao final do teste', async function () {
    const testState = this.currentTest?.state;

    try {
        const screenshot = await browser.takeScreenshot();
        const nomeAnexo = `Screenshot no fim do teste (${testState})`;

        await allureReporter.addAttachment(
            nomeAnexo,
            Buffer.from(screenshot, 'base64'),
            'image/png'
        );
    } catch (err) {
        console.error('Erro ao tirar screenshot no afterEach:', err);
    }
});

beforeEach(async () => {
    // 'reloadSession()' forma limpa de reiniciar o app 
    await driver.reloadSession();
});

describe('Testes wdiodemoapp', () => {

    it('CT001 - Deve realizar um novo cadastro com sucesso...', async () => {
        const email = dadosTeste.usuarioValido.email;
        const password = dadosTeste.usuarioValido.password;
        await LoginPage.novoCadastro(email, password, password);

        const mensagemDoAlerta = await LoginPage.getAlertMessageText();
        expect(mensagemDoAlerta).to.equal('You successfully signed up!');
        await LoginPage.acceptAlert();
    });

    it('CT002 - deve exibir mensagem de erro para email inválido...', async () => {
        const emailInvalido = dadosTeste.usuarioInvalido.email;
        const password = dadosTeste.usuarioInvalido.password;

        await LoginPage.novoCadastro(emailInvalido, password, password); // Passa a senha 2x

        const elemErro = LoginPage.validationErrorMessage;
        const estaVisivel = await elemErro.isDisplayed();
        expect(estaVisivel, "A mensagem de erro de email deveria estar visível").to.be.true;
    });

    it('CT003 - deve exibir mensagem de erro para senhas que não conferem (lendo dados do JSON)', async () => {
        allureReporter.addStep('Iniciando teste de senhas divergentes');

        const email = dadosTeste.outroUsuarioInvalido.email;
        const password = dadosTeste.outroUsuarioInvalido.password;
        const passwordConfirm = dadosTeste.outroUsuarioInvalido.passwordConfirm; // A senha diferente

        allureReporter.addStep(`Usando massa de dados: email [${email}]`);
        allureReporter.addStep(`Usando senhas divergentes`);

        await LoginPage.novoCadastro(email, password, passwordConfirm);

        allureReporter.addStep('Validando a mensagem de erro de senhas divergentes');

        const elemErroSenha = LoginPage.passwordMismatchErrorMessage;

        const textoMensagem = await elemErroSenha.getText();
        expect(textoMensagem).to.equal("Please enter the same password");
    });

    it('CT004 - deve realizar login com sucesso (lendo dados do JSON)', async () => {
        allureReporter.addStep('Iniciando teste de login com sucesso');

        const email = dadosTeste.usuarioValido.email;
        const password = dadosTeste.usuarioValido.password;

        allureReporter.addStep(`Usando massa de dados: email [${email}]`);

        await LoginPage.login(email, password);

        allureReporter.addStep('Validando a mensagem de sucesso do alerta');

        const mensagemDoAlerta = await LoginPage.getAlertMessageText();

        expect(mensagemDoAlerta).to.equal('You are logged in!');

        await LoginPage.acceptAlert();
    });

    it('CT005 - deve preencher o formulário, salvar e validar o estado', async () => {
        allureReporter.addStep('Iniciando teste de preenchimento de formulário');
        const textoDoForm = dadosTeste.formData.inputText;
        allureReporter.addStep(`Usando texto: [${textoDoForm}]`);
        await FormsPage.preencherFormulario(textoDoForm);
        allureReporter.addStep('Aceitando o alerta de confirmação');
        await LoginPage.acceptAlert(); // Reutilizando o método!
        allureReporter.addStep('Validando o estado "Inactive"');
        allureReporter.addStep('Clicando no switch (toggle off)');
        await FormsPage.clicarSwitch();
    });

    it('CT006 - Conversa com o robôzinho', async () => {
        await CopilotPage.askCopilot('tal tal tal tal tal');
    });

    it('CT007 - deve navegar na web view, validar textos e interagir', async () => {
        allureReporter.addStep('Iniciando navegação na Webview');
        await WebviewPage.navigateToWebview();
        allureReporter.addStep('Validando o texto do cabeçalho');
        const headerText = await WebviewPage.textHeader.getText();
        expect(headerText).to.equal("Next-gen browser and mobile automation test framework for Node.js");
        allureReporter.addStep('Abrindo o menu API');
        await WebviewPage.openApiMenu();
        allureReporter.addStep('Validando a exibição do texto "Introduction"');
        await driver.pause(3000);
        const introEstaVisivel = await WebviewPage.textIntroduction.isDisplayed();
        expect(introEstaVisivel, "O texto 'Introduction' deveria estar visível").to.be.true;
        await WebviewPage.performManualScrolls();
        await WebviewPage.scrollToPageEnd();
        allureReporter.addStep('Teste de Webview concluído');
    });

    it('CT008 - deve navegar pelas abas e validar o conteúdo de cada tela', async () => {
        allureReporter.addStep('Validando a tela Home');
        await HomePage.textIntro.waitForDisplayed({ timeout: 5000 });
        const textHome = await HomePage.textIntro.getText();
        expect(textHome).to.equal("Demo app for the appium-boilerplate");

        await NavComponent.goToWebview(); 
        allureReporter.addStep('Validando a tela Webview');
        await WebviewPage.textHeader.waitForDisplayed({ timeout: 5000 });
        const textWebview = await WebviewPage.textHeader.getText();
        expect(textWebview).to.equal("Next-gen browser and mobile automation test framework for Node.js");

        await NavComponent.goToLogin(); 

        allureReporter.addStep('Validando a tela Login');
        await LoginPage.textBiometricsInfo.waitForDisplayed({ timeout: 5000 });
        const textLogin = await LoginPage.textBiometricsInfo.getText();
        expect(textLogin).to.equal("When the device has Touch/FaceID (iOS) or FingerPrint enabled a biometrics button will be shown to use and test the login.");

        // --- 4. Navegação e Validação (Forms) ---
        await NavComponent.goToForms();

        allureReporter.addStep('Validando a tela Forms');
        await FormsPage.textFormsHeader.waitForDisplayed({ timeout: 5000 });
        const textForms = await FormsPage.textFormsHeader.getText();
        expect(textForms).to.equal("Form components");

        allureReporter.addStep('Teste de navegação entre abas concluído');
    });

    it('CT009 - deve navegar para a tela de swipe e executar a sequência de gestos', async () => {
        await driver.pause(3000);
        await SwipePage.navigateToSwipeScreen();
        await SwipePage.performSwipeSequence();
    });

    it('CT010 - deve navegar para a tela de gestos e executar os movimentos', async () => {
        await GesturePage.navigateToGestureScreen();
        await GesturePage.performGestureSequence();
        allureReporter.addStep('Teste de gestos concluído');
    });
});
