const typeDefs = `
    type User {
    _id: ID!
    username: String!
    email: String!
    bookCount: Int
    savedBooks: [Book]
    }

    type Book {
    bookId: String!
    authors: [Sting!]
    description: String!
    title: String!
    image: String
    link: String
    }

    type Auth {
    token: ID!
    user: User
    }
    
    type Query {
    user: User
    me: User
    }
`;

export default typeDefs;
