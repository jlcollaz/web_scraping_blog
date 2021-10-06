const request = require('request-promise');
const cheerio = require('cheerio');
const fs = require('fs');

var info = {
    table: []
};

async function init() {
    const $ = await request({
        uri: 'https://gestionayaprende.com/blog-test/',
        transform: body => cheerio.load(body)
    });

    const quote = $('.blog_post_container');
    info.table.push({title: quote.find('a').html(), img: quote.find('.blog_post_image').find('img').attr('src'), description: quote.find('p').html(), url: quote.find('p').find('a').attr('href')});


    const second_quote = $('.blog_post_container').next();
    info.table.push({title: second_quote.find('a').html(), img: second_quote.find('.blog_post_image').find('img').attr('src'), description: second_quote.find('p').html(), url: second_quote.find('p').find('a').attr('href')});

    const third_quote = $('.blog_post_container').next().next();
    info.table.push({title: third_quote.find('a').html(), img: third_quote.find('.blog_post_image').find('img').attr('src'), description: third_quote.find('p').html(), url: third_quote.find('p').find('a').attr('href')});

    console.log(info);

    let data = JSON.stringify(info);
    fs.writeFileSync('info.json', data);
}

init(); 

