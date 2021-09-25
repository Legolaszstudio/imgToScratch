const globals = require('../globals');
const zeroPad = require('../helpers/zeroPad').zeroPad;

exports.addDelay = function (inputJson, delay) {
    let lastBlockKey = zeroPad(globals.lastBlockLength, 20);
    let nextBlockId = zeroPad(globals.lastBlockLength + 1, 20);
    globals.lastBlockLength++;
    inputJson.targets[globals.spriteId].blocks[lastBlockKey].next = nextBlockId;
    inputJson.targets[globals.spriteId].blocks[nextBlockId] = {
        "opcode": "control_wait",
        "next": null,
        "parent": lastBlockKey,
        "inputs": {
            "DURATION": [
                1,
                [
                    5,
                    delay.toString(),
                ]
            ]
        },
        "fields": {},
        "shadow": false,
        "topLevel": false
    };
    return inputJson;
};