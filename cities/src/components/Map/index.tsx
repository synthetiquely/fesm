import * as React from 'react';
// @ts-ignore
import YMaps from 'ymaps';
import {
  YMapPlacemarkOptions,
  YMapsPlacemarkVisualizationOptions,
  YGeoObjectCollection,
  Choice,
} from '../../interfaces';
import { extractGeocode } from '../../utils';
import './index.scss';

export interface Props {
  choices: Choice[];
}
export interface State {
  loading: boolean;
  map: any;
}

interface Map {
  maps: any;
}

class Map extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      loading: false,
      map: null,
    };
    this.maps = null;
  }

  componentDidMount() {
    this.initMap();
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.choices > this.props.choices) {
      nextProps.choices.map(async (choice: Choice) => {
        if (
          this.props.choices.find((item: Choice) => choice.city === item.city)
        ) {
          return;
        }
        return await this.addPlacemark(
          choice.city,
          {
            hintContent: choice.city,
          },
          {
            preset: 'islands#dotCircleIcon',
            iconColor: choice.chosedByUser ? 'green' : 'red',
          },
        );
      });
    }
  }

  initMap = () => {
    this.setState({
      loading: true,
    });
    YMaps.load().then((maps: any) => {
      const map = new maps.Map('map', {
        center: [55.76, 37.64],
        zoom: 4,
      });
      this.maps = maps;
      this.setState({
        map,
        loading: false,
      });
    });
  };

  getGeocode = async (city: string) => {
    if (city) {
      const collection: YGeoObjectCollection = await this.maps.geocode(city, {
        json: true,
        kind: 'locality',
        resutls: 1,
      });
      return extractGeocode(collection);
    }
  };

  addPlacemark = async (
    city: string,
    options?: YMapPlacemarkOptions,
    styleOptions?: YMapsPlacemarkVisualizationOptions,
  ) => {
    try {
      if (this.maps) {
        const coords = await this.getGeocode(city);
        if (coords) {
          const placemark = new this.maps.Placemark(
            coords,
            options,
            styleOptions,
          );
          await this.state.map.geoObjects.add(placemark);
        }
      }
    } catch (error) {
      console.log('Error while trying to place a mark for', city, error);
    }
  };

  render() {
    return <div id="map" className="map" />;
  }
}

export default Map;
