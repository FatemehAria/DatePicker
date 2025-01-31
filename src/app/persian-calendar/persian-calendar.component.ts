import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  NgbCalendar,
  NgbCalendarPersian,
  NgbDatepickerI18n,
  NgbDatepickerModule,
  NgbDateStruct,
  NgbDatepicker,
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
export class PersianCalendarComponent implements AfterViewInit {
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
