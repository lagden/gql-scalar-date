import {GraphQLScalarType, GraphQLError, Kind} from 'graphql'

const GraphQLDateScalar = new GraphQLScalarType({
	name: 'Date',
	description: 'Date custom scalar type',
	serialize(value) {
		return typeof value === 'object' ? value?.toISOString() : value
	},
	parseValue(value) {
		return new Date(value)
	},
	parseLiteral(ast) {
		const kinds = [Kind.INT, Kind.FLOAT]
		if (kinds.includes(ast.kind)) {
			return new Date(Number.parseFloat(ast.value))
		}
		throw new GraphQLError('GraphQLDateScalar: Provided value is not an integer or float.')
	},
})

export default GraphQLDateScalar
