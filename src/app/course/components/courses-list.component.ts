import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { Update } from '@ngrx/entity';
import { Course } from '../course.model';
import { CourseService } from '../course.service';
import { AppState } from 'src/app/store/reducers';
import { getAllCourses } from '../course.selectors';
import { courseActionTypes } from '../course.actions';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html'
})
export class CoursesListComponent implements OnInit {

  courses$: Observable<Course[]>;

  courseToBeUpdated: Course;

  isUpdateActivated = false;

  constructor(private courseService: CourseService, private store: Store<AppState>) { }

  ngOnInit(): void {
    this.courses$ = this.store.select(getAllCourses);
  }

  deleteCourse(courseId: string): void {
    this.store.dispatch(courseActionTypes.deleteCourse({courseId}));
  }

  showUpdateForm(course: Course): void {
    this.courseToBeUpdated = {...course};
    this.isUpdateActivated = true;
  }

  updateCourse(updateForm): void {
    const update: Update<Course> = {
      id: this.courseToBeUpdated.id,
      changes: {
        ...this.courseToBeUpdated,
        ...updateForm.value
      }
    };

    this.store.dispatch(courseActionTypes.updateCourse({update}));

    this.isUpdateActivated = false;
    this.courseToBeUpdated = null;
  }
}
