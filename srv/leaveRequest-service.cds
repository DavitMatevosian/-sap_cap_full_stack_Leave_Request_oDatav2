using my.levaeRequset as my from '../db/leaveRequest-schema';

service  MovieService @(requires:['authenticated-user']){
  
  type UserInfo  {
        id    : String;
        employeeId: Integer;
        roles  : {
          Manager: Boolean;
          Employee: Boolean
          };
    }

  function GetCurrentUser() returns UserInfo;

  entity Employee @(restrict: [
    {
      grant: [
        'READ',
        'WRITE'
      ],
      to   : ['Employee', ]
    },
    {
      grant: '*',
      to   : ['Manager']
    }
  ])                          as projection on my.Employee;

  entity LeaveRequest @(restrict: [
    {
      grant: [
        'READ',
        'WRITE'
      ],
      to   : ['Employee', ]
    },
    {
      grant: '*',
      to   : ['Manager']
    }
  ])                          as projection on my.LeaveRequest;

  @cds.redirection.target
  entity EmployeeLeaveRequest as
    select from my.Employee {
      key ID || '-' || leaveRequest.ID as FK : String,
          *,
          leaveRequest.ID              as leaveRequestID,
          leaveRequest.comments,
          leaveRequest.reason,
          leaveRequest.startDate,
          leaveRequest.endDate,
          leaveRequest.status,
          leaveRequest.leaveType,
    };
}
