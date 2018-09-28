import { Component, OnInit, ChangeDetectionStrategy, ViewChild, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours } from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarView } from 'angular-calendar';
import { Action } from 'rxjs/internal/scheduler/Action';

@Component({
  selector: 'app-manejo-citas',
  templateUrl: './manejo-citas.component.html',
  styleUrls: ['./manejo-citas.component.css']
})

export class ManejoCitasComponent implements OnInit{

  panelOpenState = false;
  ngOnInit() {
    
  }

  /*newEvent() {
// let usuarios = new User();
// this.userService.setter(usuarios);
    this.router.navigate(['/agregarCita']);
  }

  notificaciones() {
    this.router.navigate(['/notificarCita']);
  }*/
  constructor(private modal: NgbModal, private router: Router) {}

  newEvent(): void {
    this.router.navigate(['/agregarCita']);
  }
}

