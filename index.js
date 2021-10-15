const request = require('request-promise');
const cheerio = require('cheerio');
const fs = require('fs');

var info = [];

async function init() {
    const $ = await request({
        uri: 'https://gestionayaprende.com/blog-test/',
        transform: body => cheerio.load(body)
    });

    const quote = $('.blog_post_container');
    var dsp = quote.find('p').html();
    var maxLength = 220;
    var trimmedString = dsp.substr(0, maxLength);
    trimmedString = trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(" "))) + " ..."
    info.push({title: quote.find('a').html(), img: quote.find('.blog_post_image').find('img').attr('src'), description: trimmedString, url: quote.find('p').find('a').attr('href')});


    const second_quote = $('.blog_post_container').next();
    var dsp = second_quote.find('p').html();
    var maxLength = 220;
    var trimmedString = dsp.substr(0, maxLength);
    trimmedString = trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(" "))) + " ..."
    info.push({title: second_quote.find('a').html(), img: second_quote.find('.blog_post_image').find('img').attr('src'), description: trimmedString, url: second_quote.find('p').find('a').attr('href')});

    // const third_quote = $('.blog_post_container').next().next();
    // var dsp = third_quote.find('p').html();
    // var maxLength = 220;
    // var trimmedString = dsp.substr(0, maxLength);
    // trimmedString = trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(" "))) + " ..."
    // info.push({title: third_quote.find('a').html(), img: third_quote.find('.blog_post_image').find('img').attr('src'), description: trimmedString, url: third_quote.find('p').find('a').attr('href')});

    console.log(info);

    let data = JSON.stringify(info);
    fs.writeFileSync('info.json', data);
}

init(); 

