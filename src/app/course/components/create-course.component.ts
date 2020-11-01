import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import * as uuid from 'uuid';
import { AppState } from 'src/app/store/reducers';
import { Course } from '../course.model';
import { createCourse } from '../course.actions';

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html'
})
export class CreateCourseComponent implements OnInit {

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
  }

  onSubmit(submittedForm): void {
    console.log(submittedForm.value);

    if (submittedForm.invalid) {
      return;
    }


    const course: Course = {id: uuid.v4(), name: submittedForm.value.name, description: submittedForm.value.description};
    this.store.dispatch(createCourse({course}));

  }
}
