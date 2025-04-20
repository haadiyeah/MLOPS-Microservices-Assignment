const Data = require('../models/Data');

// Get all data for a user
exports.getData = async (req, res) => {
  try {
    const data = await Data.find({ userId: req.userId });
    
    res.status(200).json(data);
  } catch (error) {
    console.error('Get data error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create new data
exports.createData = async (req, res) => {
  try {
    const { name, value } = req.body;
    
    const newData = await Data.create({
      name,
      value,
      userId: req.userId
    });
    
    res.status(201).json(newData);
  } catch (error) {
    console.error('Create data error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update data
exports.updateData = async (req, res) => {
  try {
    const data = await Data.findById(req.params.id);
    
    if (!data) {
      return res.status(404).json({ message: 'Data not found' });
    }
    
    // Check ownership
    if (data.userId.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    
    const updatedData = await Data.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    res.status(200).json(updatedData);
  } catch (error) {
    console.error('Update data error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete data
exports.deleteData = async (req, res) => {
  try {
    const data = await Data.findById(req.params.id);
    
    if (!data) {
      return res.status(404).json({ message: 'Data not found' });
    }
    
    // Check ownership
    if (data.userId.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    
    await data.remove();
    
    res.status(200).json({ message: 'Data deleted' });
  } catch (error) {
    console.error('Delete data error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};