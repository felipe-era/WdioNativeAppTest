## 📱 Automação Mobile Android · WebdriverIO + Appium

Projeto de automação de testes E2E para o aplicativo WdioDemoApp.apk, utilizando WebdriverIO, Appium e TypeScript, com arquitetura baseada em POM + Data Driven + Allure.

## ▶️ Gravação de tela dos testes em execução

https://github.com/user-attachments/assets/982a52fb-5d4a-4980-b077-870eb5734c80

---

## 💻 Tecnologias Utilizadas
✅ WebdriverIO v8 \
✅ Appium v2 \
✅ TypeScript \
✅ Mocha \
✅ Chai (BDD) \
✅ UiAutomator2 \
✅ Allure Reports \
✅ Git / CI-ready 

---

## Cenários de Teste Cobertos

A suíte de testes automatizados cobre os seguintes fluxos e validações funcionais do aplicativo:

### Login e Cadastro
* **CT001:** Deve realizar um novo cadastro com sucesso.
* **CT002:** Deve exibir mensagem de erro para email inválido.
* **CT003:** Deve exibir mensagem de erro para senhas que não conferem.
* **CT004:** Deve realizar login com sucesso (lendo dados do JSON).

### Funcionalidades Principais
* **CT005:** Deve preencher o formulário, salvar e validar o estado.
* **CT006:** Deve interagir com a tela do "Copilot" (robô).
* **CT007:** Deve navegar na Webview, validar textos e interagir com o menu e scroll.
* **CT008:** Deve navegar pelas abas principais (Home, Webview, Login, Forms) e validar o conteúdo de cada tela.

### Gestos
* **CT009:** Deve navegar para a tela de "Swipe" e executar uma sequência de gestos de arrastar.
* **CT010:** Deve navegar para a tela de "Gestos" (Draw) e executar movimentos complexos na tela.

---
📁 Estrutura simplificada
Aqui está a estrutura em Markdown, pronta para copiar e colar no seu README.md:

<img width="539" height="185" alt="image" src="https://github.com/user-attachments/assets/f47d569e-0c62-48df-aa00-6a83f16401ba" />

## Funcionalidades do Framework

Este projeto atende aos seguintes requisitos:

* **Page Object Model (POM)**: Toda a lógica de seletores e métodos de interação está abstraída em classes (`/pageobjects`). Os testes (`/specs`) são limpos, legíveis e focados apenas no fluxo e nas validações.
* **Testes Orientados a Dados (Data-Driven)**: Os testes de Login e Cadastro utilizam um arquivo `data/usuarios.json` para fornecer diferentes massas de dados (usuário válido, email inválido, senhas divergentes), permitindo validar múltiplos cenários sem duplicar o código do teste.
* **Geração de Evidências (Allure Report)**:
    * Configurado para gerar relatórios Allure completos, que incluem o resumo da execução, logs de passos, e informações do ambiente.
    * Captura **screenshots automaticamente** ao final de *cada* teste (seja sucesso ou falha), anexando-os diretamente ao relatório para facilitar a análise de falhas.
* **Pronto para CI/CD**: O projeto é executado via comandos `npm` e não depende de IDEs, estando pronto para ser integrado a qualquer pipeline de CI/CD (como GitLab CI/CD).
* **Execução Flexível**: A configuração em `wdio.conf.js` permite a execução em emuladores Android locais e pode ser facilmente estendida para serviços em nuvem como BrowserStack (requisito opcional).

---
### ⚙️ Como buildar o projeto

```bash
git clone https://github.com/felipe-era/WdioNativeAppTest.git
cd WdioNativeAppTest
```
---
## Configuração do Ambiente

### Pré-requisitos

Para executar este projeto localmente, você precisará ter o seguinte software instalado e configurado:

1.  **Node.js** (v18+ recomendado)
2.  **JDK** (v11 ou v17)
3.  **Android Studio** (para o SDK do Android e gerenciamento de emuladores)
4.  Variáveis de ambiente `ANDROID_HOME` e `JAVA_HOME` configuradas.
5.  **Appium 2.0** (instalado globalmente):
    ```bash
    npm install -g appium
    ```
6.  **Driver UiAutomator2** (instalado pelo Appium):
    ```bash
    appium driver install uiautomator2
    ```
7. **Visualizando os Relatórios (Allure)**
    ```bash
    allure generate allure-results --clean -o allure-report
    ```
8. **Abrir Relatório Gerado**
    ```bash
    allure open allure-report
    ```    

---

### Exemplo de configuração para rodar com BrowserStack

    // Em wdio.conf.ts
    // ... (imports)
    export const config = {
    // ... (specs, framework, etc.)
    // 1. ADICIONE SEU USUÁRIO E CHAVE (lendo das variáveis de ambiente)
    user: process.env.BROWSERSTACK_USER,
    key: process.env.BROWSERSTACK_KEY,
    // 2. ADICIONE 'browserstack' AOS SERVIÇOS
    services: [
        'browserstack',
        // ['appium'] 
    ],  
    // 3. SUBSTITUA 'capabilities' ESTE:
    capabilities: [{      
        // Opções específicas do BrowserStack
        'bstack:options': {
            // Exemplo de dispositivo
            deviceName: 'Google Pixel 7', 
            platformVersion: '13.0',
            platformName: 'android',

            // Nomes para organização no BrowserStack
            buildName: 'Regressão Android v1.2',
            projectName: 'Meu Projeto Appium',
        },
        'appium:app': path.join(process.cwd(), 'app/android.wdio.native.app.v1.0.8.apk') 
    }],
    // ... (resto do seu arquivo de config: reporters, mochaOpts, etc.)
    };
    
  
