import React, { useReducer } from 'react';

const products = [
	{
		emoji: '🍦',
		name: 'ice cream',
		price: 10
	},
	{
		emoji: '🍩',
		name: 'donuts',
		price: 12.5,
	},
	{
		emoji: '🍉',
		name: 'watermelon',
		price: 8
	}
];

// --------------------------------------------
// !!! DO NOT MODIFY ABOVE THIS LINE !!!
// --------------------------------------------

// YOUR MAY ADD ANY ADDITIONAL FUNCTIONS HERE IF YOU NEED, NAMELY THE computeTotal(), etc.


const computeTotal = state => {
	if (state.length !== 0) {
		let price_list = []
		state.forEach(item => price_list.push(item.price))
		return price_list.reduce((total, item) => total + item)

	}
}


function reducer(state, action) {
	switch (action.type) {
		case "add":

			return [...state, action.payload]

		case "remove":
			let index = state.findIndex(item => item.name === action.payload.name)
			let temp = [...state]
			if (index !== -1) temp.splice(index, 1)
			return [...temp]
		default:
			return state;
	}
}

const App = () => {

	const [state, dispatch] = useReducer(reducer, []);

	// YOUR CODE HERE
	const add = product => dispatch({ type: "add", payload: product })
	const remove = product => dispatch({ type: "remove", payload: product })

	console.log(state)
	// --------------------------------------------
	// !!! DO NOT MODIFY BELOW THIS LINE !!!
	// --------------------------------------------
	return (
		<>
			<div>
				Total Items in Shopping Cart: {state.length}
			</div>
			<div>Total Cost: ${computeTotal(state)}</div>

			<div>
				{products.map(product => (
					<div key={product.name}>
						<div className="product">
							<span>{product.emoji}</span>
						</div>
						<div>Price ${product.price}</div>
						<button onClick={() => add(product)}>Add</button>
						<button onClick={() => remove(product)}>Remove</button>
					</div>
				))}
			</div>
		</>
	)
}
export default App;