import { Page } from "./page.js";
import { browser, $$ } from "@wdio/globals";
import { analyse } from "../../dist/wcagchecker.cjs";

class RegisteredUsersPage extends Page {
  userLogins(input) {
    return $$(`//th[text()='${input}']/parent::tr/td/a`)
  }

  async loginAsUser(input){
    await analyse(browser, "");
    await this.userLogins(input)[0].click();
  }
}

export default new RegisteredUsersPage();
