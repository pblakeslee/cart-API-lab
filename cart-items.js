const express = require("express");
const router = express.Router();

router.use(express.json());

const cartItems = [
	{
		id: 1,
		product: "Coke",
		quantity: 1,
		price: 1,
	},
	{
		id: 2,
		product: "Lemonade",
		quantity: 2,
		price: 1.5,
	},
];

router.get("/cart-items", (req, res) => {
	res.json(cartItems);
});

router.get("/cart-items/:id", (req, res) => {
	console.log("Called!");
	console.log(req.params.id);
	const found = cartItems.find(
		(item) => item.id === parseInt(req.params.id)
	);

	if (found === undefined) {
		res.status(404).send("The cart item could not be found");
	} else {
		res.json(found);
	}
});

router.post("/cart-items", (req, res) => {
	// Validates that quantity is a number
	const quantity = parseInt(req.body.quantity);
	if (!quantity) {
		return res.status(400).send("Invalid quantity");
	}

	// Validate the price is a number
	const price = parseInt(req.body.price);
	if (!price) {
		return res.status(400).send("Invalid price");
	}

	const newItem = {
		id: cartItems.length + 1,
		product: req.body.product,
		price: req.body.price,
		quantity: req.body.quantity,
	};

	cartItems.push(newItem);
	res.status(201).json(newItem);
});
