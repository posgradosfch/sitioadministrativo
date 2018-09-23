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
import {MatSelectModule} from '@angular/material/select';
import { MatPaginatorModule, MatProgressSpinnerModule, MatSortModule, MatTableModule } from "@angular/material"
import { AppRoutingModule } from './app-routing.module';
import {MatTooltipModule} from '@angular/material/tooltip';

//componentes
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NoticiasComponent } from './noticias/noticias.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PrivatePageComponent } from './private-page/private-page.component';
import { NoticiasMantenimientoComponent } from './mantenimientos/noticias-mantenimiento/noticias-mantenimiento.component';
import { RolesMantenimientoComponent } from './mantenimientos/roles-mantenimiento/roles-mantenimiento.component';
import { UsuariosMantenimientoComponent } from './mantenimientos/usuarios-mantenimiento/usuarios-mantenimiento.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { AgregarEditarRolComponent } from './crear-actualizar/agregar-editar-rol/agregar-editar-rol.component';
import { AgregarEditarUsuarioComponent } from './crear-actualizar/agregar-editar-usuario/agregar-editar-usuario.component';
import { AgregarEditarNoticiaComponent } from './crear-actualizar/agregar-editar-noticia/agregar-editar-noticia.component';
import { NavSettingsComponent } from './nav-settings/nav-settings.component';
import { GenerarCodigoComponent } from './generar-codigo/generar-codigo.component';

//servicios globales
import { LoginService } from './servicios/login.service';
import { MantenimientoRolesService } from './servicios/mantenimiento-roles.service';
import { MantenimientoNoticiasService } from './servicios/mantenimiento-noticias.service';
import { UsuarioService } from './servicios/usuario.service';
import { GlobalService } from './servicios/global.service';

//guard
import { AuthGuard } from './guards/auth.guard';

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
    NavMenuComponent,
    AgregarEditarRolComponent,
    AgregarEditarNoticiaComponent,
    AgregarEditarUsuarioComponent,
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
    MatPaginatorModule, 
    MatProgressSpinnerModule, 
    MatSortModule, 
    MatTableModule,
    MatSelectModule,
    AppRoutingModule,
    MatTooltipModule,
    NgbModule.forRoot(),
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
