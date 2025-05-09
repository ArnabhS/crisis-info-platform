import mongoose from 'mongoose';

const alertSchema = new mongoose.Schema({
  type: { 
    type: String, 
    enum: ['sos', 'curfew', 'disaster'], 
    required: true 
},
  location: {
    type: { 
        type: String, 
        default: 'Point' 
    },
    coordinates: [Number]
  },
  description: String,
  timestamp: { 
    type: Date, 
    default: Date.now 
},
});

alertSchema.index({ location: '2dsphere' });

export default mongoose.model('Alert', alertSchema);
