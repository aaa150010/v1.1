<template>
  <div class="app-content border h-full relative">
    <div id="container" style="width: 100%; height: 100%"></div>
    <TeleportContainer />
    <addAndUpdateDialog
      :getProjectTree="getProjectTree"
      :getProjectTreeKeepCollapse="getProjectTreeKeepCollapse"
      :getProjectList="getProjectList"
    />
    <a-button class="absolute top-2 left-2" @click="toggleCollapseAll(true)"
      >展开全部</a-button
    >
    <a-button class="absolute top-2 left-28" @click="toggleCollapseAll(false)"
      >收缩全部</a-button
    >
    <div class="absolute bottom-2 left-2 flex">
      <span class="center">
        <span
          class="w-6 h-6 rounded-full inline-block"
          style="background-color: #e7e5e4"
        ></span>
        <span class="ml-2">未完成</span>
      </span>
      <span class="center ml-2">
        <span
          class="w-6 h-6 rounded-full inline-block"
          style="background-color: #fde68a"
        ></span>
        <span class="ml-2">审核中</span>
      </span>
      <span class="center ml-2">
        <span
          class="w-6 h-6 rounded-full inline-block"
          style="background-color: #bfdbfe"
        ></span>
        <span class="ml-2">已完成</span>
      </span>
    </div>

    <a-button class="absolute top-2 right-2"
      ><a-checkbox v-model:checked="showOne" @change="updateShowOne"
        >仅展示和我相关任务</a-checkbox
      ></a-button
    >
  </div>
</template>

<script setup>
import mindNode from "./mindNode.vue";

import { onMounted, ref, defineProps, watch } from "vue";
import { Graph, Cell, Node, Path, Shape } from "@antv/x6";
import { register, getTeleport } from "@antv/x6-vue-shape";
import Hierarchy from "@antv/hierarchy";
import { useStore } from "vuex";
import addAndUpdateDialog from "./components/addAndUpdateDialog.vue";
import {
  getProjectTreeApi,
  deleteNodeApi,
  updateShowOneApi,
} from "@/api/taskManage.js";
import { message, Modal } from "ant-design-vue";
import { ExclamationCircleOutlined } from "@ant-design/icons-vue";
import { createVNode } from "vue";
const store = useStore();

const props = defineProps([
  "selectRow",
  "getProjectList",
  "getProjectListBack",
  "showOne",
]);

const showOne = ref(props.showOne);

const TeleportContainer = getTeleport();

const dataTree = ref({});

const treeList = ref([]);
// const dataTree = ref({
//   id: "1",
//   label: "中心主题",
//   width: 280,
//   height: 100,
//   children: [
//     {
//       id: "1-1",
//       label: "分支主题1",
//       button: "998989",
//       width: 280,
//       height: 100,
//       children: [
//         {
//           id: "1-1-1",
//           label: "子主题1",
//           width: 280,
//           height: 100,
//           leaf: true,
//         },
//         {
//           id: "1-1-2",
//           label: "子主题2",
//           width: 280,
//           height: 100,
//           leaf: true,
//         },
//       ],
//     },
//     {
//       id: "1-2",
//       label: "分支主题2",
//       width: 280,
//       height: 100,
//       leaf: true,
//     },
//   ],
// });

onMounted(async () => {
  initGraph();
  await getProjectTree(true);
});
const registerGraph = () => {
  // 注册节点
  register({
    shape: "custom-vue-node",
    component: mindNode,
  });

  // 横向连接器
  Graph.registerConnector(
    "mindmap",
    (sourcePoint, targetPoint, routerPoints, options) => {
      const midX = sourcePoint.x + 170;
      const midY = sourcePoint.y;
      const ctrX = midX;
      const ctrY = targetPoint.y;
      // console.log(sourcePoint, targetPoint);
      let a = 0;
      let b = ctrY - midY;
      if (Math.sign(b) == 1) {
        a = 8;
      } else if (Math.sign(b) == -1) {
        a = -8;
      }
      const pathData = `
       M ${sourcePoint.x + 160} ${sourcePoint.y}
       L ${midX} ${midY}
       L ${ctrX} ${ctrY - a}
       C ${ctrX} ${ctrY - a} , ${ctrX} ${ctrY} , ${targetPoint.x - 4} ${
        targetPoint.y
      }
      L ${targetPoint.x} ${targetPoint.y}
      `;
      return options.raw ? Path.parse(pathData) : pathData;
    },
    true
  );
  // 纵向连接器
  // Graph.registerConnector(
  //   "mindmap",
  //   (sourcePoint, targetPoint, routerPoints, options) => {
  //     const midX = sourcePoint.x;
  //     const midY = sourcePoint.y + 20;
  //     const ctrX = midX;
  //     const ctrY = targetPoint.y;
  //     // console.log(sourcePoint, targetPoint);
  //     // let a = 0;
  //     // let b = ctrY - midY;
  //     // if (Math.sign(b) == 1) {
  //     //   a = 8;
  //     // } else if (Math.sign(b) == -1) {
  //     //   a = -8;
  //     // }
  //     const pathData = `
  //      M ${sourcePoint.x} ${sourcePoint.y + 10}
  //      L ${midX} ${midY}
  //      L ${targetPoint.x} ${midY}
  //     L ${targetPoint.x} ${targetPoint.y}
  //     `;
  //     return options.raw ? Path.parse(pathData) : pathData;
  //   },
  //   true
  // );
  // 边
  Graph.registerEdge(
    "mindmap-edge",
    {
      inherit: "edge",
      connector: {
        name: "mindmap",
      },
      attrs: {
        line: {
          targetMarker: "",
          stroke: "#A2B1C3",
          strokeWidth: 2,
        },
      },
      zIndex: 0,
    },
    true
  );
};
registerGraph();

let render;
let graph;

const deleteNode = (item, treeListVar) => {
  treeList.value = treeListVar;
  Modal.confirm({
    title:
      "删除当前任务后，与其有关的子任务、统计数据等都将删除。请确认，是否删除当前任务。",
    icon: createVNode(ExclamationCircleOutlined),
    onOk() {
      deleteNodeApi({ taskCode: item.id }).then((res) => {
        if (res.result == "ok") {
          message.success("删除成功！");
          if (item.origin) {
            props.getProjectListBack();
          } else {
            getProjectTreeKeepCollapse();
          }
        }
      });
    },
    onCancel() {},
  });
};

const addNode = (item, treeListVar) => {
  treeList.value = treeListVar;
  store.commit("setNodeConfig", {
    visible: true,
    title: "新增子任务",
    type: "add",
    selectRow: item,
  });
};

const updateNode = (item, treeListVar) => {
  treeList.value = treeListVar;
  store.commit("setNodeConfig", {
    visible: true,
    title: "修改任务",
    type: "update",
    selectRow: item,
  });
};

const seeDetail = (item) => {
  store.commit("setNodeConfig", {
    visible: true,
    title: "查看详情",
    type: "seeDetail",
    selectRow: item,
  });
};

const initGraph = () => {
  graph = new Graph({
    container: document.getElementById("container"),
    grid: {
      size: 10,
      visible: true,
    },
    // background: {
    //   color: "#F2F7FA",
    // },
    autoResize: true,
    connecting: {
      connectionPoint: "anchor",
    },
    interacting: () => {
      edgeLabelMovable: true;
    },
    translating: () => {
      restrict: true;
    },
    mousewheel: true,
    panning: true,
  });

  render = (first, dataTreeVar) => {
    let initTranslate = graph.translate();
    let initZoom = graph.zoom();
    const result = Hierarchy.mindmap(
      dataTreeVar
        ? dataTreeVar
        : filtersDataTree(JSON.parse(JSON.stringify(dataTree.value))),
      {
        direction: "H",
        getHeight(d) {
          return d.height;
        },
        getWidth(d) {
          return d.width;
        },
        getHGap() {
          return 22;
        },
        getVGap() {
          return 20;
        },
        getSide: () => {
          return "right";
        },
      }
    );
    const cells = [];
    const traverse = (hierarchyItem) => {
      if (hierarchyItem) {
        const { data, children } = hierarchyItem;
        cells.push(
          graph.createNode({
            id: data.id,
            shape: "custom-vue-node",
            x: hierarchyItem.x,
            y: hierarchyItem.y,
            width: data.width,
            height: data.height,
            data: data,
            deleteNode,
            addNode,
            updateNode,
            seeDetail,
            attrs: {},
            graph: graph,
            toggleCollapse: toggleCollapse,
            // visible: false,
          })
        );
        if (children) {
          children.forEach((item) => {
            const { id, data } = item;
            cells.push(
              graph.createEdge({
                shape: "mindmap-edge",
                source: {
                  cell: hierarchyItem.id,
                },
                target: {
                  cell: id,
                  anchor: {
                    name: "left",
                  },
                },
              })
            );
            traverse(item);
          });
        }
      }
    };
    traverse(result);
    graph.resetCells(cells);
    if (first) {
      graph.centerContent();
    } else {
      graph.zoomTo(initZoom);
      graph.translate(initTranslate.tx, initTranslate.ty);
    }
    // graph.rotate(90);
    // 纵向树
    // const result = Hierarchy.compactBox(dataTree.value, {
    //   direction: "TB",
    //   getHeight(d) {
    //     return d.height;
    //   },
    //   getWidth(d) {
    //     return d.width;
    //   },
    //   getHGap() {
    //     return 20;
    //   },
    //   getVGap() {
    //     return 30;
    //   },
    //   // getSide: () => {
    //   //   return "right";
    //   // },
    // });
    // const cells = [];
    // const traverse = (hierarchyItem) => {
    //   if (hierarchyItem) {
    //     const { data, children } = hierarchyItem;
    //     cells.push(
    //       graph.createNode({
    //         id: data.id,
    //         shape: "custom-vue-node",
    //         x: hierarchyItem.x,
    //         y: hierarchyItem.y,
    //         width: data.width,
    //         height: data.height,
    //         data: data,
    //         deleteNode,
    //         addNode,
    //         updateNode,
    //         seeDetail,
    //         attrs: {},
    //         graph: graph,

    //         // visible: false,
    //       })
    //     );
    //     if (children) {
    //       children.forEach((item) => {
    //         const { id, data } = item;
    //         cells.push(
    //           graph.createEdge({
    //             shape: "mindmap-edge",
    //             source: {
    //               cell: hierarchyItem.id,
    //               anchor: {
    //                 name: "bottom",
    //               },
    //             },
    //             target: {
    //               cell: id,
    //               anchor: {
    //                 name: "top",
    //               },
    //             },
    //           })
    //         );
    //         traverse(item);
    //       });
    //     }
    //   }
    // };
    // traverse(result);
    // graph.resetCells(cells);
    // if (first) {
    //   graph.centerContent();
    // } else {
    //   graph.zoomTo(initZoom);
    //   graph.translate(initTranslate.tx, initTranslate.ty);
    // }
    // graph.getSuccessors(cells[0]).forEach((item) => {
    //   item.visible = false;
    // });
  };
};

const addTreeProperty = (obj, isCollapseVar, isAll) => {
  obj.width = 280;
  obj.height = 120;
  obj.isCollapse = isCollapseVar == false ? isCollapseVar : true;
  if (obj.children && obj.children.length > 0) {
    obj.children.forEach(function (children) {
      addTreeProperty(children, isAll ? isCollapseVar : false, isAll);
    });
  } else {
    obj.isLeaf = true;
  }
  return obj;
};

const toggleCollapse = (id, flag) => {
  traverseTreeAndModify(dataTree.value, id, "isCollapse", flag);
  let newDataTree = filtersDataTree(JSON.parse(JSON.stringify(dataTree.value)));
  render(false, newDataTree);
};

const filtersDataTree = (obj) => {
  if (!obj.isCollapse) {
    obj.children = null;
  } else {
    if (obj.children && obj.children.length > 0) {
      obj.children.forEach((item) => {
        filtersDataTree(item);
      });
    }
  }
  return obj;
};

const toggleCollapseAll = (flag) => {
  dataTree.value = addTreeProperty(dataTree.value, flag, true);
  let newDataTree = filtersDataTree(JSON.parse(JSON.stringify(dataTree.value)));
  render(false, newDataTree);
};

// 定义一个函数来遍历树并查找节点
const traverseTreeAndModify = (
  node,
  targetId,
  attributeName,
  attributeValue
) => {
  // 检查当前节点是否是目标节点
  if (node.id === targetId) {
    // 找到目标节点，改变属性值
    node[attributeName] = attributeValue;
  }

  // 递归遍历子节点
  if (node.children && node.children.length > 0) {
    node.children.forEach((childNode) => {
      traverseTreeAndModify(childNode, targetId, attributeName, attributeValue);
    });
  }
};

const getProjectTree = (first) => {
  return getProjectTreeApi({
    projectCode: props.selectRow.projectCode,
    type: "MindMap",
  }).then((res) => {
    if (res.result == "ok") {
      if (res.data) {
        dataTree.value = addTreeProperty(res.data);
        render(first);
      } else {
        graph.clearCells();
      }
    }
  });
};

const addTreeKeepCollapse = (obj) => {
  obj.width = 280;
  obj.height = 120;
  let objVar = treeList.value.find((item) => item.id === obj.id);
  if (objVar) {
    obj.isCollapse = objVar.store.data.data.isCollapse;
  } else {
    obj.isCollapse = false;
  }
  if (obj.children && obj.children.length > 0) {
    obj.children.forEach(function (children) {
      addTreeKeepCollapse(children);
    });
  } else {
    obj.isLeaf = true;
  }
  return obj;
};

const getProjectTreeKeepCollapse = () => {
  return getProjectTreeApi({
    projectCode: props.selectRow.projectCode,
    type: "MindMap",
  }).then((res) => {
    if (res.result == "ok") {
      if (res.data) {
        dataTree.value = addTreeKeepCollapse(res.data);
        render();
      } else {
        graph.clearCells();
      }
    }
  });
};

const updateShowOne = () => {
  return updateShowOneApi({
    showOne: showOne.value,
  }).then((res) => {
    if (res.result == "ok") {
      message.success("更新成功！");
      getProjectTree(true);
    }
  });
};

watch(
  () => props.selectRow,
  async () => {
    await getProjectTree(true);
  }
);
</script>

<style lang="less" scoped></style>
