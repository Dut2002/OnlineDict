import {env} from '../common/Constants';
import { BaseService } from './BaseService';

export class FeedbackService extends BaseService { 

    sendFeedback = async (data) => {
        var url = env.path + '/api/feedback/send-feedback';
        try {
            let res = await this.execute_post(url,data);
            return res;
        }
        catch (err) {
            console.error(err);
        }
    }

    getReport = async () => {
        var url = env.path + '/api/feedback/get-report';
        try {
            let res = await this.execute_get(url);
            return res;
        }
        catch (err) {
            console.error(err);
        }
    }

    getFeedback = async (rate) => {
        var url = env.path + '/api/feedback/get-list?rate=' + rate;
        try {
            let res = await this.execute_get(url);
            return res;
        }
        catch (err) {
            console.error(err);
        }
    }



}