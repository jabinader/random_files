import { Pipe, PipeTransform } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
@Pipe({ name: 'mediaBlobService' })
export class MediaBlobServicePipe implements PipeTransform {

    constructor(private http: HttpClient, private sanitizer: DomSanitizer) { }

    async transform(url, showLoaderParam): Promise<any> {
        if (url) {
            const headers = new HttpHeaders({ 'showLoader': showLoaderParam.toString() });
            const mediaBlob = await this.http.get(url, {headers, responseType: 'blob' }).toPromise();
            return new Promise((resolve, reject) => {
                resolve(this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(new Blob([mediaBlob], { type: mediaBlob.type }))));
            });
        }
    }
}
