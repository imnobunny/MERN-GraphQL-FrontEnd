import { gql } from 'apollo-boost';

const storeCustomerMutation = gql`
    mutation(
        $email: String!
        $password: String!
        $lastname: String!
        $firstname: String!
        $address: String!
        $contact: String!
    ) {
        storeCustomer(
            email: $email
            password: $password
            lastname: $lastname
            firstname: $firstname
            address: $address
            contact: $contact
        )
    }
`;

const storeRequestMutation = gql`
    mutation(
        $type: String!
        $description: String!
        $numberOfVisitors: String!
        $customerId: String!
        $statusId: String!
        $dateRequested: String!
    ) {
        storeRequest(
            type: $type
            description: $description
            numberOfVisitors: $numberOfVisitors
            customerId: $customerId
            statusId: $statusId
            dateRequested: $dateRequested
        ) {
            id
        }
            
    }
`;

const storeStatusMutation = gql`
    mutation(
        $statusId: String!
    ) {
        storeStatus(
            statusId: $statusId
        ){
            statusId
        }
    }
`;

const loginMutation = gql`
    mutation(
        $email: String!
        $password: String!
    ) {
        loginUser(
            email: $email
            password: $password
        ) {
            token
        }
    }
`;

const loginOrganizerMutation = gql`
    mutation(
        $email: String!
        $password: String!
    ){
        loginOrganizer(
            email: $email
            password: $password
        ) {
            token
            isAdmin
        }
    }
`;

const updateStatus = gql`
    mutation(
        $statusId: String
    ) {
        statusRequest(
            statusId: $statusId
        ) {
            id
        }
    }
`;

const updateRequestMutation = gql`
    mutation(
        $id: ID!
        $type: String!
        $description: String!
        $numberOfVisitors: String!
        $customerId: String!
        $statusId: String!
        $dateRequested: String!
    ) {
        updateRequest(
            id: $id
            type: $type
            description: $description
            numberOfVisitors: $numberOfVisitors
            customerId: $customerId
            statusId:  $statusId
            dateRequested: $dateRequested
        ){
            id
            type
            description
            statusId
            numberOfVisitors
            customerId
            statusId
            dateRequested
        }
    }
`;

const updateStatusRequestMutation = gql`
    mutation(
        $id: ID!
        $statusId: String!
    ) {
        updateStatusRequest(
            id: $id
            statusId: $statusId
        ){
            id
        }
    }
`;

const updateCustomerMutation = gql`
    mutation(
        $id: ID!
        $email: String
        $password: String
        $lastname: String
        $firstname: String
        $address: String
        $contact: String
    ){
        updateCustomer(
            id: $id
            email: $email
            password: $password
            lastname: $lastname
            firstname: $firstname
            address: $address
            contact: $contact
        ){
           id
        }
    }
`;

export { storeCustomerMutation, storeRequestMutation, 
    storeStatusMutation, loginMutation, updateStatus, 
    updateRequestMutation, updateStatusRequestMutation, 
    updateCustomerMutation, loginOrganizerMutation }