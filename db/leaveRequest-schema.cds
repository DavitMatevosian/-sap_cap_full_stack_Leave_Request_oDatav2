namespace my.levaeRequset;
using { managed } from '@sap/cds/common';

entity Employee : managed {
    key ID : Integer;
    name : String;
    email :String;
    role : String;
    userAvatar : String;
    leaveRequest : Association to many LeaveRequest on leaveRequest.employee = $self;
}

entity LeaveRequest {
    key ID : Integer;
    startDate: Date; 
    endDate: Date;
    status: String;
    reason: String;
    comments: String;
    leaveType: String;
    employee:  Association to Employee;
}