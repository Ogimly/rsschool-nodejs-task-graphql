import { JsonSchemaToTsProvider } from '@fastify/type-provider-json-schema-to-ts';
import { FastifyInstance, RawServerDefault, FastifyBaseLogger } from 'fastify';
import { GraphQLNonNull, GraphQLString } from 'graphql';
// import { GraphQLList, GraphQLNonNull, GraphQLString } from 'graphql';
import { IncomingMessage, ServerResponse } from 'http';
import { FromSchemaDefaultOptions } from 'json-schema-to-ts';
import { CreateUserDTO } from '../../../utils/DB/entities/DBUsers';
// import { RoutesErrors } from '../../const/routes-errors';
// import { memberTypeType } from './member-type-type';
// import { postType } from './post-type';
// import { profileType } from './profile-type';
import { userType } from './user-type';

export const getMutationType = (
  fastify: FastifyInstance<
    RawServerDefault,
    IncomingMessage,
    ServerResponse<IncomingMessage>,
    FastifyBaseLogger,
    JsonSchemaToTsProvider<FromSchemaDefaultOptions>
  >
) => ({
  name: 'RootMutationType',
  fields: () => ({
    createUser: {
      type: userType,
      args: {
        firstName: { type: new GraphQLNonNull(GraphQLString) },
        lastName: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: (_: any, { firstName, lastName, email }: CreateUserDTO) =>
        fastify.db.users.create({ firstName, lastName, email }),
    },
  }),
});
