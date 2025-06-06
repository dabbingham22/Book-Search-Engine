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
    authors: [String!]
    description: String!
    title: String!
    image: String
    link: String
    }

    type Auth {
    token: ID!
    user: User
    }

    input BookSave {
        authors: [String]
        description: String!
        title: String!
        bookId: String!
        image: String
        link: String
    }
    
    type Query {
    me: User
    }

    type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(bookData: BookSave!): User
    removeBook(bookId: ID!): User
    }
`;

export default typeDefs;
