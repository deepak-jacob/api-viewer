import { Observable } from 'rxjs/Rx';
import { compose, combine } from '../helpers'
import { FormatButtonHtml, FormatButtonObservable, FormatButtonActions } from '../components/FormatButton'
import { RequestSectionHtml, RequestSectionActions } from '../components/RequestSection'
import { ResponseSectionHtml, ResponseSectionActions } from '../components/ResponseSection'

export const SectionHtml = () => {
	return `${compose(RequestSectionHtml, FormatButtonHtml)()} ${ResponseSectionHtml()}`
}

export const SectionObservable = () =>
	Observable.merge(FormatButtonObservable())

export const SectionActions = combine(RequestSectionActions, ResponseSectionActions, FormatButtonActions)
