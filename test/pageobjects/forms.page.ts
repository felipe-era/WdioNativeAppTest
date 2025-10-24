// ./pageobjects/forms.page.ts
import { $ } from '@wdio/globals';

class FormsPage {

    /**
     * SELETORES
     */
    public get textFormsHeader() {
        return $("-android uiautomator:new UiSelector().text(\"Form components\")");
    }
    private get iconNavForms() {
        return $("-android uiautomator:new UiSelector().text(\"󰏫\")");
    }
    private get inputField() {
        return $("accessibility id:text-input");
    }
    public get switch() {
        return $("accessibility id:switch");
    }
    private get dropdownTrigger() {
        return $("-android uiautomator:new UiSelector().resourceId(\"text_input\")");
    }
    private get dropdownOptionAppium() {
        return $("-android uiautomator:new UiSelector().text(\"Appium is awesome\")");
    }
    private get btnSave() {
        return $("-android uiautomator:new UiSelector().className(\"android.view.ViewGroup\").instance(17)");
    }
    public get textInactiveResult() {
        return $("-android uiautomator:new UiSelector().text(\"Inactive\")");
    }


    /**
     * MÉTODOS DE AÇÃO
     */

    public async preencherFormulario(texto: string) {
        await this.iconNavForms.click();

        await this.inputField.addValue(texto);

        await this.switch.click();

        await this.dropdownTrigger.click();

        await this.dropdownOptionAppium.click();

        await this.btnSave.click();
    }

    public async clicarSwitch() {
        await this.switch.click();
    }
}

export default new FormsPage();