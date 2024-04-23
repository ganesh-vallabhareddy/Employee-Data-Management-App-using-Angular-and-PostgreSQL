import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {
  departments: any[] = [];
  newDepartment: any = {};
  showAddForm: boolean = false;
  showEditForm: boolean = false;
  editingDepartment: any = null;

  constructor(private dataService: DataService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.fetchDepartments();
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

  editDepartment(department: any): void {
    this.editingDepartment = { ...department };
    this.showEditForm = true;
  }
  
  deleteDepartment(deptNo: any): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dataService.deleteDepartment(deptNo).subscribe(
          () => {
            console.log('Department deleted successfully');
            this.fetchDepartments();
          },
          (error) => {
            console.error('Error deleting department:', error);
            const errorMessage = error?.error?.message || 'Cannot delete department as it is associated with employees.';
            this.dialog.open(ErrorDialogComponent, {
              data: {
                message: errorMessage
              }
            });
          }
        );
      }
    });
  }

  addDepartmentForm(): void {
    // Initialize newDepartment as an empty object
    this.newDepartment = {};
    // Show the add department form
    this.showAddForm = true;
  }

  onSubmit(action: string): void {
    if (action === 'add') {
      this.dataService.addDepartment(this.newDepartment).subscribe(
        () => {
          console.log('Department added successfully');
          this.fetchDepartments();
          this.showAddForm = false;
        },
        (error) => {
          console.error('Error adding department:', error);
        }
      );
    } else if (action === 'edit') {
      this.dataService.updateDepartment(this.editingDepartment).subscribe(
        () => {
          console.log('Department updated successfully');
          this.fetchDepartments();
          this.editingDepartment = null;
          this.showEditForm = false;
        },
        (error) => {
          console.error('Error updating department:', error);
        }
      );
    }
  }
}
