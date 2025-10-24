// ./pageobjects/nav.component.ts
import { $ } from '@wdio/globals';
import allureReporter from '@wdio/allure-reporter';

class NavComponent {
    
    // Ícone da aba Webview/Copilot
    private get iconNavWebview() {
        return $("-android uiautomator:new UiSelector().text(\"󰖟\")");
    }

    // Ícone da aba Login
    private get iconNavLogin() {
        return $("-android uiautomator:new UiSelector().text(\"󰍂\")");
    }

    // Ícone da aba Forms
    private get iconNavForms() {
        return $("-android uiautomator:new UiSelector().text(\"󰏫\")");
    }

    // --- Métodos de Ação ---

    public async goToWebview() {
        allureReporter.addStep('Navegando para a aba Webview/Copilot');
        await this.iconNavWebview.click();
    }
    
    public async goToLogin() {
        allureReporter.addStep('Navegando para a aba Login');
        await this.iconNavLogin.click();
    }
    
    public async goToForms() {
        allureReporter.addStep('Navegando para a aba Forms');
        await this.iconNavForms.click();
    }
}

export default new NavComponent();