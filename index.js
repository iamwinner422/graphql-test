import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

//_db
import db from './_db.js';
//types
import { typeDefs } from './schema.js';

//resolvers
const resolvers = {
    Query: {
        games() {
            return db.games
        },
        game(_, args){
            return db.games.find(game => game.id === args.id)
        },
        reviews() {
            return db.reviews
        },
        review(_, args){ //needs 3 arguments: parent, args & context
            return db.reviews.find(review => review.id === args.id)
        },
        authors() {
            return db.authors
        },
        author(_, args){
            return db.authors.find(author => author.id === args.id)
        }
    },
    Game: {
        reviews(game){
            
        }
    }

}
//Server setup: It needs typeDefs and resolvers
const server = new ApolloServer({
    typeDefs, resolvers
});

const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },

});

console.log(`🚀  Server ready at: ${url}`);