import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { LoginPage } from '../login/login.page';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/services/alert.service';
import { ReactiveFormsModule } from '@angular/forms';



@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss']
})

export class RegisterPage implements OnInit {
  public actNotify: boolean = true;
  public termAccept: boolean = false;
  private activateRegisterButton: boolean = true;
  public accountForm: FormGroup;
  public submitAttempt: boolean = false;
  private usernameTaken: boolean = false;

  constructor(
    private modalController: ModalController,
    private authService: AuthService,
    private navCtrl: NavController,
    private alertService: AlertService,
    public formBuilder: FormBuilder
  ) {
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
      email: ['', Validators.compose([
        Validators.maxLength(80),
        Validators.minLength(3),
        Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/),
        Validators.required
      ])],
      password: [''],
      notifications: ['']
    });
  }

  ngOnInit() { }
  dismissRegister() {
    this.modalController.dismiss();
  }
  async loginModal() {
    this.dismissRegister();
    const loginModal = await this.modalController.create({
      component: LoginPage
    });
    return await loginModal.present();
  }
  notify() {
    this.actNotify = !this.actNotify;
  }
  notifyTermsCond() {
    this.termAccept = !this.termAccept;
  }
  register() {
    this.termAccept = false;
    this.alertService.presentToast('Conectando al servidor...');
    this.submitAttempt = true;
    //   this.authService
    //     .register(
    //       form.value.fName,
    //       form.value.lName,
    //       form.value.addr,
    //       form.value.email,
    //       form.value.password,
    //       String(this.actNotify)
    //     )
    //     .subscribe(
    //       data => {
    //         this.authService.login(form.value.email, form.value.password).subscribe(
    //           data => { },
    //           error => {
    //             this.termAccept = true;
    //             console.log(error);
    //           },
    //           () => {
    //             this.dismissRegister();
    //             this.navCtrl.navigateRoot('/home');
    //           }
    //         );
    //         this.alertService.presentToast(data['message']);
    //       },
    //       error => {
    //         this.termAccept = true;
    //         console.log(error);
    //       },
    //       () => { }
    //     );
    // }
  }
}