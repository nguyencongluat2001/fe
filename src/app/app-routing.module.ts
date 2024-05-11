import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { SystemGuard } from './shared/guard/system.guard';

const routes: Routes = [
	{
		path: '',
		loadChildren: () =>
			// import('./modules/client.module').then((m) => m.ClientModule), canActivate: [SystemGuard]
		//    import('./modules/client.module').then((m) => m.ClientModule)
		   import('./login/login.module').then((m) => m.LoginModule),
	},
	{
		path: 'login',
		loadChildren: () =>
			import('./login/login.module').then((m) => m.LoginModule),
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
