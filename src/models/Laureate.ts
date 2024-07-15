import { NobelItemDetails, NobelPrize } from "./NobelPrize";

export interface Laureate {
  id: string;
  knownName: string;
  gender: string;
  birth: {
    date: string;
    location: string;
  };
  death:{
    date: string;
    location: string;
  }
  wikipedia: string;
  wikidata: string;
  nobelPrizes: NobelPrize[]
}


export interface LaureateItemDetails{
    knownName: string;
    prizes: NobelItemDetails[]
}