const express = require('express');
const router = express.Router();
const ProviderController = require('../controllers/ProviderController');
const AppointmentController = require('../controllers/bookingController');

router.get('/providers', async (req, res) => {
    try {
        const providers = await ProviderController.getAllProviders(req.query);
        res.status(200).json(providers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/appointments', async (req, res) => {
    try {
        const appointment = await AppointmentController.createAppointment(req.body);
        res.status(201).json(appointment);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get('/appointments/:id', async (req, res) => {
    try {
        const appointment = await AppointmentController.getAppointmentById(req.params.id);
        if (appointment) {
            res.status(200).json(appointment);
        } else {
            res.status(404).json({ error: 'Appointment not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/appointments/:id', async (req, res) => {
    try {
        const result = await AppointmentController.deleteAppointment(req.params.id);
        if (result) {
            res.status(200).json({ message: 'Appointment deleted successfully' });
        } else {
            res.status(404).json({ error: 'Appointment not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;