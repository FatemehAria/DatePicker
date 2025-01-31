import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  NgbCalendarGregorian,
  NgbDatepicker,
  NgbDatepickerModule,
  NgbDateStruct,
} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-gregorian-calendar',
  imports: [CommonModule, NgbDatepickerModule, FormsModule],
  templateUrl: './gregorian-calendar.component.html',
  styleUrl: './gregorian-calendar.component.css',
  providers: [NgbCalendarGregorian],
})
export class GregorianCalendarComponent {
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
