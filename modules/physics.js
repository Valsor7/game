/**
 * Created by yaroslav on 04.05.15.
 */
var Physics = {
    wind : getRandomInt(-5,5),
    air : 0.98
};

function getRandomInt(min, max) {
    return parseInt((Math.random() * (max - min)) + min);
};

module.exports = Physics;