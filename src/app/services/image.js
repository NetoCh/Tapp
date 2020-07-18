const multer = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let fileStorage = req.destination || destination;
        fs.mkdir(fileStorage, { recursive: true }, (err) => {
            if (err) throw err;
        });
        cb(null, fileStorage)
    },
    filename: function (req, file, cb) {
        cb(null, uuidv1() + '-' + Date.now() + '.' + file.mimetype.split("image/")[1])
    }
});

var upload = multer({
    storage: storage
}).single('image');

function Image() {
    this.uploadImageToServer = async function (req, res) {
        try {
            // Guardo la imagen el servidor
            let result = await new Promise((resolve) => {
                upload(req, res, function (err, some) {
                    let response = {
                        message: 'Se ha actualizado la imagen correctamente',
                        success: true,
                        image: req.file.filename
                    }
                    if (err) {
                        response.success = false;
                        response.message = "No se pudo actualizar la imagen";
                        response.details = err.message;
                    }
                    resolve(response);
                });
            });
            if (result.success) {
                console.log(result);
                // model.mainLogo = publicDir + '/' + result.image;
                // // Actualizo el link de la imagen
                // let response = await this.spSetConfigurationTemplate(model);
                // if (!response.success) {
                //     fs.unlink(destination + "/" + result.image, (err) => {
                //         if (err) throw err;
                //         console.log(`deleted image: ${result.image}`);
                //     });
                // } else {
                //     if (response.data.logo !== null) {
                //         let oldImagePath = "./content/" + response.data.logo;
                //         if (fs.existsSync(oldImagePath)) {
                //             fs.unlink(oldImagePath, (err) => {
                //                 if (err) throw err;
                //                 console.log(`deleted image: ${response.data.logo}`);
                //             });
                //         }
                //     }
                // }
                return response;
            } else {
                return result;
            }
        } catch (ex) {
            let response = {
                success: false,
                message: ex,
                codeError: 800
            }
            return response;
        }
    }
}