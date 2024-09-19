export interface ICategoryEdit {
    id: number;
    name: string;
    description?: string;
    image: string;
  }
  
export interface IUploadedFile {
    preview: string;
    preview: any;
    url: any;
    lastModified: number;
    lastModifiedDate: Date;
    name: string;
    originFileObj: File;
    percent: number;
    size: number;
    thumbUrl: string;
    type: string;
    uid: string;
}