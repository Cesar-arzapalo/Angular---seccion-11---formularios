import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { ValidacionesService } from '../../services/validaciones.service';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css']
})
export class ReactiveComponent implements OnInit {
  forms: FormGroup;
  constructor(private fb: FormBuilder, private validadores: ValidacionesService) {
    this.crearFormulario();
    this.cargarDataFormulario();
    this.crearListener();
  }

  ngOnInit(): void {
  }

  valorNoValido(value: string){  
    return this.forms.get(value).touched && this.forms.get(value).invalid;
  }

  crearFormulario(){
    this.forms = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(5)]],
      apellido: ['', [Validators.required, this.validadores.noHerrera]],
      correo: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      usuario:['', , this.validadores.existeUsuario],
      pass1: ['', Validators.required],
      pass2: ['', Validators.required],
      direccion: this.fb.group({
        distrito: ['', Validators.required],
        ciudad: ['', Validators.required],
      }),
      pasatiempos: this.fb.array([])
    }, {
      validators: this.validadores.passwordIguales('pass1', 'pass2')
    });
  }

  crearListener(){
    this.forms.valueChanges.subscribe((valor) => {
      console.log(valor);
    })

    this.forms.statusChanges.subscribe((status) => {
      console.log({status})
    })

    this.forms.get('nombre').valueChanges.subscribe(console.log);
  }

  cargarDataFormulario(){
    // this.form.setValue
    this.forms.reset({
      nombre: 'Cesar Kennedy Rousseau',
      apellido: 'Arzapalo Cladas',
      correo: 'cesar.arzapalo@unmsm.edu.pe',
      usuario: '',
      direccion: {
        distrito: 'Ate',
        ciudad: 'urb. Santa Raquel 3ra etapa',
      },
      pass1: '1',
      pass2: '1'
    });
  }



   guardar(){

    if (this.forms.invalid){
      this.controlaMarkTouch(this.forms.controls);
      return;
    }
    console.log(this.forms);

    // this.forms.reset();
  }

  controlaMarkTouch(fc: any){
    Object.values(fc).forEach( control => {
      if (control instanceof FormControl){
        control.markAsTouched();
      } else if (control instanceof FormGroup) {
        this.controlaMarkTouch(control.controls);
      }
    });
  }

  agregarPasatiempo(){
    this.pasatiempos.push(this.fb.control('', Validators.required));
  }

  eliminarPasatiempo(i: number){
    this.pasatiempos.removeAt(i);
  }

  get pasatiempos(){
    return this.forms.get('pasatiempos') as FormArray;
  }

  validarContrasenia(): boolean{
    const pass1 = this.forms.get('pass1').value;
    const pass2 = this.forms.get('pass2').value;
    if (!this.forms.get('pass2').touched){
      return true;
    }
    return pass1 === pass2 && pass2 !== '';
  }

}
