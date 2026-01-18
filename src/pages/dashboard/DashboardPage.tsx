import {StackedBar} from "./StackedBar";
import {GlobalStateKeys, useGlobalState, useLanguage} from "../../globalState";
import {useDashboardPage} from "../../../libs/FormCmsAdminSdk";

const languageConfig = {
    en: {
        header: "Dashboard",
    },
    cn: {
        header: "控制面板",
    }
};

export function DashboardPage() {
    const lan = useLanguage();
    const lanText = languageConfig[lan]
    const [_, setHeader] = useGlobalState<string>(GlobalStateKeys.Header, '');
    setHeader(lanText.header);
    const {pastDays, activities, dataActions, visits, pageData, pageNames} = useDashboardPage(6)
    console.log({activities})
    return <div className="grid">
        <div className="col-6 p-4">
            <StackedBar header={'Daily Visits'} xLabels={pastDays} yData={visits}/>
        </div>
        <div className="col-6 p-4">
            <StackedBar header={'Page Visits'} xLabels={pageNames} yData={pageData &&[pageData]}/>
        </div>
        <div className="col-6 p-4">
            <StackedBar header={'Social Activities'} xLabels={pastDays} yData={activities}/>
        </div>
        <div className="col-6 p-4">
            <StackedBar header={'Data Actions'} xLabels={pastDays} yData={dataActions}/>
        </div>
    </div>
}