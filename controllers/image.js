const dotenv = require('dotenv').config();
const Clarifai = require('clarifai');

//Clarifai API Key
const app = new Clarifai.App({
 apiKey: process.env.API_CLARIFAI // use your clarifai api key in here
});

const handleApiCall = (req, res) => {
	app.models
      .predict(Clarifai.FACE_DETECT_MODEL,req.body.input)
      .then(data => {
      	res.json(data);
      })
      .catch(err => res.status(400).json('unable to work with API'))
}

const handleImage = (req, res, db) => {
	const { id } = req.body;
	db('users').where('id', '=', id)
	.increment('entries', 1)
	.returning('entries')
	.then(entries => {
		res.json(entries[0].entries);
	})
	.catch(err => res.status(400).json('unable to get entries'));
}

module.exports = {
	handleImage,
	handleApiCall
}