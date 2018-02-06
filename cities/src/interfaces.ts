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

export interface ReduxAction {
  type: string;
  payload?: any;
}

export interface GooglePrediction {
  structured_formatting: {
    main_text: string;
  };
}
