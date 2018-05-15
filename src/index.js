const { GraphQLServer } = require('graphql-yoga')

let links = [{
  id: 'link-0',
  url: 'http://www.howtographql.com',
  description: 'Fullstack tutorial for GraphQL'
}]

let idCount = links.length

const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    feed: () => links,
    link: (root, args) => {
      const link = links[links.findIndex(x => x.id === args.id)]
      return link
    }
  },
  Mutation: {
    createLink : (root, args) => {
      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url
      }
      links.push(link)
      return link
    },
    updateLink: (root, args) => {
      let link = links[links.findIndex(x => x.id === args.id)]
      link.url = args.url
      if (args.description) {
        link.description = args.description
      }
      return link
    },
    deleteLink: (root, args) => {
      const linkIndex = links.findIndex(x => x.id === args.id)
      const link = links[linkIndex]
      links.splice(linkIndex ,1)
      return link
    }
  }
}

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers
})

server.start(() => console.log(`Server is running on http://localhost:4000`))