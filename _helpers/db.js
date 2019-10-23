const config = require('config.json');
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || config.connectionString, { useCreateIndex: true, useNewUrlParser: true });
mongoose.Promise = global.Promise;

module.exports = {

    User: require('../users/user.model'),
    Details: require('../details/detail.model')
    // Job: require('../jobs/job.model'),
    //Now added
    // Uplds: require('../uplds/upload.model')

    
};