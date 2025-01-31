import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  NgbCalendarGregorian,
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

  onDateChange(date: NgbDateStruct) {
    this.model = date; // Update local model
    this.modelChange.emit(date); // Emit the new date to the parent
  }
}
