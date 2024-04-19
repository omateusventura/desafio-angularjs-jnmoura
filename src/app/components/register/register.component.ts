import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { PeopleService } from '../../services/people.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-register',
  providers: [RouterOutlet, MessageService],
  templateUrl: './register.component.html'
})

export class RegisterComponent {
  nationality = 1;
  peopleForm: FormGroup;
  isLoading: boolean = false;

  constructor(
    private peopleService: PeopleService, 
    private router: Router,
    private messageService: MessageService
  ) {
    this.peopleForm = new FormGroup({
      fullName: new FormControl('', [Validators.required]),
      dateOfBirth: new FormControl('', [Validators.required]),
      inactive: new FormControl(0, [Validators.required]),
      nationality: new FormControl(1, [Validators.required]),
      document: new FormControl(''),
      passport: new FormControl('')
    });
  }

  onSelectChange(event: any) {
    this.nationality = event.target.value;
  }

  onSavePeople() {
    this.isLoading = true;
    const data = this.peopleForm.value;

    this.peopleService.add(data).subscribe((response: any) => {
      this.isLoading = false;

      if (response.id) {
        this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Cadastro realizado com sucesso.' });
        setTimeout(() => this.router.navigate(["/"]), 1000);
        return;
      }

    
      this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Um erro inesperado ocorreu.' });
    })
  }
}
