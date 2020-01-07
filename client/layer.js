import { ReactiveVar } from 'meteor/reactive-var';

export let layerList = {
  OPENPAGE: 0,
  ENTERSALLARY: 1,
  BASETAXES: 2,
  ADDITIONTAXES: 3,
  ENDPAGE: 10
}

export let layer = new ReactiveVar(null);
export let layerParams = null;

export function changePage(pageId, params=null) {
  layerParams = params;
  layer.set(pageId);
} 

changePage(layerList.OPENPAGE);
//changePage(layerList.BASETAXES, {net: 30000})
//changePage(layerList.ADDITIONTAXES, {net: 30000})