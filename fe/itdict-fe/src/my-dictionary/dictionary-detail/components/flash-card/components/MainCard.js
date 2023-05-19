import { Button, Card, Image } from "antd";
import editIC from '../../../../../image/icons8-edit-48.png';
import cloneIC from '../../../../../image/icons8-clone-figure-24.png';
import confIc from '../../../../../image/icons8-settings-50.png';
import deleteIc from '../../../../../image/icons8-trash-30.png';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { AppNotification } from "../../../../../common/AppNotification";
import { DictionaryDetailService } from "../../../../../services/DictionaryDetailService";
export default function MainCard(props) {
    const navigate = useNavigate();
    const [index, setIndex] = useState(0);
    const notify = new AppNotification();
    const service = new DictionaryDetailService();

    async function clone() {
        await service.clone(props?.dictData?.id,JSON.parse(localStorage.getItem('loginInfo'))?.username).then(res => {
            if (res && res.status === 200 && res?.data?.data) {
                notify.success("Clone successfully.");
                navigate("/detail", { state: { data: res?.data?.data } });
            }
            else {
                notify.error("Clone failed")
            }
        })
    }

    async function deleteDict() {
        await service.deleteDict(props?.dictData?.id).then(res => {
            if (res && res.status === 200 && res?.data?.status === 200) {
                notify.success("Delete successfully.");
                navigate("/myDict");
            }
            else {
                notify.error("Delete failed")
            }
        })
    }

    return (
        <>
            <Card style={{ height: 400 }}>
                <div style={{ textAlign: 'center' }}>
                    <Button
                        disabled={index - 1 < 0}
                        onClick={() => setIndex(index - 1)}
                    >{'<'}</Button>
                    <span style={{ marginLeft: 10, marginRight: 10 }}>{(index + 1) + ' / ' + (props?.list ? props?.list?.length : 0)}</span>
                    <Button
                        disabled={props?.list ? index + 1 > props.list.length - 1 : true}
                        onClick={() => setIndex(index + 1)}
                    >{'>'}</Button>
                </div>
                <div style={{ textAlign: 'center', marginTop: '20%', fontSize: '30px' }}>
                    {props?.list[index]?.keyword}
                </div>
            </Card>
            <div style={{ marginTop: 10, float: 'right' }}>
                <Button type="ghost" title="Edit words"
                    onClick={() => {
                        navigate("/editDict", { state: { data: props?.dictData } })
                    }}
                >
                    <Image src={editIC} preview={false} height={20} />
                </Button>
                <Button type="ghost" title="Clone dictionary">
                    <Image src={cloneIC} preview={false} height={20} onClick={() => clone()} />
                </Button>
                <Button type="ghost" title="Configuration" onClick={() => {
                    props?.handleConfig();
                }}>
                    <Image src={confIc} preview={false} height={20} />
                </Button>
                <Button type="ghost" title="Delete dictionary">
                    <Image src={deleteIc} preview={false} height={20} onClick={() => deleteDict()}/>
                </Button>
            </div>
        </>
    )
}