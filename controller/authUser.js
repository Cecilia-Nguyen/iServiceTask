const User = require('../model/User');
const bcrypt = require('bcryptjs');
const Stripe = require('stripe');
const keys = require("../config/keys");
const stripe = Stripe(keys.stripe.apiSecret);

module.exports.getRegister = (req, res, next) => {
	res.render('index', { error: 'none' });
};

module.exports.postLogin = async (req, res, next) => {
	console.log(req.body);
	try {
		let user = await User.findOne({ email: req.body.email }).exec();
		if (bcrypt.compareSync(req.body.password, user.password)) {
			res.render('payment',{
				spk:keys.stripe.apiKey, name: user.firstName 
			});
		} else {
			res.render('login', { error: 'User Not Authorized, Wrong Password' });
		}
		console.log(user);
	} catch (error) {
		res.render('login', { error: 'User Not found. Please Sign up' });
	}
};

module.exports.getLogin = (req, res, next) => {
	res.render('login', { error: 'none' });
};
