import {
    message
  } from 'antd'


  const APIURL = '',
        YAPIURL = '',
    // GISURL = window.REACT_APP_URL_GIS,
    WSURL = ''
  
  
  class Constant {
    static WS = WSURL
    static yapi = {
      findJunctionsAndControllers:`/junctions/findJunctionsAndControllers`,
      findPhaseConf:`/phases/findPhaseConf`,
      updatePhasesConf:`/phases/updatePhasesConf`,
      findOptimizeTimeConf:`/optimizeTime/findOptimizeTimeConf`,
      updateOptimizeTimeConf:`/optimizeTime/updateOptimizeTimeConf`,
      findPlanByJunctionId:`/plan/findPlanByJunctionId`,
      getPhaseFlow:`/flow/getPhaseFlow`,
      getGreenUseRate:`/flow/getGreenUseRate`,
      manualControl:`/manualControl/manualControl`,
      findSelfStudy:"/selfStudy/findSelfStudy",
      findYoptimization:"/selfStudy/findYoptimization",
      removeYoptimization:"/selfStudy/removeYoptimization",
      addSelfStudy:"/selfStudy/addSelfStudy",
    }
    static api = {
      login: `/auth/login`,
      logout: `/auth/logout`,
      whoami: `/users/me`,
      server_time: `/times`,
  
      // rest
      tms: `/tms`,
      tcs: `/tcs`,
      ccu: `/ccu`,
  
      controllers: `/controllers`,
      cameras: `/cameras`,
      roads: `/roads`,
      phases: `/phases`,
      stages: `/stages`,
      regions: `/regions`,
      junctions: `/junctions`,
      detectors: `/detectors`,
      links: `/links`,
  
      logFault: `/logs/fault`,
      logRunning: `/logs/running`,
      logMantenance: `/logs/mantenance`,
  
      sysCommandSet: `/sysCommandSets`,
  
      sysSchedules: `/sysSchedules`,
      sysDayPlans: `/sysDayPlans`,
  
      users: `/users`,
      roles: `/roles`,
  
      permissions: `/permissions`,
  
      realtimeItem: `/realtime/item`,
      realtimeTms: `/realtime/tms`,
      realtimeTcs: `/realtime/tcs`,
      realtimeCcu: `/realtime/ccu`,
      realtimeRegion: `/realtime/region`,
      realtimeController: `/realtime/controller`,
      realtimeJunction: `/realtime/junction`,
  
      manual: `/manual`,
      vipLines: `/vipLines`,
      vipPlans: `/vipPlans`,
  
      trafficData: `/trafficData`,
  
      // 方案配置
      sendCtlConf: `/ctlConfiguration`,
      getCtlConf: `/ctlConfiguration/index/$id/$key`,
      setCtlConf: `/ctlConfiguration/$id/$key`
    }
  
    static redisKeys = {
      tms: `pub:tms`,
      tms_id: `pub:tms:$id`,
      tcs: `pub:tcs`,
      tcs_id: `pub:tcs:$id`,
      ccu: `pub:ccu`,
      ccu_id: `pub:ccu:$id`,
      reg: `pub:reg`,
      reg_id: `pub:reg:$id`,
      ctl: `pub:ctl`,
      ctl_id: `pub:ctl:$id`,
      ctl_id_pha: `pub:ctl:$id:pha`,
      ctl_id_stg: `pub:ctl:$id:stg`,
      ctl_id_det: `pub:ctl:$id:det`,
      jnc: `pub:jnc`,
      jnc_id: `pub:jnc:$id`,
      jnc_id_stg: `pub:jnc:$id:stg`,
      jnc_id_lnk: `pub:jnc:$id:lnk`,
      jnc_id_apslist: `pub:jnc:$id:apslist`,
      jnc_id_apselect: `pub:jnc:$id:apselect`,
      jnc_id_autoplan: `pub:jnc:$id:autoplan`,
      log: `pub:log`,
      user_message: `pub:usr:$id:message`,
      user_cmdreply: `pub:usr:$id:cmdreply`
    }
    static dictionary = {
      // lamp_status: { "11": "灭灯", "21": "红灯", "22": "黄灯", "23": "绿灯", "31": "红黄", "41": "黄闪", "51": "绿闪" }
      colors: {
        lite:'#6b7a90',
        white: '#ffffff',
        red: '#fb0008',
        green: '#23ff08',
        yellow: '#ffed32',
      },
      dirName: {
        1: '北',
        2: '东',
        3: '南',
        4: '西',
      },
      laneStream: {
        1: {
          text: '调头',
          icon: 'rollback',
        },
        2: {
          text: '左转',
          icon: 'arrow-left',
        },
        3: {
          text: '直行',
          icon: 'arrow-up',
        },
        4: {
          text: '右转',
          icon: 'arrow-right',
        },
      },
      laneStreamImg: [{
          img: 'bike',
        },
        {
          code: [1],
          img: 'turn',
        },
        {
          code: [3],
          img: 'go',
        },
        {
          code: [2],
          img: 'left',
        },
        {
          code: [4],
          img: 'right',
        },
        {
          code: [1, 3],
          img: 'goTurn',
        },
        {
          code: [2, 3],
          img: 'goLeft',
        },
        {
          code: [3, 4],
          img: 'goRight',
        },
        {
          code: [2, 3, 4],
          img: 'goLeftRight',
        },
        {
          code: [2, 4],
          img: 'leftRight',
        },
      ],
  
      junctionMode: {
        17: '中心时间表控制',
        18: '中心优化控制',
        19: '中心协调控制',
        20: '中心自适应控制',
        21: '中心手动控制',
        33: '本地定周期控制',
        34: '本地感应控制',
        35: '本地协调控制',
        36: '本地自适应控制',
        37: '本地手动控制',
        49: '黄闪控制',
        50: '全红控制',
        51: '关灯控制'
      },
  
      shapeName: {
        'line': '直线',
        'polyline': '折线',
        'rect': '矩形',
        'circle': '圆',
        'polygon': '多边形',
        'image': '图片',
        'text': '文本',
        'zebra': '斑马线',
        'go': '直行',
        'left': '左转',
        'right': '右转',
        'goTurn': '直调头',
        'goLeft': '直左',
        'goRight': '直右',
        'goLeftRight': '直左右',
        'bike': '非机动车',
        'arrowGroup': '车行灯组(箭头)',
        'carLightGroup': '车行灯组(灯)',
        'zebraLightGroup': '人行灯组',
        'queue': '排队示意',
      }
    }
    static defaultValues = {
      roadData: {
        code: 1,
        name: '未定义',
        dir: 1,
        dirName: '北',
        zebra: {
          code: 0, // 作为 rowkey
          show: 1,
          stream: [1],
          bindPhase: 0,
        },
        secondZebra: {
          code: 100,
          show: 0,
          stream: [1],
          bindPhase: 0,
        },
        laneWidth: 18,
        laneCount: 4,
        reverseLaneCount: 4,
        laneData: [{
            code: 1,
            type: 1,
            stream: [1],
            bindPhase: 0,
          },
          {
            code: 2,
            type: 1,
            stream: [2, 3],
            bindPhase: 0,
          },
          {
            code: 3,
            type: 1,
            stream: [3],
            bindPhase: 0,
          },
          {
            code: 4,
            type: 1,
            stream: [3, 4],
            bindPhase: 0,
          },
        ],
      },
     
    }
    static mapOptions = window.MAP_OPTIONS
  
    static codePlaces = {
      region: '0000',
      controller: '000000',
      junction: '000000',
      stage: '00',
      phase: '00',
      detector: '00',
      link: '00',
      plan: '000',
      schedule: '00'
    }
  
    static logTimes = 20;
  
    static dateCollection = {
      month: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
      week: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'],
      day: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31']
    }
  
    
  
    static currentUserPermissions = [
      "base-data-read",
      "base-data-modify",
      "center-data-read",
      "center-data-modify",
      "log-read",
      "log-modify",
      "stat-data-read",
      "stat-data-modify",
      "admin-read",
      "admin-modify"
    ]
  
    static permissionsName = {
      "base-data": '基础数据',
      "base-data-read": '基础数据-查看',
      "base-data-modify": '基础数据-编辑',
      "center-data": '中心服务',
      "center-data-read": '中心服务-查看',
      "center-data-modify": '中心服务-编辑',
      "log": '日志',
      "log-read": '日志-查看',
      "log-modify": '日志-编辑',
      "stat-data": '交通数据',
      "stat-data-read": '交通数据-查看',
      "stat-data-modify": '交通数据-编辑',
      "admin": '用户数据',
      "admin-read": '用户数据-查看',
      "admin-modify": '用户数据-编辑'
    }
  }
  
  Object.keys(Constant.api).forEach(k => {
    Constant.api[k] = APIURL + Constant.api[k]
  })
  Object.keys(Constant.yapi).forEach(k => {
    Constant.yapi[k] = YAPIURL + Constant.yapi[k]
  })
  if (window.REACT_APP_URL_TRAFFIC) {
    Constant.mapOptions.trafficLayerUrl = window.REACT_APP_URL_TRAFFIC
    Constant.mapOptions.trafficLayerOptions = {
      layers: 'yanqing:traffic_info',
      format: 'image/png',
      transparent: true,
      tiled: true,
      version: '1.1.0',
      continuousWorld: true,
      detectRetina: false,
      minZoom: 5,
      maxZoom: 18,
      ...window.REACT_APP_URL_TRAFFIC_OPTS
    }
  }
  
  if (sessionStorage.getItem('t1_token')) {
    Constant.fetchRemoteDicts()
  }
  
  export default Constant
  