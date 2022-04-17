#! /usr/bin/env node

const program = require('commander');
const { version } = require('./package.json');
const Koa = require('koa2');
const bodyParser = require('koa-bodyparser');
const cors = require('koa2-cors');
const Mock = require('mockjs');
const path = require('path');

program.version(version, '-v, --version')
  .command('mock <mockDataPath> <port>')
  .action((mockDataPath, port) => {
    if (!mockDataPath) {
      process.exit(1);
    }
    const app = new Koa();
    app.use(bodyParser());
    app.use(cors());

    app.use((ctx, next) => {
      const url = ctx.url;
      const method = ctx.method;
      const body = ctx.request.body;
      const query = ctx.query;
      const logger = console;
      logger.info = console.log;
      logger.info(`${method} ${url}`);
      logger.info(`body: ${JSON.stringify(body)}`);
      logger.info(`query: ${JSON.stringify(query)}`);
      ctx.response.set('Access-Control-Allow-Origin', '*');
      ctx.response.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
      ctx.response.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
      ctx.response.set('cache-control', 'no-cache');
      return next();
    });
    app.use((ctx, next) => {
      const url = ctx.url;
      if (url.indexOf('/mock') >-1) {
        const dataFiles = url.split('/');
        let dataFile = dataFiles[dataFiles.length - 1];
        if (dataFile.indexOf('?') > -1) {
          dataFile = dataFile.split('?')[0];
        }
        if(dataFile.endsWith('.')){
          dataFile = dataFile.substring(0,dataFile.length-1);
        }
        if (!dataFile.endsWith('.json')) {
          dataFile += '.json';
        }

        ctx.response.body = Mock.mock(require(path.join(mockDataPath, dataFile)));
      } else {
        ctx.response.body = {
          code: 404,
          msg: 'Not Found',
        }
      }
      return next();
    })
    app.listen(port || 3000);
  });
program.parse(process.argv);
