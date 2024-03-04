using my.levaeRequset as my from '../db/leaveRequest-schema';

service MovieService {
  entity Employee  as projection on my.Employee;
  entity LeaveRequest  as projection on my.LeaveRequest;
}