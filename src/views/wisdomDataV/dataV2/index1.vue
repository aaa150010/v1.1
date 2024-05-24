<template>
  <div id="base">
    <!-- Unnamed (矩形) -->
    <div id="u0" class="ax_default box_1">
      <div id="u0_div" class=""></div>
      <div id="u0_text" class="text" style="display: none; visibility: hidden">
        <p></p>
      </div>
    </div>

    <!-- Unnamed (形状) -->
    <div id="u1" class="ax_default line">
      <img id="u1_img" class="img" src="./images/综合数据/u1.svg" />
      <div id="u1_text" class="text" style="display: none; visibility: hidden">
        <p></p>
      </div>
    </div>

    <!-- Unnamed (矩形) -->
    <div id="u2" class="ax_default _三级标题">
      <img id="u2_img" class="img" src="./images/综合数据/u2.svg" />
      <div id="u2_text" class="text">
        <p><span>高校综合数据</span></p>
      </div>
    </div>

    <!-- Unnamed (矩形) -->
    <div id="u3" class="ax_default label">
      <img id="u3_img" class="img" src="./images/综合数据/u3.svg" />
      <div id="u3_text" class="text">
        <p><span></span></p>
      </div>
    </div>

    <!-- Unnamed (矩形) -->
    <div id="u4" class="ax_default box_1">
      <div id="u4_div" class=""></div>
      <div id="u4_text" class="text" style="display: none; visibility: hidden">
        <p></p>
      </div>
    </div>

    <!-- Unnamed (矩形) -->
    <div id="u5" class="ax_default box_1">
      <div id="u5_div" class=""></div>
      <div id="u5_text" class="text" style="display: none; visibility: hidden">
        <p></p>
      </div>
    </div>

    <!-- Unnamed (矩形) -->
    <div id="u6" class="ax_default box_1">
      <div id="u6_div" class=""></div>
      <div id="u6_text" class="text" style="display: none; visibility: hidden">
        <p></p>
      </div>
    </div>

    <!-- Unnamed (矩形) -->
    <div id="u7" class="ax_default box_1">
      <div id="u7_div" class=""></div>
      <div id="u7_text" class="text" style="display: none; visibility: hidden">
        <p></p>
      </div>
    </div>

    <!-- Unnamed (矩形) -->
    <div id="u8" class="ax_default label">
      <div id="u8_div" class=""></div>
      <div id="u8_text" class="text">
        <p><span>数据概览</span></p>
      </div>
    </div>

    <!-- Unnamed (矩形) -->
    <div id="u9" class="ax_default label">
      <div id="u9_div" class=""></div>
      <div id="u9_text" class="text">
        <p><span>学校概况</span></p>
      </div>
    </div>

    <!-- Unnamed (矩形) -->
    <div id="u10" class="ax_default label">
      <div id="u10_div" class=""></div>
      <div id="u10_text" class="text">
        <p><span>专业情况</span></p>
      </div>
    </div>

    <!-- Unnamed (矩形) -->
    <div id="u11" class="ax_default label">
      <div id="u11_div" class=""></div>
      <div id="u11_text" class="text">
        <p><span>师资规模</span></p>
      </div>
    </div>

    <!-- Unnamed (矩形) -->
    <div id="u12" class="ax_default label">
      <div id="u12_div" class=""></div>
      <div id="u12_text" class="text">
        <p><span>课程情况</span></p>
      </div>
    </div>

    <!-- Unnamed (矩形) -->
    <div id="u13" class="ax_default box_1">
      <div id="u13_div" class=""></div>
      <div
        id="u13_text"
        class="text hover:text-sky-400 cursor-pointer"
        @click="clickOther('wisdomDataV_dataV2_index1')"
      >
        <p><span>综合数据</span></p>
      </div>
    </div>

    <!-- Unnamed (矩形) -->
    <div id="u14" class="ax_default box_1 cursor-pointer hover:text-blue-400">
      <div id="u14_div" class=""></div>
      <div
        id="u14_text"
        class="text hover:text-sky-400 cursor-pointer"
        @click="clickOther('wisdomDataV_dataV2_index2')"
      >
        <p><span>在校生数据</span></p>
      </div>
    </div>

    <!-- Unnamed (矩形) -->
    <div id="u15" class="ax_default box_1">
      <div id="u15_div" class=""></div>
      <div
        id="u15_text"
        class="text hover:text-sky-400 cursor-pointer"
        @click="clickOther('wisdomDataV_dataV2_index3')"
      >
        <p><span>招生数据</span></p>
      </div>
    </div>

    <!-- Unnamed (矩形) -->
    <div id="u17" class="ax_default box_1">
      <div id="u17_div" class=""></div>
      <div
        id="u17_text"
        class="text hover:text-sky-400 cursor-pointer"
        @click="clickOther('wisdomDataV_dataV2_index4')"
      >
        <p><span>就业数据</span></p>
      </div>
    </div>

    <!-- Unnamed (矩形) -->
    <div id="u23" class="ax_default box_1">
      <img id="u23_img" class="img" src="./images/综合数据/u23.svg" />
      <div
        id="u23_text"
        class="text hover:text-sky-400 cursor-pointer"
        @click="clickOther('wisdomDataV_dataV2_index5')"
      >
        <p><span>教职工数据</span></p>
      </div>
    </div>

    <!-- Unnamed (矩形) -->
    <div id="u16" class="ax_default box_1">
      <img id="u16_img" class="img" src="./images/综合数据/u16.svg" />
      <div
        id="u16_text"
        class="text hover:text-sky-400 cursor-pointer"
        @click="clickOther('wisdomDataV_dataV2_index6')"
      >
        <p><span>科研数据</span></p>
      </div>
    </div>

    <!-- Unnamed (矩形) -->
    <div id="u18" class="ax_default box_1">
      <img id="u18_img" class="img" src="./images/综合数据/u16.svg" />
      <div
        id="u18_text"
        class="text hover:text-sky-400 cursor-pointer"
        @click="clickOther('wisdomDataV_dataV2_index7')"
      >
        <p><span>后勤数据</span></p>
      </div>
    </div>

    <!-- Unnamed (矩形) -->
    <div id="u19" class="ax_default box_1">
      <img id="u19_img" class="img" src="./images/综合数据/u16.svg" />
      <div
        id="u19_text"
        class="text hover:text-sky-400 cursor-pointer"
        @click="clickOther('wisdomDataV_dataV2_index8')"
      >
        <p><span>图书馆数据</span></p>
      </div>
    </div>
    <!-- Unnamed (矩形) -->
    <div id="u356" class="ax_default box_1">
      <img id="u356_img" class="img" src="./images/综合数据/u16.svg" />
      <div
        id="u356_text"
        class="text hover:text-sky-400 cursor-pointer"
        @click="clickOther('wisdomDataV_dataV2_index9')"
      >
        <p><span>能耗数据</span></p>
      </div>
    </div>

    <!-- Unnamed (矩形) -->
    <div id="u20" class="ax_default box_1">
      <div id="u20_div" class=""></div>
      <div id="u20_text" class="text" style="display: none; visibility: hidden">
        <p></p>
      </div>
    </div>

    <!-- Unnamed (矩形) -->
    <div id="u21" class="ax_default box_1">
      <div id="u21_div" class=""></div>
      <div id="u21_text" class="text" style="display: none; visibility: hidden">
        <p></p>
      </div>
    </div>

    <!-- Unnamed (矩形) -->
    <div id="u22" class="ax_default _三级标题">
      <img id="u22_img" class="img" src="./images/综合数据/u22.svg" />
      <div id="u22_text" class="text">
        <p><span>智慧校园</span></p>
      </div>
    </div>

    <!-- Unnamed (矩形) -->
    <div id="u24" class="ax_default label">
      <div id="u24_div" class=""></div>
      <div id="u24_text" class="text">
        <p><span>校园占地面积</span></p>
      </div>
    </div>

    <!-- Unnamed (矩形) -->
    <div id="u25" class="ax_default label">
      <div id="u25_div" class=""></div>
      <div id="u25_text" class="text">
        <p><span>12,120,567平方米</span></p>
      </div>
    </div>

    <!-- Unnamed (矩形) -->
    <div id="u26" class="ax_default label">
      <div id="u26_div" class=""></div>
      <div id="u26_text" class="text">
        <p><span>学校建筑面积</span></p>
      </div>
    </div>

    <!-- Unnamed (矩形) -->
    <div id="u27" class="ax_default label">
      <div id="u27_div" class=""></div>
      <div id="u27_text" class="text">
        <p><span>10,120,567平方米</span></p>
      </div>
    </div>

    <!-- Unnamed (矩形) -->
    <div id="u28" class="ax_default label">
      <div id="u28_div" class=""></div>
      <div id="u28_text" class="text">
        <p><span>绿化面积</span></p>
      </div>
    </div>

    <!-- Unnamed (矩形) -->
    <div id="u29" class="ax_default label">
      <div id="u29_div" class=""></div>
      <div id="u29_text" class="text">
        <p><span>120,567平方米</span></p>
      </div>
    </div>

    <!-- Unnamed (矩形) -->
    <div id="u30" class="ax_default label">
      <div id="u30_div" class=""></div>
      <div id="u30_text" class="text">
        <p><span>固定资产</span></p>
      </div>
    </div>

    <!-- Unnamed (矩形) -->
    <div id="u31" class="ax_default label">
      <div id="u31_div" class=""></div>
      <div id="u31_text" class="text">
        <p><span>120亿元</span></p>
      </div>
    </div>

    <!-- Unnamed (组合) -->
    <div
      id="u32"
      class="ax_default"
      data-left="817"
      data-top="225"
      data-width="379"
      data-height="449"
      layer-opacity="1"
    >
      <!-- 图层_2_1_ (组合) -->
      <div
        id="u33"
        class="ax_default"
        data-label="图层_2_1_"
        data-left="817"
        data-top="225"
        data-width="379"
        data-height="449"
        layer-opacity="1"
      >
        <!-- b12b3383 ed2e 4421 9d83 9ce34aa6c35e (组合) -->
        <div
          id="u34"
          class="ax_default"
          data-label="b12b3383 ed2e 4421 9d83 9ce34aa6c35e"
          data-left="817"
          data-top="430"
          data-width="379"
          data-height="244"
          layer-opacity="1"
        >
          <!-- Unnamed (形状) -->
          <div id="u35" class="ax_default icon">
            <img id="u35_img" class="img" src="./images/综合数据/u35.svg" />
            <div
              id="u35_text"
              class="text"
              style="display: none; visibility: hidden"
            >
              <p></p>
            </div>
          </div>

          <!-- Unnamed (形状) -->
          <div id="u36" class="ax_default icon">
            <img id="u36_img" class="img" src="./images/综合数据/u36.svg" />
            <div
              id="u36_text"
              class="text"
              style="display: none; visibility: hidden"
            >
              <p></p>
            </div>
          </div>
        </div>

        <!-- 91bbdfb1 abde 425d 88d9 d221573c2806 (组合) -->
        <div
          id="u37"
          class="ax_default"
          data-label="91bbdfb1 abde 425d 88d9 d221573c2806"
          data-left="854"
          data-top="440"
          data-width="306"
          data-height="195"
          layer-opacity="1"
        >
          <!-- Unnamed (形状) -->
          <div id="u38" class="ax_default icon">
            <img id="u38_img" class="img" src="./images/综合数据/u38.svg" />
            <div
              id="u38_text"
              class="text"
              style="display: none; visibility: hidden"
            >
              <p></p>
            </div>
          </div>

          <!-- fb063993 54eb 4530 9ca2 b06ce9d8b3e0 (组合) -->
          <div
            id="u39"
            class="ax_default"
            data-label="fb063993 54eb 4530 9ca2 b06ce9d8b3e0"
            data-left="1132"
            data-top="526"
            data-width="2"
            data-height="21"
            layer-opacity="1"
          >
            <!-- SVGID_4_ (形状) -->
            <div id="u40" class="ax_default icon" data-label="SVGID_4_">
              <img
                id="u40_img"
                class="img"
                src="./images/综合数据/svgid_4__u40.svg"
              />
              <div
                id="u40_text"
                class="text"
                style="display: none; visibility: hidden"
              >
                <p></p>
              </div>
            </div>

            <!-- Unnamed (形状) -->
            <div id="u41" class="ax_default icon">
              <img
                id="u41_img"
                class="img"
                src="./images/综合数据/svgid_4__u40.svg"
              />
              <div
                id="u41_text"
                class="text"
                style="display: none; visibility: hidden"
              >
                <p></p>
              </div>
            </div>
          </div>

          <!-- 8eebdb65 9c61 4d27 8025 eb0168abe550 (组合) -->
          <div
            id="u42"
            class="ax_default"
            data-label="8eebdb65 9c61 4d27 8025 eb0168abe550"
            data-left="879"
            data-top="526"
            data-width="2"
            data-height="21"
            layer-opacity="1"
          >
            <!-- SVGID_8_ (形状) -->
            <div id="u43" class="ax_default icon" data-label="SVGID_8_">
              <img
                id="u43_img"
                class="img"
                src="./images/综合数据/svgid_8__u43.svg"
              />
              <div
                id="u43_text"
                class="text"
                style="display: none; visibility: hidden"
              >
                <p></p>
              </div>
            </div>

            <!-- a79afaa7 f496 4eda 9bee 6c8d0dfa6eab (组合) -->
            <div
              id="u44"
              class="ax_default"
              data-label="a79afaa7 f496 4eda 9bee 6c8d0dfa6eab"
              data-left="879"
              data-top="526"
              data-width="2"
              data-height="21"
              layer-opacity="1"
            >
              <!-- Unnamed (形状) -->
              <div id="u45" class="ax_default icon">
                <img id="u45_img" class="img" src="./images/综合数据/u45.svg" />
                <div
                  id="u45_text"
                  class="text"
                  style="display: none; visibility: hidden"
                >
                  <p></p>
                </div>
              </div>

              <!-- Unnamed (形状) -->
              <div id="u46" class="ax_default icon">
                <img id="u46_img" class="img" src="./images/综合数据/u46.svg" />
                <div
                  id="u46_text"
                  class="text"
                  style="display: none; visibility: hidden"
                >
                  <p></p>
                </div>
              </div>

              <!-- Unnamed (形状) -->
              <div id="u47" class="ax_default icon">
                <img id="u47_img" class="img" src="./images/综合数据/u47.svg" />
                <div
                  id="u47_text"
                  class="text"
                  style="display: none; visibility: hidden"
                >
                  <p></p>
                </div>
              </div>

              <!-- Unnamed (形状) -->
              <div id="u48" class="ax_default icon">
                <img id="u48_img" class="img" src="./images/综合数据/u48.svg" />
                <div
                  id="u48_text"
                  class="text"
                  style="display: none; visibility: hidden"
                >
                  <p></p>
                </div>
              </div>

              <!-- Unnamed (形状) -->
              <div id="u49" class="ax_default icon">
                <img id="u49_img" class="img" src="./images/综合数据/u49.svg" />
                <div
                  id="u49_text"
                  class="text"
                  style="display: none; visibility: hidden"
                >
                  <p></p>
                </div>
              </div>

              <!-- Unnamed (形状) -->
              <div id="u50" class="ax_default icon">
                <img id="u50_img" class="img" src="./images/综合数据/u50.svg" />
                <div
                  id="u50_text"
                  class="text"
                  style="display: none; visibility: hidden"
                >
                  <p></p>
                </div>
              </div>

              <!-- Unnamed (形状) -->
              <div id="u51" class="ax_default icon">
                <img id="u51_img" class="img" src="./images/综合数据/u51.svg" />
                <div
                  id="u51_text"
                  class="text"
                  style="display: none; visibility: hidden"
                >
                  <p></p>
                </div>
              </div>

              <!-- Unnamed (形状) -->
              <div id="u52" class="ax_default icon">
                <img id="u52_img" class="img" src="./images/综合数据/u52.svg" />
                <div
                  id="u52_text"
                  class="text"
                  style="display: none; visibility: hidden"
                >
                  <p></p>
                </div>
              </div>
            </div>
          </div>

          <!-- Unnamed (形状) -->
          <div id="u53" class="ax_default icon">
            <img id="u53_img" class="img" src="./images/综合数据/u53.svg" />
            <div
              id="u53_text"
              class="text"
              style="display: none; visibility: hidden"
            >
              <p></p>
            </div>
          </div>

          <!-- Unnamed (形状) -->
          <div id="u54" class="ax_default icon">
            <img id="u54_img" class="img" src="./images/综合数据/u54.svg" />
            <div
              id="u54_text"
              class="text"
              style="display: none; visibility: hidden"
            >
              <p></p>
            </div>
          </div>
        </div>

        <!-- 1944f03d a360 4032 84c2 f39bbe6f75bb (组合) -->
        <div
          id="u55"
          class="ax_default"
          data-label="1944f03d a360 4032 84c2 f39bbe6f75bb"
          data-left="886"
          data-top="225"
          data-width="241"
          data-height="378"
          layer-opacity="1"
        >
          <!-- Unnamed (形状) -->
          <div id="u56" class="ax_default icon">
            <img id="u56_img" class="img" src="./images/综合数据/u56.svg" />
            <div
              id="u56_text"
              class="text"
              style="display: none; visibility: hidden"
            >
              <p></p>
            </div>
          </div>

          <!-- Unnamed (形状) -->
          <div id="u57" class="ax_default icon">
            <img id="u57_img" class="img" src="./images/综合数据/u57.svg" />
            <div
              id="u57_text"
              class="text"
              style="display: none; visibility: hidden"
            >
              <p></p>
            </div>
          </div>

          <!-- Unnamed (形状) -->
          <div id="u58" class="ax_default icon">
            <img id="u58_img" class="img" src="./images/综合数据/u58.svg" />
            <div
              id="u58_text"
              class="text"
              style="display: none; visibility: hidden"
            >
              <p></p>
            </div>
          </div>
        </div>

        <!-- 58ed2ce5 d588 409b b91d 6a1758b45ea1 (组合) -->
        <div
          id="u59"
          class="ax_default"
          data-label="58ed2ce5 d588 409b b91d 6a1758b45ea1"
          data-left="1025"
          data-top="325"
          data-width="84"
          data-height="245"
          layer-opacity="1"
        >
          <!-- Unnamed (形状) -->
          <div id="u60" class="ax_default icon">
            <img id="u60_img" class="img" src="./images/综合数据/u60.svg" />
            <div
              id="u60_text"
              class="text"
              style="display: none; visibility: hidden"
            >
              <p></p>
            </div>
          </div>

          <!-- 5165a370 f994 460b a540 1487c5f80c26 (组合) -->
          <div
            id="u61"
            class="ax_default"
            data-label="5165a370 f994 460b a540 1487c5f80c26"
            data-left="1048"
            data-top="477"
            data-width="16"
            data-height="28"
            layer-opacity="1"
          >
            <!-- Unnamed (形状) -->
            <div id="u62" class="ax_default icon">
              <img id="u62_img" class="img" src="./images/综合数据/u62.svg" />
              <div
                id="u62_text"
                class="text"
                style="display: none; visibility: hidden"
              >
                <p></p>
              </div>
            </div>

            <!-- SVGID_24_ (形状) -->
            <div id="u63" class="ax_default icon" data-label="SVGID_24_">
              <img id="u63_img" class="img" src="./images/综合数据/u62.svg" />
              <div
                id="u63_text"
                class="text"
                style="display: none; visibility: hidden"
              >
                <p></p>
              </div>
            </div>
          </div>

          <!-- Unnamed (形状) -->
          <div id="u64" class="ax_default icon">
            <img id="u64_img" class="img" src="./images/综合数据/u64.svg" />
            <div
              id="u64_text"
              class="text"
              style="display: none; visibility: hidden"
            >
              <p></p>
            </div>
          </div>

          <!-- Unnamed (形状) -->
          <div id="u65" class="ax_default icon">
            <img id="u65_img" class="img" src="./images/综合数据/u65.svg" />
            <div
              id="u65_text"
              class="text"
              style="display: none; visibility: hidden"
            >
              <p></p>
            </div>
          </div>

          <!-- 9ad078bd 823f 4200 8961 37e9d860fce9 (组合) -->
          <div
            id="u66"
            class="ax_default"
            data-label="9ad078bd 823f 4200 8961 37e9d860fce9"
            data-left="1048"
            data-top="376"
            data-width="16"
            data-height="53"
            layer-opacity="1"
          >
            <!-- Unnamed (形状) -->
            <div id="u67" class="ax_default icon">
              <img id="u67_img" class="img" src="./images/综合数据/u67.svg" />
              <div
                id="u67_text"
                class="text"
                style="display: none; visibility: hidden"
              >
                <p></p>
              </div>
            </div>

            <!-- Unnamed (形状) -->
            <div id="u68" class="ax_default icon">
              <img id="u68_img" class="img" src="./images/综合数据/u68.svg" />
              <div
                id="u68_text"
                class="text"
                style="display: none; visibility: hidden"
              >
                <p></p>
              </div>
            </div>
          </div>

          <!-- Unnamed (形状) -->
          <div id="u69" class="ax_default icon">
            <img id="u69_img" class="img" src="./images/综合数据/u69.svg" />
            <div
              id="u69_text"
              class="text"
              style="display: none; visibility: hidden"
            >
              <p></p>
            </div>
          </div>

          <!-- Unnamed (形状) -->
          <div id="u70" class="ax_default icon">
            <img id="u70_img" class="img" src="./images/综合数据/u70.svg" />
            <div
              id="u70_text"
              class="text"
              style="display: none; visibility: hidden"
            >
              <p></p>
            </div>
          </div>

          <!-- Unnamed (形状) -->
          <div id="u71" class="ax_default icon">
            <img id="u71_img" class="img" src="./images/综合数据/u71.svg" />
            <div
              id="u71_text"
              class="text"
              style="display: none; visibility: hidden"
            >
              <p></p>
            </div>
          </div>

          <!-- Unnamed (形状) -->
          <div id="u72" class="ax_default icon">
            <img id="u72_img" class="img" src="./images/综合数据/u72.svg" />
            <div
              id="u72_text"
              class="text"
              style="display: none; visibility: hidden"
            >
              <p></p>
            </div>
          </div>

          <!-- 9ce61183 8de7 4310 8b9f 4c2f68ac2389 (组合) -->
          <div
            id="u73"
            class="ax_default"
            data-label="9ce61183 8de7 4310 8b9f 4c2f68ac2389"
            data-left="1092"
            data-top="325"
            data-width="17"
            data-height="28"
            layer-opacity="1"
          >
            <!-- Unnamed (形状) -->
            <div id="u74" class="ax_default icon">
              <img id="u74_img" class="img" src="./images/综合数据/u74.svg" />
              <div
                id="u74_text"
                class="text"
                style="display: none; visibility: hidden"
              >
                <p></p>
              </div>
            </div>

            <!-- SVGID_26_ (形状) -->
            <div id="u75" class="ax_default icon" data-label="SVGID_26_">
              <img id="u75_img" class="img" src="./images/综合数据/u74.svg" />
              <div
                id="u75_text"
                class="text"
                style="display: none; visibility: hidden"
              >
                <p></p>
              </div>
            </div>
          </div>

          <!-- Unnamed (形状) -->
          <div id="u76" class="ax_default icon">
            <img id="u76_img" class="img" src="./images/综合数据/u76.svg" />
            <div
              id="u76_text"
              class="text"
              style="display: none; visibility: hidden"
            >
              <p></p>
            </div>
          </div>

          <!-- Unnamed (形状) -->
          <div id="u77" class="ax_default icon">
            <img id="u77_img" class="img" src="./images/综合数据/u77.svg" />
            <div
              id="u77_text"
              class="text"
              style="display: none; visibility: hidden"
            >
              <p></p>
            </div>
          </div>

          <!-- Unnamed (形状) -->
          <div id="u78" class="ax_default icon">
            <img id="u78_img" class="img" src="./images/综合数据/u78.svg" />
            <div
              id="u78_text"
              class="text"
              style="display: none; visibility: hidden"
            >
              <p></p>
            </div>
          </div>

          <!-- Unnamed (形状) -->
          <div id="u79" class="ax_default icon">
            <img id="u79_img" class="img" src="./images/综合数据/u79.svg" />
            <div
              id="u79_text"
              class="text"
              style="display: none; visibility: hidden"
            >
              <p></p>
            </div>
          </div>

          <!-- Unnamed (形状) -->
          <div id="u80" class="ax_default icon">
            <img id="u80_img" class="img" src="./images/综合数据/u80.svg" />
            <div
              id="u80_text"
              class="text"
              style="display: none; visibility: hidden"
            >
              <p></p>
            </div>
          </div>

          <!-- Unnamed (形状) -->
          <div id="u81" class="ax_default icon">
            <img id="u81_img" class="img" src="./images/综合数据/u81.svg" />
            <div
              id="u81_text"
              class="text"
              style="display: none; visibility: hidden"
            >
              <p></p>
            </div>
          </div>

          <!-- Unnamed (形状) -->
          <div id="u82" class="ax_default icon">
            <img id="u82_img" class="img" src="./images/综合数据/u82.svg" />
            <div
              id="u82_text"
              class="text"
              style="display: none; visibility: hidden"
            >
              <p></p>
            </div>
          </div>

          <!-- Unnamed (形状) -->
          <div id="u83" class="ax_default icon">
            <img id="u83_img" class="img" src="./images/综合数据/u83.svg" />
            <div
              id="u83_text"
              class="text"
              style="display: none; visibility: hidden"
            >
              <p></p>
            </div>
          </div>

          <!-- Unnamed (形状) -->
          <div id="u84" class="ax_default icon">
            <img id="u84_img" class="img" src="./images/综合数据/u84.svg" />
            <div
              id="u84_text"
              class="text"
              style="display: none; visibility: hidden"
            >
              <p></p>
            </div>
          </div>

          <!-- Unnamed (形状) -->
          <div id="u85" class="ax_default icon">
            <img id="u85_img" class="img" src="./images/综合数据/u85.svg" />
            <div
              id="u85_text"
              class="text"
              style="display: none; visibility: hidden"
            >
              <p></p>
            </div>
          </div>

          <!-- Unnamed (形状) -->
          <div id="u86" class="ax_default icon">
            <img id="u86_img" class="img" src="./images/综合数据/u86.svg" />
            <div
              id="u86_text"
              class="text"
              style="display: none; visibility: hidden"
            >
              <p></p>
            </div>
          </div>

          <!-- Unnamed (形状) -->
          <div id="u87" class="ax_default icon">
            <img id="u87_img" class="img" src="./images/综合数据/u87.svg" />
            <div
              id="u87_text"
              class="text"
              style="display: none; visibility: hidden"
            >
              <p></p>
            </div>
          </div>

          <!-- Unnamed (形状) -->
          <div id="u88" class="ax_default icon">
            <img id="u88_img" class="img" src="./images/综合数据/u88.svg" />
            <div
              id="u88_text"
              class="text"
              style="display: none; visibility: hidden"
            >
              <p></p>
            </div>
          </div>

          <!-- ad0bfb0d 9fd7 43ef 8548 02f27ad29f6e (组合) -->
          <div
            id="u89"
            class="ax_default"
            data-label="ad0bfb0d 9fd7 43ef 8548 02f27ad29f6e"
            data-left="1070"
            data-top="464"
            data-width="17"
            data-height="28"
            layer-opacity="1"
          >
            <!-- Unnamed (形状) -->
            <div id="u90" class="ax_default icon">
              <img id="u90_img" class="img" src="./images/综合数据/u90.svg" />
              <div
                id="u90_text"
                class="text"
                style="display: none; visibility: hidden"
              >
                <p></p>
              </div>
            </div>

            <!-- SVGID_28_ (形状) -->
            <div id="u91" class="ax_default icon" data-label="SVGID_28_">
              <img id="u91_img" class="img" src="./images/综合数据/u90.svg" />
              <div
                id="u91_text"
                class="text"
                style="display: none; visibility: hidden"
              >
                <p></p>
              </div>
            </div>
          </div>

          <!-- 1065de5c 113e 451a a15e 2271b3576727 (组合) -->
          <div
            id="u92"
            class="ax_default"
            data-label="1065de5c 113e 451a a15e 2271b3576727"
            data-left="1093"
            data-top="477"
            data-width="16"
            data-height="28"
            layer-opacity="1"
          >
            <!-- Unnamed (形状) -->
            <div id="u93" class="ax_default icon">
              <img id="u93_img" class="img" src="./images/综合数据/u93.svg" />
              <div
                id="u93_text"
                class="text"
                style="display: none; visibility: hidden"
              >
                <p></p>
              </div>
            </div>

            <!-- SVGID_30_ (形状) -->
            <div id="u94" class="ax_default icon" data-label="SVGID_30_">
              <img id="u94_img" class="img" src="./images/综合数据/u93.svg" />
              <div
                id="u94_text"
                class="text"
                style="display: none; visibility: hidden"
              >
                <p></p>
              </div>
            </div>
          </div>

          <!-- Unnamed (形状) -->
          <div id="u95" class="ax_default icon">
            <img id="u95_img" class="img" src="./images/综合数据/u95.svg" />
            <div
              id="u95_text"
              class="text"
              style="display: none; visibility: hidden"
            >
              <p></p>
            </div>
          </div>

          <!-- d6c1ff3a d860 4c0b 98cf f262b68d7f6b (组合) -->
          <div
            id="u96"
            class="ax_default"
            data-label="d6c1ff3a d860 4c0b 98cf f262b68d7f6b"
            data-left="1026"
            data-top="542"
            data-width="16"
            data-height="28"
            layer-opacity="1"
          >
            <!-- Unnamed (形状) -->
            <div id="u97" class="ax_default icon">
              <img id="u97_img" class="img" src="./images/综合数据/u97.svg" />
              <div
                id="u97_text"
                class="text"
                style="display: none; visibility: hidden"
              >
                <p></p>
              </div>
            </div>

            <!-- SVGID_32_ (形状) -->
            <div id="u98" class="ax_default icon" data-label="SVGID_32_">
              <img id="u98_img" class="img" src="./images/综合数据/u97.svg" />
              <div
                id="u98_text"
                class="text"
                style="display: none; visibility: hidden"
              >
                <p></p>
              </div>
            </div>
          </div>

          <!-- Unnamed (形状) -->
          <div id="u99" class="ax_default icon">
            <img id="u99_img" class="img" src="./images/综合数据/u99.svg" />
            <div
              id="u99_text"
              class="text"
              style="display: none; visibility: hidden"
            >
              <p></p>
            </div>
          </div>

          <!-- Unnamed (形状) -->
          <div id="u100" class="ax_default icon">
            <img id="u100_img" class="img" src="./images/综合数据/u100.svg" />
            <div
              id="u100_text"
              class="text"
              style="display: none; visibility: hidden"
            >
              <p></p>
            </div>
          </div>

          <!-- 2720fc29 813e 4b80 ac8e c80a491c1000 (组合) -->
          <div
            id="u101"
            class="ax_default"
            data-label="2720fc29 813e 4b80 ac8e c80a491c1000"
            data-left="1048"
            data-top="503"
            data-width="17"
            data-height="28"
            layer-opacity="1"
          >
            <!-- Unnamed (形状) -->
            <div id="u102" class="ax_default icon">
              <img id="u102_img" class="img" src="./images/综合数据/u102.svg" />
              <div
                id="u102_text"
                class="text"
                style="display: none; visibility: hidden"
              >
                <p></p>
              </div>
            </div>

            <!-- SVGID_34_ (形状) -->
            <div id="u103" class="ax_default icon" data-label="SVGID_34_">
              <img id="u103_img" class="img" src="./images/综合数据/u102.svg" />
              <div
                id="u103_text"
                class="text"
                style="display: none; visibility: hidden"
              >
                <p></p>
              </div>
            </div>
          </div>

          <!-- 0e055874 af4e 4e2e b582 d3cd503b707f (组合) -->
          <div
            id="u104"
            class="ax_default"
            data-label="0e055874 af4e 4e2e b582 d3cd503b707f"
            data-left="1093"
            data-top="503"
            data-width="16"
            data-height="28"
            layer-opacity="1"
          >
            <!-- Unnamed (形状) -->
            <div id="u105" class="ax_default icon">
              <img id="u105_img" class="img" src="./images/综合数据/u105.svg" />
              <div
                id="u105_text"
                class="text"
                style="display: none; visibility: hidden"
              >
                <p></p>
              </div>
            </div>

            <!-- SVGID_36_ (形状) -->
            <div id="u106" class="ax_default icon" data-label="SVGID_36_">
              <img id="u106_img" class="img" src="./images/综合数据/u105.svg" />
              <div
                id="u106_text"
                class="text"
                style="display: none; visibility: hidden"
              >
                <p></p>
              </div>
            </div>
          </div>
        </div>

        <!-- be508d69 4ddf 4a76 94b3 54942d979650 (组合) -->
        <div
          id="u107"
          class="ax_default"
          data-label="be508d69 4ddf 4a76 94b3 54942d979650"
          data-left="924"
          data-top="239"
          data-width="167"
          data-height="113"
          layer-opacity="1"
        >
          <!-- Unnamed (形状) -->
          <div id="u108" class="ax_default icon">
            <img id="u108_img" class="img" src="./images/综合数据/u108.svg" />
            <div
              id="u108_text"
              class="text"
              style="display: none; visibility: hidden"
            >
              <p></p>
            </div>
          </div>

          <!-- Unnamed (形状) -->
          <div id="u109" class="ax_default icon">
            <img id="u109_img" class="img" src="./images/综合数据/u109.svg" />
            <div
              id="u109_text"
              class="text"
              style="display: none; visibility: hidden"
            >
              <p></p>
            </div>
          </div>

          <!-- Unnamed (形状) -->
          <div id="u110" class="ax_default icon">
            <img id="u110_img" class="img" src="./images/综合数据/u110.svg" />
            <div
              id="u110_text"
              class="text"
              style="display: none; visibility: hidden"
            >
              <p></p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- account balance (形状) -->
    <div id="u111" class="ax_default shape" data-label="account balance">
      <img
        id="u111_img"
        class="img"
        src="./images/综合数据/account_balance_u111.svg"
      />
      <div
        id="u111_text"
        class="text"
        style="display: none; visibility: hidden"
      >
        <p></p>
      </div>
    </div>

    <!-- business (形状) -->
    <div id="u112" class="ax_default shape" data-label="business">
      <img
        id="u112_img"
        class="img"
        src="./images/综合数据/business_u112.svg"
      />
      <div
        id="u112_text"
        class="text"
        style="display: none; visibility: hidden"
      >
        <p></p>
      </div>
    </div>

    <!-- Unnamed (形状) -->
    <div id="u113" class="ax_default shape">
      <img id="u113_img" class="img" src="./images/综合数据/u113.svg" />
      <div
        id="u113_text"
        class="text"
        style="display: none; visibility: hidden"
      >
        <p></p>
      </div>
    </div>

    <!-- Unnamed (形状) -->
    <div id="u114" class="ax_default icon">
      <img id="u114_img" class="img" src="./images/综合数据/u114.svg" />
      <div
        id="u114_text"
        class="text"
        style="display: none; visibility: hidden"
      >
        <p></p>
      </div>
    </div>

    <!-- Unnamed (矩形) -->
    <div id="u115" class="ax_default box_1">
      <div id="u115_div" class=""></div>
      <div
        id="u115_text"
        class="text"
        style="display: none; visibility: hidden"
      >
        <p></p>
      </div>
    </div>

    <!-- Unnamed (矩形) -->
    <div id="u116" class="ax_default box_1">
      <div id="u116_div" class=""></div>
      <div id="u116_text" class="text">
        <p><span>办学规模</span></p>
      </div>
    </div>

    <!-- Unnamed (矩形) -->
    <div id="u117" class="ax_default box_1">
      <div id="u117_div" class=""></div>
      <div
        id="u117_text"
        class="text"
        style="display: none; visibility: hidden"
      >
        <p></p>
      </div>
    </div>

    <!-- Unnamed (矩形) -->
    <div id="u118" class="ax_default box_1">
      <div id="u118_div" class=""></div>
      <div id="u118_text" class="text">
        <p><span>师资结构</span></p>
      </div>
    </div>

    <!-- Unnamed (矩形) -->
    <div id="u119" class="ax_default box_1">
      <div id="u119_div" class=""></div>
      <div
        id="u119_text"
        class="text"
        style="display: none; visibility: hidden"
      >
        <p></p>
      </div>
    </div>

    <!-- Unnamed (矩形) -->
    <div id="u120" class="ax_default box_1">
      <div id="u120_div" class=""></div>
      <div id="u120_text" class="text">
        <p><span>办学资源</span></p>
      </div>
    </div>

    <!-- Unnamed (矩形) -->
    <div id="u121" class="ax_default box_1">
      <div id="u121_div" class=""></div>
      <div
        id="u121_text"
        class="text"
        style="display: none; visibility: hidden"
      >
        <p></p>
      </div>
    </div>

    <!-- Unnamed (矩形) -->
    <div id="u122" class="ax_default box_1">
      <div id="u122_div" class=""></div>
      <div id="u122_text" class="text">
        <p><span>学位人数</span></p>
      </div>
    </div>

    <!-- Unnamed (矩形) -->
    <div id="u123" class="ax_default label">
      <div id="u123_div" class=""></div>
      <div id="u123_text" class="text">
        <p><span>开设专业</span></p>
      </div>
    </div>

    <!-- Unnamed (矩形) -->
    <div id="u124" class="ax_default label">
      <div id="u124_div" class=""></div>
      <div id="u124_text" class="text">
        <p style="font-size: 13px">
          <span style="font-size: 16px">167</span><span>个</span>
        </p>
      </div>
    </div>

    <!-- Unnamed (矩形) -->
    <div id="u125" class="ax_default label">
      <div id="u125_div" class=""></div>
      <div id="u125_text" class="text">
        <p><span>课程总量</span></p>
      </div>
    </div>

    <!-- Unnamed (矩形) -->
    <div id="u126" class="ax_default label">
      <div id="u126_div" class=""></div>
      <div id="u126_text" class="text">
        <p style="font-size: 13px">
          <span style="font-size: 16px">1,567</span><span>门</span>
        </p>
      </div>
    </div>

    <!-- Unnamed (矩形) -->
    <div id="u127" class="ax_default label">
      <div id="u127_div" class=""></div>
      <div id="u127_text" class="text">
        <p><span>专任教师</span></p>
      </div>
    </div>

    <!-- Unnamed (矩形) -->
    <div id="u128" class="ax_default label">
      <div id="u128_div" class=""></div>
      <div id="u128_text" class="text">
        <p style="font-size: 13px">
          <span style="font-size: 16px">10,567</span><span>人</span>
        </p>
      </div>
    </div>

    <!-- Unnamed (矩形) -->
    <div id="u129" class="ax_default label">
      <div id="u129_div" class=""></div>
      <div id="u129_text" class="text">
        <p><span>兼职教师</span></p>
      </div>
    </div>

    <!-- Unnamed (矩形) -->
    <div id="u130" class="ax_default label">
      <div id="u130_div" class=""></div>
      <div id="u130_text" class="text">
        <p style="font-size: 13px">
          <span style="font-size: 16px">567</span><span>人</span>
        </p>
      </div>
    </div>

    <!-- Unnamed (矩形) -->
    <div id="u131" class="ax_default label">
      <div id="u131_div" class=""></div>
      <div id="u131_text" class="text">
        <p><span>图书总量</span></p>
      </div>
    </div>

    <!-- Unnamed (矩形) -->
    <div id="u132" class="ax_default label">
      <div id="u132_div" class=""></div>
      <div id="u132_text" class="text">
        <p style="font-size: 13px">
          <span style="font-size: 16px">12,120,567</span><span>人</span>
        </p>
      </div>
    </div>

    <!-- Unnamed (矩形) -->
    <div id="u133" class="ax_default label">
      <div id="u133_div" class=""></div>
      <div id="u133_text" class="text">
        <p><span>教研设备</span></p>
      </div>
    </div>

    <!-- Unnamed (矩形) -->
    <div id="u134" class="ax_default label">
      <div id="u134_div" class=""></div>
      <div id="u134_text" class="text">
        <p style="font-size: 13px">
          <span style="font-size: 16px">20,567</span><span>台</span>
        </p>
      </div>
    </div>

    <!-- Unnamed (矩形) -->
    <div id="u135" class="ax_default label">
      <div id="u135_div" class=""></div>
      <div id="u135_text" class="text">
        <p><span>硕士</span></p>
      </div>
    </div>

    <!-- Unnamed (矩形) -->
    <div id="u136" class="ax_default label">
      <div id="u136_div" class=""></div>
      <div id="u136_text" class="text">
        <p style="font-size: 13px">
          <span style="font-size: 16px">20,567</span><span>人</span>
        </p>
      </div>
    </div>

    <!-- Unnamed (矩形) -->
    <div id="u137" class="ax_default label">
      <div id="u137_div" class=""></div>
      <div id="u137_text" class="text">
        <p><span>博士</span></p>
      </div>
    </div>

    <!-- Unnamed (矩形) -->
    <div id="u138" class="ax_default label">
      <div id="u138_div" class=""></div>
      <div id="u138_text" class="text">
        <p style="font-size: 13px">
          <span style="font-size: 16px">20,567</span><span>人</span>
        </p>
      </div>
    </div>

    <!-- Unnamed (矩形) -->
    <div id="u139" class="ax_default label">
      <div id="u139_div" class=""></div>
      <div id="u139_text" class="text">
        <p><span>教学成果</span></p>
      </div>
    </div>

    <!-- Unnamed (矩形) -->
    <div id="u140" class="ax_default box_1">
      <div id="u140_div" class=""></div>
      <div
        id="u140_text"
        class="text"
        style="display: none; visibility: hidden"
      >
        <p></p>
      </div>
    </div>

    <!-- Unnamed (矩形) -->
    <div id="u141" class="ax_default box_1">
      <div id="u141_div" class=""></div>
      <div
        id="u141_text"
        class="text"
        style="display: none; visibility: hidden"
      >
        <p></p>
      </div>
    </div>

    <!-- Unnamed (组合) -->
    <div
      id="u142"
      class="ax_default"
      data-left="105"
      data-top="523"
      data-width="100"
      data-height="99"
      layer-opacity="1"
    >
      <!-- Unnamed (饼形图) -->
      <div id="u143" class="ax_default ellipse">
        <img id="u143_img" class="img" src="./images/综合数据/u143.svg" />
        <div
          id="u143_text"
          class="text"
          style="display: none; visibility: hidden"
        >
          <p></p>
        </div>
      </div>

      <!-- Unnamed (饼形图) -->
      <div id="u144" class="ax_default ellipse">
        <img id="u144_img" class="img" src="./images/综合数据/u144.svg" />
        <div
          id="u144_text"
          class="text"
          style="display: none; visibility: hidden"
        >
          <p></p>
        </div>
      </div>

      <!-- Unnamed (圆形) -->
      <div id="u145" class="ax_default ellipse">
        <img id="u145_img" class="img" src="./images/综合数据/u145.svg" />
        <div
          id="u145_text"
          class="text"
          style="display: none; visibility: hidden"
        >
          <p></p>
        </div>
      </div>
    </div>

    <!-- Unnamed (组合) -->
    <div
      id="u146"
      class="ax_default"
      data-left="13"
      data-top="685"
      data-width="80"
      data-height="79"
      layer-opacity="1"
    >
      <!-- Unnamed (饼形图) -->
      <div id="u147" class="ax_default ellipse">
        <img id="u147_img" class="img" src="./images/综合数据/u147.svg" />
        <div
          id="u147_text"
          class="text"
          style="display: none; visibility: hidden"
        >
          <p></p>
        </div>
      </div>

      <!-- Unnamed (饼形图) -->
      <div id="u148" class="ax_default ellipse">
        <img id="u148_img" class="img" src="./images/综合数据/u148.svg" />
        <div
          id="u148_text"
          class="text"
          style="display: none; visibility: hidden"
        >
          <p></p>
        </div>
      </div>

      <!-- Unnamed (圆形) -->
      <div id="u149" class="ax_default ellipse">
        <img id="u149_img" class="img" src="./images/综合数据/u149.svg" />
        <div
          id="u149_text"
          class="text"
          style="display: none; visibility: hidden"
        >
          <p></p>
        </div>
      </div>
    </div>

    <!-- Unnamed (组合) -->
    <div
      id="u150"
      class="ax_default"
      data-left="211"
      data-top="685"
      data-width="80"
      data-height="79"
      layer-opacity="1"
    >
      <!-- Unnamed (饼形图) -->
      <div id="u151" class="ax_default ellipse">
        <img id="u151_img" class="img" src="./images/综合数据/u147.svg" />
        <div
          id="u151_text"
          class="text"
          style="display: none; visibility: hidden"
        >
          <p></p>
        </div>
      </div>

      <!-- Unnamed (饼形图) -->
      <div id="u152" class="ax_default ellipse">
        <img id="u152_img" class="img" src="./images/综合数据/u148.svg" />
        <div
          id="u152_text"
          class="text"
          style="display: none; visibility: hidden"
        >
          <p></p>
        </div>
      </div>

      <!-- Unnamed (圆形) -->
      <div id="u153" class="ax_default ellipse">
        <img id="u153_img" class="img" src="./images/综合数据/u149.svg" />
        <div
          id="u153_text"
          class="text"
          style="display: none; visibility: hidden"
        >
          <p></p>
        </div>
      </div>
    </div>

    <!-- Unnamed (组合) -->
    <div
      id="u154"
      class="ax_default"
      data-left="1153"
      data-top="904"
      data-width="220"
      data-height="212"
      layer-opacity="1"
    >
      <!-- Unnamed (组合) -->
      <div
        id="u155"
        class="ax_default"
        data-left="0"
        data-top="0"
        data-width="0"
        data-height="0"
        layer-opacity="1"
      ></div>

      <!-- Unnamed (圆形) -->
      <div id="u156" class="ax_default ellipse">
        <img id="u156_img" class="img" src="./images/综合数据/u156.svg" />
        <div
          id="u156_text"
          class="text"
          style="display: none; visibility: hidden"
        >
          <p></p>
        </div>
      </div>

      <!-- 圆 (圆形) -->
      <div id="u157" class="ax_default ellipse" data-label="圆">
        <img id="u157_img" class="img" src="./images/综合数据/圆_u157.svg" />
        <div
          id="u157_text"
          class="text"
          style="display: none; visibility: hidden"
        >
          <p></p>
        </div>
      </div>

      <!-- 圆1 (圆形) -->
      <div id="u158" class="ax_default ellipse" data-label="圆1">
        <img id="u158_img" class="img" src="./images/综合数据/圆1_u158.svg" />
        <div
          id="u158_text"
          class="text"
          style="display: none; visibility: hidden"
        >
          <p></p>
        </div>
      </div>

      <!-- Unnamed (圆形) -->
      <div id="u159" class="ax_default ellipse">
        <img id="u159_img" class="img" src="./images/综合数据/u159.svg" />
        <div
          id="u159_text"
          class="text"
          style="display: none; visibility: hidden"
        >
          <p></p>
        </div>
      </div>

      <!-- Unnamed (形状) -->
      <div id="u160" class="ax_default ellipse">
        <img id="u160_img" class="img" src="./images/综合数据/u160.svg" />
        <div
          id="u160_text"
          class="text"
          style="display: none; visibility: hidden"
        >
          <p></p>
        </div>
      </div>

      <!-- Unnamed (形状) -->
      <div id="u161" class="ax_default ellipse">
        <img id="u161_img" class="img" src="./images/综合数据/u161.svg" />
        <div
          id="u161_text"
          class="text"
          style="display: none; visibility: hidden"
        >
          <p></p>
        </div>
      </div>

      <!-- Unnamed (形状) -->
      <div id="u162" class="ax_default ellipse">
        <img id="u162_img" class="img" src="./images/综合数据/u162.svg" />
        <div
          id="u162_text"
          class="text"
          style="display: none; visibility: hidden"
        >
          <p></p>
        </div>
      </div>

      <!-- Unnamed (形状) -->
      <div id="u163" class="ax_default ellipse">
        <img id="u163_img" class="img" src="./images/综合数据/u163.svg" />
        <div
          id="u163_text"
          class="text"
          style="display: none; visibility: hidden"
        >
          <p></p>
        </div>
      </div>

      <!-- Unnamed (形状) -->
      <div id="u164" class="ax_default ellipse">
        <img id="u164_img" class="img" src="./images/综合数据/u164.svg" />
        <div
          id="u164_text"
          class="text"
          style="display: none; visibility: hidden"
        >
          <p></p>
        </div>
      </div>

      <!-- Unnamed (形状) -->
      <div id="u165" class="ax_default ellipse">
        <img id="u165_img" class="img" src="./images/综合数据/u165.svg" />
        <div
          id="u165_text"
          class="text"
          style="display: none; visibility: hidden"
        >
          <p></p>
        </div>
      </div>

      <!-- Unnamed (形状) -->
      <div id="u166" class="ax_default ellipse">
        <img id="u166_img" class="img" src="./images/综合数据/u166.svg" />
        <div
          id="u166_text"
          class="text"
          style="display: none; visibility: hidden"
        >
          <p></p>
        </div>
      </div>

      <!-- Unnamed (圆形) -->
      <div id="u167" class="ax_default ellipse">
        <img id="u167_img" class="img" src="./images/综合数据/u167.svg" />
        <div
          id="u167_text"
          class="text"
          style="display: none; visibility: hidden"
        >
          <p></p>
        </div>
      </div>

      <!-- Unnamed (圆形) -->
      <div id="u168" class="ax_default ellipse">
        <img id="u168_img" class="img" src="./images/综合数据/u168.svg" />
        <div
          id="u168_text"
          class="text"
          style="display: none; visibility: hidden"
        >
          <p></p>
        </div>
      </div>
    </div>

    <!-- Unnamed (矩形) -->
    <div id="u169" class="ax_default label">
      <div id="u169_div" class=""></div>
      <div id="u169_text" class="text">
        <p><span>事业单位</span></p>
        <p><span>35%</span></p>
      </div>
    </div>

    <!-- Unnamed (矩形) -->
    <div id="u170" class="ax_default label">
      <div id="u170_div" class=""></div>
      <div id="u170_text" class="text">
        <p><span>党政机关</span></p>
        <p><span>25%</span></p>
      </div>
    </div>

    <!-- Unnamed (矩形) -->
    <div id="u171" class="ax_default _文本段落">
      <div id="u171_div" class=""></div>
      <div id="u171_text" class="text">
        <p><span>企业</span></p>
        <p><span>10%</span></p>
      </div>
    </div>

    <!-- Unnamed (矩形) -->
    <div id="u172" class="ax_default _文本段落">
      <div id="u172_div" class=""></div>
      <div id="u172_text" class="text">
        <p><span>自主创业</span></p>
        <p><span>7%</span></p>
      </div>
    </div>

    <!-- Unnamed (矩形) -->
    <div id="u173" class="ax_default _文本段落">
      <div id="u173_div" class=""></div>
      <div id="u173_text" class="text">
        <p><span>其他</span></p>
        <p><span>10%</span></p>
      </div>
    </div>

    <!-- Unnamed (矩形) -->
    <div id="u174" class="ax_default _文本段落">
      <div id="u174_div" class=""></div>
      <div id="u174_text" class="text">
        <p><span>升学/出国（境）</span></p>
        <p><span>13%</span></p>
      </div>
    </div>

    <!-- Unnamed (组合) -->
    <div
      id="u175"
      class="ax_default"
      data-left="1300.6256313292354"
      data-top="948"
      data-width="57.374368670764625"
      data-height="24.874368670764397"
      layer-opacity="1"
    >
      <!-- Unnamed (直线) -->
      <div id="u176" class="ax_default line">
        <img id="u176_img" class="img" src="./images/综合数据/u176.svg" />
        <div
          id="u176_text"
          class="text"
          style="display: none; visibility: hidden"
        >
          <p></p>
        </div>
      </div>

      <!-- Unnamed (直线) -->
      <div id="u177" class="ax_default line">
        <img id="u177_img" class="img" src="./images/综合数据/u176.svg" />
        <div
          id="u177_text"
          class="text"
          style="display: none; visibility: hidden"
        >
          <p></p>
        </div>
      </div>
    </div>

    <!-- Unnamed (组合) -->
    <div
      id="u178"
      class="ax_default"
      data-left="1167"
      data-top="922.6397495426604"
      data-width="60.704013548976945"
      data-height="21.72050091467895"
      layer-opacity="1"
    >
      <!-- Unnamed (直线) -->
      <div id="u179" class="ax_default line">
        <img id="u179_img" class="img" src="./images/综合数据/u176.svg" />
        <div
          id="u179_text"
          class="text"
          style="display: none; visibility: hidden"
        >
          <p></p>
        </div>
      </div>

      <!-- Unnamed (直线) -->
      <div id="u180" class="ax_default line">
        <img id="u180_img" class="img" src="./images/综合数据/u176.svg" />
        <div
          id="u180_text"
          class="text"
          style="display: none; visibility: hidden"
        >
          <p></p>
        </div>
      </div>
    </div>

    <!-- Unnamed (组合) -->
    <div
      id="u181"
      class="ax_default"
      data-left="1146"
      data-top="998.6397495426604"
      data-width="60.70401354897717"
      data-height="21.720500914679178"
      layer-opacity="1"
    >
      <!-- Unnamed (直线) -->
      <div id="u182" class="ax_default line">
        <img id="u182_img" class="img" src="./images/综合数据/u176.svg" />
        <div
          id="u182_text"
          class="text"
          style="display: none; visibility: hidden"
        >
          <p></p>
        </div>
      </div>

      <!-- Unnamed (直线) -->
      <div id="u183" class="ax_default line">
        <img id="u183_img" class="img" src="./images/综合数据/u176.svg" />
        <div
          id="u183_text"
          class="text"
          style="display: none; visibility: hidden"
        >
          <p></p>
        </div>
      </div>
    </div>

    <!-- Unnamed (组合) -->
    <div
      id="u184"
      class="ax_default"
      data-left="1179"
      data-top="1081.1256313292351"
      data-width="58.37436867076485"
      data-height="24.874368670764852"
      layer-opacity="1"
    >
      <!-- Unnamed (直线) -->
      <div id="u185" class="ax_default line">
        <img id="u185_img" class="img" src="./images/综合数据/u176.svg" />
        <div
          id="u185_text"
          class="text"
          style="display: none; visibility: hidden"
        >
          <p></p>
        </div>
      </div>

      <!-- Unnamed (直线) -->
      <div id="u186" class="ax_default line">
        <img id="u186_img" class="img" src="./images/综合数据/u176.svg" />
        <div
          id="u186_text"
          class="text"
          style="display: none; visibility: hidden"
        >
          <p></p>
        </div>
      </div>
    </div>

    <!-- Unnamed (组合) -->
    <div
      id="u187"
      class="ax_default"
      data-left="1308.6256313292356"
      data-top="993"
      data-width="57.3743686707644"
      data-height="24.874368670764625"
      layer-opacity="1"
    >
      <!-- Unnamed (直线) -->
      <div id="u188" class="ax_default line">
        <img id="u188_img" class="img" src="./images/综合数据/u176.svg" />
        <div
          id="u188_text"
          class="text"
          style="display: none; visibility: hidden"
        >
          <p></p>
        </div>
      </div>

      <!-- Unnamed (直线) -->
      <div id="u189" class="ax_default line">
        <img id="u189_img" class="img" src="./images/综合数据/u176.svg" />
        <div
          id="u189_text"
          class="text"
          style="display: none; visibility: hidden"
        >
          <p></p>
        </div>
      </div>
    </div>

    <!-- Unnamed (形状) -->
    <div id="u190" class="ax_default line">
      <img id="u190_img" class="img" src="./images/综合数据/u190.svg" />
      <div
        id="u190_text"
        class="text"
        style="display: none; visibility: hidden"
      >
        <p></p>
      </div>
    </div>

    <!-- Unnamed (形状) -->
    <div id="u191" class="ax_default line">
      <img id="u191_img" class="img" src="./images/综合数据/u191.svg" />
      <div
        id="u191_text"
        class="text"
        style="display: none; visibility: hidden"
      >
        <p></p>
      </div>
    </div>

    <!-- Unnamed (组合) -->
    <div
      id="u192"
      class="ax_default"
      data-left="187"
      data-top="519"
      data-width="41"
      data-height="14"
      layer-opacity="1"
    >
      <!-- Unnamed (形状) -->
      <div id="u193" class="ax_default line">
        <img id="u193_img" class="img" src="./images/综合数据/u193.svg" />
        <div
          id="u193_text"
          class="text"
          style="display: none; visibility: hidden"
        >
          <p></p>
        </div>
      </div>
    </div>

    <!-- Unnamed (矩形) -->
    <div id="u194" class="ax_default label">
      <div id="u194_div" class=""></div>
      <div id="u194_text" class="text">
        <p><span>重点专业</span></p>
      </div>
    </div>

    <!-- Unnamed (矩形) -->
    <div id="u195" class="ax_default label">
      <div id="u195_div" class=""></div>
      <div id="u195_text" class="text">
        <p><span>国家级 15个</span></p>
        <p><span>占比25%</span></p>
      </div>
    </div>

    <!-- Unnamed (矩形) -->
    <div id="u196" class="ax_default label">
      <div id="u196_div" class=""></div>
      <div id="u196_text" class="text">
        <p><span>省级 120个</span></p>
        <p><span>占比75%</span></p>
      </div>
    </div>

    <!-- Unnamed (形状) -->
    <div id="u197" class="ax_default line">
      <img id="u197_img" class="img" src="./images/综合数据/u191.svg" />
      <div
        id="u197_text"
        class="text"
        style="display: none; visibility: hidden"
      >
        <p></p>
      </div>
    </div>

    <!-- Unnamed (组合) -->
    <div
      id="u198"
      class="ax_default"
      data-left="82"
      data-top="689"
      data-width="41"
      data-height="14"
      layer-opacity="1"
    >
      <!-- Unnamed (形状) -->
      <div id="u199" class="ax_default line">
        <img id="u199_img" class="img" src="./images/综合数据/u193.svg" />
        <div
          id="u199_text"
          class="text"
          style="display: none; visibility: hidden"
        >
          <p></p>
        </div>
      </div>
    </div>

    <!-- Unnamed (矩形) -->
    <div id="u200" class="ax_default label">
      <div id="u200_div" class=""></div>
      <div id="u200_text" class="text">
        <p><span>国家级 15个</span></p>
        <p><span>占比25%</span></p>
      </div>
    </div>

    <!-- Unnamed (矩形) -->
    <div id="u201" class="ax_default label">
      <div id="u201_div" class=""></div>
      <div id="u201_text" class="text">
        <p><span>省级 120个</span></p>
        <p><span>占比75%</span></p>
      </div>
    </div>

    <!-- Unnamed (形状) -->
    <div id="u202" class="ax_default line">
      <img id="u202_img" class="img" src="./images/综合数据/u191.svg" />
      <div
        id="u202_text"
        class="text"
        style="display: none; visibility: hidden"
      >
        <p></p>
      </div>
    </div>

    <!-- Unnamed (组合) -->
    <div
      id="u203"
      class="ax_default"
      data-left="286"
      data-top="689"
      data-width="41"
      data-height="14"
      layer-opacity="1"
    >
      <!-- Unnamed (形状) -->
      <div id="u204" class="ax_default line">
        <img id="u204_img" class="img" src="./images/综合数据/u193.svg" />
        <div
          id="u204_text"
          class="text"
          style="display: none; visibility: hidden"
        >
          <p></p>
        </div>
      </div>
    </div>

    <!-- Unnamed (矩形) -->
    <div id="u205" class="ax_default label">
      <div id="u205_div" class=""></div>
      <div id="u205_text" class="text">
        <p><span>国家级 15个</span></p>
        <p><span>占比25%</span></p>
      </div>
    </div>

    <!-- Unnamed (矩形) -->
    <div id="u206" class="ax_default label">
      <div id="u206_div" class=""></div>
      <div id="u206_text" class="text">
        <p><span>省级 120个</span></p>
        <p><span>占比75%</span></p>
      </div>
    </div>

    <!-- Unnamed (矩形) -->
    <div id="u207" class="ax_default label">
      <div id="u207_div" class=""></div>
      <div id="u207_text" class="text">
        <p><span>特色专业</span></p>
      </div>
    </div>

    <!-- Unnamed (矩形) -->
    <div id="u208" class="ax_default label">
      <div id="u208_div" class=""></div>
      <div id="u208_text" class="text">
        <p><span>精品课程</span></p>
      </div>
    </div>

    <!-- Unnamed (矩形) -->
    <div id="u209" class="ax_default label">
      <div id="u209_div" class=""></div>
      <div id="u209_text" class="text">
        <p><span>教学装备室</span></p>
      </div>
    </div>

    <!-- Unnamed (矩形) -->
    <div id="u210" class="ax_default label">
      <div id="u210_div" class=""></div>
      <div id="u210_text" class="text">
        <p><span>计算机室</span></p>
      </div>
    </div>

    <!-- Unnamed (矩形) -->
    <div id="u211" class="ax_default _文本段落">
      <div id="u211_div" class=""></div>
      <div id="u211_text" class="text">
        <p style="font-size: 13px">
          <span style="font-size: 16px">22</span><span>间</span>
        </p>
      </div>
    </div>

    <!-- Unnamed (矩形) -->
    <div id="u212" class="ax_default label">
      <div id="u212_div" class=""></div>
      <div id="u212_text" class="text">
        <p><span>多媒体教室</span></p>
      </div>
    </div>

    <!-- Unnamed (矩形) -->
    <div id="u213" class="ax_default _文本段落">
      <div id="u213_div" class=""></div>
      <div id="u213_text" class="text">
        <p style="font-size: 13px">
          <span style="font-size: 16px">22</span><span>间</span>
        </p>
      </div>
    </div>

    <!-- Unnamed (矩形) -->
    <div id="u214" class="ax_default label">
      <div id="u214_div" class=""></div>
      <div id="u214_text" class="text">
        <p><span>实验室</span></p>
      </div>
    </div>

    <!-- Unnamed (矩形) -->
    <div id="u215" class="ax_default _文本段落">
      <div id="u215_div" class=""></div>
      <div id="u215_text" class="text">
        <p style="font-size: 13px">
          <span style="font-size: 16px">28</span><span>间</span>
        </p>
      </div>
    </div>

    <!-- Unnamed (矩形) -->
    <div id="u216" class="ax_default label">
      <div id="u216_div" class=""></div>
      <div id="u216_text" class="text">
        <p>
          <span style="font-family: '微软雅黑', sans-serif; font-weight: 400"
            >装备室</span
          ><span style="font-family: '微软雅黑', sans-serif; font-weight: 400"
            >总数（间）</span
          >
        </p>
      </div>
    </div>

    <!-- Unnamed (矩形) -->
    <div id="u217" class="ax_default _文本段落">
      <div id="u217_div" class=""></div>
      <div id="u217_text" class="text">
        <p><span>70</span></p>
      </div>
    </div>

    <!-- Unnamed (形状) -->
    <div id="u218" class="ax_default icon">
      <img id="u218_img" class="img" src="./images/综合数据/u218.svg" />
      <div
        id="u218_text"
        class="text"
        style="display: none; visibility: hidden"
      >
        <p></p>
      </div>
    </div>

    <!-- Unnamed (形状) -->
    <div id="u219" class="ax_default icon">
      <img id="u219_img" class="img" src="./images/综合数据/u219.svg" />
      <div
        id="u219_text"
        class="text"
        style="display: none; visibility: hidden"
      >
        <p></p>
      </div>
    </div>

    <!-- Unnamed (形状) -->
    <div id="u220" class="ax_default icon">
      <img id="u220_img" class="img" src="./images/综合数据/u220.svg" />
      <div
        id="u220_text"
        class="text"
        style="display: none; visibility: hidden"
      >
        <p></p>
      </div>
    </div>

    <!-- Unnamed (矩形) -->
    <div id="u221" class="ax_default label">
      <div id="u221_div" class=""></div>
      <div id="u221_text" class="text">
        <p><span>学生数据</span></p>
      </div>
    </div>

    <!-- Unnamed (矩形) -->
    <div id="u222" class="ax_default label">
      <div id="u222_div" class=""></div>
      <div id="u222_text" class="text">
        <p><span>在校生总数</span></p>
      </div>
    </div>

    <!-- Unnamed (矩形) -->
    <div id="u223" class="ax_default _文本段落">
      <div id="u223_div" class=""></div>
      <div id="u223_text" class="text">
        <p style="font-size: 13px">
          <span style="font-size: 16px">110,567</span><span>人</span>
        </p>
      </div>
    </div>

    <!-- Unnamed (组合) -->
    <div
      id="u224"
      class="ax_default"
      data-left="492"
      data-top="1012"
      data-width="70"
      data-height="28"
      layer-opacity="1"
    >
      <!-- Unnamed (形状) -->
      <div id="u225" class="ax_default shape">
        <img id="u225_img" class="img" src="./images/综合数据/u225.svg" />
        <div
          id="u225_text"
          class="text"
          style="display: none; visibility: hidden"
        >
          <p></p>
        </div>
      </div>

      <!-- Unnamed (形状) -->
      <div id="u226" class="ax_default shape">
        <img id="u226_img" class="img" src="./images/综合数据/u226.svg" />
        <div
          id="u226_text"
          class="text"
          style="display: none; visibility: hidden"
        >
          <p></p>
        </div>
      </div>

      <!-- Unnamed (形状) -->
      <div id="u227" class="ax_default shape">
        <img id="u227_img" class="img" src="./images/综合数据/u227.svg" />
        <div
          id="u227_text"
          class="text"
          style="display: none; visibility: hidden"
        >
          <p></p>
        </div>
      </div>

      <!-- Unnamed (形状) -->
      <div id="u228" class="ax_default shape">
        <img id="u228_img" class="img" src="./images/综合数据/u227.svg" />
        <div
          id="u228_text"
          class="text"
          style="display: none; visibility: hidden"
        >
          <p></p>
        </div>
      </div>

      <!-- Unnamed (形状) -->
      <div id="u229" class="ax_default shape">
        <img id="u229_img" class="img" src="./images/综合数据/u229.svg" />
        <div
          id="u229_text"
          class="text"
          style="display: none; visibility: hidden"
        >
          <p></p>
        </div>
      </div>

      <!-- Unnamed (形状) -->
      <div id="u230" class="ax_default shape">
        <img id="u230_img" class="img" src="./images/综合数据/u230.svg" />
        <div
          id="u230_text"
          class="text"
          style="display: none; visibility: hidden"
        >
          <p></p>
        </div>
      </div>

      <!-- Unnamed (形状) -->
      <div id="u231" class="ax_default shape">
        <img id="u231_img" class="img" src="./images/综合数据/u231.svg" />
        <div
          id="u231_text"
          class="text"
          style="display: none; visibility: hidden"
        >
          <p></p>
        </div>
      </div>

      <!-- Unnamed (矩形) -->
      <div id="u232" class="ax_default shape">
        <div id="u232_div" class=""></div>
        <div
          id="u232_text"
          class="text"
          style="display: none; visibility: hidden"
        >
          <p></p>
        </div>
      </div>

      <!-- Unnamed (形状) -->
      <div id="u233" class="ax_default shape">
        <img id="u233_img" class="img" src="./images/综合数据/u233.svg" />
        <div
          id="u233_text"
          class="text"
          style="display: none; visibility: hidden"
        >
          <p></p>
        </div>
      </div>

      <!-- Unnamed (形状) -->
      <div id="u234" class="ax_default shape">
        <img id="u234_img" class="img" src="./images/综合数据/u234.svg" />
        <div
          id="u234_text"
          class="text"
          style="display: none; visibility: hidden"
        >
          <p></p>
        </div>
      </div>

      <!-- Unnamed (形状) -->
      <div id="u235" class="ax_default shape">
        <img id="u235_img" class="img" src="./images/综合数据/u235.svg" />
        <div
          id="u235_text"
          class="text"
          style="display: none; visibility: hidden"
        >
          <p></p>
        </div>
      </div>

      <!-- Unnamed (形状) -->
      <div id="u236" class="ax_default shape">
        <img id="u236_img" class="img" src="./images/综合数据/u236.svg" />
        <div
          id="u236_text"
          class="text"
          style="display: none; visibility: hidden"
        >
          <p></p>
        </div>
      </div>

      <!-- Unnamed (形状) -->
      <div id="u237" class="ax_default shape">
        <img id="u237_img" class="img" src="./images/综合数据/u237.svg" />
        <div
          id="u237_text"
          class="text"
          style="display: none; visibility: hidden"
        >
          <p></p>
        </div>
      </div>

      <!-- Unnamed (形状) -->
      <div id="u238" class="ax_default shape">
        <img id="u238_img" class="img" src="./images/综合数据/u238.svg" />
        <div
          id="u238_text"
          class="text"
          style="display: none; visibility: hidden"
        >
          <p></p>
        </div>
      </div>

      <!-- Unnamed (形状) -->
      <div id="u239" class="ax_default shape">
        <img id="u239_img" class="img" src="./images/综合数据/u239.svg" />
        <div
          id="u239_text"
          class="text"
          style="display: none; visibility: hidden"
        >
          <p></p>
        </div>
      </div>

      <!-- Unnamed (形状) -->
      <div id="u240" class="ax_default shape">
        <img id="u240_img" class="img" src="./images/综合数据/u240.svg" />
        <div
          id="u240_text"
          class="text"
          style="display: none; visibility: hidden"
        >
          <p></p>
        </div>
      </div>

      <!-- Unnamed (形状) -->
      <div id="u241" class="ax_default shape">
        <img id="u241_img" class="img" src="./images/综合数据/u241.svg" />
        <div
          id="u241_text"
          class="text"
          style="display: none; visibility: hidden"
        >
          <p></p>
        </div>
      </div>

      <!-- Unnamed (形状) -->
      <div id="u242" class="ax_default shape">
        <img id="u242_img" class="img" src="./images/综合数据/u242.svg" />
        <div
          id="u242_text"
          class="text"
          style="display: none; visibility: hidden"
        >
          <p></p>
        </div>
      </div>

      <!-- Unnamed (形状) -->
      <div id="u243" class="ax_default shape">
        <img id="u243_img" class="img" src="./images/综合数据/u243.svg" />
        <div
          id="u243_text"
          class="text"
          style="display: none; visibility: hidden"
        >
          <p></p>
        </div>
      </div>

      <!-- Unnamed (形状) -->
      <div id="u244" class="ax_default shape">
        <img id="u244_img" class="img" src="./images/综合数据/u244.svg" />
        <div
          id="u244_text"
          class="text"
          style="display: none; visibility: hidden"
        >
          <p></p>
        </div>
      </div>

      <!-- Unnamed (形状) -->
      <div id="u245" class="ax_default shape">
        <img id="u245_img" class="img" src="./images/综合数据/u245.svg" />
        <div
          id="u245_text"
          class="text"
          style="display: none; visibility: hidden"
        >
          <p></p>
        </div>
      </div>
    </div>

    <!-- Unnamed (组合) -->
    <div
      id="u246"
      class="ax_default"
      data-left="643"
      data-top="1011"
      data-width="70"
      data-height="28"
      layer-opacity="1"
    >
      <!-- Unnamed (形状) -->
      <div id="u247" class="ax_default shape">
        <img id="u247_img" class="img" src="./images/综合数据/u247.svg" />
        <div
          id="u247_text"
          class="text"
          style="display: none; visibility: hidden"
        >
          <p></p>
        </div>
      </div>

      <!-- Unnamed (形状) -->
      <div id="u248" class="ax_default shape">
        <img id="u248_img" class="img" src="./images/综合数据/u248.svg" />
        <div
          id="u248_text"
          class="text"
          style="display: none; visibility: hidden"
        >
          <p></p>
        </div>
      </div>

      <!-- Unnamed (形状) -->
      <div id="u249" class="ax_default shape">
        <img id="u249_img" class="img" src="./images/综合数据/u249.svg" />
        <div
          id="u249_text"
          class="text"
          style="display: none; visibility: hidden"
        >
          <p></p>
        </div>
      </div>

      <!-- Unnamed (形状) -->
      <div id="u250" class="ax_default shape">
        <img id="u250_img" class="img" src="./images/综合数据/u249.svg" />
        <div
          id="u250_text"
          class="text"
          style="display: none; visibility: hidden"
        >
          <p></p>
        </div>
      </div>

      <!-- Unnamed (形状) -->
      <div id="u251" class="ax_default shape">
        <img id="u251_img" class="img" src="./images/综合数据/u251.svg" />
        <div
          id="u251_text"
          class="text"
          style="display: none; visibility: hidden"
        >
          <p></p>
        </div>
      </div>

      <!-- Unnamed (形状) -->
      <div id="u252" class="ax_default shape">
        <img id="u252_img" class="img" src="./images/综合数据/u252.svg" />
        <div
          id="u252_text"
          class="text"
          style="display: none; visibility: hidden"
        >
          <p></p>
        </div>
      </div>

      <!-- Unnamed (形状) -->
      <div id="u253" class="ax_default shape">
        <img id="u253_img" class="img" src="./images/综合数据/u253.svg" />
        <div
          id="u253_text"
          class="text"
          style="display: none; visibility: hidden"
        >
          <p></p>
        </div>
      </div>

      <!-- Unnamed (矩形) -->
      <div id="u254" class="ax_default shape">
        <div id="u254_div" class=""></div>
        <div
          id="u254_text"
          class="text"
          style="display: none; visibility: hidden"
        >
          <p></p>
        </div>
      </div>

      <!-- Unnamed (形状) -->
      <div id="u255" class="ax_default shape">
        <img id="u255_img" class="img" src="./images/综合数据/u255.svg" />
        <div
          id="u255_text"
          class="text"
          style="display: none; visibility: hidden"
        >
          <p></p>
        </div>
      </div>

      <!-- Unnamed (形状) -->
      <div id="u256" class="ax_default shape">
        <img id="u256_img" class="img" src="./images/综合数据/u256.svg" />
        <div
          id="u256_text"
          class="text"
          style="display: none; visibility: hidden"
        >
          <p></p>
        </div>
      </div>

      <!-- Unnamed (形状) -->
      <div id="u257" class="ax_default shape">
        <img id="u257_img" class="img" src="./images/综合数据/u257.svg" />
        <div
          id="u257_text"
          class="text"
          style="display: none; visibility: hidden"
        >
          <p></p>
        </div>
      </div>

      <!-- Unnamed (形状) -->
      <div id="u258" class="ax_default shape">
        <img id="u258_img" class="img" src="./images/综合数据/u258.svg" />
        <div
          id="u258_text"
          class="text"
          style="display: none; visibility: hidden"
        >
          <p></p>
        </div>
      </div>

      <!-- Unnamed (形状) -->
      <div id="u259" class="ax_default shape">
        <img id="u259_img" class="img" src="./images/综合数据/u259.svg" />
        <div
          id="u259_text"
          class="text"
          style="display: none; visibility: hidden"
        >
          <p></p>
        </div>
      </div>

      <!-- Unnamed (形状) -->
      <div id="u260" class="ax_default shape">
        <img id="u260_img" class="img" src="./images/综合数据/u260.svg" />
        <div
          id="u260_text"
          class="text"
          style="display: none; visibility: hidden"
        >
          <p></p>
        </div>
      </div>

      <!-- Unnamed (形状) -->
      <div id="u261" class="ax_default shape">
        <img id="u261_img" class="img" src="./images/综合数据/u261.svg" />
        <div
          id="u261_text"
          class="text"
          style="display: none; visibility: hidden"
        >
          <p></p>
        </div>
      </div>

      <!-- Unnamed (形状) -->
      <div id="u262" class="ax_default shape">
        <img id="u262_img" class="img" src="./images/综合数据/u262.svg" />
        <div
          id="u262_text"
          class="text"
          style="display: none; visibility: hidden"
        >
          <p></p>
        </div>
      </div>

      <!-- Unnamed (形状) -->
      <div id="u263" class="ax_default shape">
        <img id="u263_img" class="img" src="./images/综合数据/u263.svg" />
        <div
          id="u263_text"
          class="text"
          style="display: none; visibility: hidden"
        >
          <p></p>
        </div>
      </div>

      <!-- Unnamed (形状) -->
      <div id="u264" class="ax_default shape">
        <img id="u264_img" class="img" src="./images/综合数据/u264.svg" />
        <div
          id="u264_text"
          class="text"
          style="display: none; visibility: hidden"
        >
          <p></p>
        </div>
      </div>

      <!-- Unnamed (形状) -->
      <div id="u265" class="ax_default shape">
        <img id="u265_img" class="img" src="./images/综合数据/u265.svg" />
        <div
          id="u265_text"
          class="text"
          style="display: none; visibility: hidden"
        >
          <p></p>
        </div>
      </div>

      <!-- Unnamed (形状) -->
      <div id="u266" class="ax_default shape">
        <img id="u266_img" class="img" src="./images/综合数据/u266.svg" />
        <div
          id="u266_text"
          class="text"
          style="display: none; visibility: hidden"
        >
          <p></p>
        </div>
      </div>

      <!-- Unnamed (形状) -->
      <div id="u267" class="ax_default shape">
        <img id="u267_img" class="img" src="./images/综合数据/u267.svg" />
        <div
          id="u267_text"
          class="text"
          style="display: none; visibility: hidden"
        >
          <p></p>
        </div>
      </div>
    </div>

    <!-- Unnamed (组合) -->
    <div
      id="u268"
      class="ax_default"
      data-left="798"
      data-top="1016"
      data-width="70"
      data-height="28"
      layer-opacity="1"
    >
      <!-- Unnamed (形状) -->
      <div id="u269" class="ax_default shape">
        <img id="u269_img" class="img" src="./images/综合数据/u269.svg" />
        <div
          id="u269_text"
          class="text"
          style="display: none; visibility: hidden"
        >
          <p></p>
        </div>
      </div>

      <!-- Unnamed (形状) -->
      <div id="u270" class="ax_default shape">
        <img id="u270_img" class="img" src="./images/综合数据/u270.svg" />
        <div
          id="u270_text"
          class="text"
          style="display: none; visibility: hidden"
        >
          <p></p>
        </div>
      </div>

      <!-- Unnamed (形状) -->
      <div id="u271" class="ax_default shape">
        <img id="u271_img" class="img" src="./images/综合数据/u271.svg" />
        <div
          id="u271_text"
          class="text"
          style="display: none; visibility: hidden"
        >
          <p></p>
        </div>
      </div>

      <!-- Unnamed (形状) -->
      <div id="u272" class="ax_default shape">
        <img id="u272_img" class="img" src="./images/综合数据/u271.svg" />
        <div
          id="u272_text"
          class="text"
          style="display: none; visibility: hidden"
        >
          <p></p>
        </div>
      </div>

      <!-- Unnamed (形状) -->
      <div id="u273" class="ax_default shape">
        <img id="u273_img" class="img" src="./images/综合数据/u273.svg" />
        <div
          id="u273_text"
          class="text"
          style="display: none; visibility: hidden"
        >
          <p></p>
        </div>
      </div>

      <!-- Unnamed (形状) -->
      <div id="u274" class="ax_default shape">
        <img id="u274_img" class="img" src="./images/综合数据/u274.svg" />
        <div
          id="u274_text"
          class="text"
          style="display: none; visibility: hidden"
        >
          <p></p>
        </div>
      </div>

      <!-- Unnamed (形状) -->
      <div id="u275" class="ax_default shape">
        <img id="u275_img" class="img" src="./images/综合数据/u275.svg" />
        <div
          id="u275_text"
          class="text"
          style="display: none; visibility: hidden"
        >
          <p></p>
        </div>
      </div>

      <!-- Unnamed (矩形) -->
      <div id="u276" class="ax_default shape">
        <div id="u276_div" class=""></div>
        <div
          id="u276_text"
          class="text"
          style="display: none; visibility: hidden"
        >
          <p></p>
        </div>
      </div>

      <!-- Unnamed (形状) -->
      <div id="u277" class="ax_default shape">
        <img id="u277_img" class="img" src="./images/综合数据/u277.svg" />
        <div
          id="u277_text"
          class="text"
          style="display: none; visibility: hidden"
        >
          <p></p>
        </div>
      </div>

      <!-- Unnamed (形状) -->
      <div id="u278" class="ax_default shape">
        <img id="u278_img" class="img" src="./images/综合数据/u278.svg" />
        <div
          id="u278_text"
          class="text"
          style="display: none; visibility: hidden"
        >
          <p></p>
        </div>
      </div>

      <!-- Unnamed (形状) -->
      <div id="u279" class="ax_default shape">
        <img id="u279_img" class="img" src="./images/综合数据/u279.svg" />
        <div
          id="u279_text"
          class="text"
          style="display: none; visibility: hidden"
        >
          <p></p>
        </div>
      </div>

      <!-- Unnamed (形状) -->
      <div id="u280" class="ax_default shape">
        <img id="u280_img" class="img" src="./images/综合数据/u280.svg" />
        <div
          id="u280_text"
          class="text"
          style="display: none; visibility: hidden"
        >
          <p></p>
        </div>
      </div>

      <!-- Unnamed (形状) -->
      <div id="u281" class="ax_default shape">
        <img id="u281_img" class="img" src="./images/综合数据/u281.svg" />
        <div
          id="u281_text"
          class="text"
          style="display: none; visibility: hidden"
        >
          <p></p>
        </div>
      </div>

      <!-- Unnamed (形状) -->
      <div id="u282" class="ax_default shape">
        <img id="u282_img" class="img" src="./images/综合数据/u282.svg" />
        <div
          id="u282_text"
          class="text"
          style="display: none; visibility: hidden"
        >
          <p></p>
        </div>
      </div>

      <!-- Unnamed (形状) -->
      <div id="u283" class="ax_default shape">
        <img id="u283_img" class="img" src="./images/综合数据/u283.svg" />
        <div
          id="u283_text"
          class="text"
          style="display: none; visibility: hidden"
        >
          <p></p>
        </div>
      </div>

      <!-- Unnamed (形状) -->
      <div id="u284" class="ax_default shape">
        <img id="u284_img" class="img" src="./images/综合数据/u284.svg" />
        <div
          id="u284_text"
          class="text"
          style="display: none; visibility: hidden"
        >
          <p></p>
        </div>
      </div>

      <!-- Unnamed (形状) -->
      <div id="u285" class="ax_default shape">
        <img id="u285_img" class="img" src="./images/综合数据/u285.svg" />
        <div
          id="u285_text"
          class="text"
          style="display: none; visibility: hidden"
        >
          <p></p>
        </div>
      </div>

      <!-- Unnamed (形状) -->
      <div id="u286" class="ax_default shape">
        <img id="u286_img" class="img" src="./images/综合数据/u286.svg" />
        <div
          id="u286_text"
          class="text"
          style="display: none; visibility: hidden"
        >
          <p></p>
        </div>
      </div>

      <!-- Unnamed (形状) -->
      <div id="u287" class="ax_default shape">
        <img id="u287_img" class="img" src="./images/综合数据/u287.svg" />
        <div
          id="u287_text"
          class="text"
          style="display: none; visibility: hidden"
        >
          <p></p>
        </div>
      </div>

      <!-- Unnamed (形状) -->
      <div id="u288" class="ax_default shape">
        <img id="u288_img" class="img" src="./images/综合数据/u288.svg" />
        <div
          id="u288_text"
          class="text"
          style="display: none; visibility: hidden"
        >
          <p></p>
        </div>
      </div>

      <!-- Unnamed (形状) -->
      <div id="u289" class="ax_default shape">
        <img id="u289_img" class="img" src="./images/综合数据/u289.svg" />
        <div
          id="u289_text"
          class="text"
          style="display: none; visibility: hidden"
        >
          <p></p>
        </div>
      </div>
    </div>

    <!-- Unnamed (矩形) -->
    <div id="u290" class="ax_default label">
      <div id="u290_div" class=""></div>
      <div id="u290_text" class="text">
        <p><span>本科生</span></p>
      </div>
    </div>

    <!-- Unnamed (矩形) -->
    <div id="u291" class="ax_default _文本段落">
      <div id="u291_div" class=""></div>
      <div id="u291_text" class="text">
        <p style="font-size: 13px">
          <span style="font-size: 16px">100,567</span><span>人</span>
        </p>
      </div>
    </div>

    <!-- Unnamed (矩形) -->
    <div id="u292" class="ax_default label">
      <div id="u292_div" class=""></div>
      <div id="u292_text" class="text">
        <p><span>硕士</span></p>
      </div>
    </div>

    <!-- Unnamed (矩形) -->
    <div id="u293" class="ax_default _文本段落">
      <div id="u293_div" class=""></div>
      <div id="u293_text" class="text">
        <p style="font-size: 13px">
          <span style="font-size: 16px">8,000</span><span>人</span>
        </p>
      </div>
    </div>

    <!-- Unnamed (矩形) -->
    <div id="u294" class="ax_default label">
      <div id="u294_div" class=""></div>
      <div id="u294_text" class="text">
        <p><span>博士</span></p>
      </div>
    </div>

    <!-- Unnamed (矩形) -->
    <div id="u295" class="ax_default _文本段落">
      <div id="u295_div" class=""></div>
      <div id="u295_text" class="text">
        <p style="font-size: 13px">
          <span style="font-size: 16px">2,000</span><span>人</span>
        </p>
      </div>
    </div>

    <!-- Unnamed (矩形) -->
    <div id="u296" class="ax_default label">
      <div id="u296_div" class=""></div>
      <div id="u296_text" class="text">
        <p><span>就业分析</span></p>
      </div>
    </div>

    <!-- Unnamed (组合) -->
    <div
      id="u297"
      class="ax_default"
      data-left="1673"
      data-top="190"
      data-width="270"
      data-height="208"
      layer-opacity="1"
    >
      <!-- Unnamed (矩形) -->
      <div id="u298" class="ax_default refs-chart-data">
        <div id="u298_div" class=""></div>
        <div
          id="u298_text"
          class="text"
          style="display: none; visibility: hidden"
        >
          <p></p>
        </div>
      </div>

      <!-- Unnamed (组合) -->
      <div
        id="u299"
        class="ax_default"
        data-left="1710"
        data-top="196"
        data-width="197"
        data-height="197"
        layer-opacity="1"
      >
        <!-- Unnamed (饼形图) -->
        <div id="u300" class="ax_default refs-chart-data">
          <img id="u300_img" class="img" src="./images/综合数据/u300.svg" />
          <div
            id="u300_text"
            class="text"
            style="display: none; visibility: hidden"
          >
            <p></p>
          </div>
        </div>

        <!-- Unnamed (饼形图) -->
        <div id="u301" class="ax_default refs-chart-data">
          <img id="u301_img" class="img" src="./images/综合数据/u301.svg" />
          <div
            id="u301_text"
            class="text"
            style="display: none; visibility: hidden"
          >
            <p></p>
          </div>
        </div>

        <!-- Unnamed (饼形图) -->
        <div id="u302" class="ax_default refs-chart-data">
          <img id="u302_img" class="img" src="./images/综合数据/u302.svg" />
          <div
            id="u302_text"
            class="text"
            style="display: none; visibility: hidden"
          >
            <p></p>
          </div>
        </div>

        <!-- Unnamed (饼形图) -->
        <div id="u303" class="ax_default refs-chart-data">
          <img id="u303_img" class="img" src="./images/综合数据/u303.svg" />
          <div
            id="u303_text"
            class="text"
            style="display: none; visibility: hidden"
          >
            <p></p>
          </div>
        </div>

        <!-- Unnamed (饼形图) -->
        <div id="u304" class="ax_default refs-chart-data">
          <img id="u304_img" class="img" src="./images/综合数据/u304.svg" />
          <div
            id="u304_text"
            class="text"
            style="display: none; visibility: hidden"
          >
            <p></p>
          </div>
        </div>
      </div>
    </div>

    <!-- Unnamed (圆形) -->
    <div id="u305" class="ax_default ellipse">
      <img id="u305_img" class="img" src="./images/综合数据/u305.svg" />
      <div
        id="u305_text"
        class="text"
        style="display: none; visibility: hidden"
      >
        <p></p>
      </div>
    </div>

    <!-- Unnamed (矩形) -->
    <div id="u306" class="ax_default label">
      <div id="u306_div" class=""></div>
      <div id="u306_text" class="text">
        <p><span>助教45%</span></p>
      </div>
    </div>

    <!-- Unnamed (圆形) -->
    <div id="u307" class="ax_default ellipse">
      <img id="u307_img" class="img" src="./images/综合数据/u307.svg" />
      <div
        id="u307_text"
        class="text"
        style="display: none; visibility: hidden"
      >
        <p></p>
      </div>
    </div>

    <!-- Unnamed (矩形) -->
    <div id="u308" class="ax_default label">
      <div id="u308_div" class=""></div>
      <div id="u308_text" class="text">
        <p><span>讲师25%</span></p>
      </div>
    </div>

    <!-- Unnamed (圆形) -->
    <div id="u309" class="ax_default ellipse">
      <img id="u309_img" class="img" src="./images/综合数据/u309.svg" />
      <div
        id="u309_text"
        class="text"
        style="display: none; visibility: hidden"
      >
        <p></p>
      </div>
    </div>

    <!-- Unnamed (矩形) -->
    <div id="u310" class="ax_default label">
      <div id="u310_div" class=""></div>
      <div id="u310_text" class="text">
        <p><span>资深讲师15%</span></p>
      </div>
    </div>

    <!-- Unnamed (圆形) -->
    <div id="u311" class="ax_default ellipse">
      <img id="u311_img" class="img" src="./images/综合数据/u311.svg" />
      <div
        id="u311_text"
        class="text"
        style="display: none; visibility: hidden"
      >
        <p></p>
      </div>
    </div>

    <!-- Unnamed (矩形) -->
    <div id="u312" class="ax_default label">
      <div id="u312_div" class=""></div>
      <div id="u312_text" class="text">
        <p><span>副教授10%</span></p>
      </div>
    </div>

    <!-- Unnamed (圆形) -->
    <div id="u313" class="ax_default ellipse">
      <img id="u313_img" class="img" src="./images/综合数据/u313.svg" />
      <div
        id="u313_text"
        class="text"
        style="display: none; visibility: hidden"
      >
        <p></p>
      </div>
    </div>

    <!-- Unnamed (矩形) -->
    <div id="u314" class="ax_default label">
      <div id="u314_div" class=""></div>
      <div id="u314_text" class="text">
        <p><span>教授5%</span></p>
      </div>
    </div>

    <!-- Unnamed (形状) -->
    <div id="u315" class="ax_default line">
      <img id="u315_img" class="img" src="./images/综合数据/u315.svg" />
      <div
        id="u315_text"
        class="text"
        style="display: none; visibility: hidden"
      >
        <p></p>
      </div>
    </div>

    <!-- Unnamed (形状) -->
    <div id="u316" class="ax_default line">
      <img id="u316_img" class="img" src="./images/综合数据/u316.svg" />
      <div
        id="u316_text"
        class="text"
        style="display: none; visibility: hidden"
      >
        <p></p>
      </div>
    </div>

    <!-- Unnamed (形状) -->
    <div id="u317" class="ax_default line">
      <img id="u317_img" class="img" src="./images/综合数据/u317.svg" />
      <div
        id="u317_text"
        class="text"
        style="display: none; visibility: hidden"
      >
        <p></p>
      </div>
    </div>

    <!-- Unnamed (形状) -->
    <div id="u318" class="ax_default line">
      <img id="u318_img" class="img" src="./images/综合数据/u318.svg" />
      <div
        id="u318_text"
        class="text"
        style="display: none; visibility: hidden"
      >
        <p></p>
      </div>
    </div>

    <!-- Unnamed (形状) -->
    <div id="u319" class="ax_default line">
      <img id="u319_img" class="img" src="./images/综合数据/u319.svg" />
      <div
        id="u319_text"
        class="text"
        style="display: none; visibility: hidden"
      >
        <p></p>
      </div>
    </div>

    <!-- Unnamed (形状) -->
    <div id="u320" class="ax_default line">
      <img id="u320_img" class="img" src="./images/综合数据/u320.svg" />
      <div
        id="u320_text"
        class="text"
        style="display: none; visibility: hidden"
      >
        <p></p>
      </div>
    </div>

    <!-- Unnamed (形状) -->
    <div id="u321" class="ax_default icon">
      <img id="u321_img" class="img" src="./images/综合数据/u321.svg" />
      <div
        id="u321_text"
        class="text"
        style="display: none; visibility: hidden"
      >
        <p></p>
      </div>
    </div>

    <!-- Unnamed (形状) -->
    <div id="u322" class="ax_default icon">
      <img id="u322_img" class="img" src="./images/综合数据/u322.svg" />
      <div
        id="u322_text"
        class="text"
        style="display: none; visibility: hidden"
      >
        <p></p>
      </div>
    </div>

    <!-- account balance (形状) -->
    <div id="u323" class="ax_default shape" data-label="account balance">
      <img
        id="u323_img"
        class="img"
        src="./images/综合数据/account_balance_u323.svg"
      />
      <div
        id="u323_text"
        class="text"
        style="display: none; visibility: hidden"
      >
        <p></p>
      </div>
    </div>

    <!-- language (形状) -->
    <div id="u324" class="ax_default shape" data-label="language">
      <img
        id="u324_img"
        class="img"
        src="./images/综合数据/language_u324.svg"
      />
      <div
        id="u324_text"
        class="text"
        style="display: none; visibility: hidden"
      >
        <p></p>
      </div>
    </div>

    <!-- Unnamed (矩形) -->
    <div id="u325" class="ax_default label">
      <div id="u325_div" class=""></div>
      <div id="u325_text" class="text">
        <p><span>课程总数</span></p>
      </div>
    </div>

    <!-- Unnamed (矩形) -->
    <div id="u326" class="ax_default label">
      <div id="u326_div" class=""></div>
      <div id="u326_text" class="text">
        <p><span>国家级课程</span></p>
      </div>
    </div>

    <!-- Unnamed (矩形) -->
    <div id="u327" class="ax_default label">
      <div id="u327_div" class=""></div>
      <div id="u327_text" class="text">
        <p><span>省级课程</span></p>
      </div>
    </div>

    <!-- Unnamed (矩形) -->
    <div id="u328" class="ax_default label">
      <div id="u328_div" class=""></div>
      <div id="u328_text" class="text">
        <p><span>院级课程</span></p>
      </div>
    </div>

    <!-- Unnamed (矩形) -->
    <div id="u329" class="ax_default label">
      <div id="u329_div" class=""></div>
      <div id="u329_text" class="text">
        <p><span>8,567</span></p>
      </div>
    </div>

    <!-- Unnamed (矩形) -->
    <div id="u330" class="ax_default label">
      <div id="u330_div" class=""></div>
      <div id="u330_text" class="text">
        <p><span>67</span></p>
      </div>
    </div>

    <!-- Unnamed (矩形) -->
    <div id="u331" class="ax_default label">
      <div id="u331_div" class=""></div>
      <div id="u331_text" class="text">
        <p><span>500</span></p>
      </div>
    </div>

    <!-- Unnamed (矩形) -->
    <div id="u332" class="ax_default label">
      <div id="u332_div" class=""></div>
      <div id="u332_text" class="text">
        <p><span>8,000</span></p>
      </div>
    </div>

    <!-- Unnamed (组合) -->
    <div
      id="u333"
      class="ax_default"
      data-left="1566"
      data-top="1027"
      data-width="100"
      data-height="37"
      layer-opacity="1"
    >
      <!-- 2961d645 e467 4be1 afba 82f4efd34939 (组合) -->
      <div
        id="u334"
        class="ax_default"
        data-label="2961d645 e467 4be1 afba 82f4efd34939"
        data-left="1566"
        data-top="1027"
        data-width="100"
        data-height="37"
        layer-opacity="1"
      >
        <!-- Unnamed (形状) -->
        <div id="u335" class="ax_default line">
          <img id="u335_img" class="img" src="./images/综合数据/u335.svg" />
          <div
            id="u335_text"
            class="text"
            style="display: none; visibility: hidden"
          >
            <p></p>
          </div>
        </div>

        <!-- Unnamed (形状) -->
        <div id="u336" class="ax_default line">
          <img id="u336_img" class="img" src="./images/综合数据/u336.svg" />
          <div
            id="u336_text"
            class="text"
            style="display: none; visibility: hidden"
          >
            <p></p>
          </div>
        </div>
      </div>
    </div>

    <!-- Unnamed (组合) -->
    <div
      id="u337"
      class="ax_default"
      data-left="1688"
      data-top="1027"
      data-width="100"
      data-height="37"
      layer-opacity="1"
    >
      <!-- 2961d645 e467 4be1 afba 82f4efd34939 (组合) -->
      <div
        id="u338"
        class="ax_default"
        data-label="2961d645 e467 4be1 afba 82f4efd34939"
        data-left="1688"
        data-top="1027"
        data-width="100"
        data-height="37"
        layer-opacity="1"
      >
        <!-- Unnamed (形状) -->
        <div id="u339" class="ax_default line">
          <img id="u339_img" class="img" src="./images/综合数据/u335.svg" />
          <div
            id="u339_text"
            class="text"
            style="display: none; visibility: hidden"
          >
            <p></p>
          </div>
        </div>

        <!-- Unnamed (形状) -->
        <div id="u340" class="ax_default line">
          <img id="u340_img" class="img" src="./images/综合数据/u336.svg" />
          <div
            id="u340_text"
            class="text"
            style="display: none; visibility: hidden"
          >
            <p></p>
          </div>
        </div>
      </div>
    </div>

    <!-- Unnamed (组合) -->
    <div
      id="u341"
      class="ax_default"
      data-left="1810"
      data-top="1027"
      data-width="100"
      data-height="37"
      layer-opacity="1"
    >
      <!-- 2961d645 e467 4be1 afba 82f4efd34939 (组合) -->
      <div
        id="u342"
        class="ax_default"
        data-label="2961d645 e467 4be1 afba 82f4efd34939"
        data-left="1810"
        data-top="1027"
        data-width="100"
        data-height="37"
        layer-opacity="1"
      >
        <!-- Unnamed (形状) -->
        <div id="u343" class="ax_default line">
          <img id="u343_img" class="img" src="./images/综合数据/u335.svg" />
          <div
            id="u343_text"
            class="text"
            style="display: none; visibility: hidden"
          >
            <p></p>
          </div>
        </div>

        <!-- Unnamed (形状) -->
        <div id="u344" class="ax_default line">
          <img id="u344_img" class="img" src="./images/综合数据/u336.svg" />
          <div
            id="u344_text"
            class="text"
            style="display: none; visibility: hidden"
          >
            <p></p>
          </div>
        </div>
      </div>
    </div>

    <!-- Unnamed (矩形) -->
    <div id="u345" class="ax_default label">
      <div id="u345_div" class=""></div>
      <div id="u345_text" class="text">
        <p><span>国家级成果</span></p>
      </div>
    </div>

    <!-- Unnamed (矩形) -->
    <div id="u346" class="ax_default label">
      <div id="u346_div" class=""></div>
      <div id="u346_text" class="text">
        <p><span>省级成果</span></p>
      </div>
    </div>

    <!-- Unnamed (矩形) -->
    <div id="u347" class="ax_default label">
      <div id="u347_div" class=""></div>
      <div id="u347_text" class="text">
        <p><span>154</span></p>
      </div>
    </div>

    <!-- Unnamed (矩形) -->
    <div id="u348" class="ax_default label">
      <div id="u348_div" class=""></div>
      <div id="u348_text" class="text">
        <p><span>554</span></p>
      </div>
    </div>

    <!-- Unnamed (矩形) -->
    <div id="u349" class="ax_default label">
      <div id="u349_div" class=""></div>
      <div id="u349_text" class="text">
        <p><span>1554</span></p>
      </div>
    </div>

    <!-- Unnamed (形状) -->
    <div id="u350" class="ax_default icon">
      <img id="u350_img" class="img" src="./images/综合数据/u350.svg" />
      <div
        id="u350_text"
        class="text"
        style="display: none; visibility: hidden"
      >
        <p></p>
      </div>
    </div>

    <!-- Unnamed (形状) -->
    <div id="u351" class="ax_default icon">
      <img id="u351_img" class="img" src="./images/综合数据/u350.svg" />
      <div
        id="u351_text"
        class="text"
        style="display: none; visibility: hidden"
      >
        <p></p>
      </div>
    </div>

    <!-- Unnamed (矩形) -->
    <div id="u352" class="ax_default label">
      <div id="u352_div" class=""></div>
      <div id="u352_text" class="text">
        <p><span>院级成果</span></p>
      </div>
    </div>

    <!-- Unnamed (形状) -->
    <div id="u353" class="ax_default icon">
      <img id="u353_img" class="img" src="./images/综合数据/u350.svg" />
      <div
        id="u353_text"
        class="text"
        style="display: none; visibility: hidden"
      >
        <p></p>
      </div>
    </div>

    <!-- Unnamed (占位符) -->

    <!-- Unnamed (热区) -->
    <div id="u355" class="ax_default"></div>
    <div id="u354" style="display: none; visibility: hidden"></div>

    <!-- Unnamed (占位符) -->

    <!-- Unnamed (热区) -->
    <div id="u358" class="ax_default"></div>
    <div id="u357" style="display: none; visibility: hidden"></div>
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
  watch,
} from "vue";
import { get, post } from "@/awsuiAxios/index.js";
import isDev from "@/config/index.js";
import { useRouter, useRoute, onBeforeRouteUpdate } from "vue-router";

const router = useRouter();
const route = useRoute();

const clickOther = (path) => {
  router.push({ path: path });
};
</script>

<style lang="less" scoped>
@import "./data/styles.css";
@import "./files/综合数据/styles.css";
@import "./resources/css/axure_rp_page.css";
</style>
