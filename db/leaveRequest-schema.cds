namespace my.levaeRequset;
using { managed } from '@sap/cds/common';

entity Employee : managed {
    key ID : Integer;
    name : String;
    email:String;
    role: String;
    leaveRequest: Association to many LeaveRequest on leaveRequest.employee = $self;
}

entity LeaveRequest {
    startDate: Date; 
    endDate: Date;
    status: String;
    reason: String;
    comments: String;
    employee:  Association to Employee;
}