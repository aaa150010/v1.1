<template>
  <div class="h-full">
    <a-table
      :dataSource="dataTree"
      :columns="columns"
      bordered
      style="margin-bottom: 8px"
      :pagination="false"
      :scroll="{ y: 800 }"
    >
      <template #bodyCell="{ column, text, record }">
        <template v-if="column.dataIndex == 'operation'">
          <span class="cursor-pointer text-blue-400" @click="openDetail(record)"
            >查看明细</span
          >
        </template>
      </template>
    </a-table>
    <a-modal
      v-model:open="detailDeptVisible"
      title="指标视图-明细"
      @ok="detailDeptOk"
      destroyOnClose
      style="width: 1000px"
    >
      <div class="flex justify-between">
        <div>责任部门：党委宣传部</div>
        <div>进展：8%</div>
      </div>
      <detailTable />
    </a-modal>
  </div>
</template>

<script setup>
import { onMounted, ref, defineProps, watch } from "vue";
import { getProjectTreeApi } from "@/api/taskManage.js";
import detailTable from "../components/detailTable.vue";
const props = defineProps(["selectRow"]);

let testArr1 = [];
let testArr2 = [];
let testArr3 = [];
let testPosition1 = 0;
let testPosition2 = 0;
let testPosition3 = 0;

const columns = ref([
  {
    title: "一级指标",
    align: "center",
    dataIndex: "grandfatherName",
    key: "grandfatherName",
    customCell: (_, index) => {
      const _row = testArr1[index];
      const _col = _row > 0 ? 1 : 0;
      return { rowSpan: _row, colSpan: _col };
    },
  },
  {
    title: "二级指标",
    align: "center",
    dataIndex: "parentName",
    key: "parentName",
    customCell: (_, index) => {
      const _row = testArr2[index];
      const _col = _row > 0 ? 1 : 0;
      return { rowSpan: _row, colSpan: _col };
    },
  },
  {
    title: "三级指标",
    align: "center",
    dataIndex: "taskName",
    key: "taskName",
    customCell: (_, index) => {
      const _row = testArr3[index];
      const _col = _row > 0 ? 1 : 0;
      return { rowSpan: _row, colSpan: _col };
    },
  },
  {
    title: "评分标准",
    dataIndex: "description",
    width: 500,
    key: "description",
  },
  {
    title: "得分",
    align: "center",
    dataIndex: "gradingScores",
    key: "gradingScores",
  },
  {
    title: "负责部门",
    align: "center",
    dataIndex: "deptName",
    key: "deptName",
  },
  {
    title: "操作",
    align: "center",
    dataIndex: "operation",
    key: "operation",
  },
]);

const dataTree = ref([
  {
    deptName: "党委宣传部（党委统战部）",
    targetId: "e0e199f4-b922-409e-9750-b7ed51c4e7d9",
    parentTaskId: "e33a96f5-abc4-41c0-bf16-94f2f6237df0",
    taskTargetNumber: "意识形态工作考核等",
    description:
      "（1）落实意识形态工作责任制考核得分（1分）：运用意识形态工作责任制落实考核结果。原始得分最高得1分，低于60分得0分，其他情况采用比率法计分。",
    targetNumber: "1",
    grandfatherName: "A.办学方向与依法治校 （ 15 分）",
    parentName: "A1.办学方向 （9分）",
    approveMessages: "暂无留言",
    superviseDept: "党委宣传部（党委统战部）",
    isAnnex: "0",
    taskName: "党委宣传部--R1.党对高校的全面领导落实情况",
    levelOfResponsibility: "null",
    id: "ab206f8a-c9b7-40dc-8fc9-109aa317577f",
    state: "0",
    gradingScores: "0",
    taskId: "0226c992-d2e2-4d92-a985-1760d58829e4",
  },
  {
    deptName: "党委办公室",
    targetId: "a98aab14-4839-478e-a059-d34e6605047e",
    parentTaskId: "e33a96f5-abc4-41c0-bf16-94f2f6237df0",
    taskTargetNumber: "意识形态工作考核等",
    description:
      "（2）基层党建工作项目得分（1分）：主要考核现有入选高校党建示范创建和质量创优等项目情况。入选国家级党建工作“示范高校”“标杆院系”“样板支部”计算权重分别为600%、300%、100%，入选省级党建工作“示范高校”“标杆院系”“样板支部”计算权重分别为300%、150%、50%，入选省级党建工作重大创新基地计算权重为200%。（3）其他指标得分（3分）：存在相关问题扣分处理。领导班子成员、其他党员干部和教职员工发生违法犯罪事件，每起分别扣0.5分、0.3分；发生违反师德师风、教风学风考风事件，出现酒驾醉驾事件，违规聘用在职或退休公职人员，违规聘任不具备教师资格的人员从教等从业禁止规定的人员，违规处分党员、教师等情况，每起扣0.5分；出现严重违反政治纪律和政治规矩，在重大原则问题上不同党中央保持一致，领导班子成员存在“七个有之”行为，发生违反师德师风、教风学风考风重大事件，该指标得0分",
    targetNumber: "4",
    grandfatherName: "A.办学方向与依法治校 （ 15 分）",
    parentName: "A1.办学方向 （9分）",
    approveMessages: "暂无留言",
    superviseDept: "党委办公室",
    isAnnex: "0",
    taskName: "党委办公室--R1.党对高校的全面领导落实情况",
    levelOfResponsibility: "null",
    id: "b4380735-2f16-469e-8089-92b658c3ea82",
    state: "0",
    gradingScores: "0",
    taskId: "90c2c88b-3708-44af-b5b1-6e9912bd1ce1",
  },
  {
    deptName: "党委宣传部（党委统战部）",
    targetId: "4c0593e2-f93d-4f5d-992a-e39f615fdfe5",
    parentTaskId: "e33a96f5-abc4-41c0-bf16-94f2f6237df0",
    taskTargetNumber: "高校思想政治工作质量测评",
    description:
      "立德树人根本任务落实情况（4分）：原始得分最高得4分，测评结果为D得0分，其他情况采用比率法计分。该指标得分=本校原始得分÷各校原始最高分×指标分数权重。",
    targetNumber: "4",
    grandfatherName: "A.办学方向与依法治校 （ 15 分）",
    parentName: "A1.办学方向 （9分）",
    approveMessages: "暂无留言",
    superviseDept: "党委宣传部（党委统战部）",
    isAnnex: "0",
    taskName: "R2.立德树人根本任务落实情况",
    levelOfResponsibility: "null",
    id: "2674c2f9-96bb-4f18-9759-abdd90011eff",
    state: "0",
    gradingScores: "0",
    taskId: "e4fe4692-e3f2-4b58-8b5b-93af9e7cb4bc",
  },
  {
    deptName: "院长办公室",
    targetId: "a5965247-273b-49d5-b43d-2774d335daeb",
    parentTaskId: "63bb2307-a3c2-4288-a1c4-2e6bd293eaef",
    taskTargetNumber: "舆情监督、信访投诉等",
    description:
      "依法治校落实情况（3分）：出现违反议事规则，“三重一大”决策机制执行不到位，违规异地办学、建设校区、校外办学，每起扣0.2分；存在违规有偿招生，违规组织招生、实习、校企合作、中外合作办学项目等情况，每起扣0.3分；出现毕业生去向落实统计、会计资料数据造假等事件，每起扣0.5分。",
    targetNumber: "3",
    grandfatherName: "A.办学方向与依法治校 （ 15 分）",
    parentName: "A2.依法治校 （6分）",
    approveMessages: "暂无留言",
    superviseDept: "院长办公室",
    isAnnex: "1",
    taskName: "R3.依法治校情况",
    levelOfResponsibility: "null",
    id: "a2e2e5cf-12e7-4c8a-b1ef-c232ae36855c",
    state: "1",
    gradingScores: "3",
    taskId: "e9f77f8e-698f-4fcb-9653-04b38f918d2a",
  },
  {
    deptName: "安全保卫处",
    targetId: "2e8f35da-ad02-4af6-a1b7-fc79fa4bb96c",
    parentTaskId: "63bb2307-a3c2-4288-a1c4-2e6bd293eaef",
    taskTargetNumber: "高校安全稳定考评",
    description:
      "平安校园建设（3分）：原始得分最高得3分，低于60分得0分，其他情况采用比率法计分。该指标得分=本校原始得分÷各校原始最高分×指标分数权重。",
    targetNumber: "3",
    grandfatherName: "A.办学方向与依法治校 （ 15 分）",
    parentName: "A2.依法治校 （6分）",
    approveMessages: "暂无留言",
    superviseDept: "安全保卫处",
    isAnnex: "1",
    taskName: "R4.平安校园建设情况",
    levelOfResponsibility: "null",
    id: "3ed527dd-d6ed-4b47-bc78-7fcc8fb1add8",
    state: "1",
    gradingScores: "3",
    taskId: "a2e63d67-0dc2-4b28-8caf-ca0e1308c62b",
  },
  {
    deptName: "资产管理处（招投标办公室）",
    targetId: "81773e33-d425-4ff3-ba53-acda0f92aba5",
    parentTaskId: "e9f2e1a7-63c8-4608-bd61-8bc388fde2d4",
    taskTargetNumber: "高校提交材料，省教育厅审核",
    description:
      "生均教学科研仪器设备值（3分）：达到“合格”标准得3分，低于“限制招生”标准得0分，“合格”与“限制招生”之间采用比率法计分。该指标得分=本校实际值÷合格标准值×指标分数权重。",
    targetNumber: "3",
    grandfatherName: "B.办学条件与资源 （31分）",
    parentName: "B1.硬件设施 （6分）",
    approveMessages: "暂无留言",
    superviseDept: "资产管理处（招投标办公室）",
    isAnnex: "1",
    taskName: "R5.生均教学科研仪器设备值",
    levelOfResponsibility: "null",
    id: "f59fc61e-f610-4877-abee-0cbbae4327b0",
    state: "1",
    gradingScores: "3",
    taskId: "25e87047-a2ed-4812-852a-e108b9253137",
  },
  {
    deptName: "总务处（基建处）",
    targetId: "a55cefee-7105-4acc-b210-602b23760d81",
    parentTaskId: "e9f2e1a7-63c8-4608-bd61-8bc388fde2d4",
    taskTargetNumber: "高校提交材料，省教育厅审核",
    description:
      "生均教学行政用房（3分）：达到“合格”标准得3分，低于“限制招生”标准得0分，“合格”和“限制招生”之间采用比率法计分。该指标得分=本校实际值÷合格标准值×指标分数权重。",
    targetNumber: "3",
    grandfatherName: "B.办学条件与资源 （31分）",
    parentName: "B1.硬件设施 （6分）",
    approveMessages: "暂无留言",
    superviseDept: "总务处（基建处）",
    isAnnex: "1",
    taskName: "R6.生均教学行政用房",
    levelOfResponsibility: "null",
    id: "8796b53f-874b-4eda-b751-2dbf25cbf735",
    state: "1",
    gradingScores: "3",
    taskId: "3fa80770-6fb5-47e6-8587-7059fa84ddb1",
  },
  {
    deptName: "财务审计处",
    targetId: "62c9a7e1-610e-4ea2-866d-74b94e2dacde",
    parentTaskId: "6c56deae-d4cb-4821-8311-3fdc386cfd07",
    taskTargetNumber: "高校提交材料，省教育厅审核",
    description:
      "生均财政拨款投入（2分）：学校当年专科层次学生的生均财政拨款达到12000元/人为“合格”，得2分，低于12000元/人采用比率法计分。该指标得分=本校实际值÷合格标准值×指标分数权重。",
    targetNumber: "2",
    grandfatherName: "B.办学条件与资源 （31分）",
    parentName: "B2.办学投入 （7分）",
    approveMessages: "暂无留言",
    superviseDept: "财务审计处",
    isAnnex: "1",
    taskName: "R7.生均财政拨款投入",
    levelOfResponsibility: "null",
    id: "dba5658a-5ecb-4c7b-970c-d1aa461e0279",
    state: "1",
    gradingScores: "2",
    taskId: "bdb4cf16-a2e8-4ac1-ace7-89d1dbda1a35",
  },
  {
    deptName: "财务审计处",
    targetId: "91c96461-1415-4054-8efb-5ee66bd2ca7a",
    parentTaskId: "6c56deae-d4cb-4821-8311-3fdc386cfd07",
    taskTargetNumber: "高校提交材料，省教育厅审核",
    description:
      "教学经费投入（3分）：考核学校当年教育教学投入占比情况。教学经费投入占比=（教学日常运行支出 +教学科研仪器设备采购值）/（生均财政拨款到款总额+按照核准收费标准实际收取的学费总额）。",
    targetNumber: "3",
    grandfatherName: "B.办学条件与资源 （31分）",
    parentName: "B2.办学投入 （7分）",
    approveMessages: "暂无留言",
    superviseDept: "财务审计处",
    isAnnex: "1",
    taskName: "R8.教学经费投入",
    levelOfResponsibility: "null",
    id: "07cf41fd-8972-4095-94b8-cb68d6926bbc",
    state: "1",
    gradingScores: "3",
    taskId: "9b00414c-1555-46b0-bc5d-2b8d6b58f813",
  },
  {
    deptName: "财务审计处",
    targetId: "220ae18e-30b4-4482-8ac3-2e9fcd8af8c1",
    parentTaskId: "6c56deae-d4cb-4821-8311-3fdc386cfd07",
    taskTargetNumber: "高校提交材料，省教育厅审核",
    description:
      "教师培养培训经费投入（2分）：主要考核当年用于教师培养培训经费投入占比情况。教师培养培训经费投入占比=用于教师培养培训经费/（生均财政拨款到款总额+按照核准收费标准实际收取的学费总额）。",
    targetNumber: "2",
    grandfatherName: "B.办学条件与资源 （31分）",
    parentName: "B2.办学投入 （7分）",
    approveMessages: "暂无留言",
    superviseDept: "财务审计处",
    isAnnex: "1",
    taskName: "R9.教师培养培训经费投入",
    levelOfResponsibility: "null",
    id: "e452fe99-61c6-4173-892e-ecd738bbd0b7",
    state: "1",
    gradingScores: "2",
    taskId: "5fcc6587-4db9-4626-8df1-a4a1727ffebb",
  },
  {
    deptName: "人事处（党委组织部）",
    targetId: "74e31807-3231-4c38-b136-271da414b9c3",
    parentTaskId: "24e4ba39-04e6-486f-9e4f-2d837353b8ae",
    taskTargetNumber: "高校提交材料，省教育厅审核",
    description:
      "生师比（3分）：达到“合格”标准得3分，低于“限制招生”标准得0分，“合格”与“限制招生”之间采用比率法计分。该指标得分=本校实际值 ÷合格标准值×指标分数权重。",
    targetNumber: "3",
    grandfatherName: "B.办学条件与资源 （31分）",
    parentName: "B3.师资队伍 （8分）",
    approveMessages: "暂无留言",
    superviseDept: "人事处（党委组织部）",
    isAnnex: "1",
    taskName: "R10.生师比",
    levelOfResponsibility: "null",
    id: "d8414907-1860-48e6-b7a3-7bbc3bd28829",
    state: "0",
    gradingScores: "0",
    taskId: "fb906004-8fc7-426d-b20e-ee643f9877ac",
  },
  {
    deptName: "人事处（党委组织部）",
    targetId: "4fbb0ce8-ed41-4cae-b195-c1eb2618dec8",
    parentTaskId: "24e4ba39-04e6-486f-9e4f-2d837353b8ae",
    taskTargetNumber: "高校提交材料，省教育厅审核",
    description:
      "师资结构（3分）： （1）“双师型”教师数占专业课教师比例（2分） ：占比高于60%为“合格”，得2分，占比低于30%“不合格”，得0分，其他情况采用比率法计分。该指标得分=本校实际值÷合格标准值×指标分数权重。 （2）具有研究生学位教师数占专任教师比例（1分 ）：达到“合格”标准得1分，低于“限制招生”标准得0分，“合格”与“限制招生”之间采用比率法计分。该指标得分=本校实际值÷合格标准值×指标分数权重。",
    targetNumber: "3",
    grandfatherName: "B.办学条件与资源 （31分）",
    parentName: "B3.师资队伍 （8分）",
    approveMessages: "暂无留言",
    superviseDept: "人事处（党委组织部）",
    isAnnex: "1",
    taskName: "R11.师资结构",
    levelOfResponsibility: "null",
    id: "146eca16-8adf-482a-8b09-263c71d8ee8c",
    state: "1",
    gradingScores: "3",
    taskId: "927fcd2c-e101-407b-a130-1c5b2bf58fa0",
  },
  {
    deptName: "人事处（党委组织部）",
    targetId: "aae4b616-1732-4567-87d9-74cabd93f283",
    parentTaskId: "24e4ba39-04e6-486f-9e4f-2d837353b8ae",
    taskTargetNumber: "高校提交材料，省教育厅审核",
    description:
      "高层次高技能人才数（2分）： 高层次人才及团队（2分）：学校现有三类、四类、五类人才分别折算300%、200%、150%，55周岁及以下具有高级职称的博士折算为100%。当年新增二类及以上人才该项得2分，三类至五类人才及团队如获多个称号，严格按照就高原则，只计分1次（含团队负责人），如团队负责人已办理退休手续 ，按照证书上团队成员名次递补1位进行认定。当年引进的博士，如获人才称号，可按人才称号、博士引进分别计分。",
    targetNumber: "2",
    grandfatherName: "B.办学条件与资源 （31分）",
    parentName: "B3.师资队伍 （8分）",
    approveMessages: "暂无留言",
    superviseDept: "人事处（党委组织部）",
    isAnnex: "1",
    taskName: "R12.高层次高技能人才及团队",
    levelOfResponsibility: "null",
    id: "1b13c664-b9fa-4d60-b5e0-7c29670268f8",
    state: "1",
    gradingScores: "2",
    taskId: "79cf39cf-4e89-4423-886a-17c938c219b0",
  },
  {
    deptName: "教务处（科研处）",
    targetId: "8dbb80a8-d3a8-4e86-922c-036ee3966c48",
    parentTaskId: "8b76d431-40d5-4edf-990a-9bc4696e6348",
    taskTargetNumber: "高校提交材料，省教育厅审核",
    description:
      "校企合作企业数（2分）：平均每专业3个及以上合作企业为“合格”，得2分，平均每专业低于1个合作企业为“不合格”，得0分，“不合格”与“合格”之间采用比率法计分。规上合作企业计算权重为100%，其它用人单位企业计算权重为50%。该指标得分=本校实际值÷合格标准值×指标分数权重。",
    targetNumber: "2",
    grandfatherName: "B.办学条件与资源 （31分）",
    parentName: "B4.实习实训资源（7分）",
    approveMessages: "暂无留言",
    superviseDept: "教务处（科研处）",
    isAnnex: "1",
    taskName: "R13.校企合作企业数",
    levelOfResponsibility: "null",
    id: "a5546e80-2123-4e1c-97d4-13d135096d26",
    state: "1",
    gradingScores: "2",
    taskId: "800fffb2-f1b2-4df1-a4ef-62b5cef74576",
  },
  {
    deptName: "教务处（科研处）",
    targetId: "9353218f-ed17-4290-8e21-86325c281835",
    parentTaskId: "8b76d431-40d5-4edf-990a-9bc4696e6348",
    taskTargetNumber: "高校提交材料，省教育厅审核",
    description:
      "校外实习基地数（3分）：校外实习基地总数除以专业总数。平均每专业2个及以上校外实习基地为“合格”，得3分，平均每专业低于1个校外实习基地为0分，“不合格”与“合格”之间采用比率法计分 。该指标得分=本校实际值÷合格标准值×指标分数权重。",
    targetNumber: "3",
    grandfatherName: "B.办学条件与资源 （31分）",
    parentName: "B4.实习实训资源（7分）",
    approveMessages: "暂无留言",
    superviseDept: "教务处（科研处）",
    isAnnex: "1",
    taskName: "R14.校外实习基地数",
    levelOfResponsibility: "null",
    id: "868a1c8b-51a0-4fce-a5a6-4347e2aa3634",
    state: "1",
    gradingScores: "3",
    taskId: "5b8cb7a0-5d2d-4b40-bcf1-d7953905ac41",
  },
  {
    deptName: "教务处（科研处）",
    targetId: "09b7c08c-c2a9-44e5-9842-02e3c746a0b6",
    parentTaskId: "8b76d431-40d5-4edf-990a-9bc4696e6348",
    taskTargetNumber: "高校提交材料，省教育厅审核",
    description:
      "示范性虚拟仿真实训基地数（2分）：获批国家级虚拟仿真实训基地得2分，入选省级（含推荐到国家评审项目）得1分，同一基地以最高级别计算，不重复计算。",
    targetNumber: "3",
    grandfatherName: "B.办学条件与资源 （31分）",
    parentName: "B4.实习实训资源（7分）",
    approveMessages: "暂无留言",
    superviseDept: "教务处（科研处）",
    isAnnex: "1",
    taskName: "R15.示范性虚拟仿真实训基 地数",
    levelOfResponsibility: "null",
    id: "513f84c0-4bfc-44e9-9905-00136da82db5",
    state: "1",
    gradingScores: "1",
    taskId: "66853a69-a758-47bc-9a75-734600e53856",
  },
  {
    deptName: "图书信息中心",
    targetId: "0e1f753e-01b5-4a75-bf41-2c73ca7e06be",
    parentTaskId: "7faadc6b-03da-4ba5-9874-66bf2b9c2dcd",
    taskTargetNumber: "高校提交材料，省教育厅审核",
    description:
      "数字校园建设（1分）：获批教育部职业院校数字校园试点校建设单位、职业教育信息化标杆校建设单位得1分，获批省级数字校园试点校或信息化标杆校 （含推荐到国家评审项目）得0.5分。",
    targetNumber: "1",
    grandfatherName: "B.办学条件与资源 （31分）",
    parentName: "B5.数字化资源（3分）",
    approveMessages: "暂无留言",
    superviseDept: "图书信息中心",
    isAnnex: "1",
    taskName: "R16.数字校园建设",
    levelOfResponsibility: "null",
    id: "4f13074b-152e-4f77-ae38-beae9ca03ac6",
    state: "1",
    gradingScores: "1",
    taskId: "3e7ede06-fa81-4b40-9766-e6c043050456",
  },
  {
    deptName: "质量管理办公室（教学督导处）",
    targetId: "aa077f01-7f47-49b9-a497-5e1ee73753c4",
    parentTaskId: "7faadc6b-03da-4ba5-9874-66bf2b9c2dcd",
    taskTargetNumber: "高校提交材料，省教育厅审核",
    description:
      "教学诊断与改进（2分）：建立内部质量保证体系诊改平台得1分。平台运行良好，“学校”“专业”“课程”“教师”“学生”五个维度每达成一个维度 目标得0.2分。",
    targetNumber: "2",
    grandfatherName: "B.办学条件与资源 （31分）",
    parentName: "B5.数字化资源（3分）",
    approveMessages: "暂无留言",
    superviseDept: "质量管理办公室（教学督导处）",
    isAnnex: "0",
    taskName: "R17.教学诊断与改进",
    levelOfResponsibility: "null",
    id: "a1906c63-e47b-4743-aac1-21d9f32fb5dc",
    state: "0",
    gradingScores: "0",
    taskId: "026e2b7c-d72d-4e1f-a220-755a5f5e322c",
  },
  {
    deptName: "教务处（科研处）",
    targetId: "3093aa5f-4038-4457-b5a8-7cb8b074d399",
    parentTaskId: "30c60250-ba38-4e26-a435-1525169b0da4",
    taskTargetNumber: "高 校 提 交材料， 省 教 育 厅审核",
    description:
      "围绕“1269”行动计划省级重点产业链相关专业及招生数（2分）： （1）开设重点产业链相关专业数占比（2分）：学校当年服务重点产业链专业数占学校开设专业总数的比值。综合、工科、农、林、医类院校服务重点产业链专业开设占比不低于40%为“合格”，得2分，师范、财经类院校开设占比不低于10%为“合格”，得2分，其他情况采取比率法计分；",
    targetNumber: "2",
    grandfatherName: "C.办学质量与水平 （36分）",
    parentName: "C1.专业建设 （20分）",
    approveMessages: "暂无留言",
    superviseDept: "教务处（科研处）",
    isAnnex: "1",
    taskName: "教务处--R18.围绕“1269” 行动计划省级重点产业链相关专业及招生数",
    levelOfResponsibility: "null",
    id: "eab86d76-eda4-4ca1-8ff5-f6805688ce17",
    state: "0",
    gradingScores: "0",
    taskId: "6a1fadd5-a438-4f6b-95de-d2146c024946",
  },
  {
    deptName: "招生就业处（创新创业中心）",
    targetId: "01ecf4fe-51e2-4e68-a47a-c56ba76176bd",
    parentTaskId: "30c60250-ba38-4e26-a435-1525169b0da4",
    taskTargetNumber: "高校提交材料， 省教育厅审核",
    description:
      "围绕“1269”行动计划省级重点产业链相关专业及招生数（2分）： （2）开设重点产业链相关专业招生人数占比（2分） ：学校当年服务重点产业链相关专业全日制招生人数占学校全日制招生总人数的比值。综合、工科、农、林、医类院校服务重点产业链专业招生人数占比不低于40%为“合格”，得2分，师范、财经类院校重点专业招生人数占比不低于10%为“合格”，得2分 ，其他情况采取比率法计分。急需紧缺A档专业招生人数计算权重为300%，B档专业计算权重为200%，C档专业计算权重为100%。D档、E档专业不计数。",
    targetNumber: "2",
    grandfatherName: "C.办学质量与水平 （36分）",
    parentName: "C1.专业建设 （20分）",
    approveMessages: "暂无留言",
    superviseDept: "招生就业处（创新创业中心）",
    isAnnex: "1",
    taskName:
      "招生就业处--R18.围绕“1269” 行动计划省级重点产业链相关专业及招生数",
    levelOfResponsibility: "null",
    id: "82b9b803-df6f-463e-a672-f6a408b05641",
    state: "1",
    gradingScores: "2",
    taskId: "32d59737-8e9d-45d1-b820-e18bc6573c81",
  },
  {
    deptName: "教务处（科研处）",
    targetId: "7a768387-8974-4d6a-a514-3c9583b5f363",
    parentTaskId: "30c60250-ba38-4e26-a435-1525169b0da4",
    taskTargetNumber: "高校提交材料，省教育厅审核",
    description:
      "专业（群）建设水平（4分）：获批一个国家级高水平专业（群）得4分，获批一个省级高水平专业（群 ）得1分，可累计计算，同一专业（群）按最高级别计算，不重复计算。资金投入及建设任务未按照专业（群）建设方案进度如期完成者，此项不得分。",
    targetNumber: "4",
    grandfatherName: "C.办学质量与水平 （36分）",
    parentName: "C1.专业建设 （20分）",
    approveMessages: "暂无留言",
    superviseDept: "教务处（科研处）",
    isAnnex: "1",
    taskName: "教务处--R19.专 业（群）建设水平",
    levelOfResponsibility: "null",
    id: "55cca5a3-7410-49b3-b6a8-46f49154dfcc",
    state: "1",
    gradingScores: "2",
    taskId: "b47fe9d6-9f74-4490-8aa3-884f2e6ebc44",
  },
  {
    deptName: "教务处（科研处）",
    targetId: "ab9e9581-f161-49c8-9d25-6fbca50406ce",
    parentTaskId: "30c60250-ba38-4e26-a435-1525169b0da4",
    taskTargetNumber: "高校提交材料，省教育厅审核",
    description:
      "精品（核心）课程数（2分）：现有精品（核心）课程累计数，入选国家级的折算为300%，入选省级的为100%，同一课程按最高级别计算，不重复计算 。",
    targetNumber: "2",
    grandfatherName: "C.办学质量与水平 （36分）",
    parentName: "C1.专业建设 （20分）",
    approveMessages: "暂无留言",
    superviseDept: "教务处（科研处）",
    isAnnex: "1",
    taskName: "教务处--R20.精 品（核心）课程数",
    levelOfResponsibility: "null",
    id: "3ca8f0f0-a3b5-497b-8576-6c59d878e72f",
    state: "1",
    gradingScores: "2",
    taskId: "c18277f9-4d36-487b-82fa-30a0a79910cb",
  },
  {
    deptName: "教务处（科研处）",
    targetId: "7146467d-2d57-4cf9-89e3-927d4a028734",
    parentTaskId: "30c60250-ba38-4e26-a435-1525169b0da4",
    taskTargetNumber: "高校提交材料，省教育厅审核",
    description:
      "教材建设水平（1分）：“十四五”期间国家级、省级规划教材、获奖教材累计数。教材建设获奖等级分为特等奖、一等奖、二等奖。学校人员在所获奖励中的排名情况一并折合计分。省部级及以上获奖教材数折算方法：国家级特等奖为400%，一等奖为300%，二等奖为200%，省级特等奖150%，一等奖为 100%，二等奖为50%，省级其他等级不予统计。第一排名为100%计算分数，第二排名为50%计算分数，第三排名为30%计算分数，其他排名不予统计。国家级教材建设奖先进个人、先进集体计算权重等同国家级教材建设一等奖。国家级规划教材等同于省级一等奖。各类奖项不重复计算。",
    targetNumber: "1",
    grandfatherName: "C.办学质量与水平 （36分）",
    parentName: "C1.专业建设 （20分）",
    approveMessages: "暂无留言",
    superviseDept: "教务处（科研处）",
    isAnnex: "1",
    taskName: "教务处--R21.教 材建设水平",
    levelOfResponsibility: "null",
    id: "3e5986e8-0ed6-4c39-8820-858378bdcf84",
    state: "0",
    gradingScores: "0",
    taskId: "4a1e236b-03f1-473c-8972-35e1af88e26b",
  },
  {
    deptName: "教务处（科研处）",
    targetId: "9d9ac0d0-8891-424e-8b53-575d2e06e160",
    parentTaskId: "30c60250-ba38-4e26-a435-1525169b0da4",
    taskTargetNumber: "高校提交材料，省教育厅审核",
    description:
      "教学资源库建设水平（2分）：现有国家级、省级教学资源库累计数，国家级立项的专业教学资源库折算为300%，国家级立项的专业教育资源库子项目为200%，，省级立项为100%，第一主持折算为100%，第二主持为80%，第三主持为50%，同一专业教学资源库以最高级别计算，不重复计算。",
    targetNumber: "2",
    grandfatherName: "C.办学质量与水平 （36分）",
    parentName: "C1.专业建设 （20分）",
    approveMessages: "暂无留言",
    superviseDept: "教务处（科研处）",
    isAnnex: "1",
    taskName: "教务处--R22.教 学资源库建设水平",
    levelOfResponsibility: "null",
    id: "7bdb7896-ede5-4439-b63e-7e88c97ff993",
    state: "1",
    gradingScores: "2",
    taskId: "a4747dbb-330c-4373-9533-c5f4b9a2b0e1",
  },
  {
    deptName: "教务处（科研处）",
    targetId: "bae6b099-0c85-4b72-b0ce-5a39e2c34567",
    parentTaskId: "30c60250-ba38-4e26-a435-1525169b0da4",
    taskTargetNumber: "高校提交材料，省教育厅审核",
    description:
      "师生竞赛获奖数（4分）：当年学生参加国际级赛事获奖计算权重从最高等级起分别为700%、600%、500%，国家级赛事获奖计算权重从最高等级起分别为400%、300%、200%，职业院校技能大赛获奖最高等级计算权重为150%，其他省级赛事获奖最高等级计算权重为100%，除此之外其他等级不予统计。教师组获奖在此基础上计算权重增加200%，师生同赛获奖增加150%。同一项目按最高获奖计算，不重复累加。",
    targetNumber: "4",
    grandfatherName: "C.办学质量与水平 （36分）",
    parentName: "C1.专业建设 （20分）",
    approveMessages: "暂无留言",
    superviseDept: "教务处（科研处）",
    isAnnex: "1",
    taskName: "教务处--R23.师 生竞赛获奖数",
    levelOfResponsibility: "null",
    id: "8b9d3627-5078-48d1-817e-0e17ff3c2e5a",
    state: "1",
    gradingScores: "4",
    taskId: "41e26efe-195e-43d4-b50b-bbe3dd296b0b",
  },
  {
    deptName: "教务处（科研处）",
    targetId: "627f7ad9-5f8c-4b38-9af3-0976778fa300",
    parentTaskId: "30c60250-ba38-4e26-a435-1525169b0da4",
    taskTargetNumber: "高校提交材料，省教育厅审核",
    description:
      "教学成果奖获奖数（3分）：当年主持国家级教学成果奖计算权重从最高等级起分别为600%、500% 、400%，主持省级教学成果奖计算权重从最高等级起分别为300%、200%、100%，参与国家级教学成果奖计算权重从最高等级起分别为300%、200% 、100%，参与指的是排名前三。",
    targetNumber: "3",
    grandfatherName: "C.办学质量与水平 （36分）",
    parentName: "C1.专业建设 （20分）",
    approveMessages: "暂无留言",
    superviseDept: "教务处（科研处）",
    isAnnex: "1",
    taskName: "教务处--R24.教 学成果奖获奖数",
    levelOfResponsibility: "null",
    id: "4515dc8f-de20-4561-8d5f-a64f071ca620",
    state: "1",
    gradingScores: "3",
    taskId: "7d32e06f-18be-42c3-a877-17b236f534be",
  },
  {
    deptName: "教务处（科研处）",
    targetId: "68fe3c2d-037f-4ef3-831b-385a56bcb4b5",
    parentTaskId: "4a65d29d-cabc-4ee7-82ad-10fc9c94c0f2",
    taskTargetNumber: "高校提交材料，省教育厅审核",
    description:
      "市域产教联合体、行业产教融合共同体、产教融合实践中心、现场工程师产业学院，引进优质高校、头部企业合作情况（5分）：可累计计算，得分最高不超过5分。学校现有牵头建设国家级项目，每个得3分；牵头建设省级（含推荐到国家评审）项目 ，每个得2分。参与我省校校、校企合作签约项目每个占1分，按照签约项目任务清单完成率赋分。",
    targetNumber: "5",
    grandfatherName: "C.办学质量与水平 （36分）",
    parentName: "C2.社会服务 （12分）",
    approveMessages: "暂无留言",
    superviseDept: "教务处（科研处）",
    isAnnex: "1",
    taskName:
      "教务处--R25.市 域产教联合体、行业产教融合共同体、产教融合实践中心、现场工程师产业学院建设数,以及引进优质高校、头部企业合作情况",
    levelOfResponsibility: "null",
    id: "d24cb20c-4af1-4f9d-91ef-fd07acd2afe0",
    state: "1",
    gradingScores: "4",
    taskId: "d27ce67d-1f79-4406-aff7-4d4975674ea5",
  },
  {
    deptName: "教务处（科研处）",
    targetId: "9cc0812e-f2db-4071-91ba-cd87ee25b394",
    parentTaskId: "4a65d29d-cabc-4ee7-82ad-10fc9c94c0f2",
    taskTargetNumber: "高校提交材料，省教育厅审核",
    description:
      "校企合作典型生产实践项目数（2分）：学校现有获批国家级校企合作典型生产实践项目得2分，获批省级（含推荐到国家评审项目）得1分，同一项目不可重复计算。",
    targetNumber: "2",
    grandfatherName: "C.办学质量与水平 （36分）",
    parentName: "C2.社会服务 （12分）",
    approveMessages: "暂无留言",
    superviseDept: "教务处（科研处）",
    isAnnex: "1",
    taskName: "教务处--R26.校 企合作典型生产实践项目数",
    levelOfResponsibility: "null",
    id: "6581c5ed-2f7a-4c9b-a689-8d82ef281bb3",
    state: "1",
    gradingScores: "0",
    taskId: "ed7be990-1b11-4ded-b5b7-b893da405ff9",
  },
  {
    deptName: "教务处（科研处）",
    targetId: "fa4ff6b3-28db-43f9-bbab-6bcdad5b6189",
    parentTaskId: "4a65d29d-cabc-4ee7-82ad-10fc9c94c0f2",
    taskTargetNumber: "高校提交材料，省教育厅审核",
    description:
      "科研与社会服务（3分）： （1）纵向科研项目数（1分）：当年获纵向科研项目数量，包括省重大科技研发专项、省重点研发计划项目、省“揭榜挂帅”项目、省产业关键共性技术攻关专项，省社科规划、教育科学规划 、自然科学基金等，省部级计算权重为200%，地厅级项目计算权重为100%。 （2）校企合作净收入（2分）：当年校企合作净收入，师范、财经、政法院校计算权重为300%；综合、工科、农、林、医学院校计算权重为100% ；体育、艺术院校不做硬性要求，此项取各校平均分。",
    targetNumber: "3",
    grandfatherName: "C.办学质量与水平 （36分）",
    parentName: "C2.社会服务 （12分）",
    approveMessages: "暂无留言",
    superviseDept: "教务处（科研处）",
    isAnnex: "1",
    taskName: "教务处--R27.科 研与社会服务",
    levelOfResponsibility: "null",
    id: "0af7c280-bbc6-4740-beba-c7a4ce592050",
    state: "1",
    gradingScores: "3",
    taskId: "078c7e3a-a7c3-452e-9e46-0cc0236a4f66",
  },
  {
    deptName: "继续教育中心",
    targetId: "0944b7c9-e834-4857-a638-d95c8977c589",
    parentTaskId: "4a65d29d-cabc-4ee7-82ad-10fc9c94c0f2",
    taskTargetNumber: "高校提交材料，省教育厅审核",
    description:
      "社会责任与公益性服务（2分）： （1）社会培训（1分）：学校当年开展社会培训人次与在校生人数的占比。社会培训应与学校开设专业相匹配。（2）社区（老年）教育（1分）：学校当年参与“学习型社会建设重点任务”“终身学习品牌”“社区教育示范基地”“老年大学示范校”等项目，以及乡村振兴相关品牌建设项目数量（不包含人员获得荣誉），获批国家级项目每项得1分，省级项目每项得0.5分。",
    targetNumber: "2",
    grandfatherName: "C.办学质量与水平 （36分）",
    parentName: "C2.社会服务 （12分）",
    approveMessages: "暂无留言",
    superviseDept: "继续教育中心",
    isAnnex: "1",
    taskName: "继续教育中心--R28.社 会责任与公益性服务",
    levelOfResponsibility: "null",
    id: "97da1c48-45f5-4ef9-aa15-9ce2609005d0",
    state: "1",
    gradingScores: "2",
    taskId: "0e1f0e27-1602-4336-a6b8-823f5c97a224",
  },
  {
    deptName: "教务处（科研处）",
    targetId: "27c3c775-2f38-4f40-8390-96502489a104",
    parentTaskId: "41bc6c8b-6615-4cd5-8ed9-e264d35f9f12",
    taskTargetNumber: "高校提交材料，省教育厅审核",
    description:
      "分类招生考试职业技能测试开展情况（2分）：学校当年开展分类招生考试职业技能测试的专业大类数量占学校开设专业大类总数量比例。",
    targetNumber: "2",
    grandfatherName: "C.办学质量与水平 （36分）",
    parentName: "C3.创新成果 （4分）",
    approveMessages: "暂无留言",
    superviseDept: "教务处（科研处）",
    isAnnex: "1",
    taskName: "教务处--R30.分 类招生考试职业技能测试开展情况",
    levelOfResponsibility: "null",
    id: "a2ebdcde-e479-49fe-8610-d4cb1a3f0054",
    state: "1",
    gradingScores: "2",
    taskId: "8f665d3f-feb7-43b7-9f2b-138754e3c43f",
  },
  {
    deptName: "招生就业处（创新创业中心）",
    targetId: "0ce1abb8-9611-4c7f-982b-ad1d88c21633",
    parentTaskId: "41bc6c8b-6615-4cd5-8ed9-e264d35f9f12",
    taskTargetNumber: "高校提交材料，省教育厅审核",
    description:
      "长学制学生培养情况（2分）：学校当年五年一贯制和3+2分段培养项目的转段数占学校专科层次招生总数的比例。五年一贯制项目中，当年转段进入高职教育阶段的学生数按照150%权重进行折算；3+2分段培养项目中，当年转段进入高职教育阶段的学生数按照100%权重进行折算。",
    targetNumber: "2",
    grandfatherName: "C.办学质量与水平 （36分）",
    parentName: "C3.创新成果 （4分）",
    approveMessages: "暂无留言",
    superviseDept: "招生就业处（创新创业中心）",
    isAnnex: "1",
    taskName: "招生就业处--R29.长 学制学生培养情况",
    levelOfResponsibility: "null",
    id: "c115675d-e759-43db-8238-8a184eaeae93",
    state: "1",
    gradingScores: "2",
    taskId: "abbdbf28-f8bf-4477-b0d3-8c33e56087fd",
  },
  {
    deptName: "人事处（党委组织部）",
    targetId: "9e2eee1b-d4c4-4724-8b5f-656e87d33811",
    parentTaskId: "ab1960b4-08a8-42a5-a59e-202a2ca87539",
    taskTargetNumber: "高校提交材料，省教育厅审核",
    description:
      "教师荣誉（1分）：全国教书育人楷模、全国最美教师计算权重为400%，全国模范教师、全国教育系统先进工作者、全国优秀教师计算权重为300%，教育部、人社部开展的其他推选展示活动 （不含提名、入围）、省模范教师、省教育系统先进工作者计算权重为200%，省教育厅、人社厅开展的其他推选展示活动（不含提名、入围 ）计算权重为100%。所有荣誉就高不就低，不重复计算；同一人获得的同类荣誉，只计最高 等次。",
    targetNumber: "1",
    grandfatherName: "D.办学声誉与特色 （18分）",
    parentName: "D1.办学声誉 （5分）",
    approveMessages: "暂无留言",
    superviseDept: "人事处（党委组织部）",
    isAnnex: "0",
    taskName: "人事处--R31.教 师荣誉",
    levelOfResponsibility: "null",
    id: "2948ec59-a594-4c6f-9c17-586f0f31d8b0",
    state: "0",
    gradingScores: "0",
    taskId: "2b7dfa66-2a74-47e0-9527-39a7b349c633",
  },
  {
    deptName: "党委宣传部（党委统战部）",
    targetId: "bb670880-d5d0-4f03-b1ce-1ab49d1b6b49",
    parentTaskId: "ab1960b4-08a8-42a5-a59e-202a2ca87539",
    taskTargetNumber: "高校提交材料，省教育厅审核",
    description:
      "社会影响力（0.6分）：被国家级主流新闻媒体正面报道计算权重为300%，被省级主流新闻媒体正面报道计算权重为150%，各中央新闻单位驻江西机构视为省级新闻单位。在全国性教育相关会议上做经验交流发言计算权重为100%，在全省性教育相关会议上做经验交流发言计算权重为50%（仅限以各级政府及组成部门名 义召开的会议）。",
    targetNumber: "0.6",
    grandfatherName: "D.办学声誉与特色 （18分）",
    parentName: "D1.办学声誉 （5分）",
    approveMessages: "暂无留言",
    superviseDept: "党委宣传部（党委统战部）",
    isAnnex: "1",
    taskName: "党委宣传部--R32.社 会影响力",
    levelOfResponsibility: "null",
    id: "1134e032-fad2-4520-88df-95dd86d9ca18",
    state: "1",
    gradingScores: "0.6",
    taskId: "47fe7503-868a-4734-ab1e-390ffcbe7e8b",
  },
  {
    deptName: "招生就业处（创新创业中心）",
    targetId: "508ad489-f639-4f35-ac06-433bfa9f5cc5",
    parentTaskId: "ab1960b4-08a8-42a5-a59e-202a2ca87539",
    taskTargetNumber: "高校提交材料，省教育厅审核",
    description:
      "毕业生就业与发展（3分）： 毕业生去向落实率（2分）：指2023届全日制高职专科毕业生初次毕业去向落实率，全省高职专科平均值为83.84%。其中去向落实率不低于全省平均得2分，低于全省平均5个百分点以内得 1.8分，低于5至10个百分点的学校得1.6分，低于10个百分点以上得1.2分。省教育厅委托第三方核查以及根据学生举报核实毕业生去向落实率统计真实性的情况，每核实一起扣 0.2分，扣完1分即止。 访企拓岗数量及成效（0.5分）：访企拓岗数量及成效得分排名第1得0.5分，访企不足100家得0分，其他采用比率法计分。该指标得分=本校访企拓岗数量及成效得分÷同类高校访企拓岗数量及成效最高分×该指标分值权重。 举办校园招聘会场次（0.5分）：举办校园招聘会场次数排名第1得0.5分，其他采用比率法计分，该指标得分=本校举办校园招聘会次数÷同类高校举办校园招聘会次数最高值×该指标分值权重。",
    targetNumber: "3",
    grandfatherName: "D.办学声誉与特色 （18分）",
    parentName: "D1.办学声誉 （5分）",
    approveMessages: "暂无留言",
    superviseDept: "招生就业处（创新创业中心）",
    isAnnex: "1",
    taskName: "招生就业处--R33.毕 业生就业与发展",
    levelOfResponsibility: "null",
    id: "c205e24b-c5d9-46ec-8464-320d75f8528a",
    state: "1",
    gradingScores: "3",
    taskId: "e154c407-fefb-4ccd-be5f-fc7a6b8f4657",
  },
  {
    deptName: "院长办公室",
    targetId: "ea0a1a43-e762-4393-af93-d7744346fe81",
    parentTaskId: "ab1960b4-08a8-42a5-a59e-202a2ca87539",
    taskTargetNumber: "高校提交材料，省教育厅审核",
    description:
      "社会影响力（0.4分）：获教育部各类关于学校荣誉的综合评选（不含提名、入围）计算权重为300%，获省教育厅各类关于学校荣誉的综合评选 （不含提名、入围）计算权重为100%。",
    targetNumber: "0.4",
    grandfatherName: "D.办学声誉与特色 （18分）",
    parentName: "D1.办学声誉 （5分）",
    approveMessages: "暂无留言",
    superviseDept: "院长办公室",
    isAnnex: "1",
    taskName: "院长办公室--R32.社 会影响力",
    levelOfResponsibility: "null",
    id: "5775db14-e444-4ae2-9c2a-33b4e98bc80e",
    state: "1",
    gradingScores: "0.4",
    taskId: "0e4bf8c4-ae87-47f9-bb1f-0d1a84180061",
  },
  {
    deptName: "教务处（科研处）",
    targetId: "2720c0ce-52f1-4579-8df5-d5e47d724598",
    parentTaskId: "dfa06261-6bcb-4a21-b3b6-087e2f3bdd9c",
    taskTargetNumber: "高校提交材料，省教育厅审核",
    description:
      "办学特色案例（3分）： 由高校根据办学优势和特色，提供本校在教学改革、推动科技服务（含科研平台建设）、乡村振兴、“1269”行动计划、高端智库、现场工程师产业学院等方面服务江西高质量发展的典型案例，采用专家组评分。",
    targetNumber: "3",
    grandfatherName: "D.办学声誉与特色 （18分）",
    parentName: "D2.特色发展 （3分）",
    approveMessages: "暂无留言",
    superviseDept: "教务处（科研处）",
    isAnnex: "1",
    taskName: "教务处--R34.办 学特色案例",
    levelOfResponsibility: "null",
    id: "3543e9f2-bee4-4524-9714-7503e0204c80",
    state: "1",
    gradingScores: "3",
    taskId: "481e94da-0795-4205-bed8-5322946be12a",
  },
  {
    deptName: "学生工作处",
    targetId: "47f06b1d-94cc-44e4-b96c-aeb20bf089a5",
    parentTaskId: "77cc8a96-5e3e-4847-932c-e6df40063e33",
    taskTargetNumber: "抽样调查，第三方评价",
    description:
      "学生满意度评价（4分）：问卷设置4个问题，满意度评价得分=（问题1得分+问题2得分+问题3得 分+问题4得分）÷4×4%。各项问题得分=评价非常满意学生数/抽样学生数×100+评价比较满意学生数/抽样学生数×80+评价基本满意学生数/抽样学 生数×60。",
    targetNumber: "4",
    grandfatherName: "D.办学声誉与特色 （18分）",
    parentName: "D3.满意度评价（10分）",
    approveMessages: "暂无留言",
    superviseDept: "学生工作处",
    isAnnex: "0",
    taskName: "学生工作处--R35.学 生满意度评价情况",
    levelOfResponsibility: "null",
    id: "fa60e94f-90cc-4ac2-8fa6-574ea6b5c008",
    state: "0",
    gradingScores: "0",
    taskId: "f8efe754-d505-4505-a806-72a00682e90c",
  },
  {
    deptName: "人事处（党委组织部）",
    targetId: "fa4b470e-bef3-4dd6-a61c-c4d60aedcd84",
    parentTaskId: "77cc8a96-5e3e-4847-932c-e6df40063e33",
    taskTargetNumber: "抽样调查，第三方评价",
    description:
      "教师满意度评价（4分）：问卷设置4个问题，满意度评价得分=（问题1得分+问题2得分+问题3得 分+问题4得分）÷4×4%。各项问题得分=评价非常满意教师数/抽样教师数×100+评价比较满意教师数/抽样教师数×80+评价基本满意教师数/抽样教 师数×60。",
    targetNumber: "4",
    grandfatherName: "D.办学声誉与特色 （18分）",
    parentName: "D3.满意度评价（10分）",
    approveMessages: "暂无留言",
    superviseDept: "人事处（党委组织部）",
    isAnnex: "0",
    taskName: "人事处--R36.教 师满意度评价情况",
    levelOfResponsibility: "null",
    id: "cc481c04-86e4-47a2-8b0d-dbcbe7084319",
    state: "0",
    gradingScores: "0",
    taskId: "5c3d9011-1eb1-43dc-8591-889305c247e6",
  },
  {
    deptName: "党委宣传部（党委统战部）",
    targetId: "79c0afb6-c68b-4115-94ce-e267b6465a69",
    parentTaskId: "77cc8a96-5e3e-4847-932c-e6df40063e33",
    taskTargetNumber: "根据省委教育工委、省教育厅舆情工作统计",
    description:
      "社会满意度评价情况（2分）：根据舆情等级分别计分，按分值从低到高排序，舆情分值最低得2分，引发重大舆情得0分且列入一票否决事项，其他采取比率法计分，指标得分=2分－（各校原始最低分 ÷本校原始分数）×指标分值权重。舆情等级计分 办法另行公布。",
    targetNumber: "2",
    grandfatherName: "D.办学声誉与特色 （18分）",
    parentName: "D3.满意度评价（10分）",
    approveMessages: "暂无留言",
    superviseDept: "党委宣传部（党委统战部）",
    isAnnex: "0",
    taskName: "党委宣传部--R37.社 会满意度评价情况",
    levelOfResponsibility: "null",
    id: "39e25932-4ed4-4db1-b5ea-017ecb0ae194",
    state: "0",
    gradingScores: "0",
    taskId: "49152d15-e92a-42d0-a391-b1e8fb96ffae",
  },
  {
    deptName: "院长办公室",
    targetId: "478609a0-7ec3-489e-b009-a8dd55e91ffb",
    parentTaskId: "641cceea-f6f7-4788-9851-ea90af306f70",
    taskTargetNumber: "上级部门通报、社会舆论监督、群众来信来访",
    description:
      "1.在教育教学改革、服务经济社会发展、人才培养、国际交流合作中作出重大突出贡献，酌情加分，加满5分为止。",
    targetNumber: "5",
    grandfatherName: "E.加减分",
    parentName: "加分项",
    approveMessages: "暂无留言",
    superviseDept: "院长办公室",
    isAnnex: "1",
    taskName: "加分项",
    levelOfResponsibility: "null",
    id: "59c0639f-2fb2-407d-b2b4-b34b7f31289a",
    state: "1",
    gradingScores: "5",
    taskId: "f3cbdc6e-b19c-47e2-b694-d4fbbf194ae0",
  },
  {
    deptName: "院长办公室",
    targetId: "836d928b-5fad-4220-ba3d-ae0299d6d80f",
    parentTaskId: "ef9c74e2-83ea-4ee7-9b12-aca0b827c8cb",
    taskTargetNumber: "上级部门通报、社会舆论监督、群众来信来访",
    description:
      "2.在办学治校过程中引发重大舆情，造成恶劣社会影响，每起扣2分；因心理问题引发的学生非正常死亡事件，每起扣1分；扣满5分为止。",
    targetNumber: "0",
    grandfatherName: "E.加减分",
    parentName: "减分项",
    approveMessages: "暂无留言",
    superviseDept: "院长办公室",
    isAnnex: "0",
    taskName: "减分项",
    levelOfResponsibility: "null",
    id: "73b688e0-bc21-41ad-ab40-764b44253437",
    state: "1",
    gradingScores: "0",
    taskId: "a174131a-3214-4b91-a15c-82946e6c7a65",
  },
]);
onMounted(async () => {
  rowspan(testArr1, testPosition1, "grandfatherName");
  rowspan(testArr2, testPosition2, "parentName");
  rowspan(testArr3, testPosition3, "taskName");
  // await getProjectTree();
});

const getProjectTree = () => {
  return getProjectTreeApi({
    projectCode: props.selectRow.projectCode,
    type: "target",
  }).then((res) => {
    if (res.result == "ok") {
      dataTree.value = res.data;
    }
  });
};

watch(
  () => props.selectRow,
  async () => {
    await getProjectTree();
  }
);

const rowspan = (spanArr, position, spanName) => {
  dataTree.value.forEach((item, index) => {
    if (index === 0) {
      spanArr.push(1);
      position = 0;
    } else {
      if (
        dataTree.value[index][spanName] === dataTree.value[index - 1][spanName]
      ) {
        spanArr[position] += 1;
        spanArr.push(0);
      } else {
        spanArr.push(1);
        position = index;
      }
    }
  });
};

const selectRow = ref({});
const detailDeptVisible = ref(false);

const openDetail = (item) => {
  selectRow.value = item;
  detailDeptVisible.value = true;
};

const detailDeptOk = () => {};
</script>

<style></style>
