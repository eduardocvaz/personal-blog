import { TagModel } from "@/model/TagModel";
import { AuthorModel } from "@/model/AuthorModel";
import { ImageModel } from "@/model/ImageModel";

export class PostModel {
  id: number;
  title: string;
  summary: string;
  body: string;
  slug: string;
  image: {
    name: string;
    url: string;
  };
  publishedAt: string;
  tags: TagModel[];
  author: AuthorModel;

  constructor(data: any) {
    this.id = data.id || 0;
    this.title = data.attributes.title || "";
    this.summary = data.attributes.summary || "";
    this.body = data.attributes.body || "";
    this.slug = data.attributes.slug || "";
    this.image = new ImageModel(data.attributes.image.data);
    this.publishedAt = data.attributes.publishedAt || "";
    this.tags = data.attributes.tags.data.map((tagData: any) => {
      return new TagModel(tagData);
    });
    this.author = new AuthorModel(data.attributes.author.data);
  }
}
