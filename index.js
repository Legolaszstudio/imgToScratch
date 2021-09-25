const Jimp = require('jimp');
const fs = require('fs');
const zipper = require("zip-local");
const scratchFunctions = {
    penDown: require('./blocks/penDown').penDown,
    penUp: require('./blocks/penUp').penUp,
    addGotoBlock: require('./blocks/goto').addGotoBlock,
    setPenColorAndMove: require('./blocks/setPenColor').setPenColorAndMove,
    addNewSprite: require('./blocks/addNewSprite').addNewSprite,
    hide: require('./blocks/hide').hide,
    addDelay: require('./blocks/delay').addDelay,
};
var scratchCodeJson = require('./resources/template.json');
const globals = require('./globals');

function rgba2hex(orig) {
    var
        rgb = [orig.r, orig.g, orig.b],
        hex = rgb ?
            (rgb[0] | 1 << 8).toString(16).slice(1) +
            (rgb[1] | 1 << 8).toString(16).slice(1) +
            (rgb[2] | 1 << 8).toString(16).slice(1) : orig;

    return "#" + hex.toLowerCase();
}

async function main() {
    //Resize image to 250*250
    const image = await Jimp.read('input.jpg');
    const ratio = Math.min(200 / image.getWidth(), 150 / image.getHeight());
    await image
        .resize(image.getWidth() * ratio, image.getHeight() * ratio)
        .write('./resources/resized.jpg');

    //Read rsized image and get pixels hex color
    const imageY = image.getHeight();
    const imageX = image.getWidth();
    const imageStartY = 0 - ((imageX / 2) * 2); // Center image, *2 because each pixel in image is drawn by 2 pixels in scratch
    for (let imgY = 0; imgY <= imageY; imgY++) {
        //Move to next line
        console.log("Line Y", imgY);
        if (imgY != 0 && imgY % 5 == 0) {
            scratchCodeJson = scratchFunctions.hide(scratchCodeJson);
            scratchCodeJson = scratchFunctions.addNewSprite(scratchCodeJson);
            if (globals.delayYAxis > 0) {
                scratchCodeJson = scratchFunctions.addDelay(scratchCodeJson, globals.delayYAxis);
            }
        } else
            scratchCodeJson = scratchFunctions.penUp(scratchCodeJson);
        scratchCodeJson = scratchFunctions.addGotoBlock(scratchCodeJson, imageStartY, 150 - (imgY * 2));
        for (let imgX = 0; imgX <= imageX; imgX++) {
            const rgba = Jimp.intToRGBA(image.getPixelColor(imgX, imgY));
            const hexColor = rgba2hex(rgba);
            scratchCodeJson = scratchFunctions.setPenColorAndMove(scratchCodeJson, hexColor, imgX);
            if (globals.delayXAxis > 0 && imgX % globals.delayXEveryXFrame == 0) {
                scratchCodeJson = scratchFunctions.addDelay(scratchCodeJson, globals.delayXAxis);
            }
        }
    }
    scratchCodeJson = scratchFunctions.hide(scratchCodeJson);

    // Write output to file
    console.log("Writing output...");
    fs.writeFileSync('./output/uncompressed/project.json', JSON.stringify(scratchCodeJson), 'utf8');
    fs.copyFileSync('./resources/54b235d3219beb83bc6212d32adc07e9.svg', './output/uncompressed/54b235d3219beb83bc6212d32adc07e9.svg');
    fs.copyFileSync('./resources/cd21514d0531fdffb22204e0ec5ed84a.svg', './output/uncompressed/cd21514d0531fdffb22204e0ec5ed84a.svg');
    console.log("Writing done");

    if (globals.exportProjectFile) {
        console.log("Compressing project file...");
        let zipFiles = zipper.sync.zip("./output/uncompressed/");
        zipFiles.compress();
        zipFiles.save_async = false;
        zipFiles.save("./output/output.sb3");
        console.log("SB3 file created (./output/output.sb3), have a nice day!");
    } else {
        console.log("Uncompressed files created (./output/uncompressed/), have a nice day!");
    }
}

main();