import { Modal } from "antd";

export default function ConfirmPopUp(props) {
    return (
        <>
            <Modal title="Confirm" 
            open={props?.open} 
            onOk={() => props?.handleOK()} 
            onCancel={() => props?.handleCancel()}
            >
                {props?.content}
            </Modal>
        </>
    );
}