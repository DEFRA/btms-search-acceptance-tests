import { Page } from "page-objects/page.js";
import { browser, $ } from "@wdio/globals";
import { analyse } from "../../dist/wcagchecker.cjs";

class HomePage extends Page {
  get loginBtn() {
    return $("#login-link");
  }

  open() {
    super.open("/");
  }

  async login() {
    await this.loginBtn.waitForExist({ timeout: 3000 });
    await analyse(browser, "");
    await this.loginBtn.click()
  }
}

export default new HomePage();
