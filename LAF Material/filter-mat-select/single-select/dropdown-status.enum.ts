/** The position of the dropdown when cascasding is needed */
export enum DROPDOWN_POSITION {
	/**
	 * Indicate that the current dropdown is before the one where the change happened and it should modify the previous one.
	 */
	BEFORE_ORIGIN = 'before',
	/**
	 * Indicate that the current dropdown is after the one where the change happened and it should modify the next one.
	 */
	AFTER_ORIGIN = 'after',
	/**
	 * Indicate that no value change happened so no action is needed. Useful whith updateValueAndValidity, markAstouched...
	 */
	NEUTRE = 'neutre',
	/**
	 * Indicate that the current dropdown is the source of the change and next and previous dropdown should be modified.
	 */
	ORIGIN = 'origin'
}