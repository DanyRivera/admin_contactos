import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.scss']
})
export class ContactoComponent implements OnInit {

  constructor(
    private formBuild: FormBuilder, 
    private http: HttpClient, 
    private route: ActivatedRoute,
    private router: Router
    ) { }

  form: any;
  nombre: any;
  apellido: any;
  telefono: any;
  correo: any;
  array: any;

  ngOnInit(): void {
    this.getData();
    
  }

  getData() {

    const id = Number(this.route.snapshot.paramMap.get('id'));

    const headers: any = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options: any = { "caso": 2, "id": id };
    const URL: any = 'http://localhost:3000/API/crear.php';

    this.http.post(URL, JSON.stringify(options), headers).subscribe(res => {
      this.array = res;
      this.buildForm(this.array);
    });

  }

  // getData1(array: any) {

  //   array.forEach((contacto: any) => {
  //     // console.log(contacto);
  //     this.nombre = contacto.nombre;
  //     this.apellido = contacto.apellido;
  //     this.telefono = contacto.telefono;
  //     this.correo = contacto.correo;
  //   });

  // }

  private buildForm(array: any): void {

    array.forEach((contacto: any) => {
      // console.log(contacto);
      this.nombre = contacto.nombre;
      this.apellido = contacto.apellido;
      this.telefono = contacto.telefono;
      this.correo = contacto.correo;
    });

    this.form = this.formBuild.group({
      //Validación de los campos
      nombre: [this.nombre, [Validators.required, Validators.minLength(3)]],
      apellido: [this.apellido, [Validators.required, Validators.minLength(3)]],
      telefono: [this.telefono, [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      correo: [this.correo, [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]]
    })
  }

  submit(e: Event): void {
    e.preventDefault();

    if(this.form.valid) {

      this.acuatilizarData().subscribe(res => {
        Swal.fire(
          'Se actualizo correctamente',
          'Regresa para ver el contacto actualizado',
          'success'
  
        ).then(valor => {
          this.router.navigate(['/contactos'])
        })
      })

    } else {
      this.form.markAllAsTouched();
    }

  }

  acuatilizarData() {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    const headers: any = new HttpHeaders({'Content-Type': 'application/json'});
    const options: any = { 'caso': 3, 'formulario': this.form.value, 'id': id};
    const URL: any = 'http://localhost:3000/API/crear.php';

    return this.http.post(URL, JSON.stringify(options), headers);
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
