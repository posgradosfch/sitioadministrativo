import { Component, OnInit } from '@angular/core';
import { Noticias } from '../servicios/noticias';
import { MantenimientoNoticiasService } from '../servicios/mantenimiento-noticias.service';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-agregar-editar-noticia',
  templateUrl: './agregar-editar-noticia.component.html',
  styleUrls: ['./agregar-editar-noticia.component.css']
})
export class AgregarEditarNoticiaComponent implements OnInit {

  private noticia: Noticias;
  register:FormGroup;
  loading: boolean;

  constructor(private noticiasService : MantenimientoNoticiasService,
    private router:Router, private fb: FormBuilder) {
      this.register = this.fb.group({
      cuerpo: ['', Validators.required],
      emcabezado: ['', Validators.required]
    });
     }

  ngOnInit(): void{
      this.loading = false;
  	}

  processForm(){
    this.loading = true;
     this.noticiasService.agregarNoticia(this.register.value).subscribe(
      response => {
        this.loading = false;
        this.router.navigate(['/mantenimientoNoticias']);
        console.log(response);
      }, error => {
        this.loading = false;
        console.log('error', error);
      })
    console.log(this.register.value);
 }

}
