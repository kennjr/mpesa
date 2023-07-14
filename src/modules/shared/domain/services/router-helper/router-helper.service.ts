import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RouterHelperService {

  private validRouteRegices

  constructor(private router: Router) {

    const validRoutes:string[] = []

    // router.config will not change so let's cache
    // get all routes and child routes
    this.router.config.forEach((route) => {
      const routePath: string|undefined = route.path
      if(typeof routePath === "string"){
        validRoutes.push(routePath);
        const routeChildren = route.children || []
        routeChildren.forEach((routeChild) => {
          const routeChildPath: string = route.path + '/' + routeChild.path;
          validRoutes.push(routeChildPath);
        })
      }
    })

    // swap routes for regices to support URL params and tidy up a little
    this.validRouteRegices = validRoutes.map((route) => route.startsWith('/') ? route.replace('/', '') : route)
      .map((route) => route.replace(/\/:[a-zA-Z]+/g, '/[a-zA-Z0-9]+'))
      .filter((route) => route !== '' && route !== '**')
      .map((route) => '^' + route + '$')

  }

  // call this to check if a route exists or not
  isRouteValid(pathname = location.pathname): boolean {
    let match = false
    const locationPathname = pathname.startsWith('/') ? pathname.replace('/', '') : pathname
    this.validRouteRegices.forEach((strValidRouteRegex: string) => {
      const validRouteRegex = new RegExp(strValidRouteRegex)
      if (validRouteRegex.test(locationPathname)) match = true
    })
    return match
  }
  
}
