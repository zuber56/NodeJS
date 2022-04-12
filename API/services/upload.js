let fs = require("fs");
var randomstring = require("randomstring");

module.exports = {
    uploadImages: async (base64) => {
        const random = randomstring.generate({
            length: 40,
            charset: 'alphabetic'
        });

        await fs.writeFile(__dirname + "/../uploads/" + random + ".png", base64, { encoding: 'base64' }, function (err) {
            console.log('File created:', random + '.png');
        });
        return random + ".png";
    },
}