import { Article } from "./article";

export interface TextItem{
    id: number;
    title: string;
    articles: Article[];
}