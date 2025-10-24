import { $ } from '@wdio/globals'

class LoginPage  {
    private get iconMenuLogin() {
        return $("-android uiautomator:new UiSelector().text(\"󰍂\")");
    }
    private get btnSignUpLink() {
        return $("-android uiautomator:new UiSelector().text(\"Sign up\")");
    }
    private get inputEmail() {
        return $("accessibility id:input-email");
    }
    private get inputPassword() {
        return $("accessibility id:input-password");
    }
    private get inputRepeatPassword() {
        return $("accessibility id:input-repeat-password");
    }
    private get btnSignUpSubmit() {
        return $("-android uiautomator:new UiSelector().text(\"SIGN UP\")");
    }

    // --- Alerta Nativo (Popup) ---

    public get validationErrorMessage() {
        return $("-android uiautomator:new UiSelector().text(\"Please enter a valid email address\")");
    }

    public get passwordMismatchErrorMessage() {
        return $("-android uiautomator:new UiSelector().text(\"Please enter the same password\")");
    }
    /**
     * Texto de informação sobre Biometria
     */
    public get textBiometricsInfo() {
        return $("-android uiautomator:new UiSelector().text(\"When the device has Touch/FaceID (iOS) or FingerPrint enabled a biometrics button will be shown to use and test the login.\")");
    }

    public get btnLoginLink() {
        return $("-android uiautomator:new UiSelector().text(\"Login\").instance(0)"); 
    }
    public get alertMessage() {
        return $("id:android:id/message");
    }

    public get alertButtonOk() {
        return $("id:android:id/button1");
    }


    /**
     * MÉTODOS DE AÇÃO
     */

    public async novoCadastro(email: string, password: string, passwordConfirm: string) {
        // Navega até o formulário
        await this.iconMenuLogin.click();
        await this.btnSignUpLink.click();

        await this.inputEmail.addValue(email);
        await this.inputPassword.addValue(password);

        await this.inputRepeatPassword.addValue(passwordConfirm);

        await this.btnSignUpSubmit.click();
    }

    public async getAlertMessageText(): Promise<string> {
        await this.alertMessage.waitForDisplayed({ timeout: 5000 });
        return this.alertMessage.getText();
    }

    public async acceptAlert() {
        await this.alertMessage.click();
        await this.alertButtonOk.click();
    }
    private get btnLoginSubmit() {
        return $("-android uiautomator:new UiSelector().text(\"LOGIN\")");
    }

    public async login(email: string, password: string) {
        await this.iconMenuLogin.click();

        await this.inputEmail.addValue(email);
        await this.inputPassword.addValue(password);

        await this.btnLoginSubmit.click();
    }

}

export default new LoginPage();
