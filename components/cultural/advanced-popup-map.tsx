// components/cultural/advanced-popup-map.tsx
"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Users, Sparkles, TrendingUp, Award, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Region {
  id: string
  name: string
  color: string
  description: string
  population?: string
  highlights: string[]
  pathData: string
}

const REGIONS: Region[] = [
  // banten
  {
    id: "banten",
    name: "Banten",
    color: "#8CF000",
    description: "Urban coastal subculture with egalitarian traditions",
    population: "~5.1M",
    highlights: ["Ludruk Theater", "Remo Dance", "Rujak Cingur"],
    pathData:
      "M145.5 38.5001C131.5 30.5001 130.333 41.8334 131.5 48.5001L109.5 67.0001C107.333 69.3334 101.7 81.3001 102.5 108.5C103.3 135.7 94.9998 135 91.4998 137C91.4998 137 87.0658 141.864 83.4998 141.5C78.9152 141.032 83.2998 132 76.4998 132C69.6998 132 69.3333 146.5 69 154C52 169 51.9998 183 39.4998 186.5C39.1678 186.356 40.1595 181.739 38.5 179.5L37.0581 178.238C36.1187 177.602 35.0782 177.007 34.5 176C33.6305 174.486 31.4495 174.934 31 173.5C30.4277 171.674 33.9555 170.926 33.5 169.5C32.796 167.296 31.2546 165.041 30.9998 163C29 160 28.5 157 27.9998 157C26.9004 157 22.7102 158.832 20.5 161C20.3355 161.161 21.5 164.477 20 166C17.8784 168.064 18.9309 167.456 16.5 169C14.4995 170.271 11.5836 173.559 10 175C9.09276 175.826 9.14267 176.643 8.5 177.5C7.26552 179.146 1.00023 171 0.5 175C0.5 175 0.5 177.5 2.49958 179.5C5.73436 182.735 5.04012 186.948 5.5 191.5C6.04002 196.845 10.9998 190 10.9998 190L21 184.5L30.5 188L35 190.5C35 190.5 34.8019 193.7 36 194C37 194.25 37.125 191.813 38 191C38.8749 190.188 40 190.5 40 190.5L45.5 194L47.5 195.5L57 197L65.5 193.5L93.9998 192.5C122 193 110.5 179.5 127 184C144.737 188.837 150.5 204 172 213L193.5 215.5C193.5 212 193.9 204.6 195.5 203C197.1 201.4 200.5 196.333 202 194C202 187.5 207 184 210.5 184C213.3 184 214.667 180 215 178L207 175C200.2 169.4 200.833 156.333 202 150.5L198.5 141.5V132L203.5 124.5L200 118V111.5L205 105.5L213.5 108.5H223L231.5 114.5L243 111.5H252.5H262V108.5L258 105.5V100L254 98.5001V95.0001L252.5 90.5001H248.5V86.5001L246 82.5001L243 78.0001L244.5 70.0001L249.838 67.0001C245.705 63.4256 243.634 59.4452 243 57.0001C232.2 50.6001 219.833 54.3334 215 57.0001C200.2 57.0001 194.167 51.3334 193 48.5001C179 40.0001 174.5 38.5001 172 48.5001C170 56.5001 160.5 57.5001 156 57.0001C146 53.4001 144.833 43.1668 145.5 38.5001Z",
  },

  // jabar
  {
    id: "jabar",
    name: "Jawa Barat",
    color: "#FF0DEF",
    description: "Island identity with strong maritime traditions",
    population: "~4.2M",
    highlights: ["Karapan Sapi", "Keris Craft", "Pesantren"],
    pathData:
      "M291.5 48.5C291.5 58.5 299.5 57 291.5 67C290.992 67.6351 290.436 68.2198 289.841 68.7575V78C289.894 79 289.4 81.5 287 83.5V90.5L283.5 94.5L279 96L281.5 103.5V108.5C281.167 111.167 279 115.6 273 112C272.333 110.667 270.4 108.1 268 108.5L265 112L262.5 111L243 111.5L232 114.5L223 108.5H213.5L205.5 105.5L200 111.5V118L203.5 124.5L198.5 132V141.5L202 150.5C200.833 156 200.2 168.6 207 175L215 178C214.833 179.667 213.8 183.2 211 184C208 184.167 202 186.4 202 194C200.167 196.833 196.2 202.7 195 203.5C194.333 206.167 193.1 212.3 193.5 215.5C223.1 207.5 220.5 219.667 215.5 230C205.9 246.8 197 242 193 246.5C180.2 273.3 198.333 281.333 209 282C251.4 294.8 281.667 293.667 291.5 291.5C330.3 295.9 362.333 302 373.5 304.5C400.7 326.1 424.5 337.5 433 340.5C499 360.1 534.333 353.167 539 350C537.5 324.5 556.5 331 561 331C567 333 564.5 337.5 567.5 338C571 334.5 568 332 571 330C573.446 330.367 577.171 329.991 579.5 331L583.5 333C584.535 333.69 586.686 330.503 588 332V329L583.5 326L579.5 321.5L581 315.5V309.5L578 302L576 294V289.5L571 286V284L567.5 279.5L566 274.5L562.204 276L558 277.5L550 276V266C556.8 258 552.833 252.667 550 251C552 243.8 558.5 243 561.5 243.5C564.7 245.1 569.167 244.833 571 244.5L578 239.5C588.4 236.7 587 230 585 227L588 220.5L585 215.5L582 207L585 201C588.6 199.8 591.5 197.167 592.5 196L594.5 188V179.726L582 189C547.6 185.4 541.666 151.167 543 134.5C524.6 125.3 519.666 106.667 519.5 98.5C514.166 93.1667 501.6 85.7 494 98.5C486.4 111.3 477.167 110.167 473.5 108C451.5 105.6 437.333 90 433 82.5C413 82.5 415 85.5 412.5 92C398 82.5 385.5 81.6667 379.5 82.5C366.7 75.3 354.833 56.8333 350.5 48.5C335.7 41.7 322.667 45.6667 318 48.5C292.5 30 291.5 38.5 291.5 48.5Z",
  },

  // jateng
  {
    id: "jateng",
    name: "Jawa Tengah",
    color: "#FAFA10",
    description: "Refined Javanese etiquette and gamelan traditions",
    population: "~3.6M",
    highlights: ["Gamelan", "Wayang Kulit", "Tata Krama"],
    pathData:
      "M668 196C668 196 688 194.5 692 193.5C696 192.5 707 182 707 182C707 182 722 192.5 730.5 196C739 199.5 776.608 210.024 805.5 197.329C808.905 195.833 811 193 815.5 192.5C820 194 822 195.5 823.459 198.5C828.845 202.879 836.64 208.514 847.5 213C855.666 212 869.6 204.8 876 188C877.5 180 875.8 171.9 889 165.5C887.833 153 890.4 127.7 910 126.5C917.5 120.5 946.5 117.5 957.5 123.5C958 132 962 152.9 976 162.5C980.833 166.667 996.3 175.5 1015.5 165.5C1022.83 157.667 1041.9 149.1 1059.5 177.5L1059 182V188L1055 192L1051.5 191L1050 198V205.5H1044L1043.5 212L1051.5 216.5L1050 224.5L1052.5 229.5L1050 233.5V238L1048 241.5L1047.5 247.5L1044 250.5L1038.5 255L1033.5 260L1029.5 263.5H1024.5L1021.5 266L1019.5 270.5L1023.5 272V276.5L1022.5 279.5L1018 278L1011 276.5L1003 272L994.5 268.5L990 267.5L985 260C984.667 260 982.8 260.5 978 262.5C976 262.167 972.2 263 973 269L975.5 272L973 278V283L969.5 287C969.667 289.333 970.3 294.5 971.5 296.5C973 299 977 304 974.5 311C978.667 314 985.7 323.2 980.5 336L986 342L990.5 343L995.5 341C996 341.333 997 342.9 997 346.5C997 350.1 998 352.333 998.5 353L1001 360L998.5 367L996.5 372.5L992.5 375.5H987.5L984.5 372.5L981 375L978 372.5L972.5 375.5L973.5 379L969.5 380.5L972.5 386.5L969.5 391.5L970 395.5H965.5L964.5 391.5L963.5 388.5L961 390.5L960.5 396L957.5 397.5C954.5 398.5 947.3 399.6 942.5 396C941.5 397.333 939.1 400.6 937.5 403C935.5 406 933.5 408.033 933.5 413L934.5 421.605C931.175 420.289 927.032 419.013 922 417.967V413L920.5 409L917.5 410.5L915.5 409L914 407V402.5L912.5 399.5L910.5 395V390V385L912.5 377V369.5L915.5 361C915.1 354.2 911 353.833 909 354.5L905 351L903.5 354.5L898.5 352.5L895.5 350L891 352.5L885.5 351L878 348L873.5 351L867.5 346L862.5 325.5C863.333 319.667 863.8 308.3 859 309.5C854.2 310.7 847.333 318.667 844.5 322.5C838.1 324.5 832.167 332.667 830 336.5L827.5 325.5L822.5 327.5L810.5 326.5C812.167 326 814.5 325.1 810.5 325.5C806.5 325.9 806.167 329.667 806.5 331.5L809.5 334L807.5 342L797 354.5L795.5 359.5L791 367.163C780.619 360.345 759.406 352.145 721 348H689C686.708 340.095 663.5 328 647.5 330C641.907 329.85 638.015 326.671 632 328C628.53 328.767 623.019 332.634 619.5 334V337L623.5 340C623.5 340 629 343.5 630 344.5C631 345.5 626 347 626 347L620 345.5L613.5 343.5L606.5 342L596.5 340C595.5 340 589.9 342.035 589 339.5C588.53 338.177 587.947 338.144 587.5 337C587.006 335.738 588.274 332.412 588 332V329L583.5 325.5L579.5 322L581 315.5V309L578 302L576 294.5V289.5L571 286V284L567.5 279.5L566 274.5L558 277.5L550 276V266C556.4 258 552.667 252.667 550 251C551.2 243.8 558.167 243 561.5 243.5C564.3 245.1 569 244.833 571 244.5L578 239.5C588.4 237.5 587 230.333 585 227L588 220.5L585 215.5L582 207L585 201C587.4 200.2 591 197.333 592.5 196L594.5 188V179.726L597.5 177.5C597.773 180.641 602.163 186.354 616.5 188.317C619.662 188.75 626.308 182 630.5 182C633.872 182 634.039 189.099 637 189.274C654.411 190.307 664.724 194.006 668 196Z",
  },

  // arekan
  {
    id: "arekan",
    name: "arekan",
    color: "#32D723",
    description: "Mountain community with sacred Bromo landscape",
    population: "~110K",
    highlights: ["Yadnya Kasada", "Mount Bromo", "Highland Agriculture"],
    pathData:
      "M1189.5 203C1169.9 187 1140.67 196.333 1128.5 203L1132.5 210.5V216.5L1139.5 222V227.5L1143.5 231.5V237L1132.5 240L1128.5 252.5L1115.58 258.5V270.5L1108 279.5L1118.5 290.5L1128.5 295.5L1115.58 300L1118.5 319.5L1132.5 322L1139.5 335.442L1122 343L1115.58 355L1126 368L1113.5 375L1106 386.5L1113.5 396L1101.5 411.5L1108 427.5C1111.49 425.937 1113.33 431.833 1115.58 435.803C1116.45 437.336 1117.39 438.582 1118.5 439C1122.5 440.5 1154 439 1154 439C1167.6 439 1177.33 447 1180.5 451C1183.48 452.653 1188.02 451.56 1193.05 451C1195.62 450.713 1198.32 450.566 1201 451C1204.05 451.494 1206.45 452.496 1208.71 453.571C1212.33 455.289 1215.57 457.192 1220.5 457.5L1217.5 445L1214 427.5L1217.5 414L1214 405.5L1216 390.5L1217.5 382L1223 376.5V370.5L1227.5 360C1223.83 358.667 1216 355 1214 351C1211.5 346 1217 343 1220.5 340.5C1224 338 1220.5 333 1224.5 327.5C1228.5 322 1234.5 326 1237.8 326C1241.1 326 1249.5 327.5 1251.5 326C1253.1 324.8 1259.17 321.167 1262 319.5C1252.8 312.7 1254.5 303.667 1256.5 300V277.5C1255.17 273.333 1251 263 1245 255C1239 247 1230.83 251.667 1227.5 255L1220.5 240V227.5C1218.67 222.667 1214.8 211 1214 203C1213 193 1203 189 1201 196C1199.4 201.6 1192.67 203 1189.5 203Z",
  },

  // 6. PANDALUNGAN - Ungu (#5F23D7) dengan opacity 0.5
  {
    id: "pandalungan",
    name: "Pandalungan",
    color: "#5F23D7",
    description: "Javanese-Madurese cultural blend",
    population: "~2.2M",
    highlights: ["Mixed Dialect", "Coastal Cuisine", "Hybrid Traditions"],
    pathData:
      "M1297 333C1287.4 321 1269.67 319 1262 319.5C1259.17 321.167 1253.1 324.8 1251.5 326C1249.5 327.5 1241.1 326 1237.8 326C1234.5 326 1228.5 322 1224.5 327.5C1220.5 333 1224 338 1220.5 340.5C1217 343 1211.5 346 1214 351C1216 355 1223.83 358.667 1227.5 360C1230.67 358.333 1237.8 355 1241 355C1245 355 1251 355 1256.5 353C1262 351 1275.5 350 1280.5 355C1284.5 359 1289.5 361.667 1291.5 362.5C1295.33 362.667 1303.5 362.4 1305.5 360C1307.5 357.6 1317.67 362 1322.5 364.5L1319.5 370.5L1322.5 374L1319.5 380.5V385.5L1317 390.5L1319.5 398L1316 402.5L1317 411L1312.5 418.5L1315 426.5L1310.5 432.409C1325.17 435.225 1337.63 443.958 1344.5 451C1362.5 445.8 1368.33 453.167 1369 457.5C1383.8 466.3 1387.83 467.5 1388 467L1382.5 445.5L1388 439L1401.5 442.182H1415L1412 434L1401.5 426.5L1406.05 414L1401.5 402.5L1419.5 392.5C1428.17 395.833 1444.9 399.3 1442.5 386.5C1440.1 373.7 1447.17 365.167 1451 362.5C1455.83 360.167 1467.9 356.9 1477.5 362.5C1487.1 368.1 1507.91 366.167 1515.5 364.5C1517.25 360.407 1517.5 359.5 1517.5 355.5C1515.9 343.5 1494.17 340.5 1483.5 340.5C1469.9 340.5 1456 324.5 1449 319L1445.5 322L1427.5 333C1416.37 329.769 1412.72 331.694 1409.32 335.442C1408.28 336.595 1407.26 337.92 1406.05 339.32C1405.84 339.562 1405.63 339.805 1405.41 340.051C1392.28 334.773 1380.46 334.498 1371.62 335.968C1365.43 336.996 1360.7 338.879 1358 340.5C1322.8 346.5 1302.67 338 1297 333Z",
  },

  // samin
  {
    id: "samin",
    name: "Samin",
    color: "#4514F6",
    description: "Folk arts and woodcraft traditions",
    population: "~0.9M",
    highlights: ["Wood Carving", "Folk Arts", "Local Ceremonies"],
    pathData:
      "M1128.5 252.5L1132.5 240H1121L1115.58 237H1105.5L1101.5 242L1099.5 244.5H1093L1089.02 252.5L1085.5 260V268V275.5L1077.04 282.5L1068 290.5L1080 294L1093 295.5L1099.5 290.5H1118.5L1108 279.5L1115.58 270.5V258.5L1128.5 252.5Z",
  },

  // tengger
  {
    id: "tengger",
    name: "Tengger",
    color: "#23D7C2",
    description: "Community known for honesty ethics",
    population: "~35K",
    highlights: ["Samin Ethics", "Agrarian Life", "Social Movement"],
    pathData:
      "M1260 450C1265.5 447.5 1268 445 1268 445C1270.22 442.895 1270.46 442.545 1272.71 440.931C1285.58 431.693 1298.75 430.154 1310.5 432.409L1315 426.5L1312.5 418.5L1317 411L1316 402.5L1319.5 398L1317 390.5L1319.5 385.5V380.5L1322.5 374L1319.5 370.5L1322.5 364.5C1317.67 362 1307.5 357.6 1305.5 360C1303.5 362.4 1295.33 362.667 1291.5 362.5C1289.5 361.667 1284.5 359 1280.5 355C1275.5 350 1262 351 1256.5 353C1251 355 1245 355 1241 355C1237.8 355 1230.67 358.333 1227.5 360L1223 370.5V376.5L1217.5 382L1216 390.5L1214 405.5L1217.5 414L1214 427.5L1217.5 445L1220.5 457.5C1227.65 457.947 1232.15 455.058 1237.8 452.91C1239.96 452.089 1242.29 451.377 1245 451C1250.81 450.191 1254.5 452.5 1260 450Z",
  },

  // 9. MADURA-BASE - Abu-abu kehijauan (#BABC65)
  {
    id: "mataraman",
    name: "Mataraman",
    color: "#BABC65",
    description: "Base Madurese cultural practices",
    population: "~1.1M",
    highlights: ["Traditional Weaving", "Daily Rituals", "Village Ceremonies"],
    pathData:
      "M1108 183.5C1091.6 188.3 1068.83 181.5 1059.5 177.5C1059.17 179.833 1058.6 185.1 1059 187.5L1055 192L1051.5 191L1050 198V205.5H1044L1043.5 212L1051.5 216.5L1050 224.5L1052.5 229.5L1050 233.5V237.5L1048 242L1047 246.5L1029 262.5L1024.5 263.5L1022 265.5L1019 270.5L1023.5 272V275.5L1022 279.5C1019.83 278.333 1014.7 276.1 1011.5 276.5C1006.33 273.167 995.3 265.8 990.5 267L985 260H980C977.833 259.833 971.3 262.8 972.5 268L975.5 272L973 278.5V282.5L969.5 287C969.667 289.333 970.2 294.3 971 295.5C973.333 298.667 977.3 306.1 974.5 310.5C979 314.667 984.5 325.6 978.5 336L986 342L990.5 343L995.5 341C996.333 342.5 996.9 347.1 996.5 351.5L1001 360L1015.5 368.5L1029.5 364.5L1040.5 368.5L1050 373L1063.5 368.5L1077 375L1073.5 386.5L1066.41 391.5L1059.5 402L1044 407L1029.5 411.5L1024.5 421.605L1015.5 427L1027 439H1049C1055.83 441.5 1067.2 451.5 1068 445.5C1068.23 443.742 1064.8 444.146 1066.41 442.182L1066.5 442.168C1068.71 441.833 1070.25 440.886 1070.5 439L1072.85 434C1072.35 436.5 1072.39 440.205 1073.5 439.5C1074.67 438.758 1077 437 1077 433C1077 432.139 1077 431.205 1077.04 430.314C1079.03 428.981 1081.06 428.023 1082.5 427.5C1084.55 428.711 1086.77 429.475 1089.02 429.908C1093.38 431.754 1098.19 433.717 1101.5 433.5C1105.21 433.256 1105.94 428.426 1108 427.5L1101.5 411.5L1112.5 396L1105.5 387.5L1112.5 375L1125.5 368.5L1115.58 355.5L1121 344.5L1139.5 335.968L1132.5 322L1118.5 319L1115.58 300L1128.5 295.5L1118.5 290.5H1099.5L1093 295.5L1080 294L1068 290.5L1077.04 282.5L1085.5 275.5V268V260L1089.02 252.5L1093 244.5H1099.5L1101.5 242L1105.5 237H1115.58L1121 240H1132.5L1144 237V232L1139.5 227.5V222L1132.5 216V210.5L1128.5 203C1107.3 195 1110.5 186.5 1108 183.5Z M991.5 427H1015.5V416.5L1009.5 404L1004.5 401.5L1001 390L1004.5 381L997.5 380L996.5 371.5L993 375H988L984 371.5L981.5 374.5L978.5 371.5L972.5 375L973.5 378L969.5 380L972 386L969.5 391L970 395H965.5V391.5L963.5 388L961 390L960.5 395.5C957.167 397.333 949.3 399.9 942.5 395.5C939.667 398.667 933.9 406.2 933.5 411L934.5 421.105C939.863 423.228 943.097 425.457 944.5 427L961.5 423.5L977 433L991.5 427Z",
  },

  // 10. MADURA-BAWEAN - Pulau kecil atas tengah (#BB65BC)
  {
    id: "madura-base",
    name: "Madura",
    color: "#BB65BC",
    description: "Island subculture with maritime traditions",
    population: "~70K",
    highlights: ["Maritime Culture", "Local Language", "Island Arts"],
    pathData:
      "M1225.5 229.5C1224.33 227.667 1223.1 223.6 1227.5 222C1231.9 220.4 1234 221.333 1234.5 222C1237 222.167 1242.6 220.1 1245 210.5C1247.4 200.9 1250.33 199.5 1251.5 200L1271 198C1276.67 197.667 1288.9 197.6 1292.5 200C1296.1 202.4 1314 201 1322.5 200H1357.5H1388.5L1417 198C1420 196.667 1427.6 194.4 1434 196C1442 198 1451 206.5 1453.5 205.5C1455.5 204.7 1459.33 212.167 1461 216C1465.33 216.833 1472.3 219.2 1465.5 222C1463 223.333 1456.3 225.4 1449.5 223C1445.83 223.167 1437.6 223.9 1434 225.5C1430.83 225.167 1424.5 227 1424.5 237C1423.17 239.667 1418.2 244 1409 240C1402.17 238 1386.5 235.2 1378.5 240C1375.17 241.333 1368.2 246.9 1367 258.5C1366 258.833 1364 258.1 1364 252.5C1363.17 254.167 1360.1 257 1354.5 255C1347.33 253.167 1329.9 250.6 1317.5 255C1314.17 255.833 1304.5 257 1292.5 255C1291 253.333 1284.6 250.5 1271 252.5C1265.33 248.333 1249.5 241.5 1231.5 247.5C1228.83 246.5 1224.3 243 1227.5 237C1228.5 235.167 1229.5 231.1 1225.5 229.5Z",
  },

  // 11. MADURA-KANGEAN - Pulau kecil kanan atas (#D75323)
  {
    id: "madura-kangean",
    name: "Madura-Kangean",
    color: "#D75323",
    description: "Northeastern island cluster with coastal identity",
    population: "~85K",
    highlights: ["Coastal Rituals", "Fishing", "Local Crafts"],
    pathData:
      "M1638.5 201.5H1640.5L1641.5 200L1643.5 201.5H1665L1666.5 203.5H1667.5H1670.5L1672.5 205H1674.5L1679 206L1680.5 208.5H1682L1684 210.5H1687L1688.5 211.5L1690 214L1691 217.5L1690 221L1688.5 222L1685.5 221L1682 218.5H1680.5L1677 216.5L1674.5 215.5C1673.67 214.833 1671.7 213.9 1670.5 215.5L1668.5 217.5H1665C1665.33 216.5 1665.6 214.2 1664 213H1660L1655 216.5L1658 217.5L1661.5 220L1663 227H1655L1653.5 226L1653 224.5L1652 223.5L1652.5 222L1653 221L1651 220.5H1649.5L1650 222.5L1649.5 224H1648V225.5L1649 226.5L1648.5 228L1647.5 229L1645 228L1644.5 226L1642.5 225.5L1642 222.5L1643.5 219.5L1642.5 218L1639 216.5L1635.5 218.5L1633.5 217.5V211L1635.5 210.5L1637 208.5L1638.5 209.5L1639.5 208.5L1640.5 206L1642.5 203.5L1638.5 201.5Z",
  },

  // 12. MERAH (Red area) - Area merah (#FF5151)
  {
    id: "red-area",
    name: "DIY",
    color: "#FF5151",
    description: "Special cultural preservation area",
    population: "Variable",
    highlights: ["Cultural Preservation", "Heritage Sites", "Traditional Practices"],
    pathData:
      "M847.5 395C869.9 398.2 891.5 410 899.5 415.5C908.408 415.755 915.865 416.69 922 417.967V413L920.5 409L917.5 410.5L915.5 409L914 407V402.5L910.5 395V385L912.5 377V369.5L915.5 361C915.1 354.2 911 353.833 909 354.5L905 351L903.5 354.5L898.5 352.5L895.5 350L891 352.5L878 348L873.5 351L867.5 346L862.5 325.5C864.5 313.5 861.333 309.833 859.5 309.5C852.7 311.9 846.667 319.167 844.5 322.5C836.9 325.3 831.667 332.667 830 336L827.5 325.5L822 327.5L812 326.5C806.8 326.1 806.167 329.667 806.5 331.5L809.5 334L807.5 342L797 354.5L795.5 359.5L791 367.163C795.647 370.215 798.124 372.99 799 375C805 384.6 833.833 392.333 847.5 395Z",
  },

  // panaragan
  {
    id: "panaragan",
    name: "Panaragan",
    color: "#F61482",
    description: "Emerging cultural development area",
    population: "Variable",
    highlights: ["Cultural Innovation", "Youth Programs", "Modern Heritage"],
    pathData:
      "M1001 360L997 372L997.5 380.5L1004.5 381.5L1001 390.5L1004.5 402L1009.5 404.5L1015.5 417V427.5L1024.5 421.605L1029.5 411.5L1044 407L1059.5 402L1066.41 391.5L1073.5 386.5L1077 375L1063.5 368.5L1050 373L1040.5 368.5L1029.5 364.5L1015.5 368.5L1001 360Z",
  },

  {
    id: "osing",
    name: "Osing",
    color: "#D723AA",
    description: "Emerging cultural development area",
    population: "Variable",
    highlights: ["Cultural Innovation", "Youth Programs", "Modern Heritage"],
    pathData:
      "M1503.5 427.5C1508.17 415.667 1516.2 389.9 1511 381.5C1508.07 376.773 1513.25 369.768 1515.5 364.5C1507.91 366.167 1487.1 368.1 1477.5 362.5C1467.9 356.9 1455.83 360.167 1451 362.5C1447.17 365.167 1440.1 373.7 1442.5 386.5C1444.9 399.3 1428.17 395.833 1419.5 392.5L1401.5 402.5L1406.05 414L1401.5 426.5L1412 434L1415 442.182H1401.5L1388 439L1382.5 445.5L1388 467C1398 474.6 1410.17 477.167 1415 477.5C1417.36 477.5 1419.58 477.588 1421.66 477.749C1422.44 477.725 1423.23 477.653 1424 477.5C1431 480 1429 476.5 1434 475.5C1435.71 477.491 1435.96 478.997 1435.86 480.477C1435.78 481.599 1435.5 482.707 1435.5 484C1438.62 485.082 1441.4 484.093 1442.5 483C1446.38 485.035 1447.15 486.945 1448 488.5C1452.76 491.255 1460.38 489.841 1467.01 487.499C1467.17 487.577 1467.33 487.657 1467.5 487.74C1469.26 487 1475.95 490.282 1477.5 489.5C1478.98 488.752 1478.83 484.601 1479.57 483.028C1479.69 482.78 1479.83 482.596 1480 482.5C1483.63 481.694 1486.16 482.836 1488.93 483.754C1489.6 483.975 1490.28 484.183 1491 484.348C1498.41 487.698 1501.95 492.401 1502.47 496.717C1502.82 499.682 1501.74 502.464 1499.5 504.5C1499.91 505.513 1500.15 506.261 1500.43 506.834C1500.84 507.674 1501.33 508.135 1502.5 508.5C1506.97 509.89 1511.83 510.804 1516.35 511.402C1524.52 513.59 1525.86 513.538 1525 513C1533.11 515.453 1537.39 513.478 1539.42 509.868C1541.11 508.216 1541.35 505.961 1540.98 503.381C1541.06 500.621 1540.62 497.787 1540 495.5C1539.42 495.346 1538.8 495.173 1538.12 494.982C1533.3 492.119 1527.64 488.586 1522 486.5C1517.48 486.911 1514.4 485.725 1512.26 484.1C1511.86 483.794 1511.48 483.472 1511.14 483.142L1511.1 483.103L1511.1 483.101C1511.07 483.068 1511.04 483.036 1511 483.003L1511 483C1508.37 480.369 1509.68 472.495 1508.5 467.5C1507.76 464.374 1507.81 464.7 1507.5 462C1506.99 457.5 1504.5 458.5 1503.5 457.5V427.5Z",
  },
  {
    id: "madura-bawean",
    name: "Bawean",
    color: "#D75923",
    description: "Emerging cultural development area",
    population: "Variable",
    highlights: ["Cultural Innovation", "Youth Programs", "Modern Heritage"],
    pathData:
      "M1215.5 29.5H1209V24C1209 19.6 1212.33 16.8333 1214 16C1216.4 9.2 1221.33 9.83333 1223.5 11C1227.9 8.2 1230.33 9.83333 1231 11C1235.4 15 1234.17 20.3333 1233 22.5C1234.5 23.1667 1237.3 25.5 1236.5 29.5C1235.7 33.5 1231.17 32.8333 1229 32L1225.5 29.5H1220H1215.5Z",
  },
]

interface AdvancedPopupMapProps {
  onRegionClick?: (regionId: string) => void
}

export function AdvancedPopupMap({ onRegionClick }: AdvancedPopupMapProps) {
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [cardPosition, setCardPosition] = useState({
    x: 0,
    y: 0,
    direction: "top" as "top" | "bottom",
    horizontalAlign: "center" as "left" | "center" | "right",
  })
  const containerRef = useRef<SVGSVGElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)

  const currentRegion = REGIONS.find((r: Region) => r.id === hoveredRegion)

  const specialPositioningRegions = ["madura-bawean", "madura-kangean", "osing", "mataraman"]
  const shouldUseSmartPositioning = hoveredRegion && specialPositioningRegions.includes(hoveredRegion)

  useEffect(() => {
    if (!hoveredRegion || !cardRef.current || !containerRef.current) return

    const cardRect = cardRef.current.getBoundingClientRect()
    const containerRect = containerRef.current.getBoundingClientRect()

    const spaceAbove = mousePos.y - containerRect.top
    const spaceBelow = containerRect.bottom - mousePos.y
    const spaceLeft = mousePos.x - containerRect.left
    const spaceRight = containerRect.width - (mousePos.x - containerRect.left)

    const cardHeight = cardRect.height
    const cardWidth = Math.min(cardRect.width, containerRect.width - 32)
    const padding = 24
    const minEdgeDistance = 16
    const horizontalOffset = 20
    const verticalOffset = 16

    if (shouldUseSmartPositioning) {
      // Determine best horizontal position based on available space
      let x = mousePos.x - containerRect.left
      let horizontalAlign: "left" | "center" | "right" = "center"

      // Check if card fits to the left
      if (spaceLeft > cardWidth / 2 + horizontalOffset + minEdgeDistance) {
        x = mousePos.x - containerRect.left - cardWidth / 2 - horizontalOffset
        horizontalAlign = "left"
      }
      // Check if card fits to the right
      else if (spaceRight > cardWidth / 2 + horizontalOffset + minEdgeDistance) {
        x = mousePos.x - containerRect.left + cardWidth / 2 + horizontalOffset
        horizontalAlign = "right"
      }
      // Default to center with boundary checks
      else {
        const leftThreshold = cardWidth / 2 + minEdgeDistance
        const rightThreshold = containerRect.width - cardWidth / 2 - minEdgeDistance

        if (x - cardWidth / 2 < leftThreshold) {
          x = minEdgeDistance + cardWidth / 2
          horizontalAlign = "left"
        } else if (x + cardWidth / 2 > rightThreshold) {
          x = containerRect.width - minEdgeDistance - cardWidth / 2
          horizontalAlign = "right"
        } else {
          horizontalAlign = "center"
        }
      }

      // Determine best vertical position based on available space
      let y = mousePos.y - containerRect.top
      let direction: "top" | "bottom" = "bottom"

      // Prefer positioning above if enough space
      if (spaceAbove > cardHeight + padding) {
        y = mousePos.y - containerRect.top - cardHeight - verticalOffset
        direction = "top"
      }
      // Otherwise position below
      else if (spaceBelow > cardHeight + padding) {
        y = mousePos.y - containerRect.top + verticalOffset
        direction = "bottom"
      }
      // If neither has enough space, choose the direction with more space
      else {
        if (spaceAbove > spaceBelow) {
          y = mousePos.y - containerRect.top - cardHeight - verticalOffset
          direction = "top"
        } else {
          y = mousePos.y - containerRect.top + verticalOffset
          direction = "bottom"
        }
      }

      // Ensure card doesn't go above or below container
      const maxY = containerRect.height - cardHeight - minEdgeDistance
      y = Math.max(minEdgeDistance, Math.min(y, maxY))

      setCardPosition({
        x: Math.max(minEdgeDistance, Math.min(x, containerRect.width - minEdgeDistance)),
        y,
        direction,
        horizontalAlign,
      })
    } else {
      const shouldBeAbove = spaceAbove > cardHeight + padding || spaceBelow < cardHeight + padding

      let x = mousePos.x - containerRect.left
      let horizontalAlign: "left" | "center" | "right" = "center"

      const leftThreshold = cardWidth / 2 + minEdgeDistance
      const rightThreshold = containerRect.width - cardWidth / 2 - minEdgeDistance

      if (x - cardWidth / 2 < leftThreshold) {
        x = minEdgeDistance + cardWidth / 2
        horizontalAlign = "left"
      } else if (x + cardWidth / 2 > rightThreshold) {
        x = containerRect.width - minEdgeDistance - cardWidth / 2
        horizontalAlign = "right"
      } else {
        horizontalAlign = "center"
      }

      let y = mousePos.y - containerRect.top
      if (shouldBeAbove) {
        y = y - cardHeight - verticalOffset
      } else {
        y = y + verticalOffset
      }

      const maxY = containerRect.height - cardHeight - minEdgeDistance
      y = Math.max(minEdgeDistance, Math.min(y, maxY))

      setCardPosition({
        x: Math.max(minEdgeDistance, Math.min(x, containerRect.width - minEdgeDistance)),
        y,
        direction: shouldBeAbove ? "top" : "bottom",
        horizontalAlign,
      })
    }
  }, [hoveredRegion, mousePos, shouldUseSmartPositioning])

  return (
    <div className="relative w-full h-full overflow-hidden">
      <svg
        ref={containerRef}
        viewBox="0 0 1745 515"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid meet"
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect()
          setMousePos({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
          })
        }}
      >
        <defs>
          <filter id="region-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feFlood floodColor="white" floodOpacity="0.6" />
            <feComposite in2="blur" operator="in" result="glow" />
            <feMerge>
              <feMergeNode in="glow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <clipPath id="clip0_13_64">
            <rect width="1745" height="515" fill="white" />
          </clipPath>
        </defs>

        <g clipPath="url(#clip0_13_64)">
          {/* Render all regions */}
          {REGIONS.map((region: Region) => (
            <path
              key={region.id}
              d={region.pathData}
              fill={region.color}
              stroke="white"
              strokeWidth={hoveredRegion === region.id ? 2.5 : 1}
              className="cursor-pointer transition-all duration-300"
              style={{
                transformOrigin: "center",
                transformBox: "fill-box",
                transform: hoveredRegion === region.id ? "scale(1.05)" : "scale(1)",
                filter: hoveredRegion === region.id ? "url(#region-glow) brightness(1.15)" : "none",
              }}
              onMouseEnter={() => setHoveredRegion(region.id)}
              onMouseLeave={() => setHoveredRegion(null)}
              onClick={() => onRegionClick?.(region.id)}
            />
          ))}
        </g>
      </svg>

      <AnimatePresence>
        {hoveredRegion && currentRegion && (
          <motion.div
            ref={cardRef}
            initial={{ opacity: 0, scale: 0.85, y: cardPosition.direction === "bottom" ? -8 : 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: cardPosition.direction === "bottom" ? -8 : 8 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="absolute z-50 pointer-events-none"
            style={{
              left: `${cardPosition.x}px`,
              top: `${cardPosition.y}px`,
              transform: "translate(-50%, 0)",
              width: "360px",
              maxWidth: "calc(100% - 32px)",
            }}
          >
            <div className="bg-card/95 backdrop-blur-2xl rounded-2xl shadow-2xl border border-border/80 overflow-hidden">
              <div
                className="h-24 relative overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, ${currentRegion.color}, ${currentRegion.color}dd)`,
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/15 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <h2 className="text-2xl font-bold text-white drop-shadow-lg text-center px-4 line-clamp-2">
                    {currentRegion.name}
                  </h2>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-px bg-border/50">
                <div className="bg-card p-3 text-center">
                  <Users className="w-4 h-4 mx-auto mb-1 text-muted-foreground" />
                  <p className="text-xs font-semibold text-foreground">{currentRegion.population}</p>
                  <p className="text-[10px] text-muted-foreground">Population</p>
                </div>
                <div className="bg-card p-3 text-center">
                  <Award className="w-4 h-4 mx-auto mb-1 text-muted-foreground" />
                  <p className="text-xs font-semibold text-foreground">{currentRegion.highlights.length}</p>
                  <p className="text-[10px] text-muted-foreground">Highlights</p>
                </div>
                <div className="bg-card p-3 text-center">
                  <TrendingUp className="w-4 h-4 mx-auto mb-1 text-muted-foreground" />
                  <p className="text-xs font-semibold text-foreground">4.8</p>
                  <p className="text-[10px] text-muted-foreground">Rating</p>
                </div>
              </div>

              <div className="p-4 space-y-3 max-h-[300px] overflow-y-auto scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent">
                <p className="text-sm text-muted-foreground leading-relaxed">{currentRegion.description}</p>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-4 h-4 text-primary" />
                    <span className="text-xs font-bold text-foreground uppercase tracking-wide">Key Features</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {currentRegion.highlights.map((highlight: string, idx: number) => (
                      <div
                        key={`${currentRegion.id}-${idx}`}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border/50 bg-muted/30 hover:bg-muted/50 transition-colors duration-200"
                      >
                        <div
                          className="w-2 h-2 rounded-full flex-shrink-0"
                          style={{ backgroundColor: currentRegion.color }}
                        />
                        <span className="text-xs font-medium text-foreground truncate">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Button className="w-full pointer-events-auto" onClick={() => onRegionClick?.(currentRegion.id)}>
                  Explore Glossary
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>

            <div
              className="absolute w-0 h-0"
              style={{
                left:
                  cardPosition.horizontalAlign === "left"
                    ? "24px"
                    : cardPosition.horizontalAlign === "right"
                      ? "calc(100% - 24px)"
                      : "50%",
                top: cardPosition.direction === "bottom" ? "-10px" : "auto",
                bottom: cardPosition.direction === "top" ? "-10px" : "auto",
                transform: "translateX(-50%)",
                borderLeft: "10px solid transparent",
                borderRight: "10px solid transparent",
                borderTop: cardPosition.direction === "bottom" ? `10px solid hsl(var(--card))` : "none",
                borderBottom: cardPosition.direction === "top" ? `10px solid hsl(var(--card))` : "none",
                filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.08))",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export { REGIONS }
export type { Region }
