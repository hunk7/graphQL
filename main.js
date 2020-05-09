const express = require('express')
const expressGraphQL = require('express-graphql')
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull
} = require('graphql')
const app = express()

const developers = [
	{ id: 1, name: 'A M Shah' },
	{ id: 2, name: 'Chan Ling' },
	{ id: 3, name: 'Adam Eves' }
]

const patchs = [
	{ id: 1, name: 'GraphQLString manipulation', devID: 1 },
	{ id: 2, name: 'Show JS Clocks', devID: 1 },
	{ id: 3, name: 'FireStore', devID: 1 },
	{ id: 4, name: 'Thein Base code', devID: 2 },
	{ id: 5, name: 'Tic tac toe game', devID: 2 },
	{ id: 6, name: 'Mongodb Schemas', devID: 2 },
	{ id: 7, name: 'ixel Arts studio', devID: 2 },
	{ id: 8, name: 'Bootsrap lib', devID: 2 },
	{ id: 9, name: 'Mongodb hash password', devID: 3 },
	{ id: 10, name: 'android studio', devID: 3 },
	{ id: 11, name: 'Sass Compiler', devID: 3 }
]

const patchType = new GraphQLObjectType({
  name: 'patch',
  description: 'This represents a patch written by an developer',
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    name: { type: GraphQLNonNull(GraphQLString) },
    devID: { type: GraphQLNonNull(GraphQLInt) },
    developer: {
      type: developType,
      resolve: (patch) => {
        return developers.find(developer => developer.id === patch.devID)
      }
    }
  })
})

const developType = new GraphQLObjectType({
  name: 'developer',
  description: 'This represents a developer of a patch',
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    name: { type: GraphQLNonNull(GraphQLString) },
    patchs: {
      type: new GraphQLList(patchType),
      resolve: (developer) => {
        return patchs.filter(patch => patch.devID === developer.id)
      }
    }
  })
})

const RootQueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'Root Query',
  fields: () => ({
    patch: {
      type: patchType,
      description: 'A Single Book',
      args: {
        id: { type: GraphQLInt }
      },
      resolve: (parent, args) => patchs.find(patch => patch.id === args.id)
    },
    patchs: {
      type: new GraphQLList(patchType),
      description: 'List of All patchs',
      resolve: () => patchs
    },
    developers: {
      type: new GraphQLList(developType),
      description: 'List of All developers',
      resolve: () => developers
    },
    developer: {
      type: developType,
      description: 'A Single developer',
      args: {
        id: { type: GraphQLInt }
      },
      resolve: (parent, args) => developers.find(developer => developer.id === args.id)
    }
  })
})

const RootMutationType = new GraphQLObjectType({
  name: 'Mutation',
  description: 'Root Mutation',
  fields: () => ({
    addpatch: {
      type: patchType,
      description: 'Add a patch',
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        devID: { type: GraphQLNonNull(GraphQLInt) }
      },
      resolve: (parent, args) => {
        const patch = { id: patchs.length + 1, name: args.name, devID: args.devID }
        patchs.push(patch)
        return patch
      }
    },
    addDeveloper: {
      type: developType,
      description: 'Add an developer',
      args: {
        name: { type: GraphQLNonNull(GraphQLString) }
      },
      resolve: (parent, args) => {
        const author = { id: developers.length + 1, name: args.name }
        developers.push(developer)
        return developer
      }
    }
  })
})


const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType
})

app.use('/graphql',expressGraphQL({
	schema:schema,
	graphiql:true
}))

app.listen(5000, () => console.log('Server Running on port 5000'))