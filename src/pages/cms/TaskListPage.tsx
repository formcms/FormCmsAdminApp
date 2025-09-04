import { Button } from "primereact/button";
import {GlobalStateKeys, useGlobalState, useLanguage, useLayout} from "../../globalState";
import { TaskListPageConfig, useTaskListPage, XEntity } from "../../../libs/FormCmsAdminSdk";
import { getDefaultComponentConfig } from "../../getDefaultComponentConfig";

// Centralized language configuration
const languageConfig = {
    en: {
        taskList: "Task list",
        addExportTask: "Add Export Task",
        addImportTask: "Add Import Task",
        addEmitMessageTask: "Emit Messages",
        importDemoData: "Import Demo Data"
    },
    cn: {
        taskList: "任务列表",
        addExportTask: "添加导出任务",
        addImportTask: "添加导入任务",
        importDemoData: "导入演示数据",
        addEmitMessageTask: "触发消息",
    }
};

// Chinese-specific page configuration
const cnPageConfig: TaskListPageConfig = {
    emitMsgDialogHeader: "触发消息",
    submitEmitMessageLabel: "提交",
    archiveSuccess: "归档成功",
    exportSuccess: "导出成功",
    importSuccess: "导入成功",
    uploadImportDialogHeader: "选择文件上传",
    taskLabels: {
        id: '编号',
        taskId: '任务编号',
        taskStatus: '状态',
        type: '类型',
        createdAt: '创建时间',
        createdBy: '创建人',
        progress: '进度',
        error: '错误',
        updatedAt: '更新时间'
    }
};

export function TaskListPage({ schema }: { schema: XEntity; baseRouter: string }) {
    const layout = useLayout();
    const lan = useLanguage();
    const {
        handleAddExportTask,
        handleAddImportTask,
        handleImportDemoData,
        handleAddEmitMessageTask,
        TaskListMain,
        CheckErrorStatus
    } = useTaskListPage(
        getDefaultComponentConfig(),
        schema,
        lan === 'en' ? undefined : cnPageConfig
    );

    const langTexts = languageConfig[lan === 'en' ? 'en' : 'cn'];
    const [_, setHeader] = useGlobalState<string>( GlobalStateKeys.Header, '');
    setHeader(langTexts.taskList);

    return (
        <>
            {layout !== 'sidebar' ? <h2>{langTexts.taskList}</h2> : <br />}
            <Button onClick={handleAddExportTask}>{langTexts.addExportTask}</Button>{' '}
            <Button onClick={handleAddImportTask}>{langTexts.addImportTask}</Button>{' '}
            <Button onClick={handleImportDemoData}>{langTexts.importDemoData}</Button>{' '}
            <Button onClick={handleAddEmitMessageTask}>{langTexts.addEmitMessageTask}</Button>
            <CheckErrorStatus />
            <TaskListMain />
        </>
    );
}