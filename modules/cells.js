/**
 * Created by yaroslav on 05.05.15.
 */
var Node = require('./movement.js');
var vec = require('./vector.js');

function Cells(node){
    var gridSelf = this;

    this.current = node;
    this.lUp = new Node(this.current, new vec(gridSelf.current.position.x-1, gridSelf.current.position.y+1));
    this.up = new Node(gridSelf.current, new vec(gridSelf.current.position.x, gridSelf.current.position.y+1));
    this.rUp = new Node(gridSelf.current, new vec(gridSelf.current.position.x+1, gridSelf.current.position.y+1));
    this.l = new Node(gridSelf.current, new vec(gridSelf.current.position.x-1, gridSelf.current.position.y));
    this.r = new Node(gridSelf.current, new vec(gridSelf.current.position.x+1, gridSelf.current.position.y));
    this.lDown = new Node(gridSelf.current, new vec(gridSelf.current.position.x-1, gridSelf.current.position.y-1));
    this.down = new Node(gridSelf.current, new vec(gridSelf.current.position.x, gridSelf.current.position.y-1));
    this.rDown = new Node(gridSelf.current, new vec(gridSelf.current.position.x+1, gridSelf.current.position.y-1));
};

module.exports = Cells;