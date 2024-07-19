
export class NobelPrize {
  static fromJson(body: any) {
    const awardYear = body.awardYear;
    const category = body.category.en;
    const categoryFullName = body.categoryFullName.en;
    const motivation = body.motivation.en;
    const dateAwarded = body.dateAwarded;
    const prizeStatus = body.prizeStatus;
    const prizeAmount = body.prizeAmount;
    const affiliations = body.affiliations.map((a: any) => ({
      name: a.name,
      location: a.locationStringpublic .en,
    }));

    return new NobelPrize(
      awardYear,
      category,
      categoryFullName,
      motivation,
      dateAwarded,
      prizeStatus,
      prizeAmount,
      affiliations
    );
  }

  constructor(
    public awardYear: string,
    public category: string,
    public categoryFullName: string,
    public motivation: string,
    public dateAwarded: Date,
    public prizeStatus: string,
    public prizeAmount: number,
    public affiliations: Affiliation[]
  ) {}
}

// Summarized Nobel Prize details for view in Laureates page
export interface NobelItemDetails {
  awardYear: string;
  category: string;
  categoryFullName: string;
}

interface Affiliation {
  name: string;
  location: string;
}
