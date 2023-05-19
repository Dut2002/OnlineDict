import {env} from '../common/Constants';
import { BaseService } from './BaseService';

export class DictionaryDetailService extends BaseService { 

    update = async (data) => {
        var url = env.path + '/api/dictionary-detail/update-detail';
        try {
            let res = await this.execute_post(url,data);
            return res;
        }
        catch (err) {
            console.error(err);
        }
    }

    get = async (id) => {
        var url = env.path + '/api/dictionary-detail/get?dictionaryId=' + id;
        try {
            let res = await this.execute_get(url);
            return res;
        }
        catch (err) {
            console.error(err);
        }
    }

    delete = async (id) => {
        var url = env.path + '/api/dictionary-detail/delete-word?id=' + id;
        try {
            let res = await this.execute_get(url);
            return res;
        }
        catch (err) {
            console.error(err);
        }
    }

    search = async (key) => {
        var url = env.path + '/api/dictionary/search?key=' + key;
        try {
            let res = await this.execute_get(url);
            return res;
        }
        catch (err) {
            console.error(err);
        }
    }

    deleteDict = async (key) => {
        var url = env.path + '/api/dictionary-detail/delete?id=' + key;
        try {
            let res = await this.execute_get(url);
            return res;
        }
        catch (err) {
            console.error(err);
        }
    }

    clone = async (id,user) => {
        var url = env.path + '/api/dictionary-detail/clone?id=' + id + '&user=' + user;
        try {
            let res = await this.execute_get(url);
            return res;
        }
        catch (err) {
            console.error(err);
        }
    }

    checkAccess = async (id,password) => {
        var url = env.path + '/api/dictionary-detail/access-dict?id=' + id + '&password=' + password;
        try {
            let res = await this.execute_get(url);
            return res;
        }
        catch (err) {
            console.error(err);
        }
    }

}