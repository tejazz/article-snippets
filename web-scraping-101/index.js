const request = require('request');
// const request = require('request-promise');
const cheerio = require('cheerio');

const scrapeWebsiteData = (url) => {
    request(url, (err, res, html) => {

        const $ = cheerio.load(html);
        const Product = {};

        Product.Title = $('#productTitle').text().replace(/\s\s+/g, '');
        Product.PriceText = $('#priceblock_ourprice').text();
        Product.Image = $('#landingImage').attr('data-old-hires');

        // calculate the price in terms of value
        let price = parseInt(Product.PriceText.slice(2, Product.PriceText.length).replace(/,/g, ''));
        Product.PriceValue = price;

        // fetch feature details
        let featureDetails = [];

        $('#feature-bullets>ul>li>span').each((i, el) => {
            featureDetails.push($(el).text().replace(/[\n\t]/g, '').trim());
        });

        Product.FeatureDetails = featureDetails;

        console.log(Product);

        return Product;

    });
};

scrapeWebsiteData('https://www.amazon.in/Apple-MacBook-Pro-8th-Generation-Intel-Core-i5/dp/B07S8D1K3M/ref=sr_1_1_sspa?crid=PXJV2CGQP1HH&keywords=macbook+pro+13+inch&qid=1572790136&sprefix=macbook%2Caps%2C406&sr=8-1-spons&psc=1&spLa=ZW5jcnlwdGVkUXVhbGlmaWVyPUE0SUtNODI5UVJFR04mZW5jcnlwdGVkSWQ9QTAxMzM5MTczTEVCUkNYQ1JPNUgxJmVuY3J5cHRlZEFkSWQ9QTAxNjAzMTAyWkxNUkxBUU5ER01FJndpZGdldE5hbWU9c3BfYXRmJmFjdGlvbj1jbGlja1JlZGlyZWN0JmRvTm90TG9nQ2xpY2s9dHJ1ZQ==');

// using request-promise and async/await

// const scrapeWebsiteData = async (url) => {
//     var options = {
//         uri: url,
//         transform: function (body) {
//             return cheerio.load(body);
//         }
//     };

//     const $ = await request(options);
//     const Product = {};

//     Product.Title = $('#productTitle').text().replace(/\s\s+/g, '');
//     Product.PriceText = $('#priceblock_ourprice').text();
//     Product.Image = $('#landingImage').attr('data-old-hires');

//     // calculate the price in terms of value
//     let price = parseInt(Product.PriceText.slice(2, Product.PriceText.length).replace(/,/g, ''));
//     Product.PriceValue = price;

//     // fetch feature details
//     let featureDetails = [];

//     $('#feature-bullets>ul>li>span').each((i, el) => {
//         featureDetails.push($(el).text().replace(/[\n\t]/g, '').trim());
//     });

//     Product.FeatureDetails = featureDetails;

//     return Product;
// };

// scrapeWebsiteData('https://www.amazon.in/Apple-MacBook-Pro-8th-Generation-Intel-Core-i5/dp/B07S8D1K3M/ref=sr_1_1_sspa?crid=PXJV2CGQP1HH&keywords=macbook+pro+13+inch&qid=1572790136&sprefix=macbook%2Caps%2C406&sr=8-1-spons&psc=1&spLa=ZW5jcnlwdGVkUXVhbGlmaWVyPUE0SUtNODI5UVJFR04mZW5jcnlwdGVkSWQ9QTAxMzM5MTczTEVCUkNYQ1JPNUgxJmVuY3J5cHRlZEFkSWQ9QTAxNjAzMTAyWkxNUkxBUU5ER01FJndpZGdldE5hbWU9c3BfYXRmJmFjdGlvbj1jbGlja1JlZGlyZWN0JmRvTm90TG9nQ2xpY2s9dHJ1ZQ==')
//     .then((scrapedData) => {
//         console.log(scrapedData);
//     });