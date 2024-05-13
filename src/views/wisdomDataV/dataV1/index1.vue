<template>
  <div
    class="w-full text-white h-screen"
    :style="'background-image: url(' + bgUrl + ');'"
  >
    <dv-border-box-11
      :title="route.query.taskName"
      :titleWidth="400"
      :color="['#0dd5f4', '#0a2732']"
      class="py-14 relative"
    >
      <div class="mx-8 h-full overflow-y-auto hideScroll">
        <div class="center relative">
          <div class="absolute top-2 right-32 text-base">
            <timeNow />
          </div>
        </div>
        <div class="mb-4">
          <a-button ghost type="primary">进展一览</a-button>
          <a-button class="ml-2" @click="seeKernelIndex" ghost
            >核心数据</a-button
          >
        </div>
        <span class="text-lg border-l-4 border-solid border-sky-400 px-2"
          >数据概览</span
        >
        <!-- <dv-border-box-8 :reverse="true" class="p-8"> -->
        <div class="grid grid-cols-2 gap-5 px-12">
          <div
            class="relative h-32 flex flex-col justify-center items-center"
            style="background-color: #ff9900"
          >
            <div>未完成任务数</div>
            <div class="font-bold text-2xl">
              <countTo
                :startVal="0"
                :endVal="80"
                :duration="3000"
                v-if="flagT"
                class="mx-auto"
              ></countTo>
            </div>
            <div class="absolute right-2 bottom-2 cursor-pointer underline">
              更多>>
            </div>
          </div>
          <div
            class="relative h-32 flex flex-col justify-center items-center"
            style="background-color: #33ffcc"
          >
            <div>已完成任务数</div>
            <div class="font-bold text-2xl">
              <countTo
                :startVal="0"
                :endVal="36"
                :duration="3000"
                v-if="flagT"
                class="mx-auto"
              ></countTo>
            </div>
            <div class="absolute right-2 bottom-2 cursor-pointer underline">
              更多>>
            </div>
          </div>
        </div>
        <!-- </dv-border-box-8> -->
        <div class="grid grid-cols-5 gap-12">
          <div class="col-span-2">
            <div
              class="text-lg border-l-4 border-solid border-sky-400 px-2 my-4"
            >
              各部门任务执行情况（正在进行/未完成数）
            </div>

            <div
              class="flex justify-between px-4 my-2"
              v-for="(item, index) in dataObj.taskSum6"
              :key="item"
            >
              <div>{{ item.DEPARTMENTNAME }}：</div>
              <div
                class="w-52 center"
                :class="index % 2 == 1 ? 'bg-cyan-700' : 'bg-cyan-900'"
              >
                {{ item.SUM }}/{{ item.WINSUM }}
              </div>
            </div>
          </div>
          <div class="col-span-3">
            <div class="text-base my-4 flex justify-between">
              <div
                class="text-lg border-l-4 border-solid border-sky-400 px-2 my-4"
              >
                任务执行情况汇总
              </div>
              <div
                class="underline cursor-pointer hover:text-blue-400"
                @click="seeMore"
              >
                查看更多>>>
              </div>
            </div>
            <div class="h-full">
              <div class="flex justify-around">
                <div class="center" v-for="item in dataList" :key="item">
                  <el-progress
                    type="circle"
                    :percentage="item.sum"
                    width="120"
                    color="#22d3ee"
                  >
                    <template #default="{ percentage }">
                      <div class="flex flex-col justify-center items-center">
                        <div class="percentage-value text-white text-sm">
                          {{ percentage }}%
                        </div>
                        <div class="percentage-label text-white text-sm w-3/4">
                          {{ item.tname }}
                        </div>
                      </div>
                    </template>
                  </el-progress>
                  <!-- <div
                    class="border w-40 h-40 rounded-full flex flex-col justify-center items-center"
                  >
                    <div class="w-3/4 text-center">{{ item.tname }}</div>
                    <div class="font-bold text-2xl">
                      <countTo
                        :startVal="0"
                        :endVal="item.sum"
                        :duration="3000"
                        v-if="flagT"
                        class="mx-auto"
                      ></countTo
                      >%
                    </div>
                  </div> -->
                </div>
              </div>
              <div class="w-full h-3/5"><dv-charts :option="option1" /></div>
            </div>
          </div>
        </div>
        <div>
          <div class="text-lg border-l-4 border-solid border-sky-400 px-2 my-4">
            滚动消息
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div class="h-40 border border-sky-600">
              <dv-scroll-board
                v-if="config1.data.length > 0"
                :config="config1"
                class="h-full"
              />
              <div class="w-full h-full center" v-else>暂无消息</div>
            </div>
            <div class="h-40 border border-sky-600">
              <dv-scroll-board
                v-if="config2.data.length > 0"
                :config="config2"
                class="h-full"
              />
              <div class="center w-full h-full" v-else>暂无消息</div>
            </div>
          </div>
        </div>
      </div>
    </dv-border-box-11>
  </div>
</template>

<script setup>
import {
  ref,
  onMounted,
  reactive,
  defineComponent,
  shallowRef,
  onUnmounted,
  onBeforeUnmount,
  nextTick,
} from "vue";
import { get, post } from "@/awsuiAxios/index.js";
import isDev from "@/config/index.js";
import { useRouter, useRoute, onBeforeRouteUpdate } from "vue-router";
import timeNow from "./component/timeNow.vue";

import countTo from "@/components/countTo";

const router = useRouter();
const route = useRoute();

const dataObj = ref({});

const dataList = ref([]);

const config1 = ref({
  data: [],
});
const config2 = ref({
  data: [],
});

const option1 = ref({
  title: {
    text: "",
    style: {
      fill: "#ffffff",
    },
  },
  legend: {
    data: ["办学方向与依法治校", "办学条件与资源"],
    textStyle: {
      fontFamily: "Arial",
      fontSize: 13,
      fill: "#fff",
    },
  },
  xAxis: {
    name: "",
    data: ["2.2", "3.1", "3.2", "3.3", "3.4", "3.5", "3.6"],
    axisLabel: {
      style: {
        fill: "#ffffff",
      },
    },
    axisLine: {
      // show: false,
      style: {
        stroke: "#fff",
        lineWidth: 1,
      },
    },
    nameTextStyle: {
      fill: "#ffffff",
    },
  },
  yAxis: {
    name: "任务进展情况",
    data: "value",
    axisLabel: {
      style: {
        fill: "#ffffff",
      },
    },
    axisLine: {
      // show: false,
      style: {
        stroke: "#fff",
        lineWidth: 1,
      },
    },
    splitLine: {
      show: false,
    },
    min: 0,
    max: 30,
    // axisLine: {
    //   show: false,
    // },
    nameTextStyle: {
      fill: "#ffffff",
    },
  },
  series: [
    {
      name: "办学方向与依法治校",
      data: [0, 11, 13, 15, 16, 16, 16],
      type: "line",
      stack: "a",
      fill: {
        show: true,
      },
    },
    {
      name: "办学条件与资源",
      data: [5, 15, 17, 18, 18, 21, 26],
      type: "line",
      stack: "a",
      fill: {
        show: true,
      },
    },
  ],
});

onMounted(() => {
  getRemoteData();
});

const getRemoteData = () => {
  // return get({
  //   url: "/jd",
  //   data: {
  //     cmd: "com.awspaas.user.apps.management_two.getData2.get",
  //     rootTaskId: route.query.rootTaskId,
  //   },
  // }).then((res) => {
  //   if (res.result == "ok") {
  let res = {
    data: {
      taskSum: {
        未完成任务数: {
          SUM: 80,
        },
        已完成任务数: {
          SUM: 36,
        },
      },
      taskSum7: [
        {
          USERNAME: "院长办公室",
          UPDATEDATE: "2024-01-06 10:42:49",
          TASK_EXECUTE_DESCRIPTION:
            "2.在办学治校过程中引发重大舆情，造成恶劣社会影响，每起扣2分；因心理问题引发的学生非正常死亡事件，每起扣1分；扣满5分为止。",
        },
        {
          USERNAME: "教务处（科研处）",
          UPDATEDATE: "2024-01-06 09:22:14",
          TASK_EXECUTE_DESCRIPTION:
            "教学成果奖获奖数（3分）：当年主持国家级教学成果奖计算权重从最高等级起分别为600%、500% 、400%，主持省级教学成果奖计算权重从最高等级起分别为300%、200%、100%，参与国家级教学成果奖计算权重从最高等级起分别为300%、200% 、100%，参与指的是排名前三。",
        },
        {
          USERNAME: "教务处（科研处）",
          UPDATEDATE: "2024-01-06 09:21:56",
          TASK_EXECUTE_DESCRIPTION:
            "专业（群）建设水平（4分）：获批一个国家级高水平专业（群）得4分，获批一个省级高水平专业（群 ）得1分，可累计计算，同一专业（群）按最高级别计算，不重复计算。资金投入及建设任务未按照专业（群）建设方案进度如期完成者，此项不得分。",
        },
        {
          USERNAME: "党委宣传部（党委统战部）",
          UPDATEDATE: "2024-01-05 17:25:57",
          TASK_EXECUTE_DESCRIPTION:
            "社会影响力（0.6分）：被国家级主流新闻媒体正面报道计算权重为300%，被省级主流新闻媒体正面报道计算权重为150%，各中央新闻单位驻江西机构视为省级新闻单位。在全国性教育相关会议上做经验交流发言计算权重为100%，在全省性教育相关会议上做经验交流发言计算权重为50%（仅限以各级政府及组成部门名 义召开的会议）。",
        },
        {
          USERNAME: "教务处（科研处）",
          UPDATEDATE: "2024-01-05 14:47:24",
          TASK_EXECUTE_DESCRIPTION:
            "精品（核心）课程数（2分）：现有精品（核心）课程累计数，入选国家级的折算为300%，入选省级的为100%，同一课程按最高级别计算，不重复计算 。",
        },
        {
          USERNAME: "教务处（科研处）",
          UPDATEDATE: "2024-01-05 14:47:13",
          TASK_EXECUTE_DESCRIPTION:
            "办学特色案例（3分）： 由高校根据办学优势和特色，提供本校在教学改革、推动科技服务（含科研平台建设）、乡村振兴、“1269”行动计划、高端智库、现场工程师产业学院等方面服务江西高质量发展的典型案例，采用专家组评分。",
        },
        {
          USERNAME: "教务处（科研处）",
          UPDATEDATE: "2024-01-05 14:46:44",
          TASK_EXECUTE_DESCRIPTION:
            "教学资源库建设水平（2分）：现有国家级、省级教学资源库累计数，国家级立项的专业教学资源库折算为300%，国家级立项的专业教育资源库子项目为200%，，省级立项为100%，第一主持折算为100%，第二主持为80%，第三主持为50%，同一专业教学资源库以最高级别计算，不重复计算。",
        },
        {
          USERNAME: "院长办公室",
          UPDATEDATE: "2024-01-05 10:01:36",
          TASK_EXECUTE_DESCRIPTION:
            "1.在教育教学改革、服务经济社会发展、人才培养、国际交流合作中作出重大突出贡献，酌情加分，加满5分为止。",
        },
        {
          USERNAME: "院长办公室",
          UPDATEDATE: "2024-01-05 09:50:40",
          TASK_EXECUTE_DESCRIPTION:
            "社会影响力（0.4分）：获教育部各类关于学校荣誉的综合评选（不含提名、入围）计算权重为300%，获省教育厅各类关于学校荣誉的综合评选 （不含提名、入围）计算权重为100%。",
        },
        {
          USERNAME: "院长办公室",
          UPDATEDATE: "2024-01-05 09:12:56",
          TASK_EXECUTE_DESCRIPTION:
            "依法治校落实情况（3分）：出现违反议事规则，“三重一大”决策机制执行不到位，违规异地办学、建设校区、校外办学，每起扣0.2分；存在违规有偿招生，违规组织招生、实习、校企合作、中外合作办学项目等情况，每起扣0.3分；出现毕业生去向落实统计、会计资料数据造假等事件，每起扣0.5分。",
        },
        {
          USERNAME: "财务审计处",
          UPDATEDATE: "2024-01-04 16:01:30",
          TASK_EXECUTE_DESCRIPTION:
            "生均财政拨款投入（2分）：学校当年专科层次学生的生均财政拨款达到12000元/人为“合格”，得2分，低于12000元/人采用比率法计分。该指标得分=本校实际值÷合格标准值×指标分数权重。",
        },
        {
          USERNAME: "财务审计处",
          UPDATEDATE: "2024-01-04 16:00:45",
          TASK_EXECUTE_DESCRIPTION:
            "教学经费投入（3分）：考核学校当年教育教学投入占比情况。教学经费投入占比=（教学日常运行支出 +教学科研仪器设备采购值）/（生均财政拨款到款总额+按照核准收费标准实际收取的学费总额）。",
        },
        {
          USERNAME: "财务审计处",
          UPDATEDATE: "2024-01-04 15:59:24",
          TASK_EXECUTE_DESCRIPTION:
            "教师培养培训经费投入（2分）：主要考核当年用于教师培养培训经费投入占比情况。教师培养培训经费投入占比=用于教师培养培训经费/（生均财政拨款到款总额+按照核准收费标准实际收取的学费总额）。",
        },
        {
          USERNAME: "人事处（党委组织部）",
          UPDATEDATE: "2024-01-04 09:33:50",
          TASK_EXECUTE_DESCRIPTION:
            "高层次高技能人才数（2分）： 高层次人才及团队（2分）：学校现有三类、四类、五类人才分别折算300%、200%、150%，55周岁及以下具有高级职称的博士折算为100%。当年新增二类及以上人才该项得2分，三类至五类人才及团队如获多个称号，严格按照就高原则，只计分1次（含团队负责人），如团队负责人已办理退休手续 ，按照证书上团队成员名次递补1位进行认定。当年引进的博士，如获人才称号，可按人才称号、博士引进分别计分。",
        },
        {
          USERNAME: "人事处（党委组织部）",
          UPDATEDATE: "2024-01-04 09:29:20",
          TASK_EXECUTE_DESCRIPTION:
            "师资结构（3分）： （1）“双师型”教师数占专业课教师比例（2分） ：占比高于60%为“合格”，得2分，占比低于30%“不合格”，得0分，其他情况采用比率法计分。该指标得分=本校实际值÷合格标准值×指标分数权重。 （2）具有研究生学位教师数占专任教师比例（1分 ）：达到“合格”标准得1分，低于“限制招生”标准得0分，“合格”与“限制招生”之间采用比率法计分。该指标得分=本校实际值÷合格标准值×指标分数权重。",
        },
        {
          USERNAME: "教务处（科研处）",
          UPDATEDATE: "2024-01-03 16:18:59",
          TASK_EXECUTE_DESCRIPTION:
            "科研与社会服务（3分）： （1）纵向科研项目数（1分）：当年获纵向科研项目数量，包括省重大科技研发专项、省重点研发计划项目、省“揭榜挂帅”项目、省产业关键共性技术攻关专项，省社科规划、教育科学规划 、自然科学基金等，省部级计算权重为200%，地厅级项目计算权重为100%。 （2）校企合作净收入（2分）：当年校企合作净收入，师范、财经、政法院校计算权重为300%；综合、工科、农、林、医学院校计算权重为100% ；体育、艺术院校不做硬性要求，此项取各校平均分。",
        },
        {
          USERNAME: "继续教育中心",
          UPDATEDATE: "2024-01-03 11:01:22",
          TASK_EXECUTE_DESCRIPTION:
            "社会责任与公益性服务（2分）： （1）社会培训（1分）：学校当年开展社会培训人次与在校生人数的占比。社会培训应与学校开设专业相匹配。（2）社区（老年）教育（1分）：学校当年参与“学习型社会建设重点任务”“终身学习品牌”“社区教育示范基地”“老年大学示范校”等项目，以及乡村振兴相关品牌建设项目数量（不包含人员获得荣誉），获批国家级项目每项得1分，省级项目每项得0.5分。",
        },
        {
          USERNAME: "图书信息中心",
          UPDATEDATE: "2024-01-03 10:27:28",
          TASK_EXECUTE_DESCRIPTION:
            "数字校园建设（1分）：获批教育部职业院校数字校园试点校建设单位、职业教育信息化标杆校建设单位得1分，获批省级数字校园试点校或信息化标杆校 （含推荐到国家评审项目）得0.5分。",
        },
        {
          USERNAME: "资产管理处（招投标办公室）",
          UPDATEDATE: "2024-01-02 14:44:28",
          TASK_EXECUTE_DESCRIPTION:
            "生均教学科研仪器设备值（3分）：达到“合格”标准得3分，低于“限制招生”标准得0分，“合格”与“限制招生”之间采用比率法计分。该指标得分=本校实际值÷合格标准值×指标分数权重。",
        },
        {
          USERNAME: "教务处（科研处）",
          UPDATEDATE: "2023-12-23 16:24:39",
          TASK_EXECUTE_DESCRIPTION:
            "校企合作企业数（2分）：平均每专业3个及以上合作企业为“合格”，得2分，平均每专业低于1个合作企业为“不合格”，得0分，“不合格”与“合格”之间采用比率法计分。规上合作企业计算权重为100%，其它用人单位企业计算权重为50%。该指标得分=本校实际值÷合格标准值×指标分数权重。",
        },
        {
          USERNAME: "教务处（科研处）",
          UPDATEDATE: "2023-12-23 14:36:41",
          TASK_EXECUTE_DESCRIPTION:
            "示范性虚拟仿真实训基地数（2分）：获批国家级虚拟仿真实训基地得2分，入选省级（含推荐到国家评审项目）得1分，同一基地以最高级别计算，不重复计算。",
        },
        {
          USERNAME: "教务处（科研处）",
          UPDATEDATE: "2023-12-23 14:36:24",
          TASK_EXECUTE_DESCRIPTION:
            "校外实习基地数（3分）：校外实习基地总数除以专业总数。平均每专业2个及以上校外实习基地为“合格”，得3分，平均每专业低于1个校外实习基地为0分，“不合格”与“合格”之间采用比率法计分 。该指标得分=本校实际值÷合格标准值×指标分数权重。",
        },
        {
          USERNAME: "招生就业处（创新创业中心）",
          UPDATEDATE: "2023-12-23 14:35:42",
          TASK_EXECUTE_DESCRIPTION:
            "毕业生就业与发展（3分）： 毕业生去向落实率（2分）：指2023届全日制高职专科毕业生初次毕业去向落实率，全省高职专科平均值为83.84%。其中去向落实率不低于全省平均得2分，低于全省平均5个百分点以内得 1.8分，低于5至10个百分点的学校得1.6分，低于10个百分点以上得1.2分。省教育厅委托第三方核查以及根据学生举报核实毕业生去向落实率统计真实性的情况，每核实一起扣 0.2分，扣完1分即止。 访企拓岗数量及成效（0.5分）：访企拓岗数量及成效得分排名第1得0.5分，访企不足100家得0分，其他采用比率法计分。该指标得分=本校访企拓岗数量及成效得分÷同类高校访企拓岗数量及成效最高分×该指标分值权重。 举办校园招聘会场次（0.5分）：举办校园招聘会场次数排名第1得0.5分，其他采用比率法计分，该指标得分=本校举办校园招聘会次数÷同类高校举办校园招聘会次数最高值×该指标分值权重。",
        },
        {
          USERNAME: "总务处（基建处）",
          UPDATEDATE: "2023-12-23 14:32:14",
          TASK_EXECUTE_DESCRIPTION:
            "生均教学行政用房（3分）：达到“合格”标准得3分，低于“限制招生”标准得0分，“合格”和“限制招生”之间采用比率法计分。该指标得分=本校实际值÷合格标准值×指标分数权重。",
        },
        {
          USERNAME: "教务处（科研处）",
          UPDATEDATE: "2023-12-23 14:27:54",
          TASK_EXECUTE_DESCRIPTION:
            "分类招生考试职业技能测试开展情况（2分）：学校当年开展分类招生考试职业技能测试的专业大类数量占学校开设专业大类总数量比例。",
        },
        {
          USERNAME: "招生就业处（创新创业中心）",
          UPDATEDATE: "2023-12-23 14:26:46",
          TASK_EXECUTE_DESCRIPTION:
            "长学制学生培养情况（2分）：学校当年五年一贯制和3+2分段培养项目的转段数占学校专科层次招生总数的比例。五年一贯制项目中，当年转段进入高职教育阶段的学生数按照150%权重进行折算；3+2分段培养项目中，当年转段进入高职教育阶段的学生数按照100%权重进行折算。",
        },
        {
          USERNAME: "教务处（科研处）",
          UPDATEDATE: "2023-12-23 14:22:11",
          TASK_EXECUTE_DESCRIPTION:
            "校企合作典型生产实践项目数（2分）：学校现有获批国家级校企合作典型生产实践项目得2分，获批省级（含推荐到国家评审项目）得1分，同一项目不可重复计算。",
        },
        {
          USERNAME: "教务处（科研处）",
          UPDATEDATE: "2023-12-23 14:21:01",
          TASK_EXECUTE_DESCRIPTION:
            "市域产教联合体、行业产教融合共同体、产教融合实践中心、现场工程师产业学院，引进优质高校、头部企业合作情况（5分）：可累计计算，得分最高不超过5分。学校现有牵头建设国家级项目，每个得3分；牵头建设省级（含推荐到国家评审）项目 ，每个得2分。参与我省校校、校企合作签约项目每个占1分，按照签约项目任务清单完成率赋分。",
        },
        {
          USERNAME: "教务处（科研处）",
          UPDATEDATE: "2023-12-23 14:15:47",
          TASK_EXECUTE_DESCRIPTION:
            "师生竞赛获奖数（4分）：当年学生参加国际级赛事获奖计算权重从最高等级起分别为700%、600%、500%，国家级赛事获奖计算权重从最高等级起分别为400%、300%、200%，职业院校技能大赛获奖最高等级计算权重为150%，其他省级赛事获奖最高等级计算权重为100%，除此之外其他等级不予统计。教师组获奖在此基础上计算权重增加200%，师生同赛获奖增加150%。同一项目按最高获奖计算，不重复累加。",
        },
        {
          USERNAME: "安全保卫处",
          UPDATEDATE: "2023-12-23 14:11:46",
          TASK_EXECUTE_DESCRIPTION:
            "平安校园建设（3分）：原始得分最高得3分，低于60分得0分，其他情况采用比率法计分。该指标得分=本校原始得分÷各校原始最高分×指标分数权重。",
        },
        {
          USERNAME: "招生就业处（创新创业中心）",
          UPDATEDATE: "2023-12-23 14:09:21",
          TASK_EXECUTE_DESCRIPTION:
            "围绕“1269”行动计划省级重点产业链相关专业及招生数（2分）： （2）开设重点产业链相关专业招生人数占比（2分） ：学校当年服务重点产业链相关专业全日制招生人数占学校全日制招生总人数的比值。综合、工科、农、林、医类院校服务重点产业链专业招生人数占比不低于40%为“合格”，得2分，师范、财经类院校重点专业招生人数占比不低于10%为“合格”，得2分 ，其他情况采取比率法计分。急需紧缺A档专业招生人数计算权重为300%，B档专业计算权重为200%，C档专业计算权重为100%。D档、E档专业不计数。",
        },
      ],
      taskSum6: [
        {
          WINSUM: 5,
          SUM: 0,
          DEPARTMENTNAME: "人事处（党委组织部）",
        },
        {
          WINSUM: 1,
          SUM: 0,
          DEPARTMENTNAME: "党委办公室",
        },
        {
          WINSUM: 4,
          SUM: 0,
          DEPARTMENTNAME: "党委宣传部（党委统战部）",
        },
        {
          WINSUM: 1,
          SUM: 0,
          DEPARTMENTNAME: "图书信息中心",
        },
        {
          WINSUM: 1,
          SUM: 0,
          DEPARTMENTNAME: "学生工作处",
        },
        {
          WINSUM: 1,
          SUM: 0,
          DEPARTMENTNAME: "安全保卫处",
        },
        {
          WINSUM: 1,
          SUM: 0,
          DEPARTMENTNAME: "总务处（基建处）",
        },
        {
          WINSUM: 3,
          SUM: 0,
          DEPARTMENTNAME: "招生就业处（创新创业中心）",
        },
        {
          WINSUM: 15,
          SUM: 0,
          DEPARTMENTNAME: "教务处（科研处）",
        },
        {
          WINSUM: 1,
          SUM: 0,
          DEPARTMENTNAME: "继续教育中心",
        },
        {
          WINSUM: 3,
          SUM: 0,
          DEPARTMENTNAME: "财务审计处",
        },
        {
          WINSUM: 1,
          SUM: 0,
          DEPARTMENTNAME: "质量管理办公室（教学督导处）",
        },
        {
          WINSUM: 1,
          SUM: 0,
          DEPARTMENTNAME: "资产管理处（招投标办公室）",
        },
        {
          WINSUM: 4,
          SUM: 0,
          DEPARTMENTNAME: "院长办公室",
        },
      ],
      taskSum9: [
        {
          USERNAME: "教务处（科研处）",
          UPDATEDATE: "2024-01-11 09:51:25",
          FILE_DESCRIPTION: "校外实习基地77家，专业29个",
          TASK_EXECUTE_DESCRIPTION:
            "校外实习基地数（3分）：校外实习基地总数除以专业总数。平均每专业2个及以上校外实习基地为“合格”，得3分，平均每专业低于1个校外实习基地为0分，“不合格”与“合格”之间采用比率法计分 。该指标得分=本校实际值÷合格标准值×指标分数权重。",
        },
        {
          USERNAME: "教务处（科研处）",
          UPDATEDATE: "2024-01-10 12:50:58",
          FILE_DESCRIPTION: "省赛一等奖3",
          TASK_EXECUTE_DESCRIPTION:
            "师生竞赛获奖数（4分）：当年学生参加国际级赛事获奖计算权重从最高等级起分别为700%、600%、500%，国家级赛事获奖计算权重从最高等级起分别为400%、300%、200%，职业院校技能大赛获奖最高等级计算权重为150%，其他省级赛事获奖最高等级计算权重为100%，除此之外其他等级不予统计。教师组获奖在此基础上计算权重增加200%，师生同赛获奖增加150%。同一项目按最高获奖计算，不重复累加。",
        },
        {
          USERNAME: "教务处（科研处）",
          UPDATEDATE: "2024-01-10 12:46:32",
          FILE_DESCRIPTION: "省赛一等奖2\n",
          TASK_EXECUTE_DESCRIPTION:
            "师生竞赛获奖数（4分）：当年学生参加国际级赛事获奖计算权重从最高等级起分别为700%、600%、500%，国家级赛事获奖计算权重从最高等级起分别为400%、300%、200%，职业院校技能大赛获奖最高等级计算权重为150%，其他省级赛事获奖最高等级计算权重为100%，除此之外其他等级不予统计。教师组获奖在此基础上计算权重增加200%，师生同赛获奖增加150%。同一项目按最高获奖计算，不重复累加。",
        },
        {
          USERNAME: "教务处（科研处）",
          UPDATEDATE: "2024-01-10 12:43:23",
          FILE_DESCRIPTION: "省赛一等奖",
          TASK_EXECUTE_DESCRIPTION:
            "师生竞赛获奖数（4分）：当年学生参加国际级赛事获奖计算权重从最高等级起分别为700%、600%、500%，国家级赛事获奖计算权重从最高等级起分别为400%、300%、200%，职业院校技能大赛获奖最高等级计算权重为150%，其他省级赛事获奖最高等级计算权重为100%，除此之外其他等级不予统计。教师组获奖在此基础上计算权重增加200%，师生同赛获奖增加150%。同一项目按最高获奖计算，不重复累加。",
        },
        {
          USERNAME: "教务处（科研处）",
          UPDATEDATE: "2024-01-10 12:40:28",
          FILE_DESCRIPTION: "国赛二等奖",
          TASK_EXECUTE_DESCRIPTION:
            "师生竞赛获奖数（4分）：当年学生参加国际级赛事获奖计算权重从最高等级起分别为700%、600%、500%，国家级赛事获奖计算权重从最高等级起分别为400%、300%、200%，职业院校技能大赛获奖最高等级计算权重为150%，其他省级赛事获奖最高等级计算权重为100%，除此之外其他等级不予统计。教师组获奖在此基础上计算权重增加200%，师生同赛获奖增加150%。同一项目按最高获奖计算，不重复累加。",
        },
        {
          USERNAME: "安全保卫处",
          UPDATEDATE: "2024-01-09 09:23:10",
          FILE_DESCRIPTION: "已完成",
          TASK_EXECUTE_DESCRIPTION:
            "平安校园建设（3分）：原始得分最高得3分，低于60分得0分，其他情况采用比率法计分。该指标得分=本校原始得分÷各校原始最高分×指标分数权重。",
        },
        {
          USERNAME: "总务处（基建处）",
          UPDATEDATE: "2024-01-09 09:06:21",
          FILE_DESCRIPTION: "合格",
          TASK_EXECUTE_DESCRIPTION:
            "生均教学行政用房（3分）：达到“合格”标准得3分，低于“限制招生”标准得0分，“合格”和“限制招生”之间采用比率法计分。该指标得分=本校实际值÷合格标准值×指标分数权重。",
        },
        {
          USERNAME: "教务处（科研处）",
          UPDATEDATE: "2024-01-08 11:07:14",
          FILE_DESCRIPTION: "已完成",
          TASK_EXECUTE_DESCRIPTION:
            "分类招生考试职业技能测试开展情况（2分）：学校当年开展分类招生考试职业技能测试的专业大类数量占学校开设专业大类总数量比例。",
        },
        {
          USERNAME: "党委宣传部（党委统战部）",
          UPDATEDATE: "2024-01-05 17:25:28",
          FILE_DESCRIPTION:
            "在全省资助会议、2023年教育事业统计数据汇总工作会议等会议上做经验交流和发言。",
          TASK_EXECUTE_DESCRIPTION:
            "社会影响力（0.6分）：被国家级主流新闻媒体正面报道计算权重为300%，被省级主流新闻媒体正面报道计算权重为150%，各中央新闻单位驻江西机构视为省级新闻单位。在全国性教育相关会议上做经验交流发言计算权重为100%，在全省性教育相关会议上做经验交流发言计算权重为50%（仅限以各级政府及组成部门名 义召开的会议）。",
        },
        {
          USERNAME: "党委宣传部（党委统战部）",
          UPDATEDATE: "2024-01-05 17:23:20",
          FILE_DESCRIPTION:
            "被大江网、中国网、学习强国、江西教育电视台等省级主流新闻媒体正面报道60余次。",
          TASK_EXECUTE_DESCRIPTION:
            "社会影响力（0.6分）：被国家级主流新闻媒体正面报道计算权重为300%，被省级主流新闻媒体正面报道计算权重为150%，各中央新闻单位驻江西机构视为省级新闻单位。在全国性教育相关会议上做经验交流发言计算权重为100%，在全省性教育相关会议上做经验交流发言计算权重为50%（仅限以各级政府及组成部门名 义召开的会议）。",
        },
        {
          USERNAME: "党委宣传部（党委统战部）",
          UPDATEDATE: "2024-01-05 17:21:05",
          FILE_DESCRIPTION: "被国家级主流媒体正面报道1篇。",
          TASK_EXECUTE_DESCRIPTION:
            "社会影响力（0.6分）：被国家级主流新闻媒体正面报道计算权重为300%，被省级主流新闻媒体正面报道计算权重为150%，各中央新闻单位驻江西机构视为省级新闻单位。在全国性教育相关会议上做经验交流发言计算权重为100%，在全省性教育相关会议上做经验交流发言计算权重为50%（仅限以各级政府及组成部门名 义召开的会议）。",
        },
        {
          USERNAME: "教务处（科研处）",
          UPDATEDATE: "2024-01-05 16:03:30",
          FILE_DESCRIPTION:
            "2023年行政函523号文《关于推进职业教育示范性虚拟仿真实训基地建设的实施方案》，学院获批为第二批建设单位。\n",
          TASK_EXECUTE_DESCRIPTION:
            "示范性虚拟仿真实训基地数（2分）：获批国家级虚拟仿真实训基地得2分，入选省级（含推荐到国家评审项目）得1分，同一基地以最高级别计算，不重复计算。",
        },
        {
          USERNAME: "教务处（科研处）",
          UPDATEDATE: "2024-01-05 16:03:15",
          FILE_DESCRIPTION:
            "2023年行政函523号文《关于推进职业教育示范性虚拟仿真实训基地建设的实施方案》，学院获批为第二批建设单位。\n",
          TASK_EXECUTE_DESCRIPTION:
            "示范性虚拟仿真实训基地数（2分）：获批国家级虚拟仿真实训基地得2分，入选省级（含推荐到国家评审项目）得1分，同一基地以最高级别计算，不重复计算。",
        },
        {
          USERNAME: "教务处（科研处）",
          UPDATEDATE: "2024-01-05 15:23:14",
          FILE_DESCRIPTION:
            "“动漫制作技术专业校企合作典型生产实践项目”“以企业项目为依托，构建校企合作协同育人新模式”2个校企合作典型生产实践项目（暂无结果）",
          TASK_EXECUTE_DESCRIPTION:
            "校企合作典型生产实践项目数（2分）：学校现有获批国家级校企合作典型生产实践项目得2分，获批省级（含推荐到国家评审项目）得1分，同一项目不可重复计算。",
        },
        {
          USERNAME: "教务处（科研处）",
          UPDATEDATE: "2024-01-05 15:21:55",
          FILE_DESCRIPTION:
            "1.“涉水新型产教融合共同体”通过省教育厅评审，推荐到国家教育部。+2分\n2.“水利工程质量检测产教融合实践中心”通过省教育厅评审，推荐到国家教育部。+2分\n3.“涉水新型产业现场工程师产业学院”“欣机电产业学院”两个学院递交省教育厅审核，暂无结果。",
          TASK_EXECUTE_DESCRIPTION:
            "市域产教联合体、行业产教融合共同体、产教融合实践中心、现场工程师产业学院，引进优质高校、头部企业合作情况（5分）：可累计计算，得分最高不超过5分。学校现有牵头建设国家级项目，每个得3分；牵头建设省级（含推荐到国家评审）项目 ，每个得2分。参与我省校校、校企合作签约项目每个占1分，按照签约项目任务清单完成率赋分。",
        },
        {
          USERNAME: "院长办公室",
          UPDATEDATE: "2024-01-05 10:01:32",
          FILE_DESCRIPTION: "人才培养",
          TASK_EXECUTE_DESCRIPTION:
            "1.在教育教学改革、服务经济社会发展、人才培养、国际交流合作中作出重大突出贡献，酌情加分，加满5分为止。",
        },
        {
          USERNAME: "院长办公室",
          UPDATEDATE: "2024-01-05 09:57:00",
          FILE_DESCRIPTION: "人才培养",
          TASK_EXECUTE_DESCRIPTION:
            "1.在教育教学改革、服务经济社会发展、人才培养、国际交流合作中作出重大突出贡献，酌情加分，加满5分为止。",
        },
        {
          USERNAME: "院长办公室",
          UPDATEDATE: "2024-01-05 09:56:50",
          FILE_DESCRIPTION: "人才培养",
          TASK_EXECUTE_DESCRIPTION:
            "1.在教育教学改革、服务经济社会发展、人才培养、国际交流合作中作出重大突出贡献，酌情加分，加满5分为止。",
        },
        {
          USERNAME: "院长办公室",
          UPDATEDATE: "2024-01-05 09:55:17",
          FILE_DESCRIPTION: "国际化",
          TASK_EXECUTE_DESCRIPTION:
            "1.在教育教学改革、服务经济社会发展、人才培养、国际交流合作中作出重大突出贡献，酌情加分，加满5分为止。",
        },
        {
          USERNAME: "院长办公室",
          UPDATEDATE: "2024-01-05 09:52:46",
          FILE_DESCRIPTION:
            "关于通报表扬2023年度省级乡村振兴优秀驻村干部的通知",
          TASK_EXECUTE_DESCRIPTION:
            "1.在教育教学改革、服务经济社会发展、人才培养、国际交流合作中作出重大突出贡献，酌情加分，加满5分为止。",
        },
        {
          USERNAME: "院长办公室",
          UPDATEDATE: "2024-01-05 09:51:53",
          FILE_DESCRIPTION: "关于确定全省2022年度乡村振兴模范党组织名单的通知",
          TASK_EXECUTE_DESCRIPTION:
            "1.在教育教学改革、服务经济社会发展、人才培养、国际交流合作中作出重大突出贡献，酌情加分，加满5分为止。",
        },
        {
          USERNAME: "院长办公室",
          UPDATEDATE: "2024-01-05 09:50:21",
          FILE_DESCRIPTION: "学院教师获得第十七批江西省级教学成果奖二等奖2项",
          TASK_EXECUTE_DESCRIPTION:
            "社会影响力（0.4分）：获教育部各类关于学校荣誉的综合评选（不含提名、入围）计算权重为300%，获省教育厅各类关于学校荣誉的综合评选 （不含提名、入围）计算权重为100%。",
        },
        {
          USERNAME: "院长办公室",
          UPDATEDATE: "2024-01-05 09:50:07",
          FILE_DESCRIPTION:
            "水利水电建筑工程教学团队成功立项江西省首批职业院校教师教学创新团队",
          TASK_EXECUTE_DESCRIPTION:
            "社会影响力（0.4分）：获教育部各类关于学校荣誉的综合评选（不含提名、入围）计算权重为300%，获省教育厅各类关于学校荣誉的综合评选 （不含提名、入围）计算权重为100%。",
        },
        {
          USERNAME: "院长办公室",
          UPDATEDATE: "2024-01-05 09:49:51",
          FILE_DESCRIPTION: "暂无说明",
          TASK_EXECUTE_DESCRIPTION:
            "社会影响力（0.4分）：获教育部各类关于学校荣誉的综合评选（不含提名、入围）计算权重为300%，获省教育厅各类关于学校荣誉的综合评选 （不含提名、入围）计算权重为100%。",
        },
        {
          USERNAME: "院长办公室",
          UPDATEDATE: "2024-01-05 09:49:46",
          FILE_DESCRIPTION: "“十四五”期间首批省级职业教育专业教学资源",
          TASK_EXECUTE_DESCRIPTION:
            "社会影响力（0.4分）：获教育部各类关于学校荣誉的综合评选（不含提名、入围）计算权重为300%，获省教育厅各类关于学校荣誉的综合评选 （不含提名、入围）计算权重为100%。",
        },
        {
          USERNAME: "院长办公室",
          UPDATEDATE: "2024-01-05 09:49:37",
          FILE_DESCRIPTION: "“十四五”期间首批省级职业教育专业教学资源",
          TASK_EXECUTE_DESCRIPTION:
            "社会影响力（0.4分）：获教育部各类关于学校荣誉的综合评选（不含提名、入围）计算权重为300%，获省教育厅各类关于学校荣誉的综合评选 （不含提名、入围）计算权重为100%。",
        },
        {
          USERNAME: "院长办公室",
          UPDATEDATE: "2024-01-05 09:49:32",
          FILE_DESCRIPTION: "“十四五”期间首批省级职业教育专业教学资源库",
          TASK_EXECUTE_DESCRIPTION:
            "社会影响力（0.4分）：获教育部各类关于学校荣誉的综合评选（不含提名、入围）计算权重为300%，获省教育厅各类关于学校荣誉的综合评选 （不含提名、入围）计算权重为100%。",
        },
        {
          USERNAME: "院长办公室",
          UPDATEDATE: "2024-01-05 09:49:06",
          FILE_DESCRIPTION:
            "省水利厅为江西水利职业学院长江经济带劳模和工匠人才创新工作室联盟获授牌工作室揭牌",
          TASK_EXECUTE_DESCRIPTION:
            "社会影响力（0.4分）：获教育部各类关于学校荣誉的综合评选（不含提名、入围）计算权重为300%，获省教育厅各类关于学校荣誉的综合评选 （不含提名、入围）计算权重为100%。",
        },
        {
          USERNAME: "教务处（科研处）",
          UPDATEDATE: "2024-01-05 09:45:46",
          FILE_DESCRIPTION:
            "学院校企合作企业数88家，平均每专业合作数量为：88/29=3.03家。得分2分。",
          TASK_EXECUTE_DESCRIPTION:
            "校企合作企业数（2分）：平均每专业3个及以上合作企业为“合格”，得2分，平均每专业低于1个合作企业为“不合格”，得0分，“不合格”与“合格”之间采用比率法计分。规上合作企业计算权重为100%，其它用人单位企业计算权重为50%。该指标得分=本校实际值÷合格标准值×指标分数权重。",
        },
        {
          USERNAME: "教务处（科研处）",
          UPDATEDATE: "2024-01-05 09:45:43",
          FILE_DESCRIPTION:
            "学院校企合作企业数88家，平均每专业合作数量为：88/29=3.03家。得分2分。",
          TASK_EXECUTE_DESCRIPTION:
            "校企合作企业数（2分）：平均每专业3个及以上合作企业为“合格”，得2分，平均每专业低于1个合作企业为“不合格”，得0分，“不合格”与“合格”之间采用比率法计分。规上合作企业计算权重为100%，其它用人单位企业计算权重为50%。该指标得分=本校实际值÷合格标准值×指标分数权重。",
        },
        {
          USERNAME: "教务处（科研处）",
          UPDATEDATE: "2024-01-05 09:45:42",
          FILE_DESCRIPTION:
            "学院校企合作企业数88家，平均每专业合作数量为：88/29=3.03家。得分2分。",
          TASK_EXECUTE_DESCRIPTION:
            "校企合作企业数（2分）：平均每专业3个及以上合作企业为“合格”，得2分，平均每专业低于1个合作企业为“不合格”，得0分，“不合格”与“合格”之间采用比率法计分。规上合作企业计算权重为100%，其它用人单位企业计算权重为50%。该指标得分=本校实际值÷合格标准值×指标分数权重。",
        },
        {
          USERNAME: "教务处（科研处）",
          UPDATEDATE: "2024-01-05 09:44:31",
          FILE_DESCRIPTION:
            "学院校企合作企业数88家，平均每专业合作数量为：88/29=3.03家。得分2分。",
          TASK_EXECUTE_DESCRIPTION:
            "校企合作企业数（2分）：平均每专业3个及以上合作企业为“合格”，得2分，平均每专业低于1个合作企业为“不合格”，得0分，“不合格”与“合格”之间采用比率法计分。规上合作企业计算权重为100%，其它用人单位企业计算权重为50%。该指标得分=本校实际值÷合格标准值×指标分数权重。",
        },
        {
          USERNAME: "院长办公室",
          UPDATEDATE: "2024-01-05 09:42:57",
          FILE_DESCRIPTION: "入选“大思政课”建设综合改革试验区改革项目",
          TASK_EXECUTE_DESCRIPTION:
            "社会影响力（0.4分）：获教育部各类关于学校荣誉的综合评选（不含提名、入围）计算权重为300%，获省教育厅各类关于学校荣誉的综合评选 （不含提名、入围）计算权重为100%。",
        },
        {
          USERNAME: "教务处（科研处）",
          UPDATEDATE: "2024-01-05 09:38:33",
          FILE_DESCRIPTION:
            "学院校企合作企业数88家，平均每专业合作数量为：88/29=3.03家。得分2分。",
          TASK_EXECUTE_DESCRIPTION:
            "校企合作企业数（2分）：平均每专业3个及以上合作企业为“合格”，得2分，平均每专业低于1个合作企业为“不合格”，得0分，“不合格”与“合格”之间采用比率法计分。规上合作企业计算权重为100%，其它用人单位企业计算权重为50%。该指标得分=本校实际值÷合格标准值×指标分数权重。",
        },
        {
          USERNAME: "教务处（科研处）",
          UPDATEDATE: "2024-01-05 09:38:20",
          FILE_DESCRIPTION:
            "学院校企合作企业数88家，平均每专业合作数量为：88/29=3.03家。得分2分。",
          TASK_EXECUTE_DESCRIPTION:
            "校企合作企业数（2分）：平均每专业3个及以上合作企业为“合格”，得2分，平均每专业低于1个合作企业为“不合格”，得0分，“不合格”与“合格”之间采用比率法计分。规上合作企业计算权重为100%，其它用人单位企业计算权重为50%。该指标得分=本校实际值÷合格标准值×指标分数权重。",
        },
        {
          USERNAME: "教务处（科研处）",
          UPDATEDATE: "2024-01-05 09:35:45",
          FILE_DESCRIPTION:
            "学院校企合作企业数88家，平均每专业合作数量为：88/29=3.03家。得分2分。",
          TASK_EXECUTE_DESCRIPTION:
            "校企合作企业数（2分）：平均每专业3个及以上合作企业为“合格”，得2分，平均每专业低于1个合作企业为“不合格”，得0分，“不合格”与“合格”之间采用比率法计分。规上合作企业计算权重为100%，其它用人单位企业计算权重为50%。该指标得分=本校实际值÷合格标准值×指标分数权重。",
        },
        {
          USERNAME: "院长办公室",
          UPDATEDATE: "2024-01-05 09:35:07",
          FILE_DESCRIPTION: "全国优质水利高职院校",
          TASK_EXECUTE_DESCRIPTION:
            "社会影响力（0.4分）：获教育部各类关于学校荣誉的综合评选（不含提名、入围）计算权重为300%，获省教育厅各类关于学校荣誉的综合评选 （不含提名、入围）计算权重为100%。",
        },
        {
          USERNAME: "院长办公室",
          UPDATEDATE: "2024-01-05 09:34:46",
          FILE_DESCRIPTION: " 全国水利德育教育优秀成果遴选活动中取得佳绩",
          TASK_EXECUTE_DESCRIPTION:
            "社会影响力（0.4分）：获教育部各类关于学校荣誉的综合评选（不含提名、入围）计算权重为300%，获省教育厅各类关于学校荣誉的综合评选 （不含提名、入围）计算权重为100%。",
        },
        {
          USERNAME: "教务处（科研处）",
          UPDATEDATE: "2024-01-05 09:34:32",
          FILE_DESCRIPTION:
            "1.开设重点产业链相关专业数占比：37.93%.\n按照公式计算得分为：\n37.93%÷40%*2=1.8965分\n（2）开设重点产业链相关专业招生人数占比：[505*300%+（150+46）*200%+（112+100+118+329+375+71+24）*100%]/5883=51.6%,得分2分。\n共计得分：3.8965分",
          TASK_EXECUTE_DESCRIPTION:
            "围绕“1269”行动计划省级重点产业链相关专业及招生数（2分）： （1）开设重点产业链相关专业数占比（2分）：学校当年服务重点产业链专业数占学校开设专业总数的比值。综合、工科、农、林、医类院校服务重点产业链专业开设占比不低于40%为“合格”，得2分，师范、财经类院校开设占比不低于10%为“合格”，得2分，其他情况采取比率法计分；",
        },
        {
          USERNAME: "教务处（科研处）",
          UPDATEDATE: "2024-01-05 09:33:17",
          FILE_DESCRIPTION:
            "1.开设重点产业链相关专业数占比：37.93%.\n按照公式计算得分为：\n37.93%÷40%*2=1.8965分\n（2）开设重点产业链相关专业招生人数占比：[505*300%+（150+46）*200%+（112+100+118+329+375+71+24）*100%]/5883=51.6%,得分2分。\n共计得分：3.8965分",
          TASK_EXECUTE_DESCRIPTION:
            "围绕“1269”行动计划省级重点产业链相关专业及招生数（2分）： （1）开设重点产业链相关专业数占比（2分）：学校当年服务重点产业链专业数占学校开设专业总数的比值。综合、工科、农、林、医类院校服务重点产业链专业开设占比不低于40%为“合格”，得2分，师范、财经类院校开设占比不低于10%为“合格”，得2分，其他情况采取比率法计分；",
        },
        {
          USERNAME: "院长办公室",
          UPDATEDATE: "2024-01-05 09:29:00",
          FILE_DESCRIPTION: "教育部职业院校信息化标杆校建设单位",
          TASK_EXECUTE_DESCRIPTION:
            "社会影响力（0.4分）：获教育部各类关于学校荣誉的综合评选（不含提名、入围）计算权重为300%，获省教育厅各类关于学校荣誉的综合评选 （不含提名、入围）计算权重为100%。",
        },
        {
          USERNAME: "院长办公室",
          UPDATEDATE: "2024-01-05 09:28:54",
          FILE_DESCRIPTION: "教育部职业院校信息化标杆校建设单位",
          TASK_EXECUTE_DESCRIPTION:
            "社会影响力（0.4分）：获教育部各类关于学校荣誉的综合评选（不含提名、入围）计算权重为300%，获省教育厅各类关于学校荣誉的综合评选 （不含提名、入围）计算权重为100%。",
        },
        {
          USERNAME: "院长办公室",
          UPDATEDATE: "2024-01-05 09:23:23",
          FILE_DESCRIPTION: "教育部第三批现代学徒制试点单位",
          TASK_EXECUTE_DESCRIPTION:
            "社会影响力（0.4分）：获教育部各类关于学校荣誉的综合评选（不含提名、入围）计算权重为300%，获省教育厅各类关于学校荣誉的综合评选 （不含提名、入围）计算权重为100%。",
        },
        {
          USERNAME: "院长办公室",
          UPDATEDATE: "2024-01-05 09:23:06",
          FILE_DESCRIPTION:
            "江西水利职业学院水利水电建筑工程、动漫制作技术专业成功入选省高水平专业群",
          TASK_EXECUTE_DESCRIPTION:
            "社会影响力（0.4分）：获教育部各类关于学校荣誉的综合评选（不含提名、入围）计算权重为300%，获省教育厅各类关于学校荣誉的综合评选 （不含提名、入围）计算权重为100%。",
        },
        {
          USERNAME: "院长办公室",
          UPDATEDATE: "2024-01-05 09:22:49",
          FILE_DESCRIPTION: "江西省首批语言文字规范化示范校",
          TASK_EXECUTE_DESCRIPTION:
            "社会影响力（0.4分）：获教育部各类关于学校荣誉的综合评选（不含提名、入围）计算权重为300%，获省教育厅各类关于学校荣誉的综合评选 （不含提名、入围）计算权重为100%。",
        },
        {
          USERNAME: "院长办公室",
          UPDATEDATE: "2024-01-05 09:22:33",
          FILE_DESCRIPTION: "江西省教学成果奖授奖",
          TASK_EXECUTE_DESCRIPTION:
            "社会影响力（0.4分）：获教育部各类关于学校荣誉的综合评选（不含提名、入围）计算权重为300%，获省教育厅各类关于学校荣誉的综合评选 （不含提名、入围）计算权重为100%。",
        },
        {
          USERNAME: "院长办公室",
          UPDATEDATE: "2024-01-05 09:22:11",
          FILE_DESCRIPTION: " 江西省劳动教育特色示范学校",
          TASK_EXECUTE_DESCRIPTION:
            "社会影响力（0.4分）：获教育部各类关于学校荣誉的综合评选（不含提名、入围）计算权重为300%，获省教育厅各类关于学校荣誉的综合评选 （不含提名、入围）计算权重为100%。",
        },
        {
          USERNAME: "院长办公室",
          UPDATEDATE: "2024-01-05 09:21:27",
          FILE_DESCRIPTION: "江西省第二轮高水平专业群建设单位",
          TASK_EXECUTE_DESCRIPTION:
            "社会影响力（0.4分）：获教育部各类关于学校荣誉的综合评选（不含提名、入围）计算权重为300%，获省教育厅各类关于学校荣誉的综合评选 （不含提名、入围）计算权重为100%。",
        },
        {
          USERNAME: "院长办公室",
          UPDATEDATE: "2024-01-05 09:21:03",
          FILE_DESCRIPTION: "节水型高校",
          TASK_EXECUTE_DESCRIPTION:
            "社会影响力（0.4分）：获教育部各类关于学校荣誉的综合评选（不含提名、入围）计算权重为300%，获省教育厅各类关于学校荣誉的综合评选 （不含提名、入围）计算权重为100%。",
        },
        {
          USERNAME: "院长办公室",
          UPDATEDATE: "2024-01-05 09:20:52",
          FILE_DESCRIPTION: "节水型高校",
          TASK_EXECUTE_DESCRIPTION:
            "社会影响力（0.4分）：获教育部各类关于学校荣誉的综合评选（不含提名、入围）计算权重为300%，获省教育厅各类关于学校荣誉的综合评选 （不含提名、入围）计算权重为100%。",
        },
        {
          USERNAME: "院长办公室",
          UPDATEDATE: "2024-01-05 09:20:41",
          FILE_DESCRIPTION: "国家级“公共机构水效领跑者",
          TASK_EXECUTE_DESCRIPTION:
            "社会影响力（0.4分）：获教育部各类关于学校荣誉的综合评选（不含提名、入围）计算权重为300%，获省教育厅各类关于学校荣誉的综合评选 （不含提名、入围）计算权重为100%。",
        },
        {
          USERNAME: "院长办公室",
          UPDATEDATE: "2024-01-05 09:19:12",
          FILE_DESCRIPTION: "国家高技能人才培养基地",
          TASK_EXECUTE_DESCRIPTION:
            "社会影响力（0.4分）：获教育部各类关于学校荣誉的综合评选（不含提名、入围）计算权重为300%，获省教育厅各类关于学校荣誉的综合评选 （不含提名、入围）计算权重为100%。",
        },
        {
          USERNAME: "院长办公室",
          UPDATEDATE: "2024-01-05 09:18:50",
          FILE_DESCRIPTION: "第二批水利职业教育教师教学创新团队",
          TASK_EXECUTE_DESCRIPTION:
            "社会影响力（0.4分）：获教育部各类关于学校荣誉的综合评选（不含提名、入围）计算权重为300%，获省教育厅各类关于学校荣誉的综合评选 （不含提名、入围）计算权重为100%。",
        },
        {
          USERNAME: "教务处（科研处）",
          UPDATEDATE: "2024-01-05 09:16:54",
          FILE_DESCRIPTION:
            "我院“十四五”期间立项国家级、省级规划教材、优质教材等获奖教材的累计7本，其中水利系6本，建工系1本。",
          TASK_EXECUTE_DESCRIPTION:
            "教材建设水平（1分）：“十四五”期间国家级、省级规划教材、获奖教材累计数。教材建设获奖等级分为特等奖、一等奖、二等奖。学校人员在所获奖励中的排名情况一并折合计分。省部级及以上获奖教材数折算方法：国家级特等奖为400%，一等奖为300%，二等奖为200%，省级特等奖150%，一等奖为 100%，二等奖为50%，省级其他等级不予统计。第一排名为100%计算分数，第二排名为50%计算分数，第三排名为30%计算分数，其他排名不予统计。国家级教材建设奖先进个人、先进集体计算权重等同国家级教材建设一等奖。国家级规划教材等同于省级一等奖。各类奖项不重复计算。",
        },
        {
          USERNAME: "院长办公室",
          UPDATEDATE: "2024-01-05 09:14:02",
          FILE_DESCRIPTION:
            " 2023年全国职业院校技能大赛数字化产品设计与开发赛项获全国二等奖",
          TASK_EXECUTE_DESCRIPTION:
            "社会影响力（0.4分）：获教育部各类关于学校荣誉的综合评选（不含提名、入围）计算权重为300%，获省教育厅各类关于学校荣誉的综合评选 （不含提名、入围）计算权重为100%。",
        },
        {
          USERNAME: "院长办公室",
          UPDATEDATE: "2024-01-05 09:13:57",
          FILE_DESCRIPTION:
            " 2023年全国职业院校技能大赛数字化产品设计与开发赛项获全国二等奖",
          TASK_EXECUTE_DESCRIPTION:
            "社会影响力（0.4分）：获教育部各类关于学校荣誉的综合评选（不含提名、入围）计算权重为300%，获省教育厅各类关于学校荣誉的综合评选 （不含提名、入围）计算权重为100%。",
        },
        {
          USERNAME: "院长办公室",
          UPDATEDATE: "2024-01-05 09:13:29",
          FILE_DESCRIPTION: "教学成果奖二等奖证书",
          TASK_EXECUTE_DESCRIPTION:
            "社会影响力（0.4分）：获教育部各类关于学校荣誉的综合评选（不含提名、入围）计算权重为300%，获省教育厅各类关于学校荣誉的综合评选 （不含提名、入围）计算权重为100%。",
        },
        {
          USERNAME: "院长办公室",
          UPDATEDATE: "2024-01-05 09:12:53",
          FILE_DESCRIPTION: "中心组学法",
          TASK_EXECUTE_DESCRIPTION:
            "依法治校落实情况（3分）：出现违反议事规则，“三重一大”决策机制执行不到位，违规异地办学、建设校区、校外办学，每起扣0.2分；存在违规有偿招生，违规组织招生、实习、校企合作、中外合作办学项目等情况，每起扣0.3分；出现毕业生去向落实统计、会计资料数据造假等事件，每起扣0.5分。",
        },
        {
          USERNAME: "院长办公室",
          UPDATEDATE: "2024-01-05 09:12:42",
          FILE_DESCRIPTION: "中心组学法",
          TASK_EXECUTE_DESCRIPTION:
            "依法治校落实情况（3分）：出现违反议事规则，“三重一大”决策机制执行不到位，违规异地办学、建设校区、校外办学，每起扣0.2分；存在违规有偿招生，违规组织招生、实习、校企合作、中外合作办学项目等情况，每起扣0.3分；出现毕业生去向落实统计、会计资料数据造假等事件，每起扣0.5分。",
        },
        {
          USERNAME: "院长办公室",
          UPDATEDATE: "2024-01-05 09:12:24",
          FILE_DESCRIPTION: "中心组学法",
          TASK_EXECUTE_DESCRIPTION:
            "依法治校落实情况（3分）：出现违反议事规则，“三重一大”决策机制执行不到位，违规异地办学、建设校区、校外办学，每起扣0.2分；存在违规有偿招生，违规组织招生、实习、校企合作、中外合作办学项目等情况，每起扣0.3分；出现毕业生去向落实统计、会计资料数据造假等事件，每起扣0.5分。",
        },
        {
          USERNAME: "院长办公室",
          UPDATEDATE: "2024-01-05 09:12:03",
          FILE_DESCRIPTION: "中心组学法",
          TASK_EXECUTE_DESCRIPTION:
            "依法治校落实情况（3分）：出现违反议事规则，“三重一大”决策机制执行不到位，违规异地办学、建设校区、校外办学，每起扣0.2分；存在违规有偿招生，违规组织招生、实习、校企合作、中外合作办学项目等情况，每起扣0.3分；出现毕业生去向落实统计、会计资料数据造假等事件，每起扣0.5分。",
        },
        {
          USERNAME: "院长办公室",
          UPDATEDATE: "2024-01-05 09:11:44",
          FILE_DESCRIPTION: "投诉通报无我院",
          TASK_EXECUTE_DESCRIPTION:
            "依法治校落实情况（3分）：出现违反议事规则，“三重一大”决策机制执行不到位，违规异地办学、建设校区、校外办学，每起扣0.2分；存在违规有偿招生，违规组织招生、实习、校企合作、中外合作办学项目等情况，每起扣0.3分；出现毕业生去向落实统计、会计资料数据造假等事件，每起扣0.5分。",
        },
        {
          USERNAME: "院长办公室",
          UPDATEDATE: "2024-01-05 09:11:13",
          FILE_DESCRIPTION: "依法治校",
          TASK_EXECUTE_DESCRIPTION:
            "依法治校落实情况（3分）：出现违反议事规则，“三重一大”决策机制执行不到位，违规异地办学、建设校区、校外办学，每起扣0.2分；存在违规有偿招生，违规组织招生、实习、校企合作、中外合作办学项目等情况，每起扣0.3分；出现毕业生去向落实统计、会计资料数据造假等事件，每起扣0.5分。",
        },
        {
          USERNAME: "院长办公室",
          UPDATEDATE: "2024-01-05 09:10:54",
          FILE_DESCRIPTION: "依法招生",
          TASK_EXECUTE_DESCRIPTION:
            "依法治校落实情况（3分）：出现违反议事规则，“三重一大”决策机制执行不到位，违规异地办学、建设校区、校外办学，每起扣0.2分；存在违规有偿招生，违规组织招生、实习、校企合作、中外合作办学项目等情况，每起扣0.3分；出现毕业生去向落实统计、会计资料数据造假等事件，每起扣0.5分。",
        },
        {
          USERNAME: "院长办公室",
          UPDATEDATE: "2024-01-05 09:10:42",
          FILE_DESCRIPTION: "依法招生",
          TASK_EXECUTE_DESCRIPTION:
            "依法治校落实情况（3分）：出现违反议事规则，“三重一大”决策机制执行不到位，违规异地办学、建设校区、校外办学，每起扣0.2分；存在违规有偿招生，违规组织招生、实习、校企合作、中外合作办学项目等情况，每起扣0.3分；出现毕业生去向落实统计、会计资料数据造假等事件，每起扣0.5分。",
        },
        {
          USERNAME: "院长办公室",
          UPDATEDATE: "2024-01-05 09:10:31",
          FILE_DESCRIPTION: "每年依法招生",
          TASK_EXECUTE_DESCRIPTION:
            "依法治校落实情况（3分）：出现违反议事规则，“三重一大”决策机制执行不到位，违规异地办学、建设校区、校外办学，每起扣0.2分；存在违规有偿招生，违规组织招生、实习、校企合作、中外合作办学项目等情况，每起扣0.3分；出现毕业生去向落实统计、会计资料数据造假等事件，每起扣0.5分。",
        },
        {
          USERNAME: "院长办公室",
          UPDATEDATE: "2024-01-05 09:10:08",
          FILE_DESCRIPTION: "江西水利职业学院章程",
          TASK_EXECUTE_DESCRIPTION:
            "依法治校落实情况（3分）：出现违反议事规则，“三重一大”决策机制执行不到位，违规异地办学、建设校区、校外办学，每起扣0.2分；存在违规有偿招生，违规组织招生、实习、校企合作、中外合作办学项目等情况，每起扣0.3分；出现毕业生去向落实统计、会计资料数据造假等事件，每起扣0.5分。",
        },
        {
          USERNAME: "院长办公室",
          UPDATEDATE: "2024-01-05 09:09:56",
          FILE_DESCRIPTION: "江西水利职业学院章程",
          TASK_EXECUTE_DESCRIPTION:
            "依法治校落实情况（3分）：出现违反议事规则，“三重一大”决策机制执行不到位，违规异地办学、建设校区、校外办学，每起扣0.2分；存在违规有偿招生，违规组织招生、实习、校企合作、中外合作办学项目等情况，每起扣0.3分；出现毕业生去向落实统计、会计资料数据造假等事件，每起扣0.5分。",
        },
        {
          USERNAME: "院长办公室",
          UPDATEDATE: "2024-01-05 09:09:28",
          FILE_DESCRIPTION: "学院“三重一大”文件",
          TASK_EXECUTE_DESCRIPTION:
            "依法治校落实情况（3分）：出现违反议事规则，“三重一大”决策机制执行不到位，违规异地办学、建设校区、校外办学，每起扣0.2分；存在违规有偿招生，违规组织招生、实习、校企合作、中外合作办学项目等情况，每起扣0.3分；出现毕业生去向落实统计、会计资料数据造假等事件，每起扣0.5分。",
        },
        {
          USERNAME: "院长办公室",
          UPDATEDATE: "2024-01-05 09:09:02",
          FILE_DESCRIPTION: "法律顾问协议书",
          TASK_EXECUTE_DESCRIPTION:
            "依法治校落实情况（3分）：出现违反议事规则，“三重一大”决策机制执行不到位，违规异地办学、建设校区、校外办学，每起扣0.2分；存在违规有偿招生，违规组织招生、实习、校企合作、中外合作办学项目等情况，每起扣0.3分；出现毕业生去向落实统计、会计资料数据造假等事件，每起扣0.5分。",
        },
        {
          USERNAME: "院长办公室",
          UPDATEDATE: "2024-01-05 09:08:43",
          FILE_DESCRIPTION: "暂无说明",
          TASK_EXECUTE_DESCRIPTION:
            "依法治校落实情况（3分）：出现违反议事规则，“三重一大”决策机制执行不到位，违规异地办学、建设校区、校外办学，每起扣0.2分；存在违规有偿招生，违规组织招生、实习、校企合作、中外合作办学项目等情况，每起扣0.3分；出现毕业生去向落实统计、会计资料数据造假等事件，每起扣0.5分。",
        },
        {
          USERNAME: "院长办公室",
          UPDATEDATE: "2024-01-05 09:08:36",
          FILE_DESCRIPTION: "暂无说明",
          TASK_EXECUTE_DESCRIPTION:
            "依法治校落实情况（3分）：出现违反议事规则，“三重一大”决策机制执行不到位，违规异地办学、建设校区、校外办学，每起扣0.2分；存在违规有偿招生，违规组织招生、实习、校企合作、中外合作办学项目等情况，每起扣0.3分；出现毕业生去向落实统计、会计资料数据造假等事件，每起扣0.5分。",
        },
        {
          USERNAME: "院长办公室",
          UPDATEDATE: "2024-01-05 09:08:29",
          FILE_DESCRIPTION: "党委会学习法律材料",
          TASK_EXECUTE_DESCRIPTION:
            "依法治校落实情况（3分）：出现违反议事规则，“三重一大”决策机制执行不到位，违规异地办学、建设校区、校外办学，每起扣0.2分；存在违规有偿招生，违规组织招生、实习、校企合作、中外合作办学项目等情况，每起扣0.3分；出现毕业生去向落实统计、会计资料数据造假等事件，每起扣0.5分。",
        },
        {
          USERNAME: "教务处（科研处）",
          UPDATEDATE: "2024-01-04 17:14:58",
          FILE_DESCRIPTION: "以促进就业创业为主的大禹水利技术孵化基地建设",
          TASK_EXECUTE_DESCRIPTION:
            "办学特色案例（3分）： 由高校根据办学优势和特色，提供本校在教学改革、推动科技服务（含科研平台建设）、乡村振兴、“1269”行动计划、高端智库、现场工程师产业学院等方面服务江西高质量发展的典型案例，采用专家组评分。",
        },
        {
          USERNAME: "教务处（科研处）",
          UPDATEDATE: "2024-01-04 17:14:42",
          FILE_DESCRIPTION: "“三段-六步”任务驱动式教学案例（水工建筑物）",
          TASK_EXECUTE_DESCRIPTION:
            "办学特色案例（3分）： 由高校根据办学优势和特色，提供本校在教学改革、推动科技服务（含科研平台建设）、乡村振兴、“1269”行动计划、高端智库、现场工程师产业学院等方面服务江西高质量发展的典型案例，采用专家组评分。",
        },
        {
          USERNAME: "教务处（科研处）",
          UPDATEDATE: "2024-01-04 17:14:30",
          FILE_DESCRIPTION: "多元结合齐聚力 智慧连线“云课堂”",
          TASK_EXECUTE_DESCRIPTION:
            "办学特色案例（3分）： 由高校根据办学优势和特色，提供本校在教学改革、推动科技服务（含科研平台建设）、乡村振兴、“1269”行动计划、高端智库、现场工程师产业学院等方面服务江西高质量发展的典型案例，采用专家组评分。",
        },
        {
          USERNAME: "教务处（科研处）",
          UPDATEDATE: "2024-01-04 17:14:18",
          FILE_DESCRIPTION: "专业教学资源库建设典型案例",
          TASK_EXECUTE_DESCRIPTION:
            "办学特色案例（3分）： 由高校根据办学优势和特色，提供本校在教学改革、推动科技服务（含科研平台建设）、乡村振兴、“1269”行动计划、高端智库、现场工程师产业学院等方面服务江西高质量发展的典型案例，采用专家组评分。",
        },
        {
          USERNAME: "教务处（科研处）",
          UPDATEDATE: "2024-01-04 17:14:08",
          FILE_DESCRIPTION: "水工三定向人才培养案例",
          TASK_EXECUTE_DESCRIPTION:
            "办学特色案例（3分）： 由高校根据办学优势和特色，提供本校在教学改革、推动科技服务（含科研平台建设）、乡村振兴、“1269”行动计划、高端智库、现场工程师产业学院等方面服务江西高质量发展的典型案例，采用专家组评分。",
        },
        {
          USERNAME: "教务处（科研处）",
          UPDATEDATE: "2024-01-04 17:13:52",
          FILE_DESCRIPTION: "实践教学基地典型案例2023",
          TASK_EXECUTE_DESCRIPTION:
            "办学特色案例（3分）： 由高校根据办学优势和特色，提供本校在教学改革、推动科技服务（含科研平台建设）、乡村振兴、“1269”行动计划、高端智库、现场工程师产业学院等方面服务江西高质量发展的典型案例，采用专家组评分。",
        },
        {
          USERNAME: "教务处（科研处）",
          UPDATEDATE: "2024-01-04 17:13:44",
          FILE_DESCRIPTION: "人才培养模式创新2023",
          TASK_EXECUTE_DESCRIPTION:
            "办学特色案例（3分）： 由高校根据办学优势和特色，提供本校在教学改革、推动科技服务（含科研平台建设）、乡村振兴、“1269”行动计划、高端智库、现场工程师产业学院等方面服务江西高质量发展的典型案例，采用专家组评分。",
        },
        {
          USERNAME: "教务处（科研处）",
          UPDATEDATE: "2024-01-04 17:13:33",
          FILE_DESCRIPTION: "课程教学资源建设2023",
          TASK_EXECUTE_DESCRIPTION:
            "办学特色案例（3分）： 由高校根据办学优势和特色，提供本校在教学改革、推动科技服务（含科研平台建设）、乡村振兴、“1269”行动计划、高端智库、现场工程师产业学院等方面服务江西高质量发展的典型案例，采用专家组评分。",
        },
        {
          USERNAME: "教务处（科研处）",
          UPDATEDATE: "2024-01-04 17:13:20",
          FILE_DESCRIPTION: "可持续发展保障机制2023",
          TASK_EXECUTE_DESCRIPTION:
            "办学特色案例（3分）： 由高校根据办学优势和特色，提供本校在教学改革、推动科技服务（含科研平台建设）、乡村振兴、“1269”行动计划、高端智库、现场工程师产业学院等方面服务江西高质量发展的典型案例，采用专家组评分。",
        },
        {
          USERNAME: "教务处（科研处）",
          UPDATEDATE: "2024-01-04 17:13:07",
          FILE_DESCRIPTION: "教学创新团队建设2023",
          TASK_EXECUTE_DESCRIPTION:
            "办学特色案例（3分）： 由高校根据办学优势和特色，提供本校在教学改革、推动科技服务（含科研平台建设）、乡村振兴、“1269”行动计划、高端智库、现场工程师产业学院等方面服务江西高质量发展的典型案例，采用专家组评分。",
        },
        {
          USERNAME: "教务处（科研处）",
          UPDATEDATE: "2024-01-04 17:12:47",
          FILE_DESCRIPTION: "教材与教法改革2023",
          TASK_EXECUTE_DESCRIPTION:
            "办学特色案例（3分）： 由高校根据办学优势和特色，提供本校在教学改革、推动科技服务（含科研平台建设）、乡村振兴、“1269”行动计划、高端智库、现场工程师产业学院等方面服务江西高质量发展的典型案例，采用专家组评分。",
        },
        {
          USERNAME: "教务处（科研处）",
          UPDATEDATE: "2024-01-04 17:12:23",
          FILE_DESCRIPTION: "技术技能平台典型案例2023",
          TASK_EXECUTE_DESCRIPTION:
            "办学特色案例（3分）： 由高校根据办学优势和特色，提供本校在教学改革、推动科技服务（含科研平台建设）、乡村振兴、“1269”行动计划、高端智库、现场工程师产业学院等方面服务江西高质量发展的典型案例，采用专家组评分。",
        },
        {
          USERNAME: "教务处（科研处）",
          UPDATEDATE: "2024-01-04 17:12:11",
          FILE_DESCRIPTION: "对外交流与合作2023",
          TASK_EXECUTE_DESCRIPTION:
            "办学特色案例（3分）： 由高校根据办学优势和特色，提供本校在教学改革、推动科技服务（含科研平台建设）、乡村振兴、“1269”行动计划、高端智库、现场工程师产业学院等方面服务江西高质量发展的典型案例，采用专家组评分。",
        },
        {
          USERNAME: "教务处（科研处）",
          UPDATEDATE: "2024-01-04 17:11:49",
          FILE_DESCRIPTION: "参与社会服务2023",
          TASK_EXECUTE_DESCRIPTION:
            "办学特色案例（3分）： 由高校根据办学优势和特色，提供本校在教学改革、推动科技服务（含科研平台建设）、乡村振兴、“1269”行动计划、高端智库、现场工程师产业学院等方面服务江西高质量发展的典型案例，采用专家组评分。",
        },
        {
          USERNAME: "教务处（科研处）",
          UPDATEDATE: "2024-01-04 17:10:47",
          FILE_DESCRIPTION: "共完成9个案例",
          TASK_EXECUTE_DESCRIPTION:
            "办学特色案例（3分）： 由高校根据办学优势和特色，提供本校在教学改革、推动科技服务（含科研平台建设）、乡村振兴、“1269”行动计划、高端智库、现场工程师产业学院等方面服务江西高质量发展的典型案例，采用专家组评分。",
        },
        {
          USERNAME: "教务处（科研处）",
          UPDATEDATE: "2024-01-04 17:08:28",
          FILE_DESCRIPTION:
            "2023年，余美华团队的《大数据案例分析与应用》和常英祖团队的《灌溉排水工程技术》、熊君团队的《水利工程施工》被认定为2023年江西省职业教育一流核心课程。",
          TASK_EXECUTE_DESCRIPTION:
            "精品（核心）课程数（2分）：现有精品（核心）课程累计数，入选国家级的折算为300%，入选省级的为100%，同一课程按最高级别计算，不重复计算 。",
        },
        {
          USERNAME: "教务处（科研处）",
          UPDATEDATE: "2024-01-04 17:08:08",
          FILE_DESCRIPTION:
            "2023年10月25日，学院熊君老师主持的《堤防防汛与抢险工程》被认定为2023年省级精品在线开放课程。",
          TASK_EXECUTE_DESCRIPTION:
            "精品（核心）课程数（2分）：现有精品（核心）课程累计数，入选国家级的折算为300%，入选省级的为100%，同一课程按最高级别计算，不重复计算 。",
        },
        {
          USERNAME: "教务处（科研处）",
          UPDATEDATE: "2024-01-04 17:02:31",
          FILE_DESCRIPTION:
            "2023年10月25日，学院熊君老师主持的《堤防防汛与抢险工程》被认定为2023年省级精品在线开放课程。\n",
          TASK_EXECUTE_DESCRIPTION:
            "精品（核心）课程数（2分）：现有精品（核心）课程累计数，入选国家级的折算为300%，入选省级的为100%，同一课程按最高级别计算，不重复计算 。",
        },
        {
          USERNAME: "教务处（科研处）",
          UPDATEDATE: "2024-01-04 16:33:22",
          FILE_DESCRIPTION:
            "2023年，江西省教育厅印发《关于“十四五”期间首批省级职业教育专业教学资源库立项建设名单的通知》，学院水利工程和动漫制作技术两个专业教学资源库获得省级立项。",
          TASK_EXECUTE_DESCRIPTION:
            "教学资源库建设水平（2分）：现有国家级、省级教学资源库累计数，国家级立项的专业教学资源库折算为300%，国家级立项的专业教育资源库子项目为200%，，省级立项为100%，第一主持折算为100%，第二主持为80%，第三主持为50%，同一专业教学资源库以最高级别计算，不重复计算。",
        },
        {
          USERNAME: "教务处（科研处）",
          UPDATEDATE: "2024-01-04 16:14:09",
          FILE_DESCRIPTION:
            "2023年5月19日，江西省教育厅、江西省财政厅印发《关于公布江西省第二轮高水平高职学校和专业群建设计划建设单位名单的通知》(赣教职成字〔2023〕11号)，学院水利水电建筑工程和动漫制作技术两个专业群成功入选第二轮江西省高水平专业建设群单位。",
          TASK_EXECUTE_DESCRIPTION:
            "专业（群）建设水平（4分）：获批一个国家级高水平专业（群）得4分，获批一个省级高水平专业（群 ）得1分，可累计计算，同一专业（群）按最高级别计算，不重复计算。资金投入及建设任务未按照专业（群）建设方案进度如期完成者，此项不得分。",
        },
        {
          USERNAME: "财务审计处",
          UPDATEDATE: "2024-01-04 16:00:43",
          FILE_DESCRIPTION: "材料目录清单",
          TASK_EXECUTE_DESCRIPTION:
            "教学经费投入（3分）：考核学校当年教育教学投入占比情况。教学经费投入占比=（教学日常运行支出 +教学科研仪器设备采购值）/（生均财政拨款到款总额+按照核准收费标准实际收取的学费总额）。",
        },
        {
          USERNAME: "财务审计处",
          UPDATEDATE: "2024-01-04 15:59:22",
          FILE_DESCRIPTION: "材料目录清单",
          TASK_EXECUTE_DESCRIPTION:
            "教师培养培训经费投入（2分）：主要考核当年用于教师培养培训经费投入占比情况。教师培养培训经费投入占比=用于教师培养培训经费/（生均财政拨款到款总额+按照核准收费标准实际收取的学费总额）。",
        },
        {
          USERNAME: "财务审计处",
          UPDATEDATE: "2024-01-04 15:58:35",
          FILE_DESCRIPTION: "材料目录清单",
          TASK_EXECUTE_DESCRIPTION:
            "生均财政拨款投入（2分）：学校当年专科层次学生的生均财政拨款达到12000元/人为“合格”，得2分，低于12000元/人采用比率法计分。该指标得分=本校实际值÷合格标准值×指标分数权重。",
        },
        {
          USERNAME: "财务审计处",
          UPDATEDATE: "2024-01-04 15:55:13",
          FILE_DESCRIPTION: "师资培训投入统计明细账",
          TASK_EXECUTE_DESCRIPTION:
            "教师培养培训经费投入（2分）：主要考核当年用于教师培养培训经费投入占比情况。教师培养培训经费投入占比=用于教师培养培训经费/（生均财政拨款到款总额+按照核准收费标准实际收取的学费总额）。",
        },
        {
          USERNAME: "财务审计处",
          UPDATEDATE: "2024-01-04 15:54:21",
          FILE_DESCRIPTION: "2023年教学经费投入明细账",
          TASK_EXECUTE_DESCRIPTION:
            "教学经费投入（3分）：考核学校当年教育教学投入占比情况。教学经费投入占比=（教学日常运行支出 +教学科研仪器设备采购值）/（生均财政拨款到款总额+按照核准收费标准实际收取的学费总额）。",
        },
        {
          USERNAME: "财务审计处",
          UPDATEDATE: "2024-01-04 15:53:04",
          FILE_DESCRIPTION: "高职生均拨款资金下达文件",
          TASK_EXECUTE_DESCRIPTION:
            "生均财政拨款投入（2分）：学校当年专科层次学生的生均财政拨款达到12000元/人为“合格”，得2分，低于12000元/人采用比率法计分。该指标得分=本校实际值÷合格标准值×指标分数权重。",
        },
        {
          USERNAME: "财务审计处",
          UPDATEDATE: "2024-01-04 15:52:14",
          FILE_DESCRIPTION: "国库集中支付预算执行情况表",
          TASK_EXECUTE_DESCRIPTION:
            "生均财政拨款投入（2分）：学校当年专科层次学生的生均财政拨款达到12000元/人为“合格”，得2分，低于12000元/人采用比率法计分。该指标得分=本校实际值÷合格标准值×指标分数权重。",
        },
        {
          USERNAME: "财务审计处",
          UPDATEDATE: "2024-01-04 15:51:48",
          FILE_DESCRIPTION: "2023年生均拨款清算表",
          TASK_EXECUTE_DESCRIPTION:
            "生均财政拨款投入（2分）：学校当年专科层次学生的生均财政拨款达到12000元/人为“合格”，得2分，低于12000元/人采用比率法计分。该指标得分=本校实际值÷合格标准值×指标分数权重。",
        },
        {
          USERNAME: "财务审计处",
          UPDATEDATE: "2024-01-04 15:51:14",
          FILE_DESCRIPTION:
            "本指标自评得分为：2分。2023年学校实际收到高职生均财政拨款经费12266.40万元（不含弹性学制），2022年全日制高职学生10222人，该指标得分＝12266.40万÷（10222人×1.2万/人）×2分＝2分。",
          TASK_EXECUTE_DESCRIPTION:
            "生均财政拨款投入（2分）：学校当年专科层次学生的生均财政拨款达到12000元/人为“合格”，得2分，低于12000元/人采用比率法计分。该指标得分=本校实际值÷合格标准值×指标分数权重。",
        },
        {
          USERNAME: "人事处（党委组织部）",
          UPDATEDATE: "2024-01-04 09:33:45",
          FILE_DESCRIPTION: "四类-省优秀高技能人才王文军",
          TASK_EXECUTE_DESCRIPTION:
            "高层次高技能人才数（2分）： 高层次人才及团队（2分）：学校现有三类、四类、五类人才分别折算300%、200%、150%，55周岁及以下具有高级职称的博士折算为100%。当年新增二类及以上人才该项得2分，三类至五类人才及团队如获多个称号，严格按照就高原则，只计分1次（含团队负责人），如团队负责人已办理退休手续 ，按照证书上团队成员名次递补1位进行认定。当年引进的博士，如获人才称号，可按人才称号、博士引进分别计分。",
        },
        {
          USERNAME: "人事处（党委组织部）",
          UPDATEDATE: "2024-01-04 09:31:12",
          FILE_DESCRIPTION: "引进博士协议",
          TASK_EXECUTE_DESCRIPTION:
            "高层次高技能人才数（2分）： 高层次人才及团队（2分）：学校现有三类、四类、五类人才分别折算300%、200%、150%，55周岁及以下具有高级职称的博士折算为100%。当年新增二类及以上人才该项得2分，三类至五类人才及团队如获多个称号，严格按照就高原则，只计分1次（含团队负责人），如团队负责人已办理退休手续 ，按照证书上团队成员名次递补1位进行认定。当年引进的博士，如获人才称号，可按人才称号、博士引进分别计分。",
        },
        {
          USERNAME: "人事处（党委组织部）",
          UPDATEDATE: "2024-01-04 09:30:58",
          FILE_DESCRIPTION: "引进博士协议",
          TASK_EXECUTE_DESCRIPTION:
            "高层次高技能人才数（2分）： 高层次人才及团队（2分）：学校现有三类、四类、五类人才分别折算300%、200%、150%，55周岁及以下具有高级职称的博士折算为100%。当年新增二类及以上人才该项得2分，三类至五类人才及团队如获多个称号，严格按照就高原则，只计分1次（含团队负责人），如团队负责人已办理退休手续 ，按照证书上团队成员名次递补1位进行认定。当年引进的博士，如获人才称号，可按人才称号、博士引进分别计分。",
        },
        {
          USERNAME: "人事处（党委组织部）",
          UPDATEDATE: "2024-01-04 09:30:37",
          FILE_DESCRIPTION: "引进博士协议",
          TASK_EXECUTE_DESCRIPTION:
            "高层次高技能人才数（2分）： 高层次人才及团队（2分）：学校现有三类、四类、五类人才分别折算300%、200%、150%，55周岁及以下具有高级职称的博士折算为100%。当年新增二类及以上人才该项得2分，三类至五类人才及团队如获多个称号，严格按照就高原则，只计分1次（含团队负责人），如团队负责人已办理退休手续 ，按照证书上团队成员名次递补1位进行认定。当年引进的博士，如获人才称号，可按人才称号、博士引进分别计分。",
        },
        {
          USERNAME: "人事处（党委组织部）",
          UPDATEDATE: "2024-01-04 09:28:57",
          FILE_DESCRIPTION: "2022年双师名单",
          TASK_EXECUTE_DESCRIPTION:
            "师资结构（3分）： （1）“双师型”教师数占专业课教师比例（2分） ：占比高于60%为“合格”，得2分，占比低于30%“不合格”，得0分，其他情况采用比率法计分。该指标得分=本校实际值÷合格标准值×指标分数权重。 （2）具有研究生学位教师数占专任教师比例（1分 ）：达到“合格”标准得1分，低于“限制招生”标准得0分，“合格”与“限制招生”之间采用比率法计分。该指标得分=本校实际值÷合格标准值×指标分数权重。",
        },
        {
          USERNAME: "人事处（党委组织部）",
          UPDATEDATE: "2024-01-04 09:28:38",
          FILE_DESCRIPTION: "2021年双师名单",
          TASK_EXECUTE_DESCRIPTION:
            "师资结构（3分）： （1）“双师型”教师数占专业课教师比例（2分） ：占比高于60%为“合格”，得2分，占比低于30%“不合格”，得0分，其他情况采用比率法计分。该指标得分=本校实际值÷合格标准值×指标分数权重。 （2）具有研究生学位教师数占专任教师比例（1分 ）：达到“合格”标准得1分，低于“限制招生”标准得0分，“合格”与“限制招生”之间采用比率法计分。该指标得分=本校实际值÷合格标准值×指标分数权重。",
        },
        {
          USERNAME: "人事处（党委组织部）",
          UPDATEDATE: "2024-01-04 09:28:13",
          FILE_DESCRIPTION: "2020年双师名单",
          TASK_EXECUTE_DESCRIPTION:
            "师资结构（3分）： （1）“双师型”教师数占专业课教师比例（2分） ：占比高于60%为“合格”，得2分，占比低于30%“不合格”，得0分，其他情况采用比率法计分。该指标得分=本校实际值÷合格标准值×指标分数权重。 （2）具有研究生学位教师数占专任教师比例（1分 ）：达到“合格”标准得1分，低于“限制招生”标准得0分，“合格”与“限制招生”之间采用比率法计分。该指标得分=本校实际值÷合格标准值×指标分数权重。",
        },
        {
          USERNAME: "人事处（党委组织部）",
          UPDATEDATE: "2024-01-04 09:27:52",
          FILE_DESCRIPTION: "2019年双师名单",
          TASK_EXECUTE_DESCRIPTION:
            "师资结构（3分）： （1）“双师型”教师数占专业课教师比例（2分） ：占比高于60%为“合格”，得2分，占比低于30%“不合格”，得0分，其他情况采用比率法计分。该指标得分=本校实际值÷合格标准值×指标分数权重。 （2）具有研究生学位教师数占专任教师比例（1分 ）：达到“合格”标准得1分，低于“限制招生”标准得0分，“合格”与“限制招生”之间采用比率法计分。该指标得分=本校实际值÷合格标准值×指标分数权重。",
        },
        {
          USERNAME: "人事处（党委组织部）",
          UPDATEDATE: "2024-01-04 09:27:28",
          FILE_DESCRIPTION: "2018年双师名单",
          TASK_EXECUTE_DESCRIPTION:
            "师资结构（3分）： （1）“双师型”教师数占专业课教师比例（2分） ：占比高于60%为“合格”，得2分，占比低于30%“不合格”，得0分，其他情况采用比率法计分。该指标得分=本校实际值÷合格标准值×指标分数权重。 （2）具有研究生学位教师数占专任教师比例（1分 ）：达到“合格”标准得1分，低于“限制招生”标准得0分，“合格”与“限制招生”之间采用比率法计分。该指标得分=本校实际值÷合格标准值×指标分数权重。",
        },
        {
          USERNAME: "人事处（党委组织部）",
          UPDATEDATE: "2024-01-04 09:26:31",
          FILE_DESCRIPTION: "双师比例70%；研究生学位比例63%",
          TASK_EXECUTE_DESCRIPTION:
            "师资结构（3分）： （1）“双师型”教师数占专业课教师比例（2分） ：占比高于60%为“合格”，得2分，占比低于30%“不合格”，得0分，其他情况采用比率法计分。该指标得分=本校实际值÷合格标准值×指标分数权重。 （2）具有研究生学位教师数占专任教师比例（1分 ）：达到“合格”标准得1分，低于“限制招生”标准得0分，“合格”与“限制招生”之间采用比率法计分。该指标得分=本校实际值÷合格标准值×指标分数权重。",
        },
        {
          USERNAME: "人事处（党委组织部）",
          UPDATEDATE: "2024-01-04 09:11:32",
          FILE_DESCRIPTION: "校外教师台账",
          TASK_EXECUTE_DESCRIPTION:
            "生师比（3分）：达到“合格”标准得3分，低于“限制招生”标准得0分，“合格”与“限制招生”之间采用比率法计分。该指标得分=本校实际值 ÷合格标准值×指标分数权重。",
        },
        {
          USERNAME: "人事处（党委组织部）",
          UPDATEDATE: "2024-01-04 09:11:06",
          FILE_DESCRIPTION: "校内教师台账",
          TASK_EXECUTE_DESCRIPTION:
            "生师比（3分）：达到“合格”标准得3分，低于“限制招生”标准得0分，“合格”与“限制招生”之间采用比率法计分。该指标得分=本校实际值 ÷合格标准值×指标分数权重。",
        },
        {
          USERNAME: "人事处（党委组织部）",
          UPDATEDATE: "2024-01-04 09:10:17",
          FILE_DESCRIPTION:
            "不限四分之一，生师比20.0；限制四分之一，生师比23.8",
          TASK_EXECUTE_DESCRIPTION:
            "生师比（3分）：达到“合格”标准得3分，低于“限制招生”标准得0分，“合格”与“限制招生”之间采用比率法计分。该指标得分=本校实际值 ÷合格标准值×指标分数权重。",
        },
        {
          USERNAME: "教务处（科研处）",
          UPDATEDATE: "2024-01-03 16:18:54",
          FILE_DESCRIPTION:
            "学校科研工作以习近平新时代中国特色社会主义思想为指导，深入实施创新驱动发展战略，以“需求为导向，以学科建设”为依托，积极实施“服务需求，提高质量”的发展策略，积极推动学校科研工作高质量发展，不断创新科研组织模式，完善科研评价机制，创新科研管理体制，打造优良科研生态，2023年学校教规项目立项1项、省教育厅科学技术研究项目立项12项、人文社会科学研究项目立项1项、省水利厅科技项目立项3项。",
          TASK_EXECUTE_DESCRIPTION:
            "科研与社会服务（3分）： （1）纵向科研项目数（1分）：当年获纵向科研项目数量，包括省重大科技研发专项、省重点研发计划项目、省“揭榜挂帅”项目、省产业关键共性技术攻关专项，省社科规划、教育科学规划 、自然科学基金等，省部级计算权重为200%，地厅级项目计算权重为100%。 （2）校企合作净收入（2分）：当年校企合作净收入，师范、财经、政法院校计算权重为300%；综合、工科、农、林、医学院校计算权重为100% ；体育、艺术院校不做硬性要求，此项取各校平均分。",
        },
        {
          USERNAME: "图书信息中心",
          UPDATEDATE: "2024-01-03 16:17:28",
          FILE_DESCRIPTION: "已完成",
          TASK_EXECUTE_DESCRIPTION:
            "数字校园建设（1分）：获批教育部职业院校数字校园试点校建设单位、职业教育信息化标杆校建设单位得1分，获批省级数字校园试点校或信息化标杆校 （含推荐到国家评审项目）得0.5分。",
        },
        {
          USERNAME: "教务处（科研处）",
          UPDATEDATE: "2024-01-03 16:15:17",
          FILE_DESCRIPTION:
            "近年来，学校坚持以习近平新时代中国特色社会主义思想为指导，深入学习贯彻习近平总书记关于教育的重要论述，全面贯彻党的教育方针，落实立德树人根本任务， 实施科教强校展览，不断深化教育教学改革，积极探索新时代教育教学方法，形成了一批具有独创性、科学性和实践性的优秀教学成果，2023年学校获江西省教学成果奖一等奖1项、二等奖1项。",
          TASK_EXECUTE_DESCRIPTION:
            "教学成果奖获奖数（3分）：当年主持国家级教学成果奖计算权重从最高等级起分别为600%、500% 、400%，主持省级教学成果奖计算权重从最高等级起分别为300%、200%、100%，参与国家级教学成果奖计算权重从最高等级起分别为300%、200% 、100%，参与指的是排名前三。",
        },
        {
          USERNAME: "继续教育中心",
          UPDATEDATE: "2024-01-03 11:04:43",
          FILE_DESCRIPTION:
            "我校2023年共开展社会培训4万余人次，学院定点帮扶村永修县立新乡中村村荣获“省级乡村振兴模范党组织”、入选 “江西省乡村振兴示范村创建名单”。",
          TASK_EXECUTE_DESCRIPTION:
            "社会责任与公益性服务（2分）： （1）社会培训（1分）：学校当年开展社会培训人次与在校生人数的占比。社会培训应与学校开设专业相匹配。（2）社区（老年）教育（1分）：学校当年参与“学习型社会建设重点任务”“终身学习品牌”“社区教育示范基地”“老年大学示范校”等项目，以及乡村振兴相关品牌建设项目数量（不包含人员获得荣誉），获批国家级项目每项得1分，省级项目每项得0.5分。",
        },
        {
          USERNAME: "图书信息中心",
          UPDATEDATE: "2024-01-03 09:41:41",
          FILE_DESCRIPTION: "已完成",
          TASK_EXECUTE_DESCRIPTION:
            "数字校园建设（1分）：获批教育部职业院校数字校园试点校建设单位、职业教育信息化标杆校建设单位得1分，获批省级数字校园试点校或信息化标杆校 （含推荐到国家评审项目）得0.5分。",
        },
        {
          USERNAME: "资产管理处（招投标办公室）",
          UPDATEDATE: "2024-01-02 14:44:24",
          FILE_DESCRIPTION: "暂无说明",
          TASK_EXECUTE_DESCRIPTION:
            "生均教学科研仪器设备值（3分）：达到“合格”标准得3分，低于“限制招生”标准得0分，“合格”与“限制招生”之间采用比率法计分。该指标得分=本校实际值÷合格标准值×指标分数权重。",
        },
        {
          USERNAME: "招生就业处（创新创业中心）",
          UPDATEDATE: "2024-01-02 09:23:59",
          FILE_DESCRIPTION:
            "2023届毕业生毕业去向落实率84.21%；访岗拓岗完成128家；招聘会共举办17场",
          TASK_EXECUTE_DESCRIPTION:
            "毕业生就业与发展（3分）： 毕业生去向落实率（2分）：指2023届全日制高职专科毕业生初次毕业去向落实率，全省高职专科平均值为83.84%。其中去向落实率不低于全省平均得2分，低于全省平均5个百分点以内得 1.8分，低于5至10个百分点的学校得1.6分，低于10个百分点以上得1.2分。省教育厅委托第三方核查以及根据学生举报核实毕业生去向落实率统计真实性的情况，每核实一起扣 0.2分，扣完1分即止。 访企拓岗数量及成效（0.5分）：访企拓岗数量及成效得分排名第1得0.5分，访企不足100家得0分，其他采用比率法计分。该指标得分=本校访企拓岗数量及成效得分÷同类高校访企拓岗数量及成效最高分×该指标分值权重。 举办校园招聘会场次（0.5分）：举办校园招聘会场次数排名第1得0.5分，其他采用比率法计分，该指标得分=本校举办校园招聘会次数÷同类高校举办校园招聘会次数最高值×该指标分值权重。",
        },
        {
          USERNAME: "招生就业处（创新创业中心）",
          UPDATEDATE: "2024-01-02 09:19:49",
          FILE_DESCRIPTION: "暂无说明",
          TASK_EXECUTE_DESCRIPTION:
            "围绕“1269”行动计划省级重点产业链相关专业及招生数（2分）： （2）开设重点产业链相关专业招生人数占比（2分） ：学校当年服务重点产业链相关专业全日制招生人数占学校全日制招生总人数的比值。综合、工科、农、林、医类院校服务重点产业链专业招生人数占比不低于40%为“合格”，得2分，师范、财经类院校重点专业招生人数占比不低于10%为“合格”，得2分 ，其他情况采取比率法计分。急需紧缺A档专业招生人数计算权重为300%，B档专业计算权重为200%，C档专业计算权重为100%。D档、E档专业不计数。",
        },
        {
          USERNAME: "招生就业处（创新创业中心）",
          UPDATEDATE: "2024-01-02 09:17:58",
          FILE_DESCRIPTION: "暂无说明",
          TASK_EXECUTE_DESCRIPTION:
            "长学制学生培养情况（2分）：学校当年五年一贯制和3+2分段培养项目的转段数占学校专科层次招生总数的比例。五年一贯制项目中，当年转段进入高职教育阶段的学生数按照150%权重进行折算；3+2分段培养项目中，当年转段进入高职教育阶段的学生数按照100%权重进行折算。",
        },
      ],
      taskSum8: [
        {
          tname: "A.办学方向与依法治校 （ 15 分）",
          list: [
            {
              taskName: "A2.依法治校 （6分）",
              sum: "0.00",
            },
            {
              taskName: "A1.办学方向 （9分）",
              sum: "0.00",
            },
          ],
        },
        {
          tname: "B.办学条件与资源 （31分）",
          list: [
            {
              taskName: "B2.办学投入 （7分）",
              sum: "0.00",
            },
            {
              taskName: "B1.硬件设施 （6分）",
              sum: "0.00",
            },
            {
              taskName: "B3.师资队伍 （8分）",
              sum: "0.00",
            },
            {
              taskName: "B5.数字化资源（3分）",
              sum: "0.00",
            },
            {
              taskName: "B4.实习实训资源（7分）",
              sum: "0.00",
            },
          ],
        },
        {
          tname: "C.办学质量与水平 （36分）",
          list: [
            {
              taskName: "C1.专业建设 （20分）",
              sum: "0.00",
            },
            {
              taskName: "C3.创新成果 （4分）",
              sum: "0.00",
            },
            {
              taskName: "C2.社会服务 （12分）",
              sum: "0.00",
            },
          ],
        },
        {
          tname: "D.办学声誉与特色 （18分）",
          list: [
            {
              taskName: "D1.办学声誉 （5分）",
              sum: "0.00",
            },
            {
              taskName: "D2.特色发展 （3分）",
              sum: "0.00",
            },
            {
              taskName: "D3.满意度评价（10分）",
              sum: "0.00",
            },
          ],
        },
        {
          tname: "E.加减分",
          list: [
            {
              taskName: "加分项",
              sum: "0.00",
            },
            {
              taskName: "减分项",
              sum: "0.00",
            },
          ],
        },
      ],
    },
  };
  let sortName = [
    "党委办公室",
    "人事处（党委组织部）",
    "党委宣传部（党委统战部）",
    "质量管理办公室（教学督导处）",
    "纪检监察室",
    "财务审计处",
    "教务处（科研处）",
    "学生工作处",
    "安全保卫处",
    "总务处（基建处）",
    "新校区建设项目部",
    "招生就业处（创新创业中心）",
    "资产管理处（招投标办公室）",
    "工会",
    "团委",
    "水利工程系（资源环境工程系）",
    "建筑工程系",
    "信息工程系（经济管理系）",
    "机电工程系",
    "公共教学部（思政教学部）",
    "图书信息中心",
    "继续教育中心",
    "后勤服务中心",
    "志敏大道校区",
  ];
  res.data.taskSum6 = res.data.taskSum6.sort((a, b) => {
    return (
      sortName.indexOf(a.DEPARTMENTNAME) - sortName.indexOf(b.DEPARTMENTNAME)
    );
  });
  dataObj.value = res.data;

  // console.log(res.data.taskSum6);
  config1.value.data = res.data.taskSum7.map((item) => {
    return [item.UPDATEDATE + "——" + item.USERNAME + "已自评"];
  });

  config2.value.data = res.data.taskSum9.map((item) => {
    return [
      item.UPDATEDATE + "——" + item.USERNAME + "上传" + item.FILE_DESCRIPTION,
    ];
  });
  dataList.value = res.data.taskSum8.map((item) => {
    item.sum = 0.0;
    item.list.forEach((itemChild) => {
      item.sum = parseFloat(item.sum) + parseFloat(itemChild.sum);
    });
    item.sum = (item.sum / item.list.length).toFixed(2);
    return item;
  });
  //   }
  //   return Promise.resolve();
  // });
};

const flagT = ref(true);
let timer = setInterval(() => {
  flagT.value = false;
  // 建议加上 nextTick 微任务
  // 否则在同一事件内同时将tableShow设置false和true有可能导致组件渲染失败
  nextTick(function () {
    // 加载
    flagT.value = true;
  });
}, 6000);
onBeforeUnmount(() => {
  clearInterval(timer);
});
let bgUrl = isDev ? "/bg.png" : "/portal/console/images/bg.png";

const seeMore = () => {
  router.push({
    path: "/wisdomDataV_dataV1_index2",
    query: { ...route.query },
  });
};

const seeKernelIndex = () => {
  router.push({
    path: "/wisdomDataV_dataV1_index3",
    query: { ...route.query },
  });
};
</script>

<style lang="less" scoped>
.height1 {
  height: calc(100% - 24px);
}
</style>
