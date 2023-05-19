import { env } from '../common/Constants';
import { BaseService } from './BaseService';

export class UserManagementService extends BaseService {
    getData = async (filter) => {
        var url = env.path + '/api/admin/user/search?role=' + filter.role + '&username=' + filter.username;
        try {
            let res = await this.execute_get(url);
            return res;
        }
        catch (err) {
            console.error(err);
        }
    }

    getTotal = async (filter) => {
        var url = env.path + '/api/admin/user/countTotal?username=' + filter.username;
        try {
            let res = await this.execute_get(url);
            return res;
        }
        catch (err) {
            console.error(err);
        }
    }

    getRoles = async () => {
        var url = env.path + '/api/admin/user/getAllRole';
        try {
            let res = await this.execute_get(url);
            return res;
        }
        catch (err) {
            console.error(err);
        }
    }

    delete = async (username) => {
        var url = env.path + '/api/admin/user/delete?username=' + username;
        try {
            let res = await this.execute_get(url);
            return res;
        }
        catch (err) {
            console.error(err);
        }
    }

    save = async (user) => {
        var url = env.path + '/api/admin/user/save';
        try {
            let res = await this.execute_post(url, user);
            return res;
        }
        catch (err) {
            console.error(err);
        }
    }

    getPermission = async () => {
        var url = env.path + '/api/admin/user/getPermission';
        try {
            let res = await this.execute_get(url);
            return res;
        }
        catch (err) {
            console.error(err);
        }
    }

    changePermission = async (role, username) => {
        var url = env.path + '/api/admin/user/changePermission?role='+role + '&username=' + username;
        try {
            let res = await this.execute_get(url);
            return res;
        }
        catch (err) {
            console.error(err);
        }
    }
}
