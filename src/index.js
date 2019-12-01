import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

//imported pages
import App from './App';

// apollo client
const client = new ApolloClient({ uri: 'http://localhost:8081/graphql'});

const root = document.querySelector("#root");
const pageComponent = (
	<ApolloProvider  client={client}>
		<App />
	</ApolloProvider>
);

ReactDOM.render(pageComponent, root);