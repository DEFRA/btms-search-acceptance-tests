import { Page } from "./page.js";
import { browser, $$ } from "@wdio/globals";
import { analyse } from "../../dist/wcagchecker.cjs";

class RegisteredUsersPage extends Page {
  get userLogins() {
    return $$('.govuk-table__body .govuk-table__row .govuk-table__cell:first-of-type a')
  }

  // FIXME: Temporary while a user is seeded that will be available in all environments
  async loginAsFirstUser(){
    await analyse(browser, "");
    await this.userLogins[0].click();
  }
}

export default new RegisteredUsersPage();
