import { Component } from '@angular/core';
import { FormData } from './form-data';
import { LeadInterface } from 'src/app/interfaces/LeadInterface';
import { LeadService } from 'src/app/services/lead.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-lead-form',
  templateUrl: './lead-form.component.html',
  styleUrls: ['./lead-form.component.css']
})
export class LeadFormComponent {

  public model: FormData;
  public privacy: boolean = false;

  constructor(private apiService: LeadService, private toastr: ToastrService) {
    this.model = new FormData("", "", "");
  }

  onSubmit():void {
    return this.sendForm();
  }

  changePrivacy():void {
    this.privacy === false ? true : false;
  }

  sendForm() {
    const lead:LeadInterface = {
      name: this.model.leadName,
      email: this.model.leadEmail,
      phone: this.model.leadPhone
    };

    this.apiService.createLead(lead)
    .then(lead => this.toastr.success("Você aproveitou a oportunidade! Logo entraremos em contato com você!", "Sucesso"))
    .catch(error => this.toastr.error("Ocorreu algum erro ao tentar enviar suas informações. Tente novamente!", "Erro"));
  }
}
