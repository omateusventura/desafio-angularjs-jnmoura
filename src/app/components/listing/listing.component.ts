import { Component, OnInit } from '@angular/core';
import { PeopleService } from '../../services/people.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  providers: [MessageService]
})

export class ListingComponent implements OnInit {
  initialLoading: boolean = true;
  visible: boolean = false;
  amountSkeleton = Array.from({ length: 5 });
  peoples: any = [];
  constructor(
    private peopleService: PeopleService, 
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.peopleService.getAll().subscribe(peoples => {
      this.peoples = peoples;
      this.initialLoading = false;
    });
  }

  showDialog() {
    this.visible = true;
  }

  delete(peopleId: number) {
    this.peopleService.delete(peopleId).subscribe(response => {

      this.router.navigateByUrl('/');
      this.visible = false;

      if (!response) {
        return this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Um erro inesperado ocorreu.' });
      }

      this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Pessoa excluída com sucesso.' });
    })
  }
}

