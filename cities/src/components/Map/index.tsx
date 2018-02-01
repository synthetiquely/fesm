import * as React from 'react';
// @ts-ignore
import YMaps from 'ymaps';
import { YMapPlacemarkOptions } from '../../interfaces';

import './index.scss';

export interface Props {}
export interface State {
  map: any;
}

interface Map {
  maps: any;
}

class Map extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      map: null,
    };
    this.maps = null;
  }

  componentDidMount() {
    this.initMap();
  }

  initMap = () => {
    YMaps.load().then((maps: any) => {
      const map = new maps.Map('map', {
        center: [55.76, 37.64],
        zoom: 10,
      });
      this.maps = maps;
      this.setState({
        map,
      });
    });
  };

  getGeocode = (city: string) => {
    if (city) {
      return this.maps.geocode(city);
    }
  };

  addPlacemark = async (city: string, options?: YMapPlacemarkOptions) => {
    try {
      const coords = await this.getGeocode(city);
      if (coords) {
        const placemark = new this.maps.Placemark(coords, options);
        this.state.map.geoObjects.add(placemark);
      }
    } catch (error) {
      console.log('Error while trying to get geocode of', city, error);
    }
  };

  public render() {
    return <div id="map" className="map" />;
  }
}

export default Map;
