export class NobelPrize {
  static fromJson(body: any) {
    const awardYear = body.awardYear;
    const category = body.category.en;
    const categoryFullName = body.categoryFullName.en;
    const motivation = body.motivation.en;
    const dateAwarded = body.dateAwarded;
    const prizeStatus = body.prizeStatus;
    const prizeAmount = body.prizeAmount;

    return new NobelPrize(
      awardYear,
      category,
      categoryFullName,
      motivation,
      dateAwarded,
      prizeStatus,
      prizeAmount,
    );
  }

  toNobelItemDetails(){
    return {
      awardYear: this.awardYear,
      category: this.category,
      categoryFullName: this.categoryFullName
    } as NobelItemDetails
  }

  constructor(
    public awardYear: string,
    public category: string,
    public categoryFullName: string,
    public motivation: string,
    public dateAwarded: string,
    public prizeStatus: string,
    public prizeAmount: number,
  ) {}
}

// Summarized Nobel Prize details for view in Laureates page
export interface NobelItemDetails {
  awardYear: string;
  category: string;
  categoryFullName: string;
}

