const Image=require('../models/image')
const kue = require('kue')
    , queue = kue.createQueue();

queue.process('test', function (job, done) {
    test(job.id, job.data, done);
});
const test =  function (id, email, done) {


      setTimeout(()=>{
           console.log(email.mesaj)
          var a=2000*50;
           console.log(a)
          const image = new Image({
              imageUri: "REsim URL12312321"
          })
          image.save().then((img) => {
             console.log("resim kaydoldu")
              console.log(img)
              done(null, {result: 'İş Bitti'});

          })
       },10000)

};
queue
    .on('job enqueue', function (id, type) {
        console.log('job %s got queued of type %s with id %s', id, type);
    })
    .on('job complete', function (id, result) {
        console.log("iş bende", result)
        console.log('job complete: ' + id);
    });
module.exports = (data) => {

        queue
            .create('test', {
                id:1,
                mesaj:data.mesaj
            })
            .removeOnComplete(true)
            .save();
}
