import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RouterModule, Routes} from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient} from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NoticiasComponent } from './noticias/noticias.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PrivatePageComponent } from './private-page/private-page.component';
import { NoticiasMantenimientoComponent } from './noticias-mantenimiento/noticias-mantenimiento.component';
import { RolesMantenimientoComponent } from './roles-mantenimiento/roles-mantenimiento.component';
import { UsuariosMantenimientoComponent } from './usuarios-mantenimiento/usuarios-mantenimiento.component';
import { PermisosMantenimientoComponent } from './permisos-mantenimiento/permisos-mantenimiento.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';

const routes: Routes = [
{path: 'home', component: HomeComponent},
{path: 'noticias', component: NoticiasComponent},
{path: 'privado', component: PrivatePageComponent},
{path: '**', component: PageNotFoundComponent}

];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    LoginComponent,
    NavbarComponent,
    NoticiasComponent,
    PageNotFoundComponent,
    PrivatePageComponent,
    NoticiasMantenimientoComponent,
    RolesMantenimientoComponent,
    UsuariosMantenimientoComponent,
    PermisosMantenimientoComponent,
    NavMenuComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
