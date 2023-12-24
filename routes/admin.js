
const express = require('express');
const router = express.Router();

const { GetAll, GetOne, CreateNew, EditProduct, DeleteProduct } = require("../controllers/admin");

router.get('/',GetAll);
router.get('/:id',GetOne);
router.post('/createnew', CreateNew);
router.patch('/editproduct/:id', EditProduct);
router.delete('/deleteproduct/:id', DeleteProduct);

module.exports = router;