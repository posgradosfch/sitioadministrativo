//Modulos
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import {MatIconModule} from '@angular/material/icon';
import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { HttpClientModule, HttpClient} from '@angular/common/http';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

//componentes
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NoticiasComponent } from './noticias/noticias.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PrivatePageComponent } from './private-page/private-page.component';
import { NoticiasMantenimientoComponent } from './noticias-mantenimiento/noticias-mantenimiento.component';
import { RolesMantenimientoComponent } from './roles-mantenimiento/roles-mantenimiento.component';
import { UsuariosMantenimientoComponent } from './usuarios-mantenimiento/usuarios-mantenimiento.component';
import { PermisosMantenimientoComponent } from './permisos-mantenimiento/permisos-mantenimiento.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { TableRolesComponent } from './table-roles/table-roles.component';
import { AgregarEditarRolComponent } from './agregar-editar-rol/agregar-editar-rol.component';
import { TableNoticiasComponent } from './table-noticias/table-noticias.component';
import { RegistrarUsuarioComponent } from './registrar-usuario/registrar-usuario.component';
import { TableUsuariosComponent } from './table-usuarios/table-usuarios.component';
import { AgregarEditarNoticiaComponent } from './agregar-editar-noticia/agregar-editar-noticia.component';

//servicios globales
import { LoginService } from './servicios/login.service';
import { MantenimientoPermisosService } from './servicios/mantenimiento-permisos.service';
import { MantenimientoRolesService } from './servicios/mantenimiento-roles.service';
import { MantenimientoNoticiasService } from './servicios/mantenimiento-noticias.service';
import { UsuarioService } from './servicios/usuario.service';
import { GlobalService } from './servicios/global.service';

//guard
import { AuthGuard } from './guards/auth.guard';
import { NavSettingsComponent } from './nav-settings/nav-settings.component';
import { GenerarCodigoComponent } from './generar-codigo/generar-codigo.component';

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
{path: '**', 
  component: PageNotFoundComponent
}
];


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    LoginComponent,
    NavbarComponent,
    NoticiasComponent,
    PageNotFoundComponent,
    PrivatePageComponent,
    NoticiasMantenimientoComponent,
    RolesMantenimientoComponent,
    UsuariosMantenimientoComponent,
    PermisosMantenimientoComponent,
    NavMenuComponent,
    TableRolesComponent,
    AgregarEditarRolComponent,
    TableNoticiasComponent,
    AgregarEditarNoticiaComponent,
    RegistrarUsuarioComponent,
    TableUsuariosComponent,
    NavSettingsComponent,
    GenerarCodigoComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule, 
    MatCheckboxModule,
    FormsModule,
    HttpClientModule,
    MatIconModule,
    MatSidenavModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule ,
    MatToolbarModule,
    MatMenuModule,
    NgbModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    MatButtonModule, 
    MatCheckboxModule,
    RouterModule
  ],
  providers: [
    LoginService,
    AuthGuard,
    GlobalService,
    MantenimientoRolesService,
    MantenimientoNoticiasService,
    UsuarioService
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
