export class ImageModel {
  id: number;
  name: string;
  url: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;

  constructor(data: any) {
    this.id = data.id || 0;
    this.name = data.attributes.name || "";
    this.url = data.attributes.url || "";
    this.createdAt = data.attributes.createdAt || "";
    this.updatedAt = data.attributes.updatedAt || "";
    this.publishedAt = data.attributes.publishedAt || "";
  }
}
