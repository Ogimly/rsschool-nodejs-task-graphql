import { JsonSchemaToTsProvider } from '@fastify/type-provider-json-schema-to-ts';
import { FastifyInstance, RawServerDefault, FastifyBaseLogger } from 'fastify';
import { IncomingMessage, ServerResponse } from 'http';
import { FromSchemaDefaultOptions } from 'json-schema-to-ts';

export type FastifyType = FastifyInstance<
  RawServerDefault,
  IncomingMessage,
  ServerResponse<IncomingMessage>,
  FastifyBaseLogger,
  JsonSchemaToTsProvider<FromSchemaDefaultOptions>
>;
