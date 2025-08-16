import express from 'express';

const router = express.Router();

router.get('/signup', (req, res) => {
    return res.status(200).json({
        msg: "User found"
    })
})

export default router;
