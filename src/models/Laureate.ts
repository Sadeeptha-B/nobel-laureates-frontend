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
    id: "1"
    knownName: string;
    prizes: NobelItemDetails[]
}


//  data.map((item: any) => {
//         const d = {
//           id: item.id,
//           knownName: item.knownName,
//           gender: item.gender,
//           birth: {
//             date: item.birth.date,
//             location: item.birth.place.locationString.en
//           },
//           death: {
//             date: item.death.date,
//             location: item.death.place.locationString.en
//           },
//           wikipedia: item.wikipedia.english,
//           wikidata: item.wikidata.url,
//           nobelPrizes: []
//         } as Laureate

//         d.nob
//       })