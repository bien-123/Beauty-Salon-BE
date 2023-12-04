const appointmentRouter = require('./appointments.js');
const billRouter = require('./bill.js');
const clientRouter = require('./client.js');
const serviceRouter = require('./service.js');
const staffRouter = require('./staff.js');

function route(app) {
    app.use('/appointment', appointmentRouter);
    app.use('/bill', billRouter);
    app.use('/client', clientRouter);
    app.use('/service', serviceRouter);
    app.use('/staff', staffRouter);
}

module.exports = route;
