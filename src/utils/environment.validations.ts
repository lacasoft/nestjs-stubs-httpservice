import * as Joi from 'joi';

export const validationSchema = Joi.object({
  APP_NAME: Joi.string().required(),
  APP_AUTHOR: Joi.string().required(),
  APP_PORT: Joi.number().required(),
  APP_PROD: Joi.boolean().required(),
  // APP_SECRET: Joi.string().required(), // if use encryption library
  DB_USER: Joi.string().required(),
  DB_PASS: Joi.string().required(),
  DB_NAME: Joi.string().required(),
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().required(),
  DB_SYNC: Joi.boolean().required(),
  DB_LOGGIN: Joi.boolean().required(),
  DB_LOAD_ENTITIES: Joi.boolean().required(),
  DB_KEEP_CONNECTION: Joi.boolean().required(),
  DB_MIGRATIONS: Joi.boolean().required(),
  DB_SSL: Joi.boolean().required(),
  API_KEY: Joi.string().required(),
  RABBIT_MQ_HOST: Joi.string().required(),
  RABBIT_MQ_PORT: Joi.number().required(),
  RABBIT_MQ_USER: Joi.string().required(),
  RABBIT_MQ_PASS: Joi.string().required(),
  LOGS_QUEUE: Joi.string().required(),
  LOG_EVENT_PATTERN: Joi.string().required(),
});
