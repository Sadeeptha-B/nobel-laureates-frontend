import { NobelItemDetails, NobelPrize } from "./NobelPrize";

export class Laureate {
  // Body is based on the API response from nobels api
  static fromJson(body: any) {
    const id = body.id;
    const knownName = body.knownName?.en ?? body.fullName.en;
    const gender = body.gender;
    const birth = {
      date: body.birth?.date,
      location: body.birth?.place?.locationString.en,
    };
    const death = {
      date: body.death?.date,
      location: body.death?.place.locationString.en,
    };
    const wikipedia = body.wikipedia.english;
    const wikidata = body.wikidata.english;
    const nobelPrizes = body.nobelPrizes.map((p: any) =>
      NobelPrize.fromJson(p)
    );

    return new Laureate(
      id,
      knownName,
      gender,
      birth,
      death,
      wikipedia,
      wikidata,
      nobelPrizes
    );
  }

  toLaureateItemDetails() {
    return {
      id: this.id,
      knownName: this.knownName,
      prizes: this.nobelPrizes.map((p) => p.toNobelItemDetails()),
    } as LaureateItemDetails;
  }

  constructor(
    private id: string,
    public knownName: string,
    public gender: string,
    public birth: { date: string; location: string },
    public death: { date: string; location: string },
    public wikipedia: string,
    public wikidata: string,
    public nobelPrizes: NobelPrize[]
  ) {}
}

export interface LaureateItemDetails {
  id: string;
  knownName: string;
  prizes: NobelItemDetails[];
}
