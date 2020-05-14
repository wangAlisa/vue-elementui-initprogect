/**
 * @description: 公共静态数据
 */

/**
 * 年级静态数据
 * @type {[*]}
 */
const gradeOptions = [
  {value: 61, label: '学前班'},
  {value: 11, label: '一年级'},
  {value: 12, label: '二年级'},
  {value: 13, label: '三年级'},
  {value: 14, label: '四年级'},
  {value: 15, label: '五年级'},
  {value: 16, label: '六年级'},
  {value: 2, label: '初一'},
  {value: 3, label: '初二'},
  {value: 4, label: '初三'},
  {value: 5, label: '高一'},
  {value: 6, label: '高二'},
  {value: 7, label: '高三'}
];

/**
 * 学科
 */
const subjectOptions = [
  {value: -1, label: '全部'},
  {value: 1, label: '语文'},
  {value: 2, label: '数学'},
  {value: 3, label: '英语'},
  {value: 4, label: '物理'},
  {value: 5, label: '化学'},
  {value: 6, label: '生物'},
  {value: 7, label: '政治'},
  {value: 8, label: '历史'},
  {value: 9, label: '地理'},
  {value: 10, label: '兴趣课'},
  {value: 11, label: '思想品德'},
  {value: 12, label: '讲座'},
  {value: 13, label: '理综'},
  {value: 14, label: '文综'},
  {value: 15, label: '奥数'},
  {value: 16, label: '科学'}
];

/**
 * 学季
 */
const seasonOptions = [
  {'name': '春一期', 'value': 11},
  {'name': '春二期', 'value': 12},
  {'name': '春三期', 'value': 13},
  {'name': '春四期', 'value': 14},
  {'name': '暑零期', 'value': 20},
  {'name': '暑一期', 'value': 21},
  {'name': '暑二期', 'value': 22},
  {'name': '暑三期', 'value': 23},
  {'name': '暑四期', 'value': 24},
  {'name': '暑五期', 'value': 25},
  {'name': '暑六期', 'value': 26},
  {'name': '秋一期', 'value': 31},
  {'name': '秋二期', 'value': 32},
  {'name': '秋三期', 'value': 33},
  {'name': '秋四期', 'value': 34},
  {'name': '寒一期', 'value': 41},
  {'name': '寒二期', 'value': 42},
  {'name': '寒三期', 'value': 43},
  {'name': '寒四期', 'value': 44}
];
/**
 * 带学部的年级静态数据
 */
const gradeOptionsWithTeam = [
  {value: 60, label: '学前'},
  {value: 1, label: '小学'},
  {value: 11, label: '一年级'},
  {value: 12, label: '二年级'},
  {value: 13, label: '三年级'},
  {value: 14, label: '四年级'},
  {value: 15, label: '五年级'},
  {value: 16, label: '六年级'},
  {value: 2, label: '初一'},
  {value: 3, label: '初二'},
  {value: 4, label: '初三'},
  {value: 5, label: '高一'},
  {value: 6, label: '高二'},
  {value: 7, label: '高三'},
  {value: 20, label: '初中'},
  {value: 30, label: '高中'},
  {value: 255, label: '其他'}
];

const subjectTagOptions = {
  '0': [{
    'value': 20,
    'name': '专题'
  }],
  '2': [{
    'value': 1,
    'name': '语文'
  }, {
    'value': 2,
    'name': '数学'
  }, {
    'value': 3,
    'name': '英语'
  }, {
    'value': 4,
    'name': '物理'
  }, {
    'value': 5,
    'name': '化学'
  }, {
    'value': 6,
    'name': '生物'
  }, {
    'value': 7,
    'name': '政治'
  }, {
    'value': 8,
    'name': '历史'
  }, {
    'value': 9,
    'name': '地理'
  }, {
    'value': 22,
    'name': '合集'
  }],
  '4': [{
    'value': 21,
    'name': '试听'
  }],
  '21': [{
    'value': 1,
    'name': '语文'
  }, {
    'value': 2,
    'name': '数学'
  }, {
    'value': 3,
    'name': '英语'
  }, {
    'value': 4,
    'name': '物理'
  }, {
    'value': 5,
    'name': '化学'
  }, {
    'value': 6,
    'name': '生物'
  }, {
    'value': 7,
    'name': '政治'
  }, {
    'value': 8,
    'name': '历史'
  }, {
    'value': 9,
    'name': '地理'
  }, {
    'value': 22,
    'name': '合集'
  }],
  '24': [{
    'value': 1,
    'name': '语文'
  }, {
    'value': 2,
    'name': '数学'
  }, {
    'value': 3,
    'name': '英语'
  }, {
    'value': 4,
    'name': '物理'
  }, {
    'value': 5,
    'name': '化学'
  }, {
    'value': 6,
    'name': '生物'
  }, {
    'value': 7,
    'name': '政治'
  }, {
    'value': 8,
    'name': '历史'
  }, {
    'value': 9,
    'name': '地理'
  }, {
    'value': 22,
    'name': '合集'
  }]
};

const provinceData = [
  {'label': '全部', 'value': '全部'},
  {
    'label': '北京',
    'value': '北京',
    'children': [{'label': '北京', 'value': '北京'}]
  },
  {
    'label': '上海',
    'value': '上海',
    'children': [
      {'label': '上海', 'value': '上海'}
    ]
  },
  {
    'label': '天津',
    'value': '天津',
    'children': [
      {'label': '天津', 'value': '天津'}
    ]
  },
  {
    'label': '重庆',
    'value': '重庆',
    'children': [
      {'label': '重庆', 'value': '重庆'}
    ]
  },
  {
    'label': '黑龙江',
    'value': '黑龙江',
    'children': [
      {'label': '全部', 'value': '全部'},
      {'label': '哈尔滨', 'value': '哈尔滨'},
      {'label': '齐齐哈尔', 'value': '齐齐哈尔'},
      {'label': '鸡西', 'value': '鸡西'},
      {'label': '鹤岗', 'value': '鹤岗'},
      {'label': '双鸭山', 'value': '双鸭山'},
      {'label': '大庆', 'value': '大庆'},
      {'label': '伊春', 'value': '伊春'},
      {'label': '佳木斯', 'value': '佳木斯'},
      {'label': '七台河', 'value': '七台河'},
      {'label': '牡丹江', 'value': '牡丹江'},
      {'label': '黑河', 'value': '黑河'},
      {'label': '绥化', 'value': '绥化'},
      {'label': '大兴安岭地区', 'value': '大兴安岭地区'}
    ]
  },
  {
    'label': '吉林',
    'value': '吉林',
    'children': [
      {'label': '全部', 'value': '全部'},
      {'label': '长春', 'value': '长春'},
      {'label': '吉林', 'value': '吉林'},
      {'label': '四平', 'value': '四平'},
      {'label': '辽源', 'value': '辽源'},
      {'label': '通化', 'value': '通化'},
      {'label': '白山', 'value': '白山'},
      {'label': '松原', 'value': '松原'},
      {'label': '白城', 'value': '白城'},
      {'label': '延边', 'value': '延边'
      }
    ]
  },
  {
    'label': '辽宁',
    'value': '辽宁',
    'children': [
      {'label': '全部', 'value': '全部'},
      {'label': '沈阳', 'value': '沈阳'},
      {'label': '大连', 'value': '大连'},
      {'label': '鞍山', 'value': '鞍山'},
      {'label': '抚顺', 'value': '抚顺'},
      {'label': '本溪', 'value': '本溪'},
      {'label': '丹东', 'value': '丹东'},
      {'label': '锦州', 'value': '锦州'},
      {'label': '营口', 'value': '营口'},
      {'label': '阜新', 'value': '阜新'},
      {'label': '辽阳', 'value': '辽阳'},
      {'label': '盘锦', 'value': '盘锦'},
      {'label': '铁岭', 'value': '铁岭'},
      {'label': '朝阳', 'value': '朝阳'},
      {'label': '葫芦岛', 'value': '葫芦岛'}
    ]
  },
  {
    'label': '山东',
    'value': '山东',
    'children': [
      {'label': '全部', 'value': '全部'},
      {'label': '济南', 'value': '济南'},
      {'label': '青岛', 'value': '青岛'},
      {'label': '淄博', 'value': '淄博'},
      {'label': '枣庄', 'value': '枣庄'},
      {'label': '东营', 'value': '东营'},
      {'label': '烟台', 'value': '烟台'},
      {'label': '潍坊', 'value': '潍坊'},
      {'label': '济宁', 'value': '济宁'},
      {'label': '泰安', 'value': '泰安'},
      {'label': '威海', 'value': '威海'},
      {'label': '日照', 'value': '日照'},
      {'label': '莱芜', 'value': '莱芜'},
      {'label': '临沂', 'value': '临沂'},
      {'label': '德州', 'value': '德州'},
      {'label': '聊城', 'value': '聊城'},
      {'label': '滨州', 'value': '滨州'},
      {'label': '菏泽', 'value': '菏泽'}
    ]
  },
  {
    'label': '山西',
    'value': '山西',
    'children': [
      {'label': '全部', 'value': '全部'},
      {'label': '太原', 'value': '太原'},
      {'label': '大同', 'value': '大同'},
      {'label': '阳泉', 'value': '阳泉'},
      {'label': '长治', 'value': '长治'},
      {'label': '晋城', 'value': '晋城'},
      {'label': '朔州', 'value': '朔州'},
      {'label': '晋中', 'value': '晋中'},
      {'label': '运城', 'value': '运城'},
      {'label': '忻州', 'value': '忻州'},
      {'label': '临汾', 'value': '临汾'},
      {'label': '吕梁', 'value': '吕梁'}
    ]
  },
  {
    'label': '陕西',
    'value': '陕西',
    'children': [
      {'label': '全部', 'value': '全部'},
      {'label': '西安', 'value': '西安'},
      {'label': '铜川', 'value': '铜川'},
      {'label': '宝鸡', 'value': '宝鸡'},
      {'label': '咸阳', 'value': '咸阳'},
      {'label': '渭南', 'value': '渭南'},
      {'label': '延安', 'value': '延安'},
      {'label': '汉中', 'value': '汉中'},
      {'label': '榆林', 'value': '榆林'},
      {'label': '安康', 'value': '安康'},
      {'label': '商洛', 'value': '商洛'}
    ]
  },
  {
    'label': '河北',
    'value': '河北',
    'children': [
      {'label': '全部', 'value': '全部'},
      {'label': '石家庄', 'value': '石家庄'},
      {'label': '唐山', 'value': '唐山'},
      {'label': '秦皇岛', 'value': '秦皇岛'},
      {'label': '邯郸', 'value': '邯郸'},
      {'label': '邢台', 'value': '邢台'},
      {'label': '保定', 'value': '保定'},
      {'label': '张家口', 'value': '张家口'},
      {'label': '承德', 'value': '承德'},
      {'label': '沧州', 'value': '沧州'},
      {'label': '廊坊', 'value': '廊坊'},
      {'label': '衡水', 'value': '衡水'
      }
    ]
  },
  {
    'label': '河南',
    'value': '河南',
    'children': [
      {'label': '全部', 'value': '全部'},
      {'label': '郑州', 'value': '郑州'},
      {'label': '开封', 'value': '开封'},
      {'label': '洛阳', 'value': '洛阳'},
      {'label': '平顶山', 'value': '平顶山'},
      {'label': '安阳', 'value': '安阳'},
      {'label': '鹤壁', 'value': '鹤壁'},
      {'label': '新乡', 'value': '新乡'},
      {'label': '焦作', 'value': '焦作'},
      {'label': '濮阳', 'value': '濮阳'},
      {'label': '许昌', 'value': '许昌'},
      {'label': '漯河', 'value': '漯河'},
      {'label': '三门峡', 'value': '三门峡'},
      {'label': '南阳', 'value': '南阳'},
      {'label': '商丘', 'value': '商丘'},
      {'label': '信阳', 'value': '信阳'},
      {'label': '周口', 'value': '周口'},
      {'label': '驻马店', 'value': '驻马店'},
      {'label': '济源', 'value': '济源'
      }
    ]
  },
  {
    'label': '湖北',
    'value': '湖北',
    'children': [
      {'label': '全部', 'value': '全部'},
      {'label': '武汉', 'value': '武汉'},
      {'label': '黄石', 'value': '黄石'},
      {'label': '十堰', 'value': '十堰'},
      {'label': '宜昌', 'value': '宜昌'},
      {'label': '襄樊', 'value': '襄樊'},
      {'label': '鄂州', 'value': '鄂州'},
      {'label': '荆门', 'value': '荆门'},
      {'label': '孝感', 'value': '孝感'},
      {'label': '荆州', 'value': '荆州'},
      {'label': '黄冈', 'value': '黄冈'},
      {'label': '咸宁', 'value': '咸宁'},
      {'label': '随州', 'value': '随州'},
      {'label': '恩施', 'value': '恩施'},
      {'label': '仙桃', 'value': '仙桃'},
      {'label': '潜江', 'value': '潜江'},
      {'label': '天门', 'value': '天门'},
      {'label': '神农架', 'value': '神农架'
      }
    ]
  },
  {
    'label': '湖南',
    'value': '湖南',
    'children': [
      {'label': '全部', 'value': '全部'},
      {'label': '长沙', 'value': '长沙'},
      {'label': '株洲', 'value': '株洲'},
      {'label': '湘潭', 'value': '湘潭'},
      {'label': '衡阳', 'value': '衡阳'},
      {'label': '邵阳', 'value': '邵阳'},
      {'label': '岳阳', 'value': '岳阳'},
      {'label': '常德', 'value': '常德'},
      {'label': '张家界', 'value': '张家界'},
      {'label': '益阳', 'value': '益阳'},
      {'label': '郴州', 'value': '郴州'},
      {'label': '永州', 'value': '永州'},
      {'label': '怀化', 'value': '怀化'},
      {'label': '娄底', 'value': '娄底'},
      {'label': '湘西', 'value': '湘西'}
    ]
  },
  {
    'label': '海南',
    'value': '海南',
    'children': [
      {'label': '全部', 'value': '全部'},
      {'label': '海口', 'value': '海口'},
      {'label': '三亚', 'value': '三亚'},
      {'label': '五指山', 'value': '五指山'},
      {'label': '琼海', 'value': '琼海'},
      {'label': '儋州', 'value': '儋州'},
      {'label': '文昌', 'value': '文昌'},
      {'label': '万宁', 'value': '万宁'},
      {'label': '东方', 'value': '东方'},
      {'label': '定安县', 'value': '定安县'},
      {'label': '屯昌县', 'value': '屯昌县'},
      {'label': '澄迈县', 'value': '澄迈县'},
      {'label': '临高县', 'value': '临高县'},
      {'label': '白沙黎族自治县', 'value': '白沙黎族自治县'},
      {'label': '昌江黎族自治县', 'value': '昌江黎族自治县'},
      {'label': '乐东黎族自治县', 'value': '乐东黎族自治县'},
      {'label': '陵水黎族自治县', 'value': '陵水黎族自治县'},
      {'label': '保亭黎族苗族自治县', 'value': '保亭黎族苗族自治县'},
      {'label': '琼中黎族苗族自治县', 'value': '琼中黎族苗族自治县'}
    ]
  },
  {
    'label': '江苏',
    'value': '江苏',
    'children': [
      {'label': '全部', 'value': '全部'},
      {'label': '南京', 'value': '南京'},
      {'label': '无锡', 'value': '无锡'},
      {'label': '徐州', 'value': '徐州'},
      {'label': '常州', 'value': '常州'},
      {'label': '苏州', 'value': '苏州'},
      {'label': '南通', 'value': '南通'},
      {'label': '连云港', 'value': '连云港'},
      {'label': '淮安', 'value': '淮安'},
      {'label': '盐城', 'value': '盐城'},
      {'label': '扬州', 'value': '扬州'},
      {'label': '镇江', 'value': '镇江'},
      {'label': '泰州', 'value': '泰州'},
      {'label': '宿迁', 'value': '宿迁'}
    ]
  },
  {
    'label': '江西',
    'value': '江西',
    'children': [
      {'label': '全部', 'value': '全部'},
      {'label': '南昌', 'value': '南昌'},
      {'label': '景德镇', 'value': '景德镇'},
      {'label': '萍乡', 'value': '萍乡'},
      {'label': '九江', 'value': '九江'},
      {'label': '新余', 'value': '新余'},
      {'label': '鹰潭', 'value': '鹰潭'},
      {'label': '赣州', 'value': '赣州'},
      {'label': '吉安', 'value': '吉安'},
      {'label': '宜春', 'value': '宜春'},
      {'label': '抚州', 'value': '抚州'},
      {'label': '上饶', 'value': '上饶'}
    ]
  },
  {
    'label': '广东',
    'value': '广东',
    'children': [
      {'label': '全部', 'value': '全部'},
      {'label': '广州', 'value': '广州'},
      {'label': '韶关', 'value': '韶关'},
      {'label': '深圳', 'value': '深圳'},
      {'label': '珠海', 'value': '珠海'},
      {'label': '汕头', 'value': '汕头'},
      {'label': '佛山', 'value': '佛山'},
      {'label': '江门', 'value': '江门'},
      {'label': '湛江', 'value': '湛江'},
      {'label': '茂名', 'value': '茂名'},
      {'label': '肇庆', 'value': '肇庆'},
      {'label': '惠州', 'value': '惠州'},
      {'label': '梅州', 'value': '梅州'},
      {'label': '汕尾', 'value': '汕尾'},
      {'label': '河源', 'value': '河源'},
      {'label': '阳江', 'value': '阳江'},
      {'label': '清远', 'value': '清远'},
      {'label': '东莞', 'value': '东莞'},
      {'label': '中山', 'value': '中山'},
      {'label': '潮州', 'value': '潮州'},
      {'label': '揭阳', 'value': '揭阳'},
      {'label': '云浮', 'value': '云浮'}
    ]
  },
  {
    'label': '广西',
    'value': '广西',
    'children': [
      {'label': '全部', 'value': '全部'},
      {'label': '南宁', 'value': '南宁'},
      {'label': '柳州', 'value': '柳州'},
      {'label': '桂林', 'value': '桂林'},
      {'label': '梧州', 'value': '梧州'},
      {'label': '北海', 'value': '北海'},
      {'label': '防城港', 'value': '防城港'},
      {'label': '钦州', 'value': '钦州'},
      {'label': '贵港', 'value': '贵港'},
      {'label': '玉林', 'value': '玉林'},
      {'label': '百色', 'value': '百色'},
      {'label': '贺州', 'value': '贺州'},
      {'label': '河池', 'value': '河池'},
      {'label': '来宾', 'value': '来宾'},
      {'label': '崇左', 'value': '崇左'}
    ]
  },
  {
    'label': '云南',
    'value': '云南',
    'children': [
      {'label': '全部', 'value': '全部'},
      {'label': '昆明', 'value': '昆明'},
      {'label': '曲靖', 'value': '曲靖'},
      {'label': '玉溪', 'value': '玉溪'},
      {'label': '保山', 'value': '保山'},
      {'label': '昭通', 'value': '昭通'},
      {'label': '丽江', 'value': '丽江'},
      {'label': '普洱', 'value': '普洱'},
      {'label': '临沧', 'value': '临沧'},
      {'label': '楚雄', 'value': '楚雄'},
      {'label': '红河', 'value': '红河'},
      {'label': '文山', 'value': '文山'},
      {'label': '西双版纳', 'value': '西双版纳'},
      {'label': '大理', 'value': '大理'},
      {'label': '德宏', 'value': '德宏'},
      {'label': '怒江', 'value': '怒江'},
      {'label': '迪庆', 'value': '迪庆'}
    ]
  },
  {
    'label': '贵州',
    'value': '贵州',
    'children': [
      {'label': '全部', 'value': '全部'},
      {'label': '贵阳', 'value': '贵阳'},
      {'label': '六盘水', 'value': '六盘水'},
      {'label': '遵义', 'value': '遵义'},
      {'label': '安顺', 'value': '安顺'},
      {'label': '铜仁', 'value': '铜仁'},
      {'label': '黔西南', 'value': '黔西南'},
      {'label': '毕节', 'value': '毕节'},
      {'label': '黔东南', 'value': '黔东南'},
      {'label': '黔南', 'value': '黔南'}
    ]
  },
  {
    'label': '四川',
    'value': '四川',
    'children': [
      {'label': '全部', 'value': '全部'},
      {'label': '成都', 'value': '成都'},
      {'label': '自贡', 'value': '自贡'},
      {'label': '攀枝花', 'value': '攀枝花'},
      {'label': '泸州', 'value': '泸州'},
      {'label': '德阳', 'value': '德阳'},
      {'label': '绵阳', 'value': '绵阳'},
      {'label': '广元', 'value': '广元'},
      {'label': '遂宁', 'value': '遂宁'},
      {'label': '内江', 'value': '内江'},
      {'label': '乐山', 'value': '乐山'},
      {'label': '南充', 'value': '南充'},
      {'label': '眉山', 'value': '眉山'},
      {'label': '宜宾', 'value': '宜宾'},
      {'label': '广安', 'value': '广安'},
      {'label': '达州', 'value': '达州'},
      {'label': '雅安', 'value': '雅安'},
      {'label': '巴中', 'value': '巴中'},
      {'label': '资阳', 'value': '资阳'},
      {'label': '阿坝', 'value': '阿坝'},
      {'label': '甘孜', 'value': '甘孜'},
      {'label': '凉山', 'value': '凉山'}
    ]
  },
  {
    'label': '内蒙古',
    'value': '内蒙古',
    'children': [
      {'label': '全部', 'value': '全部'},
      {'label': '呼和浩特', 'value': '呼和浩特'},
      {'label': '包头', 'value': '包头'},
      {'label': '乌海', 'value': '乌海'},
      {'label': '赤峰', 'value': '赤峰'},
      {'label': '通辽', 'value': '通辽'},
      {'label': '鄂尔多斯', 'value': '鄂尔多斯'},
      {'label': '呼伦贝尔', 'value': '呼伦贝尔'},
      {'label': '巴彦淖尔', 'value': '巴彦淖尔'},
      {'label': '乌兰察布', 'value': '乌兰察布'},
      {'label': '兴安盟', 'value': '兴安盟'},
      {'label': '锡林郭勒盟', 'value': '锡林郭勒盟'},
      {'label': '阿拉善盟', 'value': '阿拉善盟'
      }
    ]
  },
  {
    'label': '宁夏',
    'value': '宁夏',
    'children': [
      {'label': '全部', 'value': '全部'},
      {'label': '银川', 'value': '银川'},
      {'label': '石嘴山', 'value': '石嘴山'},
      {'label': '吴忠', 'value': '吴忠'},
      {'label': '固原', 'value': '固原'},
      {'label': '中卫', 'value': '中卫'}
    ]
  },
  {
    'label': '甘肃',
    'value': '甘肃',
    'children': [
      {'label': '全部', 'value': '全部'},
      {'label': '兰州', 'value': '兰州'},
      {'label': '嘉峪关', 'value': '嘉峪关'},
      {'label': '金昌', 'value': '金昌'},
      {'label': '白银', 'value': '白银'},
      {'label': '天水', 'value': '天水'},
      {'label': '武威', 'value': '武威'},
      {'label': '张掖', 'value': '张掖'},
      {'label': '平凉', 'value': '平凉'},
      {'label': '酒泉', 'value': '酒泉'},
      {'label': '庆阳', 'value': '庆阳'},
      {'label': '定西', 'value': '定西'},
      {'label': '陇南', 'value': '陇南'},
      {'label': '临夏', 'value': '临夏'},
      {'label': '甘南', 'value': '甘南'}
    ]
  },
  {
    'label': '青海',
    'value': '青海',
    'children': [
      {'label': '全部', 'value': '全部'},
      {'label': '西宁', 'value': '西宁'},
      {'label': '海东', 'value': '海东'},
      {'label': '海北', 'value': '海北'},
      {'label': '黄南', 'value': '黄南'},
      {'label': '海南', 'value': '海南'},
      {'label': '果洛', 'value': '果洛'},
      {'label': '玉树', 'value': '玉树'},
      {'label': '海西', 'value': '海西'}
    ]
  },
  {
    'label': '西藏',
    'value': '西藏',
    'children': [
      {'label': '全部', 'value': '全部'},
      {'label': '拉萨', 'value': '拉萨'},
      {'label': '昌都', 'value': '昌都'},
      {'label': '山南', 'value': '山南'},
      {'label': '日喀则', 'value': '日喀则'},
      {'label': '那曲', 'value': '那曲'},
      {'label': '阿里', 'value': '阿里'},
      {'label': '林芝', 'value': '林芝'}
    ]
  },
  {
    'label': '新疆',
    'value': '新疆',
    'children': [
      {'label': '全部', 'value': '全部'},
      {'label': '乌鲁木齐', 'value': '乌鲁木齐'},
      {'label': '克拉玛依', 'value': '克拉玛依'},
      {'label': '吐鲁番', 'value': '吐鲁番'},
      {'label': '哈密', 'value': '哈密'},
      {'label': '昌吉', 'value': '昌吉'},
      {'label': '博尔塔拉', 'value': '博尔塔拉'},
      {'label': '巴音郭楞', 'value': '巴音郭楞'},
      {'label': '阿克苏', 'value': '阿克苏'},
      {'label': '克孜勒苏柯尔克孜', 'value': '克孜勒苏柯尔克孜'},
      {'label': '喀什', 'value': '喀什'},
      {'label': '和田', 'value': '和田'},
      {'label': '伊犁哈萨克', 'value': '伊犁哈萨克'},
      {'label': '塔城', 'value': '塔城'},
      {'label': '阿勒泰', 'value': '阿勒泰'},
      {'label': '石河子', 'value': '石河子'},
      {'label': '阿拉尔', 'value': '阿拉尔'},
      {'label': '图木舒克', 'value': '图木舒克'},
      {'label': '五家渠', 'value': '五家渠'}
    ]
  },
  {
    'label': '安徽',
    'value': '安徽',
    'children': [
      {'label': '全部', 'value': '全部'},
      {'label': '合肥', 'value': '合肥'},
      {'label': '芜湖', 'value': '芜湖'},
      {'label': '蚌埠', 'value': '蚌埠'},
      {'label': '淮南', 'value': '淮南'},
      {'label': '马鞍山', 'value': '马鞍山'},
      {'label': '淮北', 'value': '淮北'},
      {'label': '铜陵', 'value': '铜陵'},
      {'label': '安庆', 'value': '安庆'},
      {'label': '黄山', 'value': '黄山'},
      {'label': '滁州', 'value': '滁州'},
      {'label': '阜阳', 'value': '阜阳'},
      {'label': '宿州', 'value': '宿州'},
      {'label': '巢湖', 'value': '巢湖'},
      {'label': '六安', 'value': '六安'},
      {'label': '亳州', 'value': '亳州'},
      {'label': '池州', 'value': '池州'},
      {'label': '宣城', 'value': '宣城'}
    ]
  },
  {
    'label': '浙江',
    'value': '浙江',
    'children': [
      {'label': '全部', 'value': '全部'},
      {'label': '杭州', 'value': '杭州'},
      {'label': '宁波', 'value': '宁波'},
      {'label': '温州', 'value': '温州'},
      {'label': '嘉兴', 'value': '嘉兴'},
      {'label': '湖州', 'value': '湖州'},
      {'label': '绍兴', 'value': '绍兴'},
      {'label': '金华', 'value': '金华'},
      {'label': '衢州', 'value': '衢州'},
      {'label': '舟山', 'value': '舟山'},
      {'label': '台州', 'value': '台州'},
      {'label': '丽水', 'value': '丽水'}
    ]
  },
  {
    'label': '福建',
    'value': '福建',
    'children': [
      {'label': '全部', 'value': '全部'},
      {'label': '福州', 'value': '福州'},
      {'label': '厦门', 'value': '厦门'},
      {'label': '莆田', 'value': '莆田'},
      {'label': '三明', 'value': '三明'},
      {'label': '泉州', 'value': '泉州'},
      {'label': '漳州', 'value': '漳州'},
      {'label': '南平', 'value': '南平'},
      {'label': '龙岩', 'value': '龙岩'},
      {'label': '宁德', 'value': '宁德'
      }
    ]
  },
  {
    'label': '台湾',
    'value': '台湾',
    'children': [
      {'label': '全部', 'value': '全部'},
      {'label': '嘉义', 'value': '嘉义'},
      {'label': '新竹', 'value': '新竹'},
      {'label': '台南', 'value': '台南'},
      {'label': '台中', 'value': '台中'},
      {'label': '高雄', 'value': '高雄'},
      {'label': '台北', 'value': '台北'},
      {'label': '基隆', 'value': '基隆'}
    ]
  }
];
export {
  gradeOptions,
  subjectOptions,
  provinceData,
  seasonOptions,
  subjectTagOptions,
  gradeOptionsWithTeam
};