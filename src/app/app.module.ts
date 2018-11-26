//Modulos
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LOCALE_ID, NgModule } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import { MatButtonModule, MatCheckboxModule, MatNativeDateModule} from '@angular/material';
import { MatIconModule} from '@angular/material/icon';
import { RouterModule, Routes} from '@angular/router';
import { MatDialogModule} from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule} from '@angular/material/input';
import { MatSidenavModule} from '@angular/material/sidenav';
import { MatToolbarModule} from '@angular/material/toolbar';
import { MatMenuModule} from '@angular/material/menu';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { MatSelectModule} from '@angular/material/select';
import { MatPaginatorModule, MatProgressSpinnerModule, MatSortModule, MatTableModule } from "@angular/material"
import { AppRoutingModule } from './app-routing.module';
import { MatTooltipModule} from '@angular/material/tooltip';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { MatDatepickerModule} from '@angular/material/datepicker';
import { MatBadgeModule } from '@angular/material/badge'
import { MatExpansionModule} from '@angular/material/expansion';
import { MatListModule} from '@angular/material/list';
import { MatStepperModule} from '@angular/material/stepper';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { NgxPaginationModule } from 'ngx-pagination';

//servicios globales
import { LoginService } from './servicios/login.service';
import { MantenimientoRolesService } from './servicios/mantenimiento-roles.service';
import { MantenimientoNoticiasService } from './servicios/mantenimiento-noticias.service';
import { UsuarioService } from './servicios/usuario.service';
import { GlobalService } from './servicios/global.service';
import { CrearCitaService } from "./servicios/crear-cita.service";

//guard
import { AuthGuard } from './guards/auth.guard';

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
import { DocentesMantenimientoComponent } from './mantenimientos/docentes-mantenimiento/docentes-mantenimiento.component';
import { AgregarEditarDocenteComponent } from './crear-actualizar/agregar-editar-docente/agregar-editar-docente.component';
import { ProcedimientosMantenimientoComponent } from './mantenimientos/procedimientos-mantenimiento/procedimientos-mantenimiento.component';
import { PasosMantenimientoComponent } from './mantenimientos/pasos-mantenimiento/pasos-mantenimiento.component';
import { AgregarEditarProcedimientoComponent } from './crear-actualizar/agregar-editar-procedimiento/agregar-editar-procedimiento.component';
import { AgregarEditarPasoComponent } from './crear-actualizar/agregar-editar-paso/agregar-editar-paso.component';
import { ManejoCitasComponent } from './manejo-citas/manejo-citas.component';
import { AgregarCitaComponent } from './crear-actualizar/agregar-cita/agregar-cita.component';
import { NotificarCitaComponent } from './manejo-citas/notificaciones/notificar-cita/notificar-cita.component';
import { AceptacionAspirantesComponent } from './aceptacion-aspirantes/aceptacion-aspirantes.component';
import { ManejoCitasVistaComponent } from './manejo-citas-vista/manejo-citas-vista.component';
import { ReprogramarCitasComponent } from './reprogramar-citas/reprogramar-citas.component';

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
    DocentesMantenimientoComponent,
    AgregarEditarDocenteComponent,
    ProcedimientosMantenimientoComponent,
    PasosMantenimientoComponent,
    AgregarEditarProcedimientoComponent,
    AgregarEditarPasoComponent,
    ManejoCitasComponent,
    AgregarCitaComponent,
    NotificarCitaComponent,
    AceptacionAspirantesComponent,
    ManejoCitasVistaComponent,
    ReprogramarCitasComponent,
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule, 
    MatCheckboxModule,
    FormsModule,
    MatIconModule,
    MatSidenavModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatMenuModule,
    MatPaginatorModule, 
    MatProgressSpinnerModule, 
    MatSortModule, 
    MatTableModule,
    MatSelectModule,
    AppRoutingModule,
    MatTooltipModule,
    AngularSvgIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatBadgeModule,
    MatExpansionModule,
    MatListModule,
    MatStepperModule,
    MatDialogModule,
    AngularEditorModule,
    NgxPaginationModule,
    NgbModule.forRoot()
  ],
  exports: [
    MatButtonModule, 
    MatCheckboxModule,
    RouterModule,
    MatBadgeModule
  ],
  providers: [
    LoginService,
    AuthGuard,
    GlobalService,
    MantenimientoRolesService,
    MantenimientoNoticiasService,
    UsuarioService, 
    CrearCitaService
 ],
  bootstrap: [AppComponent],
})
export class AppModule { }
