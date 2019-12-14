import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

//imported pages
import App from './App';

// apollo client
const client = new ApolloClient({ uri: 'https://agile-brushlands-88220.herokuapp.com/graphqll'});

const root = document.querySelector("#root");
const pageComponent = (
	<ApolloProvider  client={client}>
		<App />
	</ApolloProvider>
);

ReactDOM.render(pageComponent, root);