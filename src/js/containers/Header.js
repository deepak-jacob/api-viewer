import { Observable } from 'rxjs/Rx';
import { compose, combine } from '../helpers'
import { NavigationHtml, NavigationObservable } from '../components/Navigation'
import { AppBarHtml, AppBarObservable, AppBarActions } from '../components/AppBar'

export const HeaderHtml = compose(AppBarHtml, NavigationHtml)

export const HeaderObservable = () =>
  Observable.merge(AppBarObservable(), NavigationObservable())

export const HeaderActions = combine(AppBarActions)
