const typeDefs = `
    type User {
    _id: ID!
    username: String!
    email: String!
    bookCount: Int
    savedBooks: [Book]
    }

    type Book {
    bookId: ID!
    authors: [Sting!]
    description: String!
    title: String!
    image:
    link:
    }

    type Query {

    user: User
    me: User
    }
    type Auth {
    token: ID!
    user: User
    }
    
`;

export default typeDefs;