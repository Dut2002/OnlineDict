import { env } from '../common/Constants';
import { BaseService } from './BaseService';

export class HomeService extends BaseService {
    init = async () => {
        var url = env.path + '/api/home/init';
        try {
            let res = await this.execute_get(url);
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

    getRelated = async (key) => {
        var url = env.path + '/api/word/getRelatedResult?id=' + key;
        try {
            let res = await this.execute_get(url);
            return res;
        }
        catch (err) {
            console.error(err);
        }
    }

    search = async (key) => {
        var url = env.path + '/api/word/search?keyword=' + key;
        try {
            let res = await this.execute_get(url);
            return res;
        }
        catch (err) {
            console.error(err);
        }
    }

    getReport = async () => {
        var url = env.path + '/api/home/get-report';
        try {
            let res = await this.execute_get(url);
            return res;
        }
        catch (err) {
            console.error(err);
        }
    }


}