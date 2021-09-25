exports.lastBlockLength = 3; //Last block id in template file //!Do not modify
exports.spriteId = 1; //Which sprite are we working on //!Do not modify

//? These variables are settings, you are safe to modify them
exports.inputFile = "input.png";
exports.exportProjectFile = true; //Save sb3 file
exports.delayYAxis = 0.001; //Delay on y axis
exports.delayXAxis = 0.0001; //Delay pixel drawing on x axis
exports.delayXEveryXFrame = 50; //Only delay on x axis if currPixel is divisable by this number
exports.splitSpritesByYLines = 1; //Create new sprite every Y lines
exports.showStats = true; //Show stats after code gen