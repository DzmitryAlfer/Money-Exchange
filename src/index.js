module.exports = function makeExchange(currency) {
    if(currency <= 0)
    {
        return {};
    }

    if(currency > 10000) 
    {
        return {error: "You are rich, my friend! We don't have so much coins for exchange"};
    }

    return nominals.reduce((exchanger, nominal) => {
        const numOfCoins = div(exchanger.restOfMoney, nominal.value);

        if (numOfCoins > 0) {
            exchanger.exchange[nominal.name] = numOfCoins;
            exchanger.restOfMoney %= nominal.value
        }

        return exchanger;

    }, {exchange:{}, restOfMoney: currency}).exchange;
}

const nominals = [{name:'H', value:50},{name:'Q', value:25},{name:'D', value:10},{name:'N', value:5},{name:'P', value:1}];

const div = (a, b) => {
    return (a - a % b) / b;
}