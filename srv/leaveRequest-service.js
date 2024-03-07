const cds = require('@sap/cds');
const {Employee} = cds.entities("my.levaeRequset")
module.exports = (srv)=> {
    srv.on('GetCurrentUser', async (req) => {
        const user = req.user;
        const employee = await SELECT.one.from(Employee).where({
            email: user.id 
        })
        return {
            id : user.id,
            employeeId: employee.ID,
            roles:{Manager:user.is('Manager'),Employee: user.is('Employee')}  
        };
    });
};