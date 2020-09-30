import express from 'express';
import { AuthController } from '../controllers/AuthController';
const bodyParser = require('body-parser');
const router = express.Router();
const authController = new AuthController();

var VerifyToken = require('./VerifyToken');


router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.route('/login')
    .post(authController.login);

router.route('/logout')
    .get(authController.logout);

router.route('/user/:account_address')
    .get(authController.getUser);

export default router;





