import { create } from "../../models/recordModel.js";
import multer from 'multer';
import express from 'express'; 
import cloudinary from 'cloudinary';

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

cloudinary.v2.config({
    cloud_name: 'dfcgapbcr',
    api_key: '297652483131342',
    api_secret: 'A8SkZ4QWtBZQZHBzO54Dg2azI0I'
});

const createController = async (req, res, next) => {
    try {
        let imageUrl = null;
        if (req.file) {
            const uploadOptions = {
                resource_type: 'auto',
                public_id: `exam/${Date.now()}_${req.file.originalname}`,
            };

            const uploadResponse = await new Promise((resolve, reject) => {
                cloudinary.v2.uploader.upload_stream(uploadOptions, (error, result) => {
                    if (error) {
                        return reject(new Error('Erro ao fazer upload da imagem.'));
                    }
                    resolve(result);
                }).end(req.file.buffer);
            });

            imageUrl = uploadResponse.secure_url;
        }

        const record = req.body;
        if (imageUrl) {
            record.exam = imageUrl;
        }

        const result = await create(record);

        if (!result) {
            return res.status(401).json({
                error: "Erro ao criar conta!"
            });
        }

        return res.json({
            success: "Conta criada com sucesso!",
            record: result
        });
    } catch (error) {
        next(error);
    }
};

router.post('/create', upload.single('exam'), createController);

export default router;
