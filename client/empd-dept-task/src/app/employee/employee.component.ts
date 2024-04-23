import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  employees: any[] = [];
  newEmployee: any = {};
  departments: any[] = [];
  editingEmployee: any = null;
  showAddForm: boolean = false;
  showEditForm: boolean = false;

  constructor(private dataService: DataService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.fetchEmployees();
    this.fetchDepartments(); 
  }

  fetchEmployees(): void {
    this.dataService.getEmployees().subscribe(
      (data: any[]) => {
        this.employees = data;
      },
      (error) => {
        console.error('Error fetching employees:', error);
      }
    );
  }
  
  fetchDepartments(): void {
    this.dataService.getDepartments().subscribe(
      (data: any[]) => {
        this.departments = data;
      },
      (error) => {
        console.error('Error fetching departments:', error);
      }
    );
  }

  addEmployeeForm(): void {
    this.newEmployee = {}; // Clear any previous data
    this.showAddForm = true;
    this.showEditForm = false;
  }

  editEmployee(employee: any): void {
    this.editingEmployee = { ...employee };
    
    // Set the selected gender in the dropdown
    if (this.editingEmployee.gender === 'Male') {
      this.editingEmployee.gender = 'Male';
    } else {
      this.editingEmployee.gender = 'Female';
    }
  
    this.showEditForm = true;
  }
  
  
  deleteEmployee(empNo: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dataService.deleteEmployee(empNo).subscribe(
          () => {
            console.log('Employee deleted successfully');
            this.fetchEmployees();
          },
          (error) => {
            console.error('Error deleting employee:', error);
          }
        );
      }
    });
  }

  onSubmitNew(): void {
    this.dataService.addEmployee(this.newEmployee).subscribe(
      () => {
        console.log('Employee added successfully');
        this.fetchEmployees();
        this.showAddForm = false;
      },
      (error) => {
        console.error('Error adding employee:', error);
        this.dialog.open(ErrorDialogComponent, {
          data: {
            message: error
          }
        });
      }
    );
  }

  onSubmitEdit(): void {
    this.dataService.updateEmployee(this.editingEmployee).subscribe(
      () => {
        console.log('Employee updated successfully');
        this.fetchEmployees();
        this.editingEmployee = null;
        this.showEditForm = false;
      },
      (error) => {
        console.error('Error updating employee:', error);
      }
    );
  }
}
