import express from 'express';
import multer from 'multer';
import cloudinary from 'cloudinary';
import { create } from '../../models/recordModel.js';  

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

cloudinary.v2.config({
    cloud_name: 'dfcgapbcr',  
    api_key: '297652483131342',  
    api_secret: 'A8SkZ4QWtBZQZHBzO54Dg2azI0I'  
});

const router = express.Router();

router.post('/', upload.single('exam'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'Nenhum arquivo de imagem enviado.' });
        }

        const recordData = req.body;

        let imageUrl = null;

        if (req.file) {
            const uploadOptions = {
                resource_type: 'auto',  
                public_id: `exam/${Date.now()}_${req.file.originalname}`,  
            };

            const uploadResponse = await new Promise((resolve, reject) => {
                cloudinary.v2.uploader.upload_stream(uploadOptions, (error, result) => {
                    if (error) {
                        reject(new Error('Erro ao fazer upload da imagem.'));
                    }
                    resolve(result);
                }).end(req.file.buffer);  
            });

            imageUrl = uploadResponse.secure_url;
        }

        if (imageUrl) {
            recordData.exam = imageUrl;
        }

        const newRecord = await create(recordData);

        return res.status(201).json({
            message: 'Registro criado com sucesso!',
            record: newRecord
        });

    } catch (error) {
        if (error.message.startsWith('Erro ao fazer upload da imagem')) {
            return res.status(400).json({ error: error.message });
        }

        return res.status(500).json({ error: 'Erro interno no servidor', details: error.message });
    }
});

export default router;
