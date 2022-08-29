import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { AfterViewInit, ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { MatSelect, MatSelectChange } from '@angular/material/select';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LookUpModel } from 'src/app/shared/models/lookup.model';
import { DROPDOWN_POSITION } from './dropdown-status.enum';

@Component({
	selector: 'app-single-selection',
	templateUrl: './single-selection.component.html',
	styleUrls: ['./single-selection.component.sass'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SingleSelectionComponent implements OnInit, AfterViewInit, OnDestroy, OnChanges {

	/** control for the MatSelect filter keyword */
	public dataFilterCtrl: UntypedFormControl = new UntypedFormControl();

	/** list of data filtered by search keyword */
	public filteredData = new BehaviorSubject<LookUpModel[]>([]);

	/** Subject that emits when the component has been destroyed. */
	// tslint:disable-next-line:variable-name
	private readonly _onDestroy = new Subject<void>();

	@ViewChild('singleSelect') singleSelect: MatSelect;
	@ViewChild('virtualScroll') virtualScroll: CdkVirtualScrollViewport;

	// tslint:disable-next-line: no-output-on-prefix
	@Output() onSelectionChange = new EventEmitter<MatSelectChange>();

	/** control for the selected data */
	@Input() dataCtrl: UntypedFormControl = new UntypedFormControl();

	@Input() placeholderSelect: string;

	@Input() placeholderSearch: string;

	@Input() noEntriesFoundLabel: string;

	@Input() fullWidth = false;

	@Input() multiSelect = false;

	@Input() withMarginLeft = false;

	@Input() withMarginRight = false;

	@Input() isRequiredField = false;

	@Input() requiredFieldMsg;

	// use isDisabledValue = true and disabledValues to enable the duplicate pipe
	@Input() isDisabledValue = false;

	@Input() disabledValues: number[] = [];
	/**
	 * Indicate the previous dropdown if cascading is needed.
	 */
	@Input() previousDropdown: SingleSelectionComponent;
	/**
	 * Indicate the next dropdown if cascading is needed.
	 */
	@Input() nextDropdown: SingleSelectionComponent;
	/**
	 * Indicate the position of the dropdown compared to the origin of the change.
	 */
	public position = DROPDOWN_POSITION.NEUTRE;

	// initialize the filtered list after setting the data input
	@Input() data : LookUpModel[];

	ngOnInit(): void {
		this.dataCtrl?.valueChanges.pipe(takeUntil(this._onDestroy)).subscribe(() => this.scrollDownToIndex());
		// listen for search field value changes
		this.dataFilterCtrl.valueChanges
			.pipe(takeUntil(this._onDestroy))
			.subscribe(() => {
				this.filterEntities();
			});
		this.filteredData?.next(this.getData());
		if(this.previousDropdown || this.nextDropdown) {
			this.dataCtrl.valueChanges.pipe(takeUntil(this._onDestroy)).subscribe((value) => {
				if ((this.position === DROPDOWN_POSITION.BEFORE_ORIGIN && this.previousDropdown && !this.previousDropdown.dataCtrl.value && value && !this.previousDropdown.multiSelect) || ( this.position === DROPDOWN_POSITION.ORIGIN && this.previousDropdown && !this.previousDropdown.multiSelect)) {
					this.previousDropdown.position = DROPDOWN_POSITION.BEFORE_ORIGIN;
					this.previousDropdown.dataCtrl.setValue(this.getData().find(elem => elem.ref === value)?.fatherRef);
					this.filteredData?.next(this.getData());
				}
				if ((this.position === DROPDOWN_POSITION.AFTER_ORIGIN && this.nextDropdown) || ( this.position === DROPDOWN_POSITION.ORIGIN && this.nextDropdown)) {
					this.filteredData?.next(this.getData());
					this.nextDropdown.position = DROPDOWN_POSITION.AFTER_ORIGIN;
					this.nextDropdown.dataCtrl.reset();
				} else if(this.position === DROPDOWN_POSITION.AFTER_ORIGIN){
					this.filteredData?.next(this.getData());
				}
				this.position = DROPDOWN_POSITION.NEUTRE;
			})
		}
	}

	ngOnChanges(changes: SimpleChanges): void {
		if( changes?.data?.previousValue?.length !== changes?.data?.currentValue?.length){
			this.filteredData?.next(this.getData());
		}
	}

	public getData(): LookUpModel[] {
		let result = [];
		if( this.previousDropdown) {
			if(this.previousDropdown.dataCtrl.value) {
				if(this.previousDropdown.multiSelect) {
					result = this.data?.filter(elem => this.previousDropdown.dataCtrl.value.includes(elem.fatherRef));
				} else {
					result = this.data?.filter(elem => elem.fatherRef === this.previousDropdown.dataCtrl.value);
				}
			} else {
				result = this.data?.filter(elem => this.previousDropdown.filteredData?.getValue().map( elem => elem.ref).includes(elem.fatherRef));
			}
		} else {
			result = this.data;
		}
		return result;
	}

	scrollDownToIndex(isOpen = false): void {
		if (this.data?.length >= 2000) {
			if (this.dataCtrl?.value) {
				const indexToGo = this.data?.findIndex(x => x?.ref === this.dataCtrl?.value);
				if (isOpen) {
					this.virtualScroll?.setRenderedContentOffset(0);
					this.virtualScroll?.scrollToIndex(indexToGo);
				}
				else {
					this.singleSelect?.open();
					this.virtualScroll?.setRenderedContentOffset(0);
					this.virtualScroll?.scrollToIndex(indexToGo);
					setTimeout(() => {
						this.scrolledind = 0;
						this.singleSelect?.close();
					}, 1000);
				}
			}
		}
	}
	ngAfterViewInit(): void {
		this.scrollDownToIndex();
	}

	ngOnDestroy(): void {
		this._onDestroy.next();
		this._onDestroy.complete();
	}

	onChange($event: MatSelectChange): void {
		if (this.previousDropdown && !this.previousDropdown.dataCtrl.value && $event && !this.previousDropdown.multiSelect) {
			this.previousDropdown.position = DROPDOWN_POSITION.BEFORE_ORIGIN;
			this.previousDropdown.dataCtrl.setValue(this.getData().find(elem => elem.ref === $event.value).fatherRef);
			this.filteredData?.next(this.getData());
		}
		if (this.nextDropdown) {
			this.nextDropdown.position = DROPDOWN_POSITION.AFTER_ORIGIN;
			this.nextDropdown.dataCtrl.reset();
		}
		this.onSelectionChange.emit($event);
	}

	public clearValue(event: PointerEvent): void {
		event.stopPropagation();
		this.dataCtrl?.setValue(null);
		if (this.nextDropdown) {
			this.nextDropdown.position = DROPDOWN_POSITION.AFTER_ORIGIN;
			this.nextDropdown.dataCtrl.reset();
		}
		this.onSelectionChange.emit(null);
	}

	// tslint:disable-next-line:typedef
	private filterEntities(): void {
		if (!this.data) {
			return;
		}
		// get the search keyword
		let search = this.dataFilterCtrl.value;
		if (!search) {
			this.filteredData?.next(this.getData());
			return;
		} else {
			search = search.toLowerCase();
		}
		// filter the entitys
		this.filteredData?.next(
			this.getData().filter(entity => entity.name.toLowerCase().includes(search))
		);
	}

	onOpenedChangeVS(isOpen): void {
		if (isOpen) {
			this.scrollDownToIndex(isOpen);
		}
	}
	onClose(): void {
		if (this.dataFilterCtrl?.value && this.dataFilterCtrl?.value !== '') {
			this.scrollDownToIndex();
		}
		// If value did not change scroll back to index to visualize previously selected value
		if (this.scrolledind !== 0 && this.scrolledind === this.previousInd) {
			this.scrollDownToIndex();
		}
	}

	private scrolledind: number = 0;
	private previousInd: number = 0;
	// Detect when virtual scroll is scrolled
	scrolledIndex(event) {
		this.previousInd = this.scrolledind;
		this.scrolledind = this.dataCtrl?.value;
	}
}