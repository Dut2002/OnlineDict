import { Button, Divider, Image, Input, Select, Space } from "antd";
import { useState } from "react";
import AddIc from '../image/add-ic.png';
import { AppNotification } from "./AppNotification";
import { compare } from "./commonFunc";
import ConfirmPopUp from "./ConfirmPopUp";

export default function SelectAdd(props) {
    const [name, setName] = useState('');
    const notify = new AppNotification();
    const [removeDialog, setRemoveDialog] = useState();

    function handleAdd() {
        if (name) {
            if (name.trim().length === 0) {
                notify.error("Name is required", "Validate error");
            } else {
                props?.onAddItem(name);
            }
        } else {
            notify.error("Name is required", "Validate error");
        }
    }

    function openRemoveDialog(value) {
        var removeValue = compare(props?.options, value);
        if (removeValue !== "") {
            var dia = { ...removeDialog };
            dia.open = true;
            dia.content = "Are you sure to remove " + removeValue + " ?";
            dia.removeValue = removeValue;
            setRemoveDialog(dia);
        }
    }

    return (
        <>
            <Select
                mode='tags'
                value={props?.options ? props?.options : []}
                onChange={(value) => openRemoveDialog(value)}
                dropdownRender={(menu) => (
                    <>
                        {menu}
                        <Divider style={{ margin: '8px 0' }} />
                        <Space
                            style={{
                                padding: '0 8px 4px',
                            }}
                        >
                            <Input
                                placeholder={props?.placeholder}
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                style={{ width: 500 }}
                            />
                            <Button type="ghost" onClick={() => handleAdd()}>
                                <Image src={AddIc} preview={false} height={25} />
                            </Button>
                        </Space>
                    </>
                )}
            />
            <ConfirmPopUp
                {...removeDialog}
                handleCancel={() => {
                    var dia = { ...removeDialog };
                    dia.open = false;
                    dia.removeValue = '';
                    setRemoveDialog(dia);
                }}
                handleOK={() => {
                    var dia = {...removeDialog};
                    props?.onRemoveItem(dia.removeValue);
                    dia.open = false;
                    dia.removeValue = '';
                    setRemoveDialog(dia);
                }}
            />
        </>
    );

}