import {textfiled} from './textfiled';
/**
 * Button class
 * Output a <button>Label</button> form element
 */
export class factory {

  /**
   * build a text DOM element, supporting other jquery text form-control's
   * @return {Object} DOM Element to be injected into the form.
   */
  static getHtml(datas) {
    var html: any = '';
    datas.forEach(data => {
      let obj = ObjFactory.getObjDb(data.type);
      html = html + obj.declareHtml(data.key);
    });
    return html;
  }
}

abstract class AbstractDbClass
{
    // Force Extending class to define this method

}

class ObjFactory
{
	public static getObjDb(type){
		if(type == 'textfiled'){
			return new textfiled();
		}else if(type == 'textarea'){
      return new textfiled();
    }else if(type == 'checkbox-group'){
      return new textfiled();
    }
    return new textfiled();
	}
}
