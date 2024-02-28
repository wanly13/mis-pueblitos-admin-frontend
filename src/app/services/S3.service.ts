import { Injectable } from '@angular/core';
import AWSS3UploadAshClient from 'aws-s3-upload-ash';
import { IConfig, UploadResponse } from 'aws-s3-upload-ash/dist/types';
import { ACCESS_KEY_ID, SECRET_ACCESS_KEY, BUCKET, REGION } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class S3Service {
  private config: IConfig = {
    accessKeyId: ACCESS_KEY_ID,
    secretAccessKey: SECRET_ACCESS_KEY,
    region: REGION,
    bucketName: BUCKET,
    s3Url: `https://${BUCKET}.s3.amazonaws.com/`,
    dirName:'',
  }
  private readonly s3: AWSS3UploadAshClient;

  constructor() {
    this.s3 = new AWSS3UploadAshClient(this.config);
  }

  setDirName(dirName: string) {
    this.config.dirName = dirName;
  }

  quitarEspacios(texto: string): string {
    return texto.replace(/\s/g, '-');
  }

  async uploadImage(file: File): Promise<string> {
    return await this.s3
      .uploadFile(file, file.type, undefined, this.quitarEspacios(file.name), 'public-read')
      .then((data: UploadResponse) => data.location)
      .catch(
        (err: any) => {throw new Error(err)}
      );
  }

  async deleteImage(url: string): Promise<void> {
    //const key = decodeURIComponent(url.split('/').pop()!);
    console.log('key', url.split('/').pop());
    await this.s3
    .deleteFile(url)
    .then(response => console.log(response))
    .catch(err => {throw new Error(err)})
  }

}

/*


*/
