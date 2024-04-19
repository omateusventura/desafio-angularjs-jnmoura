import { Component, OnInit } from '@angular/core';
import { PeopleService } from '../../services/people.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  providers: [MessageService]
})
export class UpdateComponent implements OnInit {
  nationality = 1;
  peopleForm: FormGroup;
  isLoading: boolean = false;
  peopleId: number = 0;

  constructor(
    private peopleService: PeopleService, 
    private router: ActivatedRoute,
    private messageService: MessageService
  ) {
    this.peopleForm = new FormGroup({
      fullName: new FormControl(null),
      dateOfBirth: new FormControl(null),
      inactive: new FormControl(null),
      nationality: new FormControl(null),
      document: new FormControl(null),
      passport: new FormControl(null)
    });
  }

  ngOnInit(): void {
    this.router.params.subscribe(params => {
      const peopleId = params['id'];
      
      this.peopleService.findById(peopleId).subscribe((response: any) => {
        if (response.id) {
          this.peopleForm = new FormGroup({
            fullName: new FormControl(response.fullname, [Validators.required]),
            dateOfBirth: new FormControl(response.dateofbirth, [Validators.required]),
            inactive: new FormControl(response.inactive, [Validators.required]),
            nationality: new FormControl(response.nationality, [Validators.required]),
            document: new FormControl(response.document),
            passport: new FormControl(response.passport)
          });

          this.peopleId = response.id;
          this.nationality = response.nationality;
        }
      })
    });
  }

  onSelectChange(event: any) {
    this.nationality = event.target.value;
  }

  onSavePeople() {
    this.isLoading = true;
    const data = this.peopleForm.value;

    this.peopleService.update(data, this.peopleId).subscribe((response: any) => {
      this.isLoading = false;

      if (!response.id) {
        return this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Um erro inesperado ocorreu.' });
      }

      this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Cadastro atualizado com sucesso.' });
    })
  }
}
