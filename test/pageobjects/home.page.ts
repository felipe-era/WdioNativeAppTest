// ./pageobjects/home.page.ts
import { $ } from '@wdio/globals';

class HomePage {
    
    /**
     * Texto principal 
     */
    public get textIntro() {
        return $("-android uiautomator:new UiSelector().text(\"Demo app for the appium-boilerplate\")");
    }
}

export default new HomePage();