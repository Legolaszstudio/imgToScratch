const globals = require('../globals');
const zeroPad = require('../helpers/zeroPad').zeroPad;
const penDown = require('./penDown').penDown;

exports.setPenColorAndMove = function (inputJson, color, x) {
    let lastBlockKey = zeroPad(globals.lastBlockLength, 20);
    let nextBlockId = zeroPad(globals.lastBlockLength + 1, 20);
    globals.lastBlockLength++;
    inputJson.targets[globals.spriteId].blocks[lastBlockKey].next = nextBlockId;
    inputJson.targets[globals.spriteId].blocks[nextBlockId] = {
        "opcode": "pen_setPenColorToColor",
        "next": null,
        "parent": lastBlockKey,
        "inputs": {
            "COLOR": [
                1,
                [
                    9,
                    color
                ]
            ]
        },
        "fields": {},
        "shadow": false,
        "topLevel": false
    };
    if (x == 0) {
        inputJson = penDown(inputJson);
    }
    lastBlockKey = zeroPad(globals.lastBlockLength, 20);
    nextBlockId = zeroPad(globals.lastBlockLength + 1, 20);
    globals.lastBlockLength++;
    inputJson.targets[globals.spriteId].blocks[lastBlockKey].next = nextBlockId;
    inputJson.targets[globals.spriteId].blocks[nextBlockId] = {
        "opcode": "motion_movesteps",
        "next": null,
        "parent": lastBlockKey,
        "inputs": {
            "STEPS": [
                1,
                [
                    4,
                    "2"
                ]
            ]
        },
        "fields": {},
        "shadow": false,
        "topLevel": false
    };
    return inputJson;
}