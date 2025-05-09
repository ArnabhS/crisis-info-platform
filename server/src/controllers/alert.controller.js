
import Alert from '../models/alert.model.js';

export const createAlert = (io) => async (req, res) => {
  try {
    const alert = new Alert(req.body);
    await alert.save();
    io.emit('newAlert', alert); 
    return res.status(201).json({alert: alert});
  } catch (error) {
    res.status(500).json({ error: 'Failed to create alert' });
  }
};

export const getAllAlerts = async (req, res) => {
  try {
    const alerts = await Alert.find();
    res.status(200).json(alerts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch alerts' });
  }
};

