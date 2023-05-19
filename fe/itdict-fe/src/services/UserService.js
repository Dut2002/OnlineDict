import {env} from '../common/Constants';
import { BaseService } from './BaseService';

export class UserService extends BaseService { 
    forgot = async (data) => {
        var url = env.path + '/api/forgotPassword/forgot';
        try {
            let res = await this.execute_post(url, data);
            return res;
        }
        catch (err) {
            console.error(err);
        }
    }

    reset = async (data) => {
        var url = env.path + '/api/resetPassword/reset';
        try {
            let res = await this.execute_post(url, data);
            return res;
        }
        catch (err) {
            console.error(err);
        }
    }

    getUser = async (username) => {
        var url = env.path + '/api/updateProfile/getUser?username='+ username;
        try {
            let res = await this.execute_get(url);
            return res;
        }
        catch (err) {
            console.error(err);
        }
    }

    getAllJobs = async () => {
        var url = env.path + '/api/job/getAll';
        try {
            let res = await this.execute_get(url);
            return res;
        }
        catch (err) {
            console.error(err);
        }
    }

    update = async (data) => {
        var url = env.path + '/api/updateProfile/update';
        try {
            let res = await this.execute_post(url, data);
            return res;
        }
        catch (err) {
            console.error(err);
        }
    }
}