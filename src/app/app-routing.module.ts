import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { SystemGuard } from './shared/guard/system.guard';

const routes: Routes = [
	{
		path: '',
		loadChildren: () =>
			import('./modules/client.module').then((m) => m.ClientModule), canActivate: [SystemGuard]
	},
	{
		path: 'login',
		loadChildren: () =>
			import('./login/login.module').then((m) => m.LoginModule),
	},
	{
		path: 'public',
		loadChildren: () => 
			import('./modules/public/public.module').then((m) => m.PublicModule),
	},
	{
		path: '**', redirectTo: 'system',
	},

];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule { }
