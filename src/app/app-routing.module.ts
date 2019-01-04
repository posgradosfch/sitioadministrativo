import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NoticiasComponent } from './noticias/noticias.component';
import { PrivatePageComponent } from './private-page/private-page.component';
import { RolesMantenimientoComponent } from './mantenimientos/roles-mantenimiento/roles-mantenimiento.component';
import { AuthGuard } from './guards/auth.guard';
import { NoticiasMantenimientoComponent } from './mantenimientos/noticias-mantenimiento/noticias-mantenimiento.component';
import { UsuariosMantenimientoComponent } from './mantenimientos/usuarios-mantenimiento/usuarios-mantenimiento.component';
import { AgregarEditarRolComponent } from './crear-actualizar/agregar-editar-rol/agregar-editar-rol.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { GenerarCodigoComponent } from './generar-codigo/generar-codigo.component';
import { AgregarEditarNoticiaComponent } from './crear-actualizar/agregar-editar-noticia/agregar-editar-noticia.component';
import { AgregarEditarUsuarioComponent } from './crear-actualizar/agregar-editar-usuario/agregar-editar-usuario.component';
import { DocentesMantenimientoComponent } from './mantenimientos/docentes-mantenimiento/docentes-mantenimiento.component';
import { AgregarEditarDocenteComponent } from './crear-actualizar/agregar-editar-docente/agregar-editar-docente.component';
import { ProcedimientosMantenimientoComponent } from './mantenimientos/procedimientos-mantenimiento/procedimientos-mantenimiento.component';
import { PasosMantenimientoComponent } from './mantenimientos/pasos-mantenimiento/pasos-mantenimiento.component';
import { AgregarEditarPasoComponent } from './crear-actualizar/agregar-editar-paso/agregar-editar-paso.component';
import { AgregarEditarProcedimientoComponent } from './crear-actualizar/agregar-editar-procedimiento/agregar-editar-procedimiento.component';
import { ManejoCitasComponent } from './manejo-citas/manejo-citas.component';
import {AgregarCitaComponent} from './crear-actualizar/agregar-cita/agregar-cita.component';
import {NotificarCitaComponent} from './manejo-citas/notificaciones/notificar-cita/notificar-cita.component';
import { AceptacionAspirantesComponent } from './aceptacion-aspirantes/aceptacion-aspirantes.component';
import { ManejoCitasVistaComponent } from './manejo-citas-vista/manejo-citas-vista.component';
//import { ReprogramarCitasComponent } from './reprogramar-citas/reprogramar-citas.component';
import { PreguntaMantenimientoComponent } from './mantenimientos/pregunta-mantenimiento/pregunta-mantenimiento.component';
import { AgregarEditarPreguntaComponent } from './crear-actualizar/agregar-editar-pregunta/agregar-editar-pregunta.component';
import { AgregarEditarDocumentoComponent } from './crear-actualizar/agregar-editar-documento/agregar-editar-documento.component';
import { DocumentosMantenimientoComponent } from './mantenimientos/documentos-mantenimiento/documentos-mantenimiento.component';
import { EvaluacionDocenteMantenimientoComponent } from './mantenimientos/evaluacion-docente-mantenimiento/evaluacion-docente-mantenimiento.component';
import { GenerarConsolidadoComponent } from './generar-consolidado/generar-consolidado.component';
import { AulasMantenimientoComponent } from './mantenimientos/aulas-mantenimiento/aulas-mantenimiento.component';
import { CrearEditarEvaluacionComponent } from './crear-actualizar/crear-editar-evaluacion/crear-editar-evaluacion.component';
import { AgregarAulaComponent } from './crear-actualizar/agregar-aula/agregar-aula.component';
import { HorariosMantenimientoComponent } from './mantenimientos/horarios-mantenimiento/horarios-mantenimiento.component';
import { AgregarHorariosComponent } from './crear-actualizar/agregar-horarios/agregar-horarios.component';
import { ProgramasMantenimientoComponent } from './mantenimientos/programas-mantenimiento/programas-mantenimiento.component';
import { AgregarProgramaComponent } from './crear-actualizar/agregar-programa/agregar-programa.component';
import { MateriasMantenimientoComponent } from './mantenimientos/materias-mantenimiento/materias-mantenimiento.component';
import { AgregarMateriaComponent } from './crear-actualizar/agregar-materia/agregar-materia.component';
import { MenuInscripcionComponent} from './mantenimientos/menu-inscripcion/menu-inscripcion.component';
import { GenerarInscripcionComponent} from './generar-inscripcion/generar-inscripcion.component';
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

const routes: Routes = [
  {path: '', redirectTo: '/home', 
    pathMatch: 'full'
  },
  //Generales
  {path: 'home',
    component: HomeComponent
  },
  {path: 'privado', 
    component: PrivatePageComponent
  },
  {path: 'noticias',
    component: NoticiasComponent
  },
  {path: 'generarConsolidado',
    component: GenerarConsolidadoComponent
  },
  //Mantenimientos
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
  {path: 'mantenimientoDocentes', 
    component: DocentesMantenimientoComponent,
    canActivate: [AuthGuard]
  },
  {path: 'mantenimientoProcedimientos', 
    component: ProcedimientosMantenimientoComponent,
    canActivate: [AuthGuard]
  },
  {path: 'mantenimientoPasos', 
    component: PasosMantenimientoComponent,
    canActivate: [AuthGuard]
  },
  {path: 'mantenimientoPreguntas', 
    component: PreguntaMantenimientoComponent,
    canActivate: [AuthGuard]
  },
  {path: 'mantenimientoDocumentos', 
    component: DocumentosMantenimientoComponent,
    canActivate: [AuthGuard]
  },
  {path: 'mantenimientoEvaluacionDocente', 
    component: EvaluacionDocenteMantenimientoComponent,
    canActivate: [AuthGuard]
  },

  //Crear
  {path: 'rol', 
    component: AgregarEditarRolComponent,
    canActivate: [AuthGuard]
  },
  {path: 'usuario', 
    component: AgregarEditarUsuarioComponent,
    canActivate: [AuthGuard]
  },
  {path: 'noticia', 
    component: AgregarEditarNoticiaComponent,
    canActivate: [AuthGuard]
  },
  {path: 'docente', 
    component: AgregarEditarDocenteComponent,
    canActivate: [AuthGuard]
  },
  {path: 'generarCodigo', 
    component: GenerarCodigoComponent,
    canActivate: [AuthGuard]
  },
  {path: 'citas', 
    component: ManejoCitasComponent,
    canActivate: [AuthGuard]
  },
 /* {path: 'citas/reprogramar/:id', 
    component: ReprogramarCitasComponent,
    canActivate: [AuthGuard]
  },*/
  {path: 'aspirantes', 
    component: AceptacionAspirantesComponent,
    canActivate: [AuthGuard]
  },
  {path: 'aspirantes/:id_aspirante', 
    component: AceptacionAspirantesComponent,
    canActivate: [AuthGuard]
  },
  {path: 'agregarCita',
    component: AgregarCitaComponent ,
    canActivate: [AuthGuard]
  },
  {path: 'notificarCita',
    component:  NotificarCitaComponent,
    canActivate: [AuthGuard]
  },
  {path: 'paso', 
    component: AgregarEditarPasoComponent,
    canActivate: [AuthGuard]
  },
  {path: 'procedimiento', 
    component: AgregarEditarProcedimientoComponent,
    canActivate: [AuthGuard]
  },
  {path: 'pregunta', 
    component: AgregarEditarPreguntaComponent,
    canActivate: [AuthGuard]
  },
  {path: 'documento', 
    component: AgregarEditarDocumentoComponent,
    canActivate: [AuthGuard]
  },
  {path: 'evaluacionDocente', 
    component: CrearEditarEvaluacionComponent,
    canActivate: [AuthGuard]
  },
  // mantenimientos y crear-actualizar
  {path: 'mantenimientoAulas', 
    component: AulasMantenimientoComponent,
    canActivate: [AuthGuard]
  },
  {path: 'aula',
  component: AgregarAulaComponent,
  canActivate: [AuthGuard]
  },
  {path: 'mantenimientoHorarios',
   component: HorariosMantenimientoComponent,
   canActivate: [AuthGuard]
  },
  {path: 'horario',
  component: AgregarHorariosComponent,
  canActivate: [AuthGuard]
 },
 {path: 'mantenimientoProgramas',
  component: ProgramasMantenimientoComponent,
  canActivate: [AuthGuard]
  },
  {path: 'programa',
  component: AgregarProgramaComponent,
  canActivate: [AuthGuard]
  },
  {path: 'matenimientoMaterias',
  component: MateriasMantenimientoComponent,
  canActivate: [AuthGuard]
  },
  {path: 'materia',
  component: AgregarMateriaComponent,
  canActivate: [AuthGuard]
  },
  // Inscripcion
  {path: 'menuInscripcion',
  component: MenuInscripcionComponent,
  canActivate: [AuthGuard]
  },
  {path: 'eventoInscripcion',
  component: GenerarInscripcionComponent,
  canActivate: [AuthGuard]
  },
  {path: 'mantenimientoInscripcion',
  component: InscripcionMantenimientoComponent,
  canActivate: [AuthGuard]
  },
  {path: 'comprobantes',
  component: ComprobantesInscripcionComponent,
  canActivate: [AuthGuard]
  },
  {path: 'detalleInscripcion',
  component: VerDetalleInscripcionComponent,
  canActivate: [AuthGuard]
  },
  {path: 'reaperturarInscripcion',
  component: ReaperturarInscripcionComponent,
  canActivate: [AuthGuard]
  },
   {path: 'detalleInscripcionCancelada',
  component: DetalleInscripcionCanceladaComponent,
  canActivate: [AuthGuard]
  },
  {path: 'datosEstudiantes',
  component: ExportarDatosEstudianteComponent,
  canActivate: [AuthGuard]
  },
  {path: 'detalleEstudiante',
  component: DetalleEstudianteComponent,
  canActivate: [AuthGuard]
  },
  {path: 'menuPagos',
  component: MenuPagosComponent,
  canActivate: [AuthGuard]
  },
  {path: 'consultarPagos',
  component: ConsultarPagoComponent,
  canActivate: [AuthGuard]
  },
  {path: 'detallePagos',
  component: DetallePagoComponent,
  canActivate: [AuthGuard]
  },
  {path: 'guardarPago',
  component: GuardarPagoComponent,
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
