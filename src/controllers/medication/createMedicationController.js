import { Router } from 'express';
import { createMedication } from '../../models/medicationModel.js'; 
import cloudinary from 'cloudinary';

cloudinary.v2.config({
    cloud_name: 'dfcgapbcr',  
    api_key: '297652483131342',  
    api_secret: 'A8SkZ4QWtBZQZHBzO54Dg2azI0I'  
});

const router = Router();

router.post('/', async (req, res) => {
    const { medicine, description, user_id, period, image } = req.body;

    
    if (!medicine || !description || !user_id || !period || isNaN(user_id) || isNaN(period) || !image) {
        return res.status(400).json({ message: 'Preencha todos os campos obrigatórios corretamente.' });
    }

    try {
       
        const uploadResponse = await cloudinary.v2.uploader.upload(image, {
            resource_type: 'auto',  
            public_id: `medications/${Date.now()}_${medicine.replace(/\s+/g, '_')}`,  
        });

        const medicationData = {
            medicine,
            description,
            image: uploadResponse.secure_url,  
            user_id: parseInt(user_id),  
            period: parseInt(period),  
        };

        const novoMedicamento = await createMedication(medicationData);

        res.status(201).json(novoMedicamento);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao criar medicamento.' });
    }
});

export default router;
