import { gql } from 'apollo-boost';

//return many
const getCustomersQuery = gql`
    {
        customers {
            id 
            email
            password
            lastname
            firstname
            address
            contact
            requests {
                type
                description
                numberOfVisitors
                status {
                    status
                }
            }
        }
    }
`;
//return one
const getCustomerQuery = gql`
    
        query($id: ID!){
            customer(id: $id){
                id
                email
                password
                lastname
                firstname
                address
                contact
                requests {
                    id
                    type
                    description
                    numberOfVisitors
                    dateRequested
                    statusId
                    customerId
                }
            }
        }
    
`;

const getRequestsQuery = gql`
    {
        requests {
            id
            type
            description
            numberOfVisitors
            customerId 
            customer {
                lastname
                firstname
            }
            statusId 
            status {
                status
            }
            dateRequested

        }
    }
`;

const getRequestQuery = gql`
    query($id: ID!){
        request(id: $id){
            id
            type
            description
            numberOfVisitors
            customerId
            customer {
                lastname
                firstname
            }
            statusId
            status {
                status
            }
            dateRequested
        }
    }
`;

const getStatusesQuery = gql`
    {
        status {
            id
            status
        }
    }
`;

const getStatusQuery = gql`
    query($id: ID!){
        id
        status
    }
`;

export { getCustomersQuery, getCustomerQuery, getRequestsQuery, getRequestQuery, getStatusesQuery}