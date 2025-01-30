import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
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

@Component({
  selector: 'app-root',
  imports: [
    ReactiveFormsModule,
    NgPersianDatepickerModule,
    MaskitoDirective,
    CommonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  dateMask = [/\d/, /\d/, /\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/];
  currentCalendar: 'solar' | 'gregorian' | 'lunar' = 'solar';
  frmGuestUser: any;

  ngOnInit(): void {
    this.frmGuestUser = new UntypedFormGroup({
      permitDate: new UntypedFormControl('', [Validators.required]),
    });
  }

  toggleCalendar() {
    const currentDateValue = this.frmGuestUser.get('permitDate')?.value;
    // console.log('currentDateValue', currentDateValue);
    if (currentDateValue) {
      const [year, month, day] = currentDateValue.split('/').map(Number);

      if (this.currentCalendar === 'solar') {
        // Convert from Solar to Gregorian
        const gregorianDate = moment(
          `${year}/${month}/${day}`,
          'jYYYY/jMM/jDD'
        ).format('YYYY/MM/DD');
        this.frmGuestUser.get('permitDate')?.setValue(gregorianDate);
        console.log('solar to gregorian', gregorianDate);
        console.log('solar to gregorian', this.currentCalendar);
      } else if (this.currentCalendar === 'gregorian') {
        // تبدیل به تاریخ قمری عددی
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

        // Convert the lunar date string to Arabic numerals
        const arabicFormattedDate = toArabicNumerals(lunarDateStr);

        console.log(arabicFormattedDate);
        // تبدیل تاریخ میلادی به هجری اسلامی با استفاده از Intl.DateTimeFormat
        // let hijriFormatter = new Intl.DateTimeFormat('ar-SA-u-ca-islamic', {
        //   day: 'numeric',
        //   month: 'long',
        //   year: 'numeric',
        // });

        // let hijriDate = hijriFormatter.format(date);

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
      //  else {
      //   // حذف کاراکتر "هـ" از تاریخ هجری قمری
      //   let hijriDateStr = this.frmGuestUser.get('permitDate')?.value;
      //   // بررسی اینکه hijriDateStr یک رشته معتبر است
      //   if (typeof hijriDateStr === 'string') {
      //     hijriDateStr = hijriDateStr.replace('هـ', '').trim();
      //     // console.log(hijriDateStr);
      //   } else {
      //     // حذف کاراکتر "هـ" از تاریخ هجری قمری
      //     let hijriDateStr = this.frmGuestUser.get('permitDate')?.value;

      //     // بررسی اینکه hijriDateStr یک رشته معتبر است
      //     if (typeof hijriDateStr === 'string') {
      //       hijriDateStr = hijriDateStr.replace('هـ', '').trim();
      //     } else {
      //       console.error('The provided date is not a valid string.');
      //       return;
      //     }

      //     // بررسی اینکه تاریخ هجری قمری به درستی وارد شده
      //     console.log('Hijri Date:', hijriDateStr); // نمایش تاریخ هجری قمری وارد شده

      //     // تبدیل تاریخ هجری قمری به میلادی
      //     const gregorianDate = momentHijri(
      //       hijriDateStr,
      //       'iD iMMMM iYYYY',
      //       true
      //     ).format('YYYY/MM/DD');
      //     console.log('Gregorian Date:', gregorianDate); // نمایش تاریخ میلادی

      //     // بررسی اینکه تاریخ میلادی معتبر است یا نه
      //     if (gregorianDate !== 'Invalid date') {
      //       // حالا تبدیل تاریخ میلادی به شمسی
      //       const solarDate = moment(gregorianDate, 'YYYY/MM/DD')
      //         .locale('fa')
      //         .format('jYYYY/jMM/jDD');
      //       console.log('Hijri to Solar:', solarDate);

      //       // نمایش تاریخ شمسی در فرم
      //       this.frmGuestUser.get('permitDate')?.setValue(solarDate);
      //     } else {
      //       console.log('Invalid Hijri date');
      //     }
      //   }
      // }
    }

    this.currentCalendar =
      this.currentCalendar === 'solar'
        ? 'gregorian'
        : this.currentCalendar === 'gregorian'
        ? 'lunar'
        : 'solar';
  }
}
