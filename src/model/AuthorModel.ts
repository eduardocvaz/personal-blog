import { ImageModel } from "@/model/ImageModel";

export class AuthorModel {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  image: {
    name: string;
    url: string;
  };

  constructor(data: any) {
    this.id = data.id || 0;
    this.name = data.attributes.name || "";
    this.createdAt = data.attributes.createdAt || "";
    this.updatedAt = data.attributes.updatedAt || "";
    this.publishedAt = data.attributes.publishedAt || "";
    this.image = new ImageModel(data.attributes.image.data);
  }
}
