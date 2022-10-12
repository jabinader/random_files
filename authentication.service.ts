import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable, of, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoginBodyResponseModel, UserProfile } from 'src/app/login/login-body-response.model';
import { HttpRequestOptions } from '../models/http-request-options.model';
import { SettingsService } from './settings.service';
import { AES, enc } from 'crypto-ts';
import * as CONST_LIST from 'src/app/shared/constants/constant-list';
import { SpinnerService } from './spinner.service';
import { Router } from '@angular/router';
import { SharedDataService } from '../base/shared-data.service';

@Injectable(
)
export class AuthenticationService {
	private static readonly HQCCC_REFRESH_TOKEN = 'HQCCC_REFRESH_TOKEN';
	private static readonly HQCCC_USERNAME = 'HQCCC_USERNAME';
	private static readonly HQCCC_USER_REF = 'HQCCC_USER_REF';
	private static readonly HQCCC_ENC_ACCESS_TOKEN = 'HQCCC_ENC_ACCESS_TOKEN';
	private static readonly HQCCC_ACCESS_TOKEN_EXPIRATION_TIME = 'HQCCC_ACCESS_TOKEN_EXPIRATION_TIME';
	private static readonly HQCCC_FORCE_PASSWORD_CHANGE = 'HQCCC_FORCE_PASSWORD_CHANGE';
	private static readonly DEFAULT_COOKIE_ENCRYPTION_KEY = 'myTotalySecretKey';
	private accessToken: string;
	public userProfile: UserProfile;
	private accessTokenExpirationTime: Date;
	private tokenBeingRefreshed: boolean;
	private refreshTokenSubject: Subject<any> = new Subject();
	private endpointBeingFetched: boolean;
	private fetchBackendEndpointSubject: Subject<any> = new Subject();
	constructor(private readonly cookieService: CookieService,
		private readonly httpClient: HttpClient,
		private readonly settingsService: SettingsService,
		private readonly spinnerService: SpinnerService,
		private readonly router: Router,
		private readonly sharedDataService: SharedDataService) {
	}

	/**
	 * Function used to set the credentials in the local storage after logging in
	 * @param userId user id
	 * @param accessToken access token
	 * @param refreshToken refresh token
	 * @param time access token life time
	 */
	public setCredentials(accessToken: string, refreshToken: string, accessTokenExpirationTime: Date, username: string,forcePasswordChange: boolean, userProfile: UserProfile, userRef: number): void {
		const encryptedJWT = AES.encrypt(JSON.stringify(accessToken), AuthenticationService.DEFAULT_COOKIE_ENCRYPTION_KEY).toString();
		this.cookieService.set(AuthenticationService.HQCCC_ACCESS_TOKEN_EXPIRATION_TIME, accessTokenExpirationTime.toString(), accessTokenExpirationTime, '/', '', null, 'Strict');
		this.cookieService.set(AuthenticationService.HQCCC_ENC_ACCESS_TOKEN, encryptedJWT, null, '/', '', null, 'Strict');
		this.cookieService.set(AuthenticationService.HQCCC_REFRESH_TOKEN, refreshToken, null, '/', '', null, 'Strict');
		this.cookieService.set(AuthenticationService.HQCCC_USERNAME, username, null, '/', '', null, 'Strict');
		this.cookieService.set(AuthenticationService.HQCCC_USER_REF, userRef.toString(), null, '/', '', null, 'Strict');
		this.cookieService.set(AuthenticationService.HQCCC_FORCE_PASSWORD_CHANGE, forcePasswordChange.toString(), null, '/', '', null, 'Strict');
		this.accessToken = accessToken;
		this.userProfile = userProfile;
		this.accessTokenExpirationTime = accessTokenExpirationTime;
		this.tokenBeingRefreshed = false;
		this.endpointBeingFetched = false;
		this.sharedDataService.setUserNameAndRef('' + userRef);
	}

	/**
	 * Function used to set the access rights in the cookie after logging in
	 * @param permissionExpirationTime permission life time
	 * @param chatAccess true if has access to chat  else false
	 * @param ekbaryeAccess true if has access to ekbarye  else false
	 * @param incidentAccess true if has access to incident  else false
	 */
	public setAccessRights(accessRights: UserProfile): void {
		this.cookieService.set(CONST_LIST.USER_PROFILE, JSON.stringify(accessRights), null, '/', '', null, 'Strict');
	}

	/**
	 * This function is used to set the type of user to hide/show features based on it,
	 * e.g., Section "Quick adding person" in the main incident will be shown only for the user "ID."
	 * @param dashboardContext if equal "ID" => user "ID"
	 */
	public setUserType(dashboardContext: string): void {
		this.cookieService.set(CONST_LIST.USER_TYPE, dashboardContext, 30, '/', '', null, 'Strict');
	}

	/**
	 * Function used to check if the user is logged in or not
	 * @returns boolean
	 */
	public checkIfUserIsAvailable(): boolean {
		if (!this.accessToken && this.cookieService.get(AuthenticationService.HQCCC_ENC_ACCESS_TOKEN)) {
			this.accessToken = this.decryptJWTCookie();
			this.accessTokenExpirationTime = new Date(this.cookieService.get(AuthenticationService.HQCCC_ACCESS_TOKEN_EXPIRATION_TIME));
		}
		const now = new Date();
		return this.accessToken && this.accessTokenExpirationTime?.getTime() > now.getTime();
	}

	/**
	 * Function used to return the access token
	 * @returns access token
	 */
	public getAccessToken(): string {
		if (!this.accessToken && this.cookieService.get(AuthenticationService.HQCCC_ENC_ACCESS_TOKEN)) {
			return this.decryptJWTCookie();
		}
		return this.accessToken;
	}

	/**
	 * Function used to check if the refresh token is available in the cookies
	 * @returns boolean
	 */
	public isRefreshTokenValid(): boolean {
		return this.cookieService.check(AuthenticationService.HQCCC_REFRESH_TOKEN);
	}

	/**
	 * Function used to clean the user's access token, refresh token and the expiration time
	 */
	public logout(): void {
		const requestOptions = new HttpRequestOptions();
		requestOptions.headers = new HttpHeaders();
		requestOptions.headers = requestOptions.headers.set('Content-Type', 'application/json; charset=utf8');
		const body = { username: this.cookieService.get(AuthenticationService.HQCCC_USERNAME), refreshToken: this.cookieService.get(AuthenticationService.HQCCC_REFRESH_TOKEN) };
		this.httpClient.post<any>(`${this.settingsService.settings.baseUrl}hqccc_auth/auth/logout`, body, requestOptions).pipe(tap(data => {
			this.clearCredentials();
			this.clearAccessRights();
			this.clearUserType();
			this.sharedDataService.setUserNameAndRef(CONST_LIST.HQCCC_TEXT);
			this.router.navigate(['login']);
		})).subscribe();
	}

	public refreshToken(): Observable<any> {
		if (this.tokenBeingRefreshed) {
			return this.refreshTokenSubject.asObservable();
		}
		return this.requestNewAccessToken();
	}

	public checkForEnpointBeforeRefreshToken(): Observable<any> {
		if (this.endpointBeingFetched) {
			return this.fetchBackendEndpointSubject.asObservable();
		}
		return this.requestNewAccessToken();
	}

	/**
	 * Function used to remove all the user's saved credentials
	 */
	public clearCredentials(): void {
		this.accessToken = undefined;
		this.accessTokenExpirationTime = undefined;
		this.userProfile = undefined;
		this.cookieService.set(AuthenticationService.HQCCC_REFRESH_TOKEN, '', 0, '/', '', null, 'Strict');
		this.cookieService.set(AuthenticationService.HQCCC_USERNAME, '', 0, '/', '', null, 'Strict');
		this.cookieService.set(AuthenticationService.HQCCC_USER_REF, '', 0, '/', '', null, 'Strict');
		this.cookieService.set(AuthenticationService.HQCCC_ENC_ACCESS_TOKEN, '', 0, '/', '', null, 'Strict');
	}

	/**
	 * Function is used to remove all the user's access rights from cookie
	 */
	public clearAccessRights(): void {
		this.cookieService.set(CONST_LIST.USER_PROFILE, '', 0, '/', '', null, 'Strict');
	}

	public clearUserType(): void {
		this.cookieService.set(CONST_LIST.USER_TYPE, '', 0, '/', '', null, 'Strict');
	}

	/**
	 * Function used to call the backend and request a new access token
	 */
	private requestNewAccessToken(): Observable<LoginBodyResponseModel> {
		if (!this.tokenBeingRefreshed) {
			const usernameHq = this.cookieService.get(AuthenticationService.HQCCC_USERNAME);
			const refTockenHq = this.cookieService.get(AuthenticationService.HQCCC_REFRESH_TOKEN);
			if(usernameHq !== '' && refTockenHq !== '') {
				this.tokenBeingRefreshed = true;
				const requestOptions = new HttpRequestOptions();
				requestOptions.headers = new HttpHeaders();
				requestOptions.headers = requestOptions.headers.set('Content-Type', 'application/json; charset=utf8');
				const body = { username: usernameHq, refreshToken: refTockenHq };
				return this.httpClient.post<LoginBodyResponseModel>(`${this.settingsService.settings.baseUrl}hqccc_auth/auth/refresh`, body, requestOptions).pipe(tap(data => {
					this.tokenBeingRefreshed = false;
					const date = new Date();
					const accessTokenExpirationTime = new Date(date.getTime() + data.access_token_expires_in * 1000);
					this.setCredentials(data.access_token, data.refresh_token, accessTokenExpirationTime, data.user_profile.name,data.forcePasswordChange, data.user_profile, data.user_profile.ref);
					this.sharedDataService.publishAccessTokenChanged();
					this.setAccessRights(data.user_profile);
					this.refreshTokenSubject.next(data);
					this.refreshTokenSubject.complete();
					this.refreshTokenSubject = new Subject();
				}, error => {
					// refresh token expired and user has switched to another screen => should hide spinner
					if (this.spinnerService.getNumberOfPendingScreenLoading() > 0) {
						this.spinnerService.popScreenLoading();
					}
				}));
			} else {
				this.router.navigate(['login']);
				return of();
			}
		}
	}

	/**
	 * Function is used to decrypt JWT variable exist in cookie
	 * @returns access token
	 */
	public decryptJWTCookie(): string {
		const bytes = AES.decrypt(this.cookieService.get(AuthenticationService.HQCCC_ENC_ACCESS_TOKEN).toString(), AuthenticationService.DEFAULT_COOKIE_ENCRYPTION_KEY);
		const decryptedJWT = JSON.parse(bytes.toString(enc.Utf8));
		return decryptedJWT;
	}


	public hasPermission(module: string, accessRight?: string): boolean {
		if (this.cookieService.check(CONST_LIST.USER_PROFILE) && this.cookieService.get(CONST_LIST.USER_PROFILE).length > 0) {
			const userProfile: UserProfile = JSON.parse(this.cookieService.get(CONST_LIST.USER_PROFILE));
			return accessRight ? userProfile[module][accessRight] : userProfile[module];
		}
		return false;
	}

	public setEndPointBeingRefreshed(status: boolean): void {
		this.endpointBeingFetched = status;
	}

	public resetFetchBackendEndpointSubject(data: any): void {
		this.fetchBackendEndpointSubject.next(data);
		this.fetchBackendEndpointSubject.complete();
		this.fetchBackendEndpointSubject = new Subject();
	}

	public getUserId(): number {
		const userProfile: UserProfile = JSON.parse(this.cookieService.get(CONST_LIST.USER_PROFILE));
		return userProfile.ref;
	}

	public checkItemInCookies(cookieName: string): boolean {
		return this.cookieService.check(cookieName);
	}

	public isAdmin(): boolean {
		const userProfile: UserProfile = JSON.parse(this.cookieService.get(CONST_LIST.USER_PROFILE));
		return userProfile.isAdmin ?? false;
	}

	public checkforcePasswordChange(): boolean {
		const forcePasswordChange = this.cookieService.get(AuthenticationService.HQCCC_FORCE_PASSWORD_CHANGE);
		return forcePasswordChange ? JSON.parse(this.cookieService.get(AuthenticationService.HQCCC_FORCE_PASSWORD_CHANGE)) : false;
	}

	public canViewWFLogs(): boolean {
		const userProfile: UserProfile = JSON.parse(this.cookieService.get(CONST_LIST.USER_PROFILE));
		return userProfile.userWfLogAccess ?? false;
	}

	public getUserProfileDetails(): UserProfile {
		return JSON.parse(this.cookieService.get(CONST_LIST.USER_PROFILE));
	}
}
