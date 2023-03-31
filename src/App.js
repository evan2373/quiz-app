import './App.css';
import React from 'react';

const url = 'https://jsonplaceholder.typicode.com/users';

// --------------------------------------------
// !!! DO NOT MODIFY !!!
// Fetch with Promise: This code fetches data 
// from the given API endpoint using HTTP GET,
// with a 3 sec delay before the request is sent
// !!! DO NOT MODIFY !!!
// --------------------------------------------
const getUsersWithDelay = (url) =>
	new Promise(resolve =>
		setTimeout(() => {
			resolve(fetch(url, {
				method: 'GET',
			}).then((response) => response.json()));
		}, 3000)
	);

// --------------------------------------------
// App Component: entry point for your app. The
// Effect forces this component rendering on 
// initialization, which triggers the data fetch
// promise to asynchronously set the users state
// when data come back.
//
// TODO (A): Fill in the YOUR_CODE_HERE below
// --------------------------------------------
function App() {

	const [users, setUsers] = React.useState([]);
	const fetchUsers = () => getUsersWithDelay(url);

	React.useEffect(
		() => {
			fetchUsers().then(result => {
				setUsers(result)
			});
		}, []);

	return (
		<div className="tables">
			<UserTable users={users} />
		</div>
	);
}

// --------------------------------------------
// UserTable Component: renders a Table component
// consisting of a Header child component
//
// TODO (B): Fill in the YOUR_CODE_HERE section
// --------------------------------------------
const UserTable = ({ users }) => [
	<Table
		title="Users"
		items={users}
		headerRender={Header}
	/>
];

// --------------------------------------------
// Table Component: renders the entire table by
// mapping the data we retrieved into their 
// respective rows in sequence (via Array.map())
//
// TODO (C): Fill in the YOUR_CODE_HERE section
// --------------------------------------------
const Table = (props) => (
	<div>
		<h2 className="title">{props.title}</h2>
		<table className="table">
			<thead>
				{props.headerRender()}
			</thead>
			<tbody>
				{props.items.map(user => (
					<tr key={user.id}>
						<td>
							<span>{user.id}</span>
						</td>
						<td>
							<span>{user.name}</span>
						</td>
						<td>
							<span>{user.email}</span>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	</div>
);

// --------------------------------------------
// !!! DO NOT MODIFY !!!
// Header component: renders the table's header
// // !!! DO NOT MODIFY !!!
// --------------------------------------------
const Header = (props) => (
	<tr>
		<th>Id</th>
		<th>Name</th>
		<th>Email</th>
	</tr>
);

export default App;