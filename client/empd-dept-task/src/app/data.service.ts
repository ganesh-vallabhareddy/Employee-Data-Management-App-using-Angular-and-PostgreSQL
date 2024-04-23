import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  [x: string]: any;
  private baseUrl = 'http://localhost:3000'; // Update the base URL with your server URL

  constructor(private http: HttpClient) { }

  // Fetch the number of male and female employees
  getGenderRatio(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/employees/gender-ratio`);
  }

  // Fetch all employees from the server
  getEmployees(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/employees`);
  }

  // Fetch all departments from the server
  getDepartments(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/departments`);
  }

  // Add a new employee to the server
  addEmployee(employee: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/employees`, employee);
  }

  // Add a new department to the server
  addDepartment(department: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/departments`, department);
  }

  // Update an existing employee on the server
  updateEmployee(employee: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/employees/${employee.emp_no}`, employee);
  }

  // Update an existing department on the server
  updateDepartment(department: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/departments/${department.dept_no}`, department);
  }

  // Delete an employee from the server
  deleteEmployee(empNo: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/employees/${empNo}`);
  }

  // Delete a department from the server
  deleteDepartment(deptNo: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/departments/${deptNo}`);
  }

  // Fetch the age distribution of employees
  getAgeDistribution(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/employees/age-distribution`);
  }

  getRatingsDistribution(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/employees/rating-distribution`);
  }


  // createEmployee(employee: any): Observable<any> {
  //   return this.http.post<any>(`${this.baseUrl}/employees`, employee);
  // }
}
