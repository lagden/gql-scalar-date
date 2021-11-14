# gql-scalar-date

[![NPM version][npm-img]][npm]
[![Build Status][ci-img]][ci]
[![Coverage Status][coveralls-img]][coveralls]


[npm-img]:         https://img.shields.io/npm/v/@tadashi/gql-scalar-date.svg
[npm]:             https://www.npmjs.com/package/@tadashi/gql-scalar-date
[ci-img]:          https://github.com/lagden/gql-scalar-date/actions/workflows/nodejs.yml/badge.svg
[ci]:              https://github.com/lagden/gql-scalar-date/actions/workflows/nodejs.yml
[coveralls-img]:   https://coveralls.io/repos/github/lagden/gql-scalar-date/badge.svg?branch=main
[coveralls]:       https://coveralls.io/github/lagden/gql-scalar-date?branch=main


-----

Date custom scalar type - GraphQL

## Install

```
$ npm i -S @tadashi/gql-scalar-date
```


## Usage

```js
import {
  GraphQLSchema,
  GraphQLObjectType,
} from 'graphql'
import GraphQLDateScalar from '@tadashi/gql-scalar-date'

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      now: {
        type: GraphQLDateScalar,
        resolve() {
          return new Date()
        },
      },
    },
  }),
})
```


## License

MIT © [Thiago Lagden](https://github.com/lagden)
