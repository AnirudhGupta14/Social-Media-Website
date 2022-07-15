const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require("path");

const postsController = require('../controllers/posts_controller');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "public/images");
    },
    filename: (req, file, cb) => {
      cb(null, req.body.name);
    },
  });

const upload = multer({storage});
router.post("/upload", upload.single("file"), postsController.upload);

router.post('/createpost', postsController.create);
router.put('/change/:id', postsController.change);
router.get('/destroy/:id', postsController.destroy);

router.get('/:id', postsController.getsinglepost);

router.put('/like/:id', postsController.likepost);

router.get('/timeline/:id', postsController.getallpost);
router.get('/profile/:id', postsController.userspost);

module.exports = router;