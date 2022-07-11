import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Category } from 'src/app/model/category';
import { CategoryService } from 'src/app/service/category.service';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { faPen, faTrashCan } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  faTrashCan = faTrashCan;
  faPen = faPen;

  categories: Category[] = [];

  constructor(private categoryService: CategoryService, public dialog: MatDialog, public snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.categoryService.findAll().subscribe(data => {
      this.categories = data;
    })
  }

  delete(categoryId: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      info: 'category',
      id: categoryId
    };
    let dialogRef = this.dialog.open(DeleteDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((categoryId: number) => {
      if(categoryId) {
        this.categoryService.delete(categoryId).subscribe(res => {
          this.categories = this.categories.filter(c => c.id !== categoryId);
          this.snackBar.open("Category deleted successfully!", "✔️", { duration: 3000, verticalPosition: 'top'});
        })
      }
    })
  }

}
