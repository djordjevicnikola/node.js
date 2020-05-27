const express = require('express');
const ItemsController = require('./itemsController');
const { catchAsyncError } = require('../../lib/functionErrorHandler');
const { permissionAccess } = require('../../middlewares/permissionAccess');

const router = express.Router();

router
  .post('/items', permissionAccess(), catchAsyncError(ItemsController.addItem))
  .get('/public/items/:itemId', catchAsyncError(ItemsController.getItem))
  .delete('/items/:itemId', permissionAccess(), catchAsyncError(ItemsController.deleteItem));

module.exports = router;
