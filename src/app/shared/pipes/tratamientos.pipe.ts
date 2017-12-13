import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'tratamientos' })
export class TratamientosPipe implements PipeTransform {
    public transform(items: any[], input: number): any {

        let lista: any[] = [];
        let len = items.length;

        while (len--) {
            if (items[len].tipo_tratamiento_id == input) {
                lista.push(items[len]);
            }
        }

        return lista;
    }

}
