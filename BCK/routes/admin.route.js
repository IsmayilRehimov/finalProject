import express from "express";
import { getAllUsers, deleteUser, getAllGigs, deleteGig, getAllOrders, deleteOrder, getAllReviews, deleteReview } from "../controllers/admin.controller.js";
import { verifyAdmin } from "../middleware/verifyAdmin.js";

const router = express.Router();

router.get("/users", verifyAdmin, getAllUsers);        
router.delete("/user/:id", verifyAdmin, deleteUser);   

router.get("/gigs", verifyAdmin, getAllGigs);          
router.delete("/gig/:id", verifyAdmin, deleteGig);     

router.get("/gigs", verifyAdmin, getAllGigs);         
router.delete("/gig/:id", verifyAdmin, deleteGig);    

router.get("/orders", verifyAdmin, getAllOrders);
router.delete("/order/:id", verifyAdmin, deleteOrder);

router.get("/reviews", verifyAdmin, getAllReviews);
router.delete("/review/:id", verifyAdmin, deleteReview);

export default router;
