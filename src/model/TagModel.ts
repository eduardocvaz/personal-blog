export class TagModel {
  id: number;
  tagName: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;

  constructor(data: any) {
    this.id = data.id || 0;
    this.tagName = data.attributes.tagName || "";
    this.createdAt = data.attributes.createdAt || "";
    this.updatedAt = data.attributes.updatedAt || "";
    this.publishedAt = data.attributes.publishedAt || "";
  }
}
