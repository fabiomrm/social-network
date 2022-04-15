import express from 'express';
import auth from './auth';
const router = express.Router();

router.get("/", (req, res) => {
    res.json({ success: true })
})

router.use(auth);
export default router;