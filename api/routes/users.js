const express = require('express');
const router = express.Router();
const {body, validationResult} = require('express-validator');

const usersController = require('../controllers/users_controller');

router.post('/sign-up', [body('email', 'Enter a valid email address').isEmail()], usersController.signUp);
router.post('/sign-in', [body('email', 'Enter a valid email address').isEmail()], usersController.signIn);

router.get('/:id', usersController.profile);

router.put('/update/:id', usersController.update);

router.put('/follow/:id', usersController.follow);
router.put('/unfollow/:id', usersController.unfollow);

router.get('/findusers/:id', usersController.findusers);
router.get('/friends/:id', usersController.friends);

router.post('/isfriends/:id', usersController.isfriends);

module.exports = router;