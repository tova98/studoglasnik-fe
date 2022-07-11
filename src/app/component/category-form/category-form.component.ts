import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/service/category.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit {

  isAddMode: boolean = true;
  categoryForm!: FormGroup;

  categoryId: number | undefined = undefined;

  constructor(private router: Router, private route: ActivatedRoute, private categoryService: CategoryService) {
  }

  ngOnInit(): void {
    if(this.router.url.startsWith("/edit-category")) {
      this.isAddMode = false;
      this.categoryId = Number(this.route.snapshot.paramMap.get('id'));
    }

    this.categoryForm = new FormGroup({
      'name': new FormControl(null, Validators.required)
    });

    if(!this.isAddMode) {
      this.categoryService.getCategory(this.categoryId!).subscribe(category => {
        this.categoryForm.patchValue(category);
      });
    }
  }

  onSubmit() {
    if(this.isAddMode) {
      this.categoryService.save(this.categoryForm.value).subscribe(() => this.gotoCategoryList());
    } else {
      this.categoryService.update(this.categoryId!, this.categoryForm.value).subscribe(() => this.gotoCategoryList());
    }
    
  }

  gotoCategoryList() {
    this.router.navigate(['/categories']);
  }

}
