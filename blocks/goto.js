const zeroPad = require('../helpers/zeroPad').zeroPad;
const globals = require('../globals');

exports.addGotoBlock = function (inputJson, x, y) {
    let lastBlockKey = zeroPad(globals.lastBlockLength, 20);
    let nextBlockId = zeroPad(globals.lastBlockLength + 1, 20);
    globals.lastBlockLength++;
    inputJson.targets[globals.spriteId].blocks[lastBlockKey].next = nextBlockId;
    inputJson.targets[globals.spriteId].blocks[nextBlockId] = {
        "opcode": "motion_gotoxy",
        "next": null,
        "parent": lastBlockKey,
        "inputs": {
            "X": [
                1,
                [
                    4,
                    x
                ]
            ],
            "Y": [
                1,
                [
                    4,
                    y
                ]
            ]
        },
        "fields": {},
        "shadow": false,
        "topLevel": false
    };
    return inputJson;
};