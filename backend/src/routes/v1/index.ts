import express from 'express';
import { jwtMiddleware } from '../../middleware/jwt-middleware';
import auth from './auth';
import post from './post';
import comment from './comment';
import like from './like';
import user from './user';
const router = express.Router();

router.get("/", (req, res) => {
    res.json({ success: true })
})

router.use(auth);
router.use(jwtMiddleware);
router.use(post);
router.use(comment);
router.use(like);
router.use(user);
export default router;