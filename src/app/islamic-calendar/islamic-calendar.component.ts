import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  NgbCalendar,
  NgbCalendarIslamicCivil,
  NgbDatepicker,
  NgbDatepickerI18n,
  NgbDatepickerModule,
  NgbDateStruct,
} from '@ng-bootstrap/ng-bootstrap';
import { IslamicI18n } from '../services/islamic-calendar.service';

@Component({
  selector: 'app-islamic-calendar',
  templateUrl: './islamic-calendar.component.html',
  styleUrl: './islamic-calendar.component.css',
  imports: [NgbDatepickerModule, FormsModule],
  providers: [
    { provide: NgbCalendar, useClass: NgbCalendarIslamicCivil },
    { provide: NgbDatepickerI18n, useClass: IslamicI18n },
  ],
})
export class IslamicCalendarComponent {
  @Input() model!: NgbDateStruct; // Receive model from parent
  @Output() modelChange = new EventEmitter<NgbDateStruct>(); // Emit changes
  @ViewChild(NgbDatepicker) dp!: NgbDatepicker; // Get the NgbDatepicker instance

  ngAfterViewInit() {
    // Ensure dp is initialized before calling navigateTo
    if (this.dp) {
      this.navigateToSelectedDate();
    }
  }

  // Function to navigate to the selected date
  navigateToSelectedDate() {
    if (this.dp && this.model) {
      this.dp.navigateTo({
        year: this.model.year,
        month: this.model.month,
      });
    }
  }

  onDateChange(date: NgbDateStruct) {
    this.model = date; // Update local model
    this.modelChange.emit(date); // Emit the new date to the parent
    this.navigateToSelectedDate(); // Navigate to the new selected date
  }
}
