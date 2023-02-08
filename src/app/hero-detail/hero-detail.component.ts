import { Component, Input } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent {
  @Input() hero?: Hero
  constructor(private heroService: HeroService) {}
  goBack(): void {
   
  }
  save(): void{
    if (this.hero){
      this.heroService.updateHero(this.hero)
       .subscribe(() => this.goBack())
    }
  }
}
