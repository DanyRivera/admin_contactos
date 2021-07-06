import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-contactos',
  templateUrl: './contactos.component.html',
  styleUrls: ['./contactos.component.scss']
})
export class ContactosComponent implements OnInit {

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) { }

  contactos: any = [];

  ngOnInit(): void {
    this.getContactos();
  }

  getContactos() {

    const headers: any = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options: any = { "caso": 1 };
    const URL: any = 'http://localhost:3000/API/crear.php';

    this.http.post(URL, JSON.stringify(options), headers).subscribe(res => {
      this.contactos = res;
      // console.log(this.contactos)
    })

  }

  confirmar(id: Number) {
    Swal.fire({
      title: 'Estás seguro?',
      text: "No podrás revertirlo!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar'
    }).then((result) => {
      if (result.isConfirmed) {

        this.eliminarContacto(id).subscribe(res => {
          Swal.fire(
            'Eliminado!',
            'El contacto fue eliminado.',
            'success'
          ).then(res => {
            window.location.reload()
          })
        })

      }
    })
  }

  eliminarContacto(id: Number) {

    console.log(id);
    const headers: any = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options: any = { 'caso': 4, 'id': id };
    const URL: any = 'http://localhost:3000/API/crear.php';

    return this.http.post(URL, JSON.stringify(options), headers);
  }

}
