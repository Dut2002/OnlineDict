import { Component } from "react";
import axios from 'axios';

export class BaseService extends Component {

    execute_get = async url => {
        return axios.get(url).then((res) => {
            return res;
        }).catch((err) => {
            console.error(err);
        });

    }

    execute_post = async (url, item) => {
        return axios.post(url, item).then((res) => {
            return res;
        }).catch((err) => {
            console.error(err);
        });
    }

    execute_delete = async (url, item) => {
        return axios.delete(url, item).then((res) => {
            return res;
        }).catch((err) => {
            console.error(err);
        });
    }

    uploadFile = async (url, file) => {
        var data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "fmsupload")
        return await axios.post(url, data).then((res) => {
            return res;
        }).catch((err) => {
            console.error(err);
        });
    }

    export = async (url, item) => {
        return await axios.request({ url, method: "POST", responseType: 'blob', data: item });
    }

    importFile = async (url, file) => {
        var data = new FormData();
        data.append("file", file);
        return await axios.post(url, data);
    }
}