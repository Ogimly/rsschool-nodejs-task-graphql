import { FastifyInstance } from 'fastify';
import { DataLoadersType } from '../loaders/data-loaders.d';

export type ContextType = DataLoadersType & {
  fastify: FastifyInstance;
};
