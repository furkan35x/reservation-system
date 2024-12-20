const express=require('express');
const {createReservation,getMyReservations}=require('../controllers/reservationController.js');
const {protect} =require('../middlewares/authMiddleware.js');
const router=express.Router();

router.post('/',protect,createReservation);
router.post('/',protect,getMyReservations);

module.exports=router;