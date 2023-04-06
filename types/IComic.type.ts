interface IItem {
  resourceURI: string;
  name: string;
  type?: "cover" | "interiorStory" | "promo" | string;
  role?:
    | "editor"
    | "writer"
    | "penciller"
    | "penciller (cover)"
    | "colorist"
    | "inker"
    | "penciller (cover) "
    | "letterer"
    | string;
}
export interface ISummary{
    available: number,
    collectionURI: string,
    items: IItem[] | [],
    returned: number,
}

export interface IThumbnail{
    extension: string,
    path: string
}

export interface IComicResponse {
    code: number | string;
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
      results: IComic[];
    };
  }

export interface IComic{
    id: number,
    digitalId: number,
    title: string,
    description: string,
    isbn: string,
    issn: string,
    issueNumber: number,
    modified: string,
    pageCount: number,
    oldPrice: number,
    price: number,
    prices: [],
    stock: number,
    resourceURI: string,
    series: {},
    upc: string,
    diamondCode: string,
    ean: string,
    format: string,
    textObjects: [],
    urls: [],
    variants: [],
    variantDescription: string,
    collections: [],
    collectedIssues: [],
    dates: [],
    thumbnail: IThumbnail,
    images: [],
    creators: ISummary,
    characters: ISummary,
    stories: ISummary,
    events: ISummary
}