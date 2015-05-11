/**
 * Created by yaroslav on 07.05.15.
 */
var myMath = require('./myMath.js');

function Cells(mainNode){
    var node = mainNode;
    return {
        lUp : new Node(node, new myMath.vector(node.position.x - 1, node.position.y + 1), node.endPos),
        up : new Node(node, new myMath.vector(node.position.x, node.position.y + 1), node.endPos),
        rUp : new Node(node, new myMath.vector(node.position.x + 1, node.position.y + 1), node.endPos),
        l : new Node(node, new myMath.vector(node.position.x - 1, node.position.y), node.endPos),
        r : new Node(node, new myMath.vector(node.position.x + 1, node.position.y), node.endPos),
        lDown : new Node(node, new myMath.vector(node.position.x - 1, node.position.y - 1), node.endPos),
        down : new Node(node, new myMath.vector(node.position.x, node.position.y - 1), node.endPos),
        rDown : new Node(node, new myMath.vector(node.position.x + 1, node.position.y - 1), node.endPos)
    };
};

function Node(p, pos, endPos){

    this.parent = p;
    this.position = pos;
    this.endPos = endPos;
    nodeSelf = this;

    this.g = (function () {
        if(nodeSelf.parent === null) {
            return 0;
        }

        if(myMath.scalar(nodeSelf.position, nodeSelf.parent.position) > 1) {
            nodeSelf.g = 14;
        } else {nodeSelf.g = 10;}

        nodeSelf.g+= nodeSelf.parent.g;

        return nodeSelf.g;
    })();

    this.h = (function() {
        if(nodeSelf.parent === null) {
            return 0;
        }
        var vecX = Math.abs(nodeSelf.endPos.x - nodeSelf.position.x);
        var vecY = Math.abs(nodeSelf.endPos.y - nodeSelf.position.y);
        nodeSelf.h = (vecX + vecY)*10;

        return nodeSelf.h;
    })();

    this.f = this.g + this.h;
};

function searchWay(heroPos, endPos) {
    var openList = [];
    var closedList = [];

    var startNode = new Node(null, heroPos, endPos);
    var cells = new Cells(startNode);

    openList.push(startNode);

    while(openList.length != 0){
        var current = openList.shift();

        if(current.position.x === endPos.x && current.position.y === endPos.y){
            console.log("final position " + current.position.x + " " + current.position.y);

            return getWay(current);
        }
        closedList.push(current);
        for(var cell in cells){
            openList.push(cells[cell]);
        }

        openList.sort(function (a,b){
            return a.f - b.f;
        });

        current = openList.shift();
        closedList.push(current);

        cells = new Cells(current);
        var isOpen = true;
        clL = closedList.length;
        opL = openList.length
        for(cell in cells){
            for(var i = 0; i < opL; i++) {
                if (cells[cell].position.x == openList[i].position.x && cells[cell].position.y == openList[i].position.y) {

                    if ((current.g + cells[cell].g) < cells[cell].g) {
                        openList[i] = new Node(current, openList[i].position, openList[i].endPos);
                    }
                    isOpen = false;
                    break;

                } else if (i < clL) {
                    if (cells[cell].position.x === closedList[i].position.x && cells[cell].position.y === closedList[i].position.y) {
                        isOpen = false;
                        break;
                    }
                }
            }
            if (isOpen){
                openList.push(cells[cell]);
            }
            isOpen = true;
        }
        openList.sort(function (a,b){
            return a.f - b.f;
        });
    }
};

function getWay(node){
    var endNode = node;
    var way = [];
    while(endNode.parent !== null){
        way.push(new myMath.vector(endNode.position.x, endNode.position.y));
        endNode = endNode.parent;
    }
    return way.reverse();
}

module.exports = searchWay;