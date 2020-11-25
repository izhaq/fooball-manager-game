import {Choice} from './dropdown.component';

export const isChoice = (item: any): item is Choice => {
  return (item as Choice).code !== undefined;
};
