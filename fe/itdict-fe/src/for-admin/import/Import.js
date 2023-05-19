import { Button, Col, Radio, Row } from "antd";
import Dragger from "antd/es/upload/Dragger";
import { useState } from "react";
import { AppNotification } from "../../common/AppNotification";
import { validateImport } from "../../common/commonFunc";
import { CategoryService } from "../../services/CategoryService";
import { WordService } from "../../services/WordService";
import PreviewItem from "./components/PreviewItem";
// import { useState } from "react";

export default function Import() {
    const service = new WordService();
    const notify = new AppNotification();
    const [fileList, setFileList] = useState([]);
    const [categories, setCategories] = useState([]);

    const [data, setData] = useState([]);

    async function onDownloadTemplate() {
        var file = 'Template.xlsx';
        await service.download().then(res => {
            if (res) {
                const downloadUrl = window.URL.createObjectURL(res.data);
                const link = document.createElement('a');
                link.href = downloadUrl;
                link.setAttribute('download', file);
                document.body.appendChild(link);
                link.click();
                link.remove();
            }
        })
    }

    async function onImport(file) {
        // debugger;
        if (file.file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
            setFileList(file.fileList);
            var item = file.fileList[0].originFileObj;
            await service.importExcel(item).then(res => {
                if (res && res.status === 200) {
                    setData(res?.data?.list);
                    loadCate();
                } else {
                    setFileList([]);
                    notify.error("Incorect template, can't load data.");
                }
            });
        } else {
            // this.setState({ data: [], fileList: [file.file] });
        }
    }

    async function loadCate() {
        await new CategoryService().getAll().then(res => {
            if (res && res?.status === 200 && res?.data?.list) {
                var list = [];
                if (res?.data?.list) {
                    for (var it of res?.data?.list) {
                        list.push(it.name);
                    }
                }
                setCategories(list);
            }
        })
    }

    async function handleSyncData() {
        if (!validate()) {
            notify.error("Please check again, keyword and definition are required!");
            return;
        }
        var da = [...data];
        await service.saveImport(da).then(res => {
            if (res && res.status === 200 && res?.data?.status === 200) {
                setData([]);
                setFileList([]);
                notify.success("Sync data successfully!")
            } else {
                notify.error("Sync data failed!");
            }
        })
    }

    function validate() {
        var da = [...data];
        var valid = true;
        for (var d of da) {
            var vData = validateImport(d, ['keyword', 'defination']);
            if (!vData.isValid) {
                valid = false;
            }
            d = vData.data;
        }
        setData(da);
        return valid;
    }
    return (
        <>
            <div style={{ padding: '10px 30px' }}>
                <Dragger
                    name="file"
                    multiple={false}
                    beforeUpload={(file) => {
                        const isPNG = file.type !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
                        if (isPNG) {
                            notify.error("File is not a .xlsx file");
                        }
                        return isPNG;
                    }}
                    accept='.xlsx'
                    maxCount={1}
                    style={{ display: 'flex' }}
                    onChange={(file) => onImport(file)}
                    fileList={fileList}
                >
                    <p className="ant-upload-drag-icon">
                        Import from Excel
                    </p>
                </Dragger>
                <div style={{ marginTop: 10 }}>
                    <span style={{ fontStyle: 'italic' }}>
                        Note: System only access this template, download file Template. {<Button type="link" onClick={() => onDownloadTemplate()}>Download</Button>}
                    </span>
                </div>
                <div style={{ marginTop: 10 }}>
                    <span style={{ fontStyle: 'italic', color: 'blue' }}>
                        Preview
                    </span>
                    <div style={{ overflow: 'auto', height: 400 }}>
                        {
                            data.map((elm, i) => {
                                return <PreviewItem
                                    data={elm}
                                    index={i}
                                    categories={categories}
                                    onChange={(index, name, value) => {
                                        var list = [...data];
                                        list[index][name] = value;
                                        setData(list);
                                    }}
                                />
                            })
                        }
                    </div>
                </div>
                <div style={{ marginTop: 40 }}>
                    <Row>
                        {/* <Col span={1}><span style={{ fontWeight: 'bold' }}>Option</span></Col> */}

                        <Col span={19}>
                            {/* <Radio.Group value="1">
                                <Radio value="1">Only create new</Radio>
                                <Radio value="2">Create new and upgrade</Radio>
                            </Radio.Group> */}
                        </Col>
                        <Col span={4}>
                            <Button
                                type='ghost'
                                style={{ width: 100, borderRadius: 8, backgroundColor: '#032757', color: '#fff' }}
                                onClick={() => handleSyncData()}
                            >
                                Sync data
                            </Button>
                            <Button
                                type='ghost'
                                style={{ width: 100, borderRadius: 8, borderColor: '#EDE8E8', marginLeft: 8 }}
                            >
                                Cancel
                            </Button>
                        </Col>
                    </Row>
                </div>
            </div>
        </>
    )
}