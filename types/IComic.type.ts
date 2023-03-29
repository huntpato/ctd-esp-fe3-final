interface ISummary{
    available: number,
    collectionURI: string,
    items: [],
    returned: number,
}

interface IThumbnail{
    extension: string,
    path: string
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
    prices: [],
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