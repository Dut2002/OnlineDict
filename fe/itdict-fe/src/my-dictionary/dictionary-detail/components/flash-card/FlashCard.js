import ControlButton from "./components/ControlButton";
import MainCard from "./components/MainCard";

export default function FlashCard(props) {
    return (
        <>
            <div>
                <ControlButton />
            </div>
            <div style={{ marginTop: 10 }}>
                <MainCard
                    handleConfig={() => props?.handleConfig()}
                    dictData={props?.dictData}
                    list={props?.list}
                />
            </div>
        </>
    )
}