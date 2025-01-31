import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  NgbCalendar,
  NgbCalendarPersian,
  NgbDatepickerI18n,
  NgbDatepickerModule,
  NgbDateStruct,
} from '@ng-bootstrap/ng-bootstrap';
import { NgbDatepickerI18nPersian } from '../services/persian-calendar.service';

@Component({
  selector: 'app-persian-calendar',
  templateUrl: './persian-calendar.component.html',
  styleUrls: ['./persian-calendar.component.css'],
  providers: [
    { provide: NgbCalendar, useClass: NgbCalendarPersian },
    { provide: NgbDatepickerI18n, useClass: NgbDatepickerI18nPersian },
  ],
  imports: [NgbDatepickerModule, FormsModule],
})
export class PersianCalendarComponent {
  @Input() model!: NgbDateStruct; // Receive model from parent
  @Output() modelChange = new EventEmitter<NgbDateStruct>(); // Emit changes

  onDateChange(date: NgbDateStruct) {
    this.model = date; // Update local model
    this.modelChange.emit(date); // Emit the new date to the parent
  }
}
