import { Component, inject, Injectable } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  UntypedFormGroup,
  UntypedFormControl,
  Validators,
} from '@angular/forms';
import { NgPersianDatepickerModule } from 'ng-persian-datepicker';
import { MaskitoDirective } from '@maskito/angular';
import { CommonModule } from '@angular/common';
import moment from 'moment-jalaali';
import momentHijri from 'moment-hijri';
import {
  NgbCalendar,
  NgbCalendarIslamicCivil,
  NgbCalendarPersian,
  NgbDatepickerI18n,
  NgbDatepickerModule,
  NgbDateStruct,
} from '@ng-bootstrap/ng-bootstrap';
import { NgbDatepickerI18nPersian } from './services/persian-calendar.service';
import { IslamicI18n } from './services/islamic-calendar.service';
import { PersianCalendarComponent } from "./persian-calendar/persian-calendar.component";
import { GregorianCalendarComponent } from "./gregorian-calendar/gregorian-calendar.component";
import { IslamicCalendarComponent } from "./islamic-calendar/islamic-calendar.component";

// import { MatDatepickerModule } from '@angular/material/datepicker';
// import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
// import { provideNativeDateAdapter } from '@angular/material/core';
// import {MatInputModule} from '@angular/material/input';

@Component({
  selector: 'app-root',
  imports: [
    NgPersianDatepickerModule,
    ReactiveFormsModule,
    MaskitoDirective,
    CommonModule,
    NgbDatepickerModule,
    FormsModule,
    PersianCalendarComponent,
    GregorianCalendarComponent,
    IslamicCalendarComponent
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  dateMask = [/\d/, /\d/, /\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/];
  currentCalendar: 'solar' | 'gregorian' | 'lunar' = 'solar';
  frmGuestUser: any;

  today = inject(NgbCalendar).getToday();
  model!: NgbDateStruct; // Shared model
  date!: { year: number; month: number };

  ngOnInit(): void {
    this.frmGuestUser = new UntypedFormGroup({
      permitDate: new UntypedFormControl('', [Validators.required]),
    });
  }

  onDateSelect(date: NgbDateStruct) {
    this.model = date; // Update model
    const formattedDate = `${date.year}/${date.month}/${date.day}`;
    this.frmGuestUser.get('permitDate')?.setValue(formattedDate);
    console.log('Selected Date:', formattedDate);
  }

  toggleCalendar() {
    const currentDateValue = this.frmGuestUser.get('permitDate')?.value;

    console.log('currentDateValue', currentDateValue);
    if (currentDateValue) {
      const [year, month, day] = currentDateValue.split('/').map(Number);

      if (this.currentCalendar === 'solar') {
        const gregorianDate = moment(
          `${year}/${month}/${day}`,
          'jYYYY/jMM/jDD'
        ).format('YYYY/MM/DD');
        this.frmGuestUser.get('permitDate')?.setValue(gregorianDate);
        console.log('solar to gregorian', gregorianDate);
        console.log('solar to gregorian', this.currentCalendar);
      } else if (this.currentCalendar === 'gregorian') {
        let hijriDate = momentHijri(
          `${year}/${month}/${day}`,
          'YYYY/MM/DD'
        ).format('iYYYY/iMM/iDD');

        let splittedDate = hijriDate.split('/');
        let splitedDateYear = +splittedDate[0];
        let splitedDateMonth = +splittedDate[1];
        let splitedDateDay = +splittedDate[2];
        // console.log(splitedDateYear);
        let lunarDateStr = momentHijri()
          .iDate(splitedDateDay)
          .iMonth(splitedDateMonth)
          .iYear(splitedDateYear)
          .format('iD iMMMM iYYYY');
        function toArabicNumerals(str: string) {
          const arabicDigits = [
            '٠',
            '١',
            '٢',
            '٣',
            '٤',
            '٥',
            '٦',
            '٧',
            '٨',
            '٩',
          ];
          return str.replace(/\d/g, (d: any) => arabicDigits[d]);
        }

        const arabicFormattedDate = toArabicNumerals(lunarDateStr);

        console.log(arabicFormattedDate);

        this.frmGuestUser.get('permitDate')?.setValue(hijriDate);
        console.log('Gregorian to Lunar (Hijri):', hijriDate);
        console.log('Gregorian to Lunar (Hijri):', hijriDate);
      } else {
        const gregorianFromHijri = momentHijri(
          `${year}/${month}/${day}`,
          'iYYYY/iM/iD'
        ).format('YYYY/MM/DD');

        const solarDate = moment(gregorianFromHijri, 'YYYY/MM/DD').format(
          'jYYYY/jM/jD'
        );

        this.frmGuestUser.get('permitDate')?.setValue(solarDate);
        console.log('lunar to solar', solarDate);
      }
    }

    this.currentCalendar =
      this.currentCalendar === 'solar'
        ? 'gregorian'
        : this.currentCalendar === 'gregorian'
        ? 'lunar'
        : 'solar';
  }
}
