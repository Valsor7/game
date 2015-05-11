/**
 * Created by yaroslav on 07.05.15.
 */
module.exports.vector = function (x,y) {
    this.x = x;
    this.y = y;
};

module.exports.scalar = function (posFirst, posLast) {
    var myX = posLast.x - posFirst.x;
    var myY = posLast.y - posFirst.y;

    return Math.sqrt(myX*myX+myY*myY);
}