let { uploadImages } = require('../services/upload');

module.exports = {
    uploadFiles: async(req, res) => {
        try {
            // console.log("resFile:::",res);
            const resFile = await req.body.base64File
            console.log("resFile:::",resFile);
            // let base64File = resFile.split(';base64,').pop();
            let base64File = resFile.split('-').pop();
            
            let result = await uploadImages(base64File);
        
            return res.status(200).json({
                success: true,
                data: result
            });
        } catch (err) {
            console.log(err);
            return res.status(500).json({
                success: false,
                message: err?.message
            });
        }
    },
}