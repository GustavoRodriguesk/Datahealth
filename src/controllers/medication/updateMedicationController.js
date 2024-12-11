import { Router } from 'express';
import { updateMedication } from '../../models/medicationModel.js';
import cloudinary from 'cloudinary';

cloudinary.v2.config({
    cloud_name: 'dfcgapbcr',
    api_key: '297652483131342',
    api_secret: 'A8SkZ4QWtBZQZHBzO54Dg2azI0I'
});


const updateMedicationController = async (req, res) => {
    const { id } = req.params;
    const { medicine, description, user_id, period, image } = req.body;

    if (!medicine || !description || !user_id || !period || isNaN(user_id) || isNaN(period)) {
        return res.status(400).json({ message: 'Preencha todos os campos obrigatórios corretamente.' });
    }

    try {
        let updatedImageUrl = null;
        if (image) {
            const uploadResponse = await cloudinary.v2.uploader.upload(image, {
                resource_type: 'auto',
                public_id: `medications/${Date.now()}_${medicine.replace(/\s+/g, '_')}`,
            });
            updatedImageUrl = uploadResponse.secure_url;
        }

        const updatedMedicationData = {
            medicine,
            description,
            image: updatedImageUrl || undefined,
            user_id: parseInt(user_id),
            period: parseInt(period),
        };

        const updatedMedication = await updateMedication({
            id: Number(id),
            ...updatedMedicationData
        });

        res.status(200).json(updatedMedication);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao atualizar medicamento.', error: error.message });
    }
};


export { updateMedicationController };
