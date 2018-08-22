import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '../../node_modules/@angular/router';
import { HomeComponent } from './home/home.component';
import { NoticiasComponent } from './noticias/noticias.component';
import { PrivatePageComponent } from './private-page/private-page.component';
import { RolesMantenimientoComponent } from './mantenimientos/roles-mantenimiento/roles-mantenimiento.component';
import { AuthGuard } from './guards/auth.guard';
import { NoticiasMantenimientoComponent } from './mantenimientos/noticias-mantenimiento/noticias-mantenimiento.component';
import { UsuariosMantenimientoComponent } from './mantenimientos/usuarios-mantenimiento/usuarios-mantenimiento.component';
import { AgregarEditarRolComponent } from './agregar-editar-rol/agregar-editar-rol.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { GenerarCodigoComponent } from './generar-codigo/generar-codigo.component';
import { AgregarEditarNoticiaComponent } from './agregar-editar-noticia/agregar-editar-noticia.component';
import { RegistrarUsuarioComponent } from './registrar-usuario/registrar-usuario.component';

const routes: Routes = [
  {path: '', redirectTo: '/home', 
    pathMatch: 'full'
  },
  {path: 'home',
    component: HomeComponent
  },
  {path: 'noticias',
    component: NoticiasComponent
  },
  {path: 'privado', component: PrivatePageComponent},

  {path: 'mantenimientoRoles',
    component: RolesMantenimientoComponent,
    canActivate: [AuthGuard]
  },
  {path: 'mantenimientoNoticias',
    component: NoticiasMantenimientoComponent,
    canActivate: [AuthGuard]
  },
  {path: 'mantenimientoUsuarios', 
    component: UsuariosMantenimientoComponent,
    canActivate: [AuthGuard]
  },
  {path: 'rol', 
    component: AgregarEditarRolComponent,
    canActivate: [AuthGuard]
  },
  {path: 'usuario', 
    component: RegistrarUsuarioComponent,
    canActivate: [AuthGuard]
  },
  {path: 'noticia', 
    component: AgregarEditarNoticiaComponent,
    canActivate: [AuthGuard]
  },
  {path: 'generarCodigo', 
    component: GenerarCodigoComponent,
    canActivate: [AuthGuard]
  },
  
  {path: '**', 
    component: PageNotFoundComponent
  }
  ];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports:[
    RouterModule
  ],

  declarations: []
})

export class AppRoutingModule { }
