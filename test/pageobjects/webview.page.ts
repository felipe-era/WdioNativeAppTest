// ./pageobjects/webview.page.ts
import { $ } from '@wdio/globals';
import allureReporter from '@wdio/allure-reporter';

class WebviewPage {

    /**
     * SELETORES
     */
    private get navWebview() {
        return $("-android uiautomator:new UiSelector().text(\"Webview\")");
    }

    // Texto principal (cabeçalho) da página
    public get textHeader() {
        return $("-android uiautomator:new UiSelector().text(\"Next-gen browser and mobile automation test framework for Node.js\")");
    }

    // Botão do menu "hamburger"
    private get btnToggleNav() {
        return $("-android uiautomator:new UiSelector().description(\"Toggle navigation bar\")");
    }

    // Item "API" no menu lateral
    private get menuItemAPI() {
        return $("-android uiautomator:new UiSelector().text(\"API\")");
    }

    // Texto "Introduction" para validar após clicar em API
    public get textIntroduction() {
        return $("-android uiautomator:new UiSelector().text(\"Introduction\")");
    }

    /**
     * MÉTODOS DE AÇÃO
     */

    public async navigateToWebview() {
        await this.navWebview.click();
    }

    /**
     * Abre o menu lateral e navega para a seção API.
     */
    public async openApiMenu() {
        await this.textHeader.click();
        
        await this.btnToggleNav.click();
        
        await this.menuItemAPI.click();
    }

    public async performManualScrolls() {
        allureReporter.addStep('Executando 2 scrolls manuais (coordenadas)');
        await this.scroll(518, 1446, 720, 603);
        await this.scroll(624, 1772, 479, 592);
    }

    public async scrollToPageEnd() {
        allureReporter.addStep('Rolando até o final da página');
        
        const scrollableSelector = 'new UiScrollable(new UiSelector().scrollable(true)).scrollToEnd(5)';
        
        await $(`-android uiautomator:${scrollableSelector}`);
    }

    /**
     * Helper privado para executar as ações de scroll
     */
    private async scroll(fromX: number, fromY: number, toX: number, toY: number) {
        await driver.action('pointer')
            .move({ duration: 0, x: fromX, y: fromY })
            .down({ button: 0 })
            .move({ duration: 1000, x: toX, y: toY })
            .up({ button: 0 })
            .perform();
    }
}

export default new WebviewPage();