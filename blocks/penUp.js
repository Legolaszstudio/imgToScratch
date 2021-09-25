const globals = require('../globals');
const zeroPad = require('../helpers/zeroPad').zeroPad;

exports.penUp = function (inputJson) {
    let lastBlockKey = zeroPad(globals.lastBlockLength, 20);
    let nextBlockId = zeroPad(globals.lastBlockLength + 1, 20);
    globals.lastBlockLength++;
    inputJson.targets[globals.spriteId].blocks[lastBlockKey].next = nextBlockId;
    inputJson.targets[globals.spriteId].blocks[nextBlockId] = {
        "opcode": "pen_penUp",
        "next": null,
        "parent": lastBlockKey,
        "inputs": {},
        "fields": {},
        "shadow": false,
        "topLevel": false
    };
    return inputJson;
};