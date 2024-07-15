export  interface NobelPrize{
    awardYear: string;
    category: string;
    categoryFullName: string;
    motivation: string;
    dateAwarded: Date;
    prizeStatus: string;
    prizeAmount: number;
    affiliations: Affiliation[]
}

// Summarized Nobel Prize details for view in Laureates page
export interface NobelItemDetails{
    awardYear: string;
    category: string;
    categoryFullName: string;
}


interface Affiliation{
    name: string;
    location: string;
}


