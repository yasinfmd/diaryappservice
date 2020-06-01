var kue = require('kue')
    , queue = kue.createQueue();

queue.process('email', function (job, done) {
    console.log("bana geldi", job.data)
    console.log("bana geldi done", done)
    email(job.id, job.data, done);
});
const email = function (id, email, done) {
    setTimeout(()=>{
        console.log('job: %s, sent to: %s number: %s', id, email.to, email.number);
        done(null, {result: 'OK'});
    },10000)

};
queue
    .on('job enqueue', function (id, type) {
        console.log("iş kuyrukta",id)
        console.log("iş kuyrukta",type)
        console.log('job %s got queued of type %s with id %s', id, type);
    })
    .on('job complete', function (id, result) {
        console.log("iş bende",result)
        console.log('job complete: ' + id);
    });
module.exports=(data)=>{
    for (var i = 0; i < data.length; i++) {
        queue
            .create('email', {
                id:data[i].id,
                title: data[i].title,
                number: i,
                to: data[i].to,
                template: 'welcome-email'
            })
            .removeOnComplete(true)
            .save();
    }
}
