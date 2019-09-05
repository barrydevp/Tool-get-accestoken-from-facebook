import kue from 'kue';

export default class Queue {
  constructor() {
    const queue = kue.createQueue();
  }

  newProcess(name, callback) {
    if(name && callback) {
      this.queue.process(name, function (job, done) {
        /* carry out all the job function here */
        console.log("process job: ", job.id)
        callback && callback().then(res => done()).catch(err => done(err));
      });
    }
  }

  newJob(name, option) {
    if(name){
      const { priority } = option;

      const job = this.queue.create(name, {
        name: name,
      }).priority(priority || 'normal');

      job
        .on('complete', function () {
          console.log('Job', job.id, 'with name', job.data.name, 'is done');
        })
        .on('failed', function () {
          console.log('Job', job.id, 'with name', job.data.name, 'has failed');
        })

      job.save();

      return job;
    }
  }

  createCycleJob(name, callback, milliseconds, option) {
    if(name && callback) {
      this.newProcess(name, callback);

      const timer = setInterval(function () {
        this.newJob(name, option);
      }, milliseconds);

      return timer;
    }
  }
}


