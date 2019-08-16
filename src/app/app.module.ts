//Modulos
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LOCALE_ID, NgModule } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import { MatButtonModule, MatCheckboxModule, MatNativeDateModule,  MatButtonToggleModule} from '@angular/material';
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
//import { SocialLoginModule, AuthServiceConfig, GoogleLoginProvider, FacebookLoginProvider } from "angular5-social-login";
import {MatChipsModule} from '@angular/material/chips';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';

//servicios globales
import { LoginService } from './servicios/login.service';
import { MantenimientoRolesService } from './servicios/mantenimiento-roles.service';
import { MantenimientoNoticiasService } from './servicios/mantenimiento-noticias.service';
import { UsuarioService } from './servicios/usuario.service';
import { GlobalService } from './servicios/global.service';
import { CrearCitaService } from "./servicios/crear-cita.service";
import { AuthUserService } from './servicios/auth-user.service';


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
//import { ReprogramarCitasComponent } from './reprogramar-citas/reprogramar-citas.component';
import { PreguntaMantenimientoComponent } from './mantenimientos/pregunta-mantenimiento/pregunta-mantenimiento.component';
import { AgregarEditarPreguntaComponent } from './crear-actualizar/agregar-editar-pregunta/agregar-editar-pregunta.component';
import { CallbackPipe } from './pipes/callback.pipe';
import { AgregarEditarDocumentoComponent } from './crear-actualizar/agregar-editar-documento/agregar-editar-documento.component';
import { DocumentosMantenimientoComponent } from './mantenimientos/documentos-mantenimiento/documentos-mantenimiento.component';
import { EvaluacionDocenteMantenimientoComponent } from './mantenimientos/evaluacion-docente-mantenimiento/evaluacion-docente-mantenimiento.component';
import { GenerarConsolidadoComponent } from './generar-consolidado/generar-consolidado.component';
import { CrearEditarEvaluacionComponent } from './crear-actualizar/crear-editar-evaluacion/crear-editar-evaluacion.component';
import { TomaDecisionComponent } from './toma-decision/toma-decision.component';
import { AulasMantenimientoComponent } from './mantenimientos/aulas-mantenimiento/aulas-mantenimiento.component';
import { AgregarAulaComponent } from './crear-actualizar/agregar-aula/agregar-aula.component';
import { HorariosMantenimientoComponent } from './mantenimientos/horarios-mantenimiento/horarios-mantenimiento.component';
import { AgregarHorariosComponent } from './crear-actualizar/agregar-horarios/agregar-horarios.component';
import { ProgramasMantenimientoComponent } from './mantenimientos/programas-mantenimiento/programas-mantenimiento.component';
import { AgregarProgramaComponent } from './crear-actualizar/agregar-programa/agregar-programa.component';
import { MateriasMantenimientoComponent } from './mantenimientos/materias-mantenimiento/materias-mantenimiento.component';
import { AgregarMateriaComponent } from './crear-actualizar/agregar-materia/agregar-materia.component';
import { MenuInscripcionComponent } from './mantenimientos/menu-inscripcion/menu-inscripcion.component';
import { GenerarInscripcionComponent } from './generar-inscripcion/generar-inscripcion.component';
import { InscripcionMantenimientoComponent } from './mantenimientos/inscripcion-mantenimiento/inscripcion-mantenimiento.component';
import { ComprobantesInscripcionComponent } from './comprobantes-inscripcion/comprobantes-inscripcion.component';
import { VerDetalleInscripcionComponent } from './ver-detalle-inscripcion/ver-detalle-inscripcion.component';
import { ReaperturarInscripcionComponent } from './reaperturar-inscripcion/reaperturar-inscripcion.component';
import { DetalleInscripcionCanceladaComponent } from './detalle-inscripcion-cancelada/detalle-inscripcion-cancelada.component';
import { ExportarDatosEstudianteComponent } from './exportar-datos-estudiante/exportar-datos-estudiante.component';
import { DetalleEstudianteComponent } from './detalle-estudiante/detalle-estudiante.component';
import { MenuPagosComponent } from './menu-pagos/menu-pagos.component';
import { ConsultarPagoComponent } from './consultar-pago/consultar-pago.component';
import { DetallePagoComponent } from './detalle-pago/detalle-pago.component';
import { GuardarPagoComponent } from './guardar-pago/guardar-pago.component';
import { EditarDocumentoComponent } from './editar/editar-documento/editar-documento.component';
import { AgregarDocumentoComponent } from './agregar/agregar-documento/agregar-documento.component';
import { VerificarPagoComponent } from './verificar-pago/verificar-pago.component';
import { ArancelesMantenimientoComponent } from './mantenimientos/aranceles-mantenimiento/aranceles-mantenimiento.component';
import { AgregarArancelComponent } from './crear-actualizar/agregar-arancel/agregar-arancel.component';
import { DescuentosMantenimientoComponent } from './mantenimientos/descuentos-mantenimiento/descuentos-mantenimiento.component';
import { AgregarDescuentoComponent } from './crear-actualizar/agregar-descuento/agregar-descuento.component';
import { CrearEventoInscripcionComponent } from './crear-actualizar/crear-evento-inscripcion/crear-evento-inscripcion.component';
import { MostrarProgramasComponent } from './mostrar-programas/mostrar-programas.component';
import { MostrarMateriasComponent } from './mostrar-materias/mostrar-materias.component';

//Config
/*export function getAuthServiceConfigs() {
  let config = new AuthServiceConfig(
      [
        {
          id: FacebookLoginProvider.PROVIDER_ID,
          provider: new FacebookLoginProvider("Your-Facebook-app-id")
        },
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider("Your-Google-Client-Id")
        },
      ]
  );
  return config;
}*/

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
//    ReprogramarCitasComponent,
 //   SocialLoginModule,
    PreguntaMantenimientoComponent,
    AgregarEditarPreguntaComponent,
    CallbackPipe,
    AgregarEditarDocumentoComponent,
    DocumentosMantenimientoComponent,
    EvaluacionDocenteMantenimientoComponent,
    GenerarConsolidadoComponent,
    CrearEditarEvaluacionComponent,
    TomaDecisionComponent,
    AulasMantenimientoComponent,
    AgregarAulaComponent,
    HorariosMantenimientoComponent,
    AgregarHorariosComponent,
    ProgramasMantenimientoComponent,
    AgregarProgramaComponent,
    MateriasMantenimientoComponent,
    AgregarMateriaComponent,
    MenuInscripcionComponent,
    GenerarInscripcionComponent,
    InscripcionMantenimientoComponent,
    ComprobantesInscripcionComponent,
    VerDetalleInscripcionComponent,
    ReaperturarInscripcionComponent,
    DetalleInscripcionCanceladaComponent,
    ExportarDatosEstudianteComponent,
    DetalleEstudianteComponent,
    MenuPagosComponent,
    ConsultarPagoComponent,
    DetallePagoComponent,
    GuardarPagoComponent,
    EditarDocumentoComponent,
    AgregarDocumentoComponent,
    VerificarPagoComponent,
    ArancelesMantenimientoComponent,
    AgregarArancelComponent,
    DescuentosMantenimientoComponent,
    AgregarDescuentoComponent,
    CrearEventoInscripcionComponent,
    MostrarProgramasComponent,
    MostrarMateriasComponent,
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
    MatButtonToggleModule,
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
    MatChipsModule,
    NgbModule.forRoot(),
    NgxMaterialTimepickerModule.forRoot()
  ],
  exports: [
    MatButtonModule, 
    MatCheckboxModule,
    RouterModule,
    MatBadgeModule,
    MatButtonToggleModule
  ],
  providers: [
    LoginService,
    AuthUserService,
    GlobalService,
    MantenimientoRolesService,
    MantenimientoNoticiasService,
    UsuarioService, 
    CrearCitaService,
    /*{
      provide: AuthServiceConfig,
      useFactory: getAuthServiceConfigs
    }*/
    { provide: LOCALE_ID, useValue: 'en-US' },
      //otherProviders...
  //  {provide: LOCALE_ID, useValue: "es"}
 ],
  bootstrap: [AppComponent],
})

export class AppModule { }
