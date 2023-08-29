import { Config, Production, Development } from './config.interface';
import * as _ from 'lodash';
import * as path from 'path';

const projectRootPath = path.join(__dirname, '../../../../');
require('dotenv').config({ path: path.join(projectRootPath, '.env') });

export const configuration = async (): Promise<Config> => {
  const { config } = await import(`./envs/env.default`);
  const { config: env } = await (<{ config: any }>(
    await import(`./envs/env.development`)
  ));

  return _.merge(config, env);
};



