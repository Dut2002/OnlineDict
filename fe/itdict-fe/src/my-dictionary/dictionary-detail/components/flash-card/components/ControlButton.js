import { Button, Row } from "antd";

export default function ControlButton() {
    return (
        <>
            <Row>
                <Button type="ghost"
                    style={{ background: '#fff', color: 'blue', width: 150, height: 50, borderRadius: 8, fontWeight: 'bold', marginRight: 20 }}
                >
                    Flash Card
                </Button>
                {/* <Button type="ghost"
                    style={{ background: '#fff', color: 'black', width: 150, height: 50, borderRadius: 8, marginRight: 20 }}
                >
                    eLearning
                </Button>
                <Button type="ghost"
                    style={{ background: '#fff', color: 'black', width: 150, height: 50, borderRadius: 8, marginRight: 20 }}
                >
                    Exam
                </Button> */}
            </Row>
        </>
    )
}