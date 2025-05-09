describe("Testing with BStackDemo", () => {
  it("add product to cart", async () => {
    await browser.url("https://bstackdemo.com/");
    await browser.waitUntil(
      async () => (await browser.getTitle()).match(/StackDemo/i),
      5000,
      "Title didn't match with BrowserStack"
    );

    await browser.setCookies([
      {
        name: "user",
        value: "1234567890",
        path: "/",
        secure: true,
        httpOnly: false, // required "false" to work
        sameSite: "none", // required "none" to work, Lax is default in chrome
      },
    ]);

    const productOnScreen = await $('//*[@id="1"]/p');
    const productOnScreenText = await productOnScreen.getText();

    const addToCart = await $('//*[@id="1"]/div[4]');
    await addToCart.click();

    const productInCart = await $(
      '//*[@id="__next"]/div/div/div[2]/div[2]/div[2]/div/div[3]/p[1]'
    );

    await browser.waitUntil(
      async () => (await productInCart.getText()).match(productOnScreenText),
      { timeout: 5000 }
    );
  });
});
