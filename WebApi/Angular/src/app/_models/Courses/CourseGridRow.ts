import { ProfessorGridRow } from '../Users/ProfessorGridRow';

export interface CourseGridRow {
  id: number;
  createdDateTime: Date;
  modfiedDateTime: Date;
  courseName: string;
  courseDescription: string;
  professors: ProfessorGridRow;
}
