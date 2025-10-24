// ./pageobjects/gesture.page.ts
import { $ } from '@wdio/globals';
import allureReporter from '@wdio/allure-reporter';

class GesturePage {

    /**
     * SELETOR
     */

    private get iconNavGesture() {
        return $("-android uiautomator:new UiSelector().text(\"󰇛\")");
    }

    /**
     * MÉTODOS DE AÇÃO
     */

    public async navigateToGestureScreen() {
        allureReporter.addStep('Navegando para a tela de Gestos (Draw)');
        await this.iconNavGesture.click();
    }

    /**
     * Executa a sequência de 9 gestos complexos (arrastar).
     * (AÇÕES EXTREMAMENTE FRÁGEIS BASEADAS EM COORDENADAS)
     */
    public async performGestureSequence() {
        allureReporter.addStep('Iniciando sequência de 9 gestos complexos');

        await this.swipe(734, 1673, 571, 635);
        await this.swipe(907, 1709, 574, 1113);
        await this.swipe(454, 1914, 521, 861);
        await this.swipe(230, 1702, 330, 883);
        await this.swipe(649, 1921, 333, 635);
        await this.swipe(330, 1687, 737, 1042);
        await this.swipe(539, 1733, 808, 627);
        await this.swipe(805, 1847, 333, 1110);
        await this.swipe(245, 1900, 791, 869);
        
        allureReporter.addStep('Sequência de gestos concluída');
    }

    /**
     * Helper privado para executar as ações de swipe/drag
     */
    private async swipe(fromX: number, fromY: number, toX: number, toY: number) {
        await driver.action('pointer')
            .move({ duration: 0, x: fromX, y: fromY })
            .down({ button: 0 })
            .move({ duration: 1000, x: toX, y: toY }) 
            .up({ button: 0 })
            .perform();
    }
}

export default new GesturePage();