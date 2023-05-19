import { env } from '../common/Constants';
import { BaseService } from './BaseService';

export class ContributionManagementService extends BaseService {
    getData = async (filter) => {
        var url = env.path + '/api/admin/contribution/search?currentPage=' + filter.currentPage + '&keyWord=' + filter.keyword + '&username='+filter.username;
        try {
            let res = await this.execute_get(url);
            return res;
        }
        catch (err) {
            alert(err);
        }
    }

    getTotal = async (filter) => {
        var url = env.path + '/api/admin/contribution/countTotal?keyWord=' + filter.keyword + '&username='+filter.username;
        try {
            let res = await this.execute_get(url);
            return res;
        }
        catch (err) {
            console.error(err);
        }
    }

    approve = async (data) => {
        var url = env.path + '/api/admin/contribution/approve';
        try {
            let res = await this.execute_post(url, data);
            return res;
        }
        catch (err) {
            console.error(err);
        }
    }

    reject = async (id,updatedBy) => {
        var url = env.path + '/api/admin/contribution/reject?id='+id+'&updatedBy='+updatedBy;
        try {
            let res = await this.execute_get(url);
            return res;
        }
        catch (err) {
            console.error(err);
        }
    }

    saveNotes = async (data) => {
        var url = env.path + '/api/admin/contribution/saveNotes';
        try {
            let res = await this.execute_post(url, data);
            return res;
        }
        catch (err) {
            console.error(err);
        }
    }

    delete = async (id) => {
        var url = env.path + '/api/admin/contribution/delete?id='+id;
        try {
            let res = await this.execute_get(url);
            return res;
        }
        catch (err) {
            console.error(err);
        }
    }

    list = async () => {
        var url = env.path + '/api/admin/contribution/get-list';
        try {
            let res = await this.execute_get(url);
            return res;
        }
        catch (err) {
            alert(err);
        }
    }

}
