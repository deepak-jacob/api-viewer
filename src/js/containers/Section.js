import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/merge'
import { compose, combine } from '../helpers'
import { FormatButtonHtml, FormatButtonObservable, FormatButtonActions } from '../components/FormatButton'
import { RequestSectionHtml, RequestSectionActions } from '../components/RequestSection'
import { ResponseSectionHtml, ResponseSectionActions } from '../components/ResponseSection'

//compose child components markup and create a higher order function
export const SectionHtml = () => ({
  children: `${compose(RequestSectionHtml, FormatButtonHtml)().children} ${ResponseSectionHtml().children}`
})

//merge all child components observable
export const SectionObservable = () =>
  Observable.merge(FormatButtonObservable())

//combine all child components actions
export const SectionActions = combine(RequestSectionActions, ResponseSectionActions, FormatButtonActions)
