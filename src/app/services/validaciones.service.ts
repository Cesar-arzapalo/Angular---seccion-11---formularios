import { Injectable } from '@angular/core';
import { FormControl, FormGroup, ControlContainer } from '@angular/forms';
import { Observable } from 'rxjs';

interface ErrorValidado {
  [s: string]: boolean
}

@Injectable({
  providedIn: 'root'
})
export class ValidacionesService {

  existeUsuario(control: FormControl): Promise<ErrorValidado> | Observable<ErrorValidado> {
    if (!control.value) {
      return Promise.resolve(null);
    }else{
      return  new Promise((resolve, reject) => {
        setTimeout(()  => {
          if (control.value === 'strider') {
            resolve({existe: true});
          }else {
            resolve(null);
          }
        }, 3600);
      });
    }
    }


  constructor() { }

  noHerrera(control: FormControl): {[s: string]: boolean}{
    if (control.value.toLowerCase() === 'herrera'){
      return {noHerrera: true};
    }
    return null;
  }

  passwordIguales(pass1Name: string, pass2Name: string){
    return (formGroup: FormGroup) => {
      const pass1 = formGroup.get('pass1');
      const pass2 = formGroup.get('pass2');

      if ( pass1.value === pass2.value ){
        pass2.setErrors(null);
      }else{
        pass2.setErrors({noEsIgual: true});
      }
    }

  }

}
