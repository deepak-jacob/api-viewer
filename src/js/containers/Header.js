import { Observable } from 'rxjs/Observable'
import 'rxjs/add/observable/merge'
import { compose, combine } from '../helpers'
import { NavigationHtml, NavigationObservable } from '../components/Navigation'
import { AppBarHtml, AppBarObservable, AppBarActions } from '../components/AppBar'

//compose child components markup and create a higher order function
export const HeaderHtml = compose(AppBarHtml, NavigationHtml)

//merge all child components observable
export const HeaderObservable = () =>
  Observable.merge(AppBarObservable(), NavigationObservable())

//combine all child components actions
export const HeaderActions = combine(AppBarActions)
