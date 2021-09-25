const globals = require('../globals');
const zeroPad = require('../helpers/zeroPad').zeroPad;

exports.hide = function (inputJson) {
    let lastBlockKey = zeroPad(globals.lastBlockLength, 20);
    let nextBlockId = zeroPad(globals.lastBlockLength + 1, 20);
    globals.lastBlockLength++;
    inputJson.targets[globals.spriteId].blocks[lastBlockKey].next = nextBlockId;
    inputJson.targets[globals.spriteId].blocks[nextBlockId] = {
        "opcode": "looks_hide",
        "next": null,
        "parent": lastBlockKey,
        "inputs": {},
        "fields": {},
        "shadow": false,
        "topLevel": false
    };
    return inputJson;
};