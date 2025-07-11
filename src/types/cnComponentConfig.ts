import {ComponentConfig} from "../../libs/FormCmsAdminSdk";
import {getDefaultComponentConfig} from "../getDefaultComponentConfig";

export const cnComponentConfig: ComponentConfig = {
    ...getDefaultComponentConfig(),
    entityPermissionLabels:{
        readonlyEntities:'只读实体',
        restrictedReadonlyEntities:'受限只读实体',

        readWriteEntities:'读写实体',
        restrictedReadWriteEntities:'受限读写实体'
    },
    addPairLabel:'添加',
    confirmLabels:{
        accept:'确定',
        reject:'取消'
    },
    assetLabels: {
        progress:'进度',
        path: '路径',
        url: '链接',
        name: '名称',
        title: '标题',
        size: '大小',
        type: '类型',
        metadata: '元数据',
        createdBy: '创建者',
        createdAt: '创建时间',
        updatedAt: '更新时间',
        linkCount: '引用数量',
        links:'引用',
        id: '编号'
    },
    assetLinkLabels: {
        entityName:'实体名称',
        recordId:'记录编号',
        id:'编号',
        assetId:'资料编号',
        createdAt: '创建时间',
        updatedAt:'更新时间',
    },
    assetEditor: {
        dialogHeader: "编辑资料元数据",
        fileNameLabel: "文件名",
        fileSizeLabel: "大小",
        fileTypeLabel: "类型",
        saveButtonLabel: "保存",
        saveSuccessMessage: "保存成功"
    },
    assetSelector: {
        dialogHeader: "选择资料",
        galleryLabel: "预览",
        listLabel: "列表",
        okButtonLabel: "确定"
    },
    editTable: {
        cancelButtonLabel: "取消",
        saveButtonLabel: "保存",
        addButtonLabel: function (p1: string) {
            return `添加 ${p1}`;
        },
        dialogHeader: function (s: string) {
            return `添加${s}`;
        },
        submitSuccess: function (p1: string) {
            return `保存 ${p1}`;
        }
    },
    fileInputLabels: {choose: "选择", delete: "删除", edit: "编辑", upload: "上传"},

    picklist: {
        cancelButtonLabel: "取消",
        deleteButtonLabel: "删除",
        deleteConfirmationHeader: "确认",
        deleteConfirmationMessage: "确认删除",
        deleteSuccessMessage: "删除成功",
        dialogHeader: function (p1: string) {
            return "选择" + p1;
        },
        saveButtonLabel: "保存",
        saveSuccessMessage: "保存成功",
        selectButtonLabel: function (p1: string) {
            return "选择" + p1;
        }
    }
}