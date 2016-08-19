import CityType from '../../types/CityType';
import { City } from '../../../database/models';

const event = {
  type: CityType,
  args: {},
  async resolve() {
    const city = await City.findOne();
    return city;
  }
};

export default event;
