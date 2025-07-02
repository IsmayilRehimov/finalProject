import express from "express";
import { getAllUsers, deleteUser, getAllGigs, deleteGig, getAllOrders, deleteOrder, getAllReviews, deleteReview } from "../controllers/admin.controller.js";
import { verifyAdmin } from "../middleware/verifyAdmin.js";

const router = express.Router();

router.get("/users", verifyAdmin, getAllUsers);        // get all users
router.delete("/user/:id", verifyAdmin, deleteUser);   // delete user and their gigs

router.get("/gigs", verifyAdmin, getAllGigs);          // get all gigs
router.delete("/gig/:id", verifyAdmin, deleteGig);     // delete gig by id

router.get("/gigs", verifyAdmin, getAllGigs);          // get all gigs
router.delete("/gig/:id", verifyAdmin, deleteGig);     // delete gig by id

router.get("/orders", verifyAdmin, getAllOrders);
router.delete("/order/:id", verifyAdmin, deleteOrder);

router.get("/reviews", verifyAdmin, getAllReviews);
router.delete("/review/:id", verifyAdmin, deleteReview);

export default router;
