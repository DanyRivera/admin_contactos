import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.scss']
})
export class AgregarComponent implements OnInit {

  constructor(private formBuild: FormBuilder, private http: HttpClient) { }

  form: any;

  ngOnInit(): void {
    this.buildForm();
  }

  private buildForm(): void {
    this.form = this.formBuild.group({
      //Validación de los campos
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      apellido: ['', [Validators.required, Validators.minLength(3)]],
      telefono: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      correo: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]]

    })
  }

  submit(e: Event): void {
    e.preventDefault();

    if (this.form.valid) {

      this.sendData().subscribe(res => {

        if (res.toString() === "Se inserto correctamente") {

          Swal.fire(
            'Agregado Correctamente',
            'Puedes ver el nuevo contacto en "Ver Contactos"',
            'success'

          ).then(valor => {
            this.limpiarForm();
          })
        }

      }, error => {
        console.log(error)
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Intentalo de nuevo más tarde',
        })
      });

    } else {
      this.form.markAllAsTouched();
    }

  }

  sendData() {

    const headers: any = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options: any = { "caso": 0, "formulario": this.form.value };
    const URL: any = 'http://localhost:3000/API/crear.php';

    // console.log(options);

    return this.http.post(URL, JSON.stringify(options), headers)
  }

  limpiarForm(): void {

    this.form.reset();

    this.form.controls['nombre'].setErrors(null);
    this.form.controls['apellido'].setErrors(null);
    this.form.controls['telefono'].setErrors(null);
    this.form.controls['correo'].setErrors(null);

  }

  get nombreInput() {
    return this.form.get('nombre')
  }

  get apellidoInput() {
    return this.form.get('apellido')
  }

  get telefonoInput() {
    return this.form.get('telefono')
  }

  get correoInput() {
    return this.form.get('correo')
  }

}
