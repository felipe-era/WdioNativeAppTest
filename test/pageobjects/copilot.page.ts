// ./pageobjects/copilot.page.ts
import { $ } from '@wdio/globals';

class CopilotPage {

    /**
     * SELETORES
     */

    private get iconNavCopilot() {
        return $("-android uiautomator:new UiSelector().text(\"󰖟\")");
    }
    private get menuItemCopilot() {
        return $("-android uiautomator:new UiSelector().text(\"WebdriverIO AI Copilot\")");
    }
    private get inputField() {
        return $("class name:android.widget.EditText");
    }
    private get btnSubmit() {
        return $("class name:android.widget.Button");
    }


    /**
     * MÉTODOS DE AÇÃO
     */

    public async askCopilot(promptText: string) {
        await this.iconNavCopilot.click();
        await this.menuItemCopilot.click();
        await this.inputField.addValue(promptText);
        await this.btnSubmit.click();
    }
}

export default new CopilotPage();