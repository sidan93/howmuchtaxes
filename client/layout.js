import { ReactiveVar } from 'meteor/reactive-var';

export let layoutList = {
  OPENPAGE: 0,
  ENTERSALLARY: 1,
  BASETAXES: 2,
  ADDITIONTAXES: 3,
  ENDPAGE: 10
}

export let layout = new ReactiveVar(null);
export let layoutParams = null;

export function changePage(pageId, params=null) {
  layoutParams = params;
  layout.set(pageId);
} 

// changePage(layoutList.OPENPAGE);
//changePage(layoutList.BASETAXES, {net: 30000})
changePage(layoutList.ADDITIONTAXES, {net: 30000})