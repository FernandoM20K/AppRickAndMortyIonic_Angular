import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { RickAndMortyService } from 'src/app/services/rick-and-morty.service';

@Component({
  selector: 'app-character-detail',
  templateUrl: './character-detail.page.html',
  styleUrls: ['./character-detail.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, SharedModule]
})
export class CharacterDetailPage implements OnInit {

  characterId: string = '';
  character = null as any;
  episodes: any[] = [];

  constructor(private route:ActivatedRoute, private rickAndMortySvc:RickAndMortyService) {
    this.characterId = this.route.snapshot.paramMap.get('id') as string;
    console.log('%c🟢🟢🟢ID del personaje: ','color:green',this.characterId);
  }

  ngOnInit() {
    this.getCharacterById();
  }

  ionViewEnter() {
    this.getCharacterById();
  }

  getCharacterById(){
    this.rickAndMortySvc.getCharacterById(this.characterId).subscribe(
      {
        next: (data:any) => {
          this.character = data;
          this.getEpisodesById();
          console.log('%c🟢🟢🟢Personaje Obtenido: ','color:green',data);
        },
        error: (error) => {
          console.log('%c🔴🔴🔴Error en la obtencion del personaje: ','color:red',error);
        }
      }
    );
  }

  getEpisodesById(){
    for(let url of this.character.episode) {
      this.rickAndMortySvc.getByUrl(url).subscribe(
        {
          next: (data:any) => {
            console.log('%c🟢🟢🟢Episodio Obtenido: ','color:green',data);
            this.episodes.push(data);
          },
          error: (error) => {
            console.log('%c🔴🔴🔴Error en la obtencion del episodio: ','color:red',error);
          }
        }
      );
    }
  }
    

}
