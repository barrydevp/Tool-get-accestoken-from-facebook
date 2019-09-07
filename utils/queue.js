import kue from 'kue';
import logger from './logger';
import config from '../config';

export default class Queue {
  constructor() {
    this.queue = kue.createQueue({
      prefix: 'q',
      redis: {
        port: config.REDIS_PORT,
        host: config.REDIS_HOST,
        // db: 3, // if provided select a non-default redis db
        options: {
          // see https://github.com/mranney/node_redis#rediscreateclient
        }
      }
    });
  }

  newProcess(name, callback) {
    if(name && callback) {
      this.queue.process(name, function (job, done) {
        /* carry out all the job function here */
        console.log("process job: ", job.id)
        logger.log('info', "process job: " + job.id);
        callback && callback().then(res => done()).catch(error => {
          logger.log('error', 'Callback in queue fail\n' + 'Error: ' + error.message);
          done(error)
        });
      });
    }
  }

  newJob(name, option) {
    if(name){
      const { priority } = option || {};

      const job = this.queue.create(name, {
        name: name,
      }).priority(priority || 'normal');

      job
        .on('complete', function () {
          logger.log('info', 'Job ' + job.id + ' with name ' + job.data.name + ' is done');
          console.log('Job', job.id, 'with name ', job.data.name, ' is done');
        })
        .on('failed', function () {
          logger.log('info', 'Job ' + job.id + ' with name ' + job.data.name + ' has failed');
          console.log('Job ', job.id, ' with name ', job.data.name, ' has failed');
        })

      job.save();

      return job;
    }
  }

  createCycleJob(name, callback, milliseconds, option) {
    if(name && callback) {
      this.newProcess(name, callback);

      const newJob = this.newJob.bind(this);

      const timer = setInterval(function () {
        newJob(name, option);
      }, milliseconds);

      return timer;
    }
  }
}


