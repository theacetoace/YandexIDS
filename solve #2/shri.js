/**
 * Реализация API, не изменяйте ее
 * @param {string} url
 * @param {function} callback
 */
function getData(url, callback) {
    var RESPONSES = {
        '/countries': [
            {name: 'Cameroon', continent: 'Africa'},
            {name :'Fiji Islands', continent: 'Oceania'},
            {name: 'Guatemala', continent: 'North America'},
            {name: 'Japan', continent: 'Asia'},
            {name: 'Yugoslavia', continent: 'Europe'},
            {name: 'Tanzania', continent: 'Africa'}
        ],
        '/cities': [
            {name: 'Bamenda', country: 'Cameroon'},
            {name: 'Suva', country: 'Fiji Islands'},
            {name: 'Quetzaltenango', country: 'Guatemala'},
            {name: 'Osaka', country: 'Japan'},
            {name: 'Subotica', country: 'Yugoslavia'},
            {name: 'Zanzibar', country: 'Tanzania'},
        ],
        '/populations': [
            {count: 138000, name: 'Bamenda'},
            {count: 77366, name: 'Suva'},
            {count: 90801, name: 'Quetzaltenango'},
            {count: 2595674, name: 'Osaka'},
            {count: 100386, name: 'Subotica'},
            {count: 157634, name: 'Zanzibar'}
        ]
    };

    setTimeout(function () {
        var result = RESPONSES[url];
        if (!result) {
            return callback('Unknown url');
        }

        callback(null, result);
    }, Math.round(Math.random * 1000));
}

/**
 * Ваши изменения ниже
 */
var requests = ['/countries', '/cities', '/populations'];
var responses = {};
var process;

var dialog = function (handle) {
    var query = prompt("Please enter country or city name");
    if (query === null)
        return
    handle(query);
};

var answer = function (query) {
    var l = [];
    for (K in responses) {
        l.push(K);
    }

    if (l.length == 3) {
        var cc = [], p = 0;

        for (i = 0; i < responses['/cities'].length; i++) {
            if (responses['/cities'][i].country === query || responses['/cities'][i].name === query) {
                cc.push(responses['/cities'][i].name);
            }
        }

        for (i = 0; i < responses['/populations'].length; i++) {
            for (j = 0; j < cc.length; j++) {
                if (responses['/populations'][i].name === cc[j]) {
                    p += responses['/populations'][i].count;
                }
            }
        }

        confirm('Total population in ' + query + ': ' + p);
        dialog(process);
    }
};

process = function(query) {
    responses = {};
    for (var i = 0; i < 3; i++) {
        var request = requests[i];
        var callback = new Function ('error', 'result', "responses['" + request + "'] = result; answer('" + query + "');");
        getData(request, callback);
    }
};

dialog(process);