import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm, NgControlStatus } from '@angular/forms';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {
  usuario = {
    nombre: 'Cesar Kennedy Rousseau',
    apellido: 'Arzapalo Caldas',
    correo: 'cesar.arzapalo@unmsm.edu.pe',
    pais: '',
    genero: ''
  };

  paises: any[] = [];
  constructor(private paisSerivce: PaisService) { }

  ngOnInit(): void {
    this.paisSerivce.getPaises()
      .subscribe( paises => {
        this.paises = paises;
        this.paises.unshift({
          name: '[Seleccione pais]',
          codigo: ''
        });
        console.log(this.paises);

      });
  }

  guardar(formulario: NgForm ){
    if (formulario.invalid){
      Object.values(formulario.controls).forEach( control => control.markAsTouched());
      return;
    }
    console.log('Submit disparado');
    console.log(formulario);
    // tslint:disable-next-line: no-string-literal
    console.log(formulario.value);


  }

}
