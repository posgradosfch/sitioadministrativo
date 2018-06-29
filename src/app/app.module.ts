import { BrowserModule } from '@angular/platform-browser';

//Modulos
import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient} from '@angular/common/http';

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

//servicios
import { LoginService } from './servicios/login.service';
import { MantenimientoRolesService } from './servicios/mantenimiento-roles.service';
import { MantenimientoNoticiasService } from './servicios/mantenimiento-noticias.service';
import { AgregarEditarNoticiaComponent } from './agregar-editar-noticia/agregar-editar-noticia.component';
import { GlobalService } from './servicios/global.service';

//guard
import { AuthGuard } from './guards/auth.guard';


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
{path: 'rol', 
  component: AgregarEditarRolComponent,
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
    AgregarEditarNoticiaComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    LoginService, 
    MantenimientoRolesService,
    MantenimientoNoticiasService,
    AuthGuard,
    GlobalService
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
