export interface YMapPlacemarkOptions {
  hintContent: string;
  ballonContent: string;
}

export interface PreviousSessions {
  choices: Choice[];
}

export interface Choice {
  city: string;
  chosedByUser: boolean;
}
