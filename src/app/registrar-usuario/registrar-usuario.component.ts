import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../servicios/usuario.service';
import { FormsModule, FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-registrar-usuario',
  templateUrl: './registrar-usuario.component.html',
  styleUrls: ['./registrar-usuario.component.css'],
  providers: [UsuarioService],
})

export class RegistrarUsuarioComponent implements OnInit {
  
  register:FormGroup;
  loading: boolean;

  constructor(private usuarioService: UsuarioService, private fb: FormBuilder, private router: Router) {
      this.loading = false;
      this.register = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.required],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required]
    });
  }
  
  ngOnInit() {
    this.loading = false;
   /* this.register = {
       username: '',
       password: '',
       email: '',
       nombres: '',
       apellidos: ''
    };*/
  }
 registrarUsuario() {
   this.loading = true;
   this.usuarioService.registerUser(this.register.value).subscribe(
      response => {
        this.loading = false;
        this.router.navigate(['/mantenimientoUsuarios']);
        console.log(response);
      }, error => {
        this.loading = false;
        console.log('error', error);
      })
    console.log(this.register.value);
 }

}
