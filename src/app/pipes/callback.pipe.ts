import { Pipe, PipeTransform } from '@angular/core';
import { Categoria } from '../clases/categoria';

@Pipe({
  name: 'callback',
  pure: false
})
export class CallbackPipe implements PipeTransform {

  transform(categorias: Categoria[], callback: (categoria: Categoria)=> any): any {
  	if (!categorias || !callback) {
  		// code...
  		return categorias;
  	}
    return categorias.filter(categoria => callback(categoria));
  }

}
