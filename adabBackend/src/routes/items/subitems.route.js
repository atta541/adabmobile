const express = require('express');
const router = express.Router();
const subItemsController = require('../../controllers/items/subItems.controller');

router.post('', subItemsController.createSubItem);
router.get('/with-item-details', subItemsController.getSubItemsWithItemDetails);
router.get('/by-category', subItemsController.getSubItemsByCategory); 
router.get('/:itemId', subItemsController.getSubItemsByItemId); 
router.get('/sub/:id', subItemsController.getSubItemById);
router.put('/:id', subItemsController.updateSubItem);
router.delete('/:id', subItemsController.deleteSubItem);

module.exports = router;