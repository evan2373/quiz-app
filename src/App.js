import React from 'react';

const bookmarksEndpoint = "https://hn.algolia.com/api/v1/search?query=";

const bookmarksReducer = (state, action) => {
	switch (action.type) {
		case 'BOOKMARKS_LOADING_INIT':
			return {
				...state,
				isLoading: true,
				isError: false
			};
		case "BOOKMARKS_LOADING_SUCCESS":

			state.isLoading = false
			state.isError = false
			state.data = action.payload

			return { ...state }
		case "BOOKMARKS_LOADING_FAILURE":
			return {
				...state,
				isLoading: false,
				isError: true
			};
		default:
			throw new Error();
	}
};

function App() {

	const [bookmarks, dispatchBookmarks] = React.useReducer(
		bookmarksReducer,
		{
			data: [],
			isLoading: false,
			isError: false
		}
	);
	console.log(bookmarks.isLoading)

	React.useEffect(() => {
		dispatchBookmarks({ type: 'BOOKMARKS_LOADING_INIT' })
		fetch(`${bookmarksEndpoint}react`)
			.then(response => response.json())
			.then(result => {
				dispatchBookmarks({
					type: 'BOOKMARKS_LOADING_SUCCESS',
					payload: result.hits
				});
			}).catch(
				() => dispatchBookmarks({
					type: 'BOOKMARKS_LOADING_FAILURE'
				})
			);
	}, []);
	return (
		<React.Fragment>


			<div className="App">
				<header className="App-header">
					{/* <img src={logo} className="App-logo" alt="logo" /> */}
					<p>
						{bookmarks.isError && <p>Erorr just happened ... </p>}
						{
							bookmarks.isLoading ? (<p>Loading ...</p>) : <List links={bookmarks} />
						}
					</p>
				</header>
			</div>
		</React.Fragment>
	);
}

function List({ links }) {
	return links.data.map(item =>
		<div><a href={item.url}>{item.title}</a></div>)
}


export default App;