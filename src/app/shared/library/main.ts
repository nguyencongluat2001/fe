import notify from 'devextreme/ui/notify';
import { confirm } from 'devextreme/ui/dialog';

export class Library {

    constructor(
    ) {
    }

    /** 
     * message: Thông báo cần hiển thị
     * type: Success; error;
     * 
     */
    static notify(message, type, timeout = 3000, position = 'bottom center', offset = '0 0') {
        notify({
            position: { at: position, my: position, offset: offset },
            message: message
        }, type, timeout);
    }

    static confirm(message, header) {
        return confirm(message, header);
    }

    static showloading() {
        let html = '<div class="app-loading"><svg class="spinner" viewBox="25 25 50 50"><circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="4" stroke-miterlimit="10"/></svg></div>';
        // $("#app-loading").html(html);
    }

    static hideloading() {
        // $("#app-loading").html('');
    }

    static formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [day, month, year].join('/');
    }

    static checkMaxPointParrent(param, datas) {
        var _return = true;
        let parrent_id = param.parrent_id;
        let max_point: number;
        if (parrent_id) {
            // Lay tong diem con
            datas.forEach((data) => {
                if (data.parrent_id == parrent_id) {
                    if (data.max_point < 0) {
                        max_point = Math.abs(param.max_point)
                    } else {
                        max_point = param.max_point;
                        
                    }
                    max_point = max_point + Math.abs(data.max_point);
                }
            });
            // datas.forEach((data) => {
            //     if (data.id == parrent_id) {
            //         if (Math.abs(data.max_point) < max_point) {
            //             _return = false;
            //             return false;
            //         }
            //     }
            // });
        }
        return _return;
    }

    static checkMinPointParrent(param, datas) {
        var _return = true;
        let id = param.id;
        let max_point = 0;
        if (id) {
            // Lay tong diem con param.max_point
            datas.forEach((data) => {
                if (data.parrent_id == id) {
                    max_point = max_point + data.max_point;
                }
            });
            if (max_point < 0) {
                if (Math.abs(param.max_point) < Math.abs(param.max_point) ) {
                    _return = false;
                    return false;
                }
            } else {
                if (param.max_point < max_point) {
                    _return = false;
                    return false;
                }
            }

        }
        return _return;
    }

}
