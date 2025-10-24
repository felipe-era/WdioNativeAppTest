// ./pageobjects/swipe.page.ts
import { $ } from '@wdio/globals';
import allureReporter from '@wdio/allure-reporter';

class SwipePage {

    /**
     * SELETOR
     */

    // Ícone de navegação para a tela de Swipe
    private get iconNavSwipe() {
        return $("-android uiautomator:new UiSelector().text(\"Swipe\")");
    }

    /**
     * MÉTODOS DE AÇÃO
     */

    /**
     * Navega para a tela de Swipe.
     */
    public async navigateToSwipeScreen() {
        allureReporter.addStep('Navegando para a tela de Swipe');
        await this.iconNavSwipe.click();
    }

    public async performSwipeSequence() {
        allureReporter.addStep('Iniciando sequência de 13 swipes (baseados em coordenadas)');

        // Swipes R-L (Direita para Esquerda)
        await this.swipe(801, 1379, 60, 1379);
        await this.swipe(801, 1400, 92, 1400);
        await this.swipe(791, 1407, 64, 1390);
        await this.swipe(787, 1418, 128, 1404);
        await this.swipe(759, 1450, 128, 1450);

        // Swipes L-R (Esquerda para Direita)
        await this.swipe(124, 1457, 858, 1446);
        await this.swipe(156, 1489, 730, 1499);
        await this.swipe(131, 1489, 890, 1485);
        await this.swipe(149, 1503, 900, 1503);
        await this.swipe(135, 1478, 851, 1478);
        await this.swipe(160, 1499, 606, 1499);

        // Swipes Verticais
        await this.swipe(528, 1521, 539, 752); // Baixo para Cima
        await this.swipe(596, 596, 567, 1531); // Cima para Baixo

        allureReporter.addStep('Sequência de swipes concluída');
    }

    /**
     * Helper privado para executar as ações de swipe/drag
     */
    private async swipe(fromX: number, fromY: number, toX: number, toY: number) {
        await driver.action('pointer')
            .move({ duration: 0, x: fromX, y: fromY })
            .down({ button: 0 })
            .move({ duration: 1000, x: toX, y: toY }) // 1 segundo de duração
            .up({ button: 0 })
            .perform();
    }
}

export default new SwipePage();