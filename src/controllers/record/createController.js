import { Router } from 'express';
import { create } from '../../models/recordModel.js';
import cloudinary from 'cloudinary';

cloudinary.v2.config({
    cloud_name: 'dfcgapbcr',
    api_key: '297652483131342',
    api_secret: 'A8SkZ4QWtBZQZHBzO54Dg2azI0I'
});

const router = Router();

router.post('/', async (req, res) => {
    const { report, recipe, user_id, date, image_url } = req.body;

    if (!report || !recipe || !user_id || !date || !image_url || isNaN(user_id)) {
        return res.status(400).json({ message: 'Preencha todos os campos obrigatórios corretamente.' });
    }

    try {
        const isValidUrl = (url) => {
            try {
                new URL(url);
                return true;
            } catch (e) {
                return false;
            }
        };

        if (!isValidUrl(image_url)) {
            return res.status(400).json({ message: 'A URL da imagem não é válida.' });
        }

        const uploadResponse = await cloudinary.v2.uploader.upload(image_url, {
            resource_type: 'auto',
            public_id: `record_images/${Date.now()}_${report.replace(/\s+/g, '_')}`,
        });

        const recordData = {
            report,
            recipe,
            date,
            user_id: parseInt(user_id),
            exam: uploadResponse.secure_url,
        };

        const newRecord = await create(recordData);

        return res.status(201).json({
            message: 'Registro criado com sucesso!',
            record: newRecord
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao criar o registro.', error: error.message });
    }
});

export default router;
