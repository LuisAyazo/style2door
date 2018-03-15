import { Component, ViewChild } from '@angular/core';
import { NavController, IonicPage, ModalController } from 'ionic-angular';
// datapickers
import { DatePicker } from '@ionic-native/date-picker'; //ionic
import { DatePickerDirective } from 'ion-datepicker'; // propio



@IonicPage()
@Component({
  selector: 'page-create-services',
  templateUrl: 'create-services.html',
  providers:[DatePickerDirective],
})
export class CreateServicesPage {
  @ViewChild(DatePickerDirective) public datepicker: DatePickerDirective;
  public localDate: Date = new Date();
  public initDate: Date = new Date();
  public initDate2: Date = new Date(2015, 1, 1);
  public disabledDates: Date[] = [new Date(2017, 7, 14)];
  public timeservice:any;
  public localeString = {
    monday: true,
    weekdays: ['Lunjes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
    months: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
  };
  public maxDate: Date = new Date(new Date().setDate(new Date().getDate() + 31));
  public min: Date = new Date();
  constructor(public navCtrl: NavController, private datePicker: DatePicker, public modalCtrl: ModalController) {

  }
  public ngOnInit() {

  }
  public Log(stuff): void {
    this.datepicker.open();
    this.datepicker.changed.subscribe(() => console.log('test'));
    console.log(stuff);
  }

  public event(data: Date): void {
    this.localDate = data;
  }
  setDate(date: Date) {
    console.log(date);
    this.initDate = date;
  }

  ppp(){
    this.datePicker.show({
        date: new Date(),
        mode: 'time',
        androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK
      }).then(
        time =>
                // console.log('Got date: ', time);
                this.timeservice = time,

        err => console.log('Error occurred while getting date: ', err)
      );
  }


  presentProfileModal(sex) {
    let profileModal = this.modalCtrl.create(sex+'scheduledPage', { userId: 8675309 });
    profileModal.present();
  }

}
