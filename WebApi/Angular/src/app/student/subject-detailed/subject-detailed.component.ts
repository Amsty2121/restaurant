import { Subject } from './../../_models/Subjects/Subject';
import { SubjectsService } from 'src/app/_services/subjects.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-subject-detailed',
  templateUrl: './subject-detailed.component.html',
  styleUrls: ['./subject-detailed.component.css'],
})
export class SubjectDetailedComponent implements OnInit {
  subjectId!: number;
  subject!: Subject;

  constructor(
    private route: ActivatedRoute,
    private subjectService: SubjectsService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.subjectId = +params['subjectid'];
    });
    this.subjectService
      .getSubject(this.subjectId)
      .subscribe((subject: Subject) => {
        this.subject = subject;
      });
  }
}
