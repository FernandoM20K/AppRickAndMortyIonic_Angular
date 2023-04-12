import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RickAndMortyService } from 'src/app/services/rick-and-morty.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, SharedModule]
})
export class HomePage implements OnInit {

  characters: any[] = [];
  params = {} as any;

  constructor(private rickAndMortySvc:RickAndMortyService) { }

  ngOnInit() {
    this.params.page = 0;
    this.getCharachers();
  }

  // CM: Obtiene los personajes
  getCharachers(event?:any) {
    this.params.page++;
    this.rickAndMortySvc.getCaharacter(this.params).subscribe({
      next: (res:any) => {
        this.characters.push(...res.results);
        console.log('%c🟢🟢🟢Personajes obtenidos: ','color:green',this.characters);

        if(event) {
          event.target.complete();
        }
      },
      error: (err:any) => {
        if(event) {
          event.target.complete();
        }
        console.log('%c🔴🔴🔴Error al obtener personajes: ','color:red',err);
      }
    })
  }

  // CM: Busca los personajes por nombre
  searchCharacters() {
    this.params.page = 1;
    this.rickAndMortySvc.getCaharacter(this.params).subscribe({
      next: (res:any) => {
        this.characters = res.results;
        console.log('%c🟢🟢🟢Personajes obtenidos: ','color:green',this.characters);
      },
      error: (err:any) => {
        console.log('%c🔴🔴🔴Error al obtener personajes: ','color:red',err);
      }
    })
  }

}
