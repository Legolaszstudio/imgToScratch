const globals = require('../globals');
const zeroPad = require('../helpers/zeroPad').zeroPad;

exports.addNewSprite = function (inputJson) {
    let lastBlockKey = zeroPad(globals.lastBlockLength, 20);
    let nextBlockId = zeroPad(globals.lastBlockLength + 1, 20);
    inputJson.targets[globals.spriteId].blocks[lastBlockKey].next = nextBlockId;
    inputJson.targets[globals.spriteId].blocks[nextBlockId] = {
        "opcode": "event_broadcast",
        "next": null,
        "parent": lastBlockKey,
        "inputs": {
            "BROADCAST_INPUT": [
                1,
                [
                    11,
                    "msg" + (globals.spriteId + 1),
                    zeroPad((globals.spriteId + 1) + "bc", 20)
                ]
            ]
        },
        "fields": {},
        "shadow": false,
        "topLevel": false,
    };
    globals.spriteId++;
    globals.lastBlockLength = 2;
    inputJson.targets[0].broadcasts[zeroPad(globals.spriteId + "bc", 20)] = "msg" + globals.spriteId;
    inputJson.targets.push({
        "isStage": false,
        "name": `szereplő${globals.spriteId}`,
        "variables": {},
        "lists": {},
        "broadcasts": {},
        "blocks": {
            "00000000000000000001": {
                "opcode": "event_whenbroadcastreceived",
                "next": "00000000000000000002",
                "parent": null,
                "inputs": {},
                "fields": {
                    "BROADCAST_OPTION": [
                        "msg" + globals.spriteId,
                        zeroPad(globals.spriteId + "bc", 20)
                    ]
                },
                "shadow": false,
                "topLevel": true,
                "x": 36,
                "y": 153
            },
            "00000000000000000002": {
                "opcode": "pen_setPenSizeTo",
                "next": null,
                "parent": "00000000000000000001",
                "inputs": {
                    "SIZE": [
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
            }
        },
        "comments": {},
        "currentCostume": 0,
        "costumes": [
            {
                "assetId": "54b235d3219beb83bc6212d32adc07e9",
                "name": "jelmez1",
                "bitmapResolution": 1,
                "md5ext": "54b235d3219beb83bc6212d32adc07e9.svg",
                "dataFormat": "svg",
                "rotationCenterX": 2.2679832279140157,
                "rotationCenterY": 2.347643244817874
            }
        ],
        "sounds": [],
        "volume": 100,
        "layerOrder": 1,
        "visible": true,
        "x": -150,
        "y": -150,
        "size": 100,
        "direction": 90,
        "draggable": false,
        "rotationStyle": "all around"
    });
    return inputJson;
}