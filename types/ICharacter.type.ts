import { ISummary, IThumbnail } from "./IComic.type";

interface ILink {
    type: "detail" | "comiclink" | "purchase" | string;
    url: string;
  }

export interface ICharacterResponse {
    code: number;
    status: string;
    copyright: string;
    attributionText: string;
    attributionHTML: string;
    etag: string;
    data: {
      offset: number;
      limit: number;
      total: number;
      count: number;
      results: ICharacter[];
    };
  }
  
  export interface ICharacter {
    id: number;
    name: string;
    description: string | null;
    modified: Date;
    thumbnail: IThumbnail;
    resourceURI: string;
    comics: ISummary;
    series: ISummary;
    stories: ISummary;
    events: ISummary;
    urls: ILink[];
  }