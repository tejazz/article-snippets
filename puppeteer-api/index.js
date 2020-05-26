const puppeteer = require('puppeteer');
const userAgent = require('user-agents');

async function fetchProductList(url, searchTerm) {
    let startTime = Date.now();
    const browser = await puppeteer.launch({ headless: false, defaultViewport: null });
    const page = await browser.newPage();
    await page.setUserAgent(userAgent.toString());
    await page.goto(url, { waitUntil: 'networkidle2' });

    await page.waitFor('input[name="field-keywords"]');
    await page.evaluate(val => document.querySelector('input[name="field-keywords"]').value = val, searchTerm);

    await page.click('div.nav-search-submit.nav-sprite');

    await page.waitFor('div[data-cel-widget^="search_result_"]');

    const result = await page.evaluate(() => {
        let totalSearchResults = Array.from(document.querySelectorAll('div[data-cel-widget^="search_result_"]')).length;

        let productsList = [];
        let onlyProduct = false;
        let emptyProductMeta = false;

        for (let i = 1; i < totalSearchResults - 1; i++) {
            let product = {
                brand: '',
                product: '',
            };

            let productNodes = Array.from(document.querySelectorAll(`div[data-cel-widget="search_result_${i}"] .a-size-base-plus.a-color-base`));

            if (productNodes.length === 0) {
                productNodes = Array.from(document.querySelectorAll(`div[data-cel-widget="search_result_${i}"] .a-size-medium.a-color-base.a-text-normal`));
                productNodes.length > 0 ? onlyProduct = true : emptyProductMeta = true;
            }

            let productsDetails = productNodes.map(el => el.innerText);

            if (!emptyProductMeta) {
                product.brand = onlyProduct ? '' : productsDetails[0];
                product.product = onlyProduct ? productsDetails[0] : productsDetails[1];
            }

            let rawImage = document.querySelector(`div[data-cel-widget="search_result_${i}"] .s-image`);
            product.image =rawImage ? rawImage.src : '';

            let rawUrl = document.querySelector(`div[data-cel-widget="search_result_${i}"] a.a-link-normal`);
            product.url = rawUrl ? rawUrl.href : '';

            let rawPrice = document.querySelector(`div[data-cel-widget="search_result_${i}"] span.a-offscreen`);
            product.price = rawPrice ? rawPrice.innerText : '';

            !product.product.trim() ? null : productsList = productsList.concat(product);
        }

        return productsList;
    });

    console.log(result);

    await browser.close();

    console.log('Time: ', (Date.now() - startTime) / 1000, 's');
}

fetchProductList('https://www.amazon.in', 'Leggings');
