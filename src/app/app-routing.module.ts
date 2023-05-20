import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'start',
    pathMatch: 'full'
  },
  {
    path: 'question',
    loadChildren: () => import('./pages/question/question.module').then( m => m.QuestionPageModule)
  },
  {
    path: 'end',
    loadChildren: () => import('./pages/end/end.module').then( m => m.EndPageModule)
  },
  {
    path: 'start',
    loadChildren: () => import('./pages/start/start.module').then( m => m.StartPageModule)
  },
  {
    path: 'ranking',
    loadChildren: () => import('./pages/ranking/ranking.module').then( m => m.RankingPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
