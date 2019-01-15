import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MantenimientoPasosService } from '../../servicios/mantenimiento-pasos.service';
import { MantenimientoProcedimientosService } from '../../servicios/mantenimiento-procedimientos.service';
import { MantenimientoDocumentosService } from '../../servicios/mantenimiento-documentos.service';

@Component({
  selector: 'app-editar-documento',
  templateUrl: './editar-documento.component.html',
  styleUrls: ['./editar-documento.component.css']
})
export class EditarDocumentoComponent implements OnInit {
  
  documento = {};
  constructor(private pasoServices : MantenimientoPasosService,
    private procedimientoServices : MantenimientoProcedimientosService, 
    private documentoServices : MantenimientoDocumentosService,
  	private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
  	this.getDocumento(this.route.snapshot.params['id']);
  }

  getDocumento(id_documento) {
    this.documentoServices.detDocumento(id_documento).subscribe(
      data => {
        this.documento = data.documento;
        console.log(this.documento);
      }, (error)=>{
        //this.loading = false;
        console.log(error);
      });
  }

  
}
