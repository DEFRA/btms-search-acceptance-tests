import { expect } from "@wdio/globals";
import Home from "page-objects/home.page.js";
import RegisteredUsersPage from "page-objects/registered_users.page.js";
import SearchPage from "page-objects/search.page.js";

describe("Home page", () => {
  it("Should have a login button", async () => {
    await Home.open();
    await expect(Home.loginBtn).toBeDisplayed();
  });

  it("Should login a registered user and navigate to the search page", async () => {
    await Home.open();
    await Home.login();
    await RegisteredUsersPage.loginAsUser(process.env.USR);
    await expect(await SearchPage.isSearchTextBoxDisplayed()).toBe(true);
  });
});
