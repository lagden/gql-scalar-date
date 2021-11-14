import test from 'ava'
import timekeeper from 'timekeeper'
import {
	GraphQLObjectType,
	GraphQLSchema,
	graphql,
} from 'graphql'
import GraphQLDateScalar from '../src/date.js'

function createSchema(type) {
	return new GraphQLSchema({
		query: new GraphQLObjectType({
			name: 'Query',
			fields: {
				value: {
					type,
					args: {
						arg: {
							type,
						},
					},
					resolve: (_root, {arg}) => arg,
				},
				rootValue: {
					type,
					resolve: obj => obj,
				},
			},
		}),
	})
}

test.before(t => {
	timekeeper.freeze(1_604_416_038 * 1000)
	t.context.schema = createSchema(GraphQLDateScalar)
})

test.after(timekeeper.reset)

test('serialize', async t => {
	const {schema} = t.context
	const source = 'query { rootValue }'
	const result = await graphql({
		schema,
		source,
		rootValue: new Date(1_636_912_849_793),
	})
	t.snapshot(result, 'serialize')
})

test('serialize string', async t => {
	const {schema} = t.context
	const source = 'query { rootValue }'
	const result = await graphql({
		schema,
		source,
		rootValue: new Date(1_636_912_849_793).toISOString(),
	})
	t.snapshot(result, 'serialize string')
})

test('parseValue', async t => {
	const {schema} = t.context
	const source = 'query($arg: Date!) { value(arg: $arg) }'
	const result = await graphql({
		schema,
		source,
		variableValues: {
			arg: new Date(1_636_912_849_793),
		},
	})
	t.snapshot(result, 'parseValue')
})

test('parseLiteral', async t => {
	const {schema} = t.context
	const source = 'query($arg: Date = 1636912849793) { value(arg: $arg) }'
	const result = await graphql({
		schema,
		source,
	})
	t.snapshot(result, 'parseLiteral')
})

test('parseLiteral float', async t => {
	const {schema} = t.context
	const source = 'query($arg: Date = 1636912849793.0001) { value(arg: $arg) }'
	const result = await graphql({
		schema,
		source,
	})
	t.snapshot(result, 'parseLiteral float')
})

test('parseLiteral error', async t => {
	const {schema} = t.context
	const source = 'query($arg: Date = error) { value(arg: $arg) }'
	const result = await graphql({
		schema,
		source,
	})
	t.snapshot(result, 'parseLiteral error')
})
