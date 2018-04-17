const { FortuneCookie } = require('./connectors');

const resolvers = {
    Query: {
        getFortuneCookie() {
            return FortuneCookie.getOne();
        }
    }
};

module.exports = { resolvers };