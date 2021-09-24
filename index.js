const Jimp = require('jimp');
const fs = require('fs');
const scratchFunctions = {
    penDown: require('./blocks/penDown').penDown,
    penUp: require('./blocks/penUp').penUp,
    addGotoBlock: require('./blocks/goto').addGotoBlock,
    setPenColorAndMove: require('./blocks/setPenColor').setPenColorAndMove,
    addNewSprite: require('./blocks/addNewSprite').addNewSprite,
    hide: require('./blocks/hide').hide,
};
var scratchCodeJson = require('./resources/template.json');

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
    let imageY = image.getHeight();
    let imageX = image.getWidth();
    for (let imgY = 0; imgY <= imageY; imgY++) {
        //Move to next line
        console.log("Line Y", imgY);
        if (imgY != 0 && imgY % 5 == 0) {
            scratchCodeJson = scratchFunctions.hide(scratchCodeJson);
            scratchCodeJson = scratchFunctions.addNewSprite(scratchCodeJson);
        } else
            scratchCodeJson = scratchFunctions.penUp(scratchCodeJson);
        scratchCodeJson = scratchFunctions.addGotoBlock(scratchCodeJson, -200, 150 - (imgY * 2));
        for (let imgX = 0; imgX <= imageX; imgX++) {
            const rgba = Jimp.intToRGBA(image.getPixelColor(imgX, imgY));
            const hexColor = rgba2hex(rgba);
            scratchCodeJson = scratchFunctions.setPenColorAndMove(scratchCodeJson, hexColor, imgX);
        }
    }
    scratchCodeJson = scratchFunctions.hide(scratchCodeJson);

    // Write output to file
    console.log("Writing output...");
    fs.writeFileSync('./output/project.json', JSON.stringify(scratchCodeJson), 'utf8');
    fs.copyFileSync('./resources/54b235d3219beb83bc6212d32adc07e9.svg', './output/54b235d3219beb83bc6212d32adc07e9.svg');
    fs.copyFileSync('./resources/cd21514d0531fdffb22204e0ec5ed84a.svg', './output/cd21514d0531fdffb22204e0ec5ed84a.svg');
    console.log("Writing done");
}

main();