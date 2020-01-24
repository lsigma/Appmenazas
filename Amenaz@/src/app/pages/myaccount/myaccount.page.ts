import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../../services/auth.service';
import { AlertService } from '../../services/alert.service';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-myaccount',
  templateUrl: './myaccount.page.html',
  styleUrls: ['./myaccount.page.scss'],
})

export class MyaccountPage implements OnInit {
  public accountForm: FormGroup;
  public submitAttempt: boolean = false;
  public formDataChanged: boolean = false;

  constructor(public formBuilder: FormBuilder,
    private authService: AuthService,
    private navCtrl: NavController,
    private alertService: AlertService) {
    this.accountForm = formBuilder.group({
      firstname: ['', Validators.compose([
        Validators.maxLength(30),
        Validators.minLength(2),
        Validators.pattern('[a-zA-Z ]*'),
        Validators.required
      ])],
      lastname: ['', Validators.compose([
        Validators.maxLength(30),
        Validators.minLength(2),
        Validators.pattern('[a-zA-Z ]*'),
        Validators.required
      ])],
      address: [''],
    });
    this.accountForm.controls.firstname.setValue(this.authService.token.firstname);
    this.accountForm.controls.lastname.setValue(this.authService.token.lastname);
    this.accountForm.controls.address.setValue(this.authService.token.address);
  }
  save() {
    this.alertService.presentToast('Conectando al servidor...');
    this.formDataChanged = false;
    this.authService
      .update(
        this.accountForm.controls.firstname.value,
        this.accountForm.controls.lastname.value,
        this.accountForm.controls.address.value
      )
      .subscribe(
        data => {
          this.alertService.presentToast(data['message']);
        },
        error => {
          this.alertService.presentToast(error['message']);
          this.formDataChanged = false;
          console.log(error);
        },
        () => { }
      );
  }
  formChanged() {
    this.formDataChanged = true;
  }
  ngOnInit() {
  }

}
