const request = require('request-promise');
const cheerio = require('cheerio');
const fs = require('fs');

var info = [];

async function init() {
    const $ = await request({
        uri: 'https://gestionayaprende.com/blog/',
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

    const third_quote = $('.blog_post_container').next().next();
    var dsp = third_quote.find('p').html();
    var maxLength = 220;
    var trimmedString = dsp.substr(0, maxLength);
    trimmedString = trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(" "))) + " ..."
    info.push({title: third_quote.find('a').html(), img: third_quote.find('.blog_post_image').find('img').attr('src'), description: trimmedString, url: third_quote.find('p').find('a').attr('href')});

    console.log(info);

    let data = JSON.stringify(info);
    fs.writeFileSync('info.json', data);
}

obj1 = {
    name: 'https://gestionayaprende.com/blog/author/djesus/',
    pots: null
}

obj2 = {
    name: 'https://gestionayaprende.com/blog/author/mquispe/',
    pots: null
}
obj3 = {
    name: 'https://gestionayaprende.com/blog/author/dsanchez/',
    pots: null
}
obj4 = {
    name: 'https://gestionayaprende.com/blog/author/msantos/',
    pots: null
}

let hola = [obj1, obj2, obj3, obj4];


async function post(url){
    const $ = await request({
        uri: url,
        transform: body => cheerio.load(body)
    });

    const quote = $('.blog_post_container');

    const post = quote.find('a').html();

    if(post == null){
        return 1;
    }
    else{
        return 2;
    }
}

async function line_break(data){
    for (var i = 0; i < data.length; i++){
        data[i].pots = await post(data[i].name);
    }
    return data;
}

async function eject(){
    hola2 = await line_break(hola);
    console.log(hola2);
}

eject();

init();



