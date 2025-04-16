const SubItem = require('../../models/subItems.model');
const Item = require('../../models/items.model');


 
exports.createSubItem = async (req, res) => {
    try {
        const { name, description, price, picture, itemId } = req.body;

        if (!name || !description || !price || !picture || !itemId) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newSubItem = new SubItem({ name, description, price, picture, itemId });
        await newSubItem.save();

        res.status(201).json(newSubItem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}; 

exports.getSubItemsByItemId = async (req, res) => {
    try {
        const { itemId } = req.params;

        const subItems = await SubItem.find({ itemId: itemId });
        res.status(200).json(subItems);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.getSubItemById = async (req, res) => {
    try {
        const subItem = await SubItem.findById(req.params.id);
        if (!subItem) {
            return res.status(404).json({ message: "Sub-item not found" });
        }
        res.status(200).json(subItem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.updateSubItem = async (req, res) => {
    try {
        const updatedSubItem = await SubItem.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedSubItem) {
            return res.status(404).json({ message: "Sub-item not found" });
        }

        res.status(200).json(updatedSubItem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.deleteSubItem = async (req, res) => {
    try {
        const deletedSubItem = await SubItem.findByIdAndDelete(req.params.id);

        if (!deletedSubItem) {
            return res.status(404).json({ message: "Sub-item not found" });
        }

        res.status(200).json({ message: "Sub-item deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}; 





exports.getSubItemsByCategory = async (req, res) => {
    try {
        const { category } = req.query;

        if (!category) {
            return res.status(400).json({ message: "Category is required" });
        }

        
        const items = await Item.find({ category: category });
        const itemIds = items.map(item => item._id);

        
        const subItems = await SubItem.find({ itemId: { $in: itemIds } });

        res.status(200).json(subItems);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};





exports.getSubItemsWithItemDetails = async (req, res) => {
    try {
        const { category } = req.query;

        console.log(category);
        let query = {};
        if (category) {
             
            const items = await Item.find({ category: category });
            const itemIds = items.map(item => item._id);

            
            query = { itemId: { $in: itemIds } };
        }

        const subItems = await SubItem.find(query).populate('itemId');
        res.status(200).json(subItems);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};