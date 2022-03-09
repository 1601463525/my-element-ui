/**
 * @description 获取菜单
 */
export function getMenuList(userInfo){
    let menuList = [];
    switch (userInfo.role) {
        case '电信用户':
            menuList = [
                {
                    title: '首页',
                    icon: 'home',
                    type:'/',
                },
                {
                    title: '任务待办',
                    type:'examination',
                    icon:'desktop',
                    subMenu: [
                        {
                            type: '/confirm',
                            title: '确认',
                        },
                        {
                            type:'/vote',
                            title: '投票',
                        }
                    ],
                },
                {
                    title:'异常告警',
                    type:'report',
                    icon:'align-center',
                    subMenu: [
                        {
                            type: '/apportionmentRules',
                            title: '分摊比例',
                        },
                        {
                            type: '/amountSettlement',
                            title: '金额结算',
                        }
                    ],
                },
                {
                    title:'基本信息管理',
                    type:'training',
                    icon:'usergroup-add',
                    subMenu: [
                        // {
                        //     type: '/meterInformation',
                        //     title: '电表信息',
                        // },
                        {
                            type: '/fixedRatio',
                            title: '固定比例',
                        },
                        // {
                        //     type: '/billingInformation',
                        //     title: '结算信息',
                        // },
                        {
                            type: '/shuntMetering',
                            title: '分路计量',
                        },
                    ],
                },
                {
                    title:'查询报表',
                    type:'search',
                    icon:'filter',
                    subMenu: [
                        {
                            type: '/siteInformation',
                            title: '站址信息查询',
                        },
                        {
                            type: '/meterInformationSearch',
                            title: '电表信息查询',
                        },
                        {
                            type: '/shareRatio',
                            title: '分摊比例查询',
                        },
                        {
                            type: '/shareAmount',
                            title: '结算结果查询',
                        },
                        {
                            type: '/electricitySum',
                            title: '电费汇总报账',
                        },
                    ],
                },
                {
                    title:'系统管理',
                    type:'system',
                    icon:'solution',
                    subMenu: [
                        {
                            type: '/systemManage',
                            title: '用户管理',
                        }
                    ],
                },
            ];
            break;
        case '铁塔用户':
        menuList = [
            {
                title: '首页',
                icon: 'home',
                type:'/',
            },
            {
                title: '任务待办',
                type:'examination',
                icon:'desktop',
                subMenu: [
                    {
                        type: '/confirm',
                        title: '确认',
                    },
                    {
                        type:'/vote',
                        title: '投票',
                    }
                ],
            },
            {
                title:'异常告警',
                type:'report',
                icon:'align-center',
                subMenu: [
                    {
                        type: '/apportionmentRules',
                        title: '分摊比例',
                    },
                    {
                        type: '/amountSettlement',
                        title: '金额结算',
                    }
                ],
            },
            {
                title:'基本信息管理',
                type:'training',
                icon:'usergroup-add',
                subMenu: [
                    // {
                    //     type: '/meterInformation',
                    //     title: '电表信息',
                    // },
                    {
                        type: '/fixedRatio',
                        title: '固定比例',
                    },
                    // {
                    //     type: '/billingInformation',
                    //     title: '结算信息',
                    // },
                    {
                        type: '/shuntMetering',
                        title: '分路计量',
                    },
                ],
            },
            {
                title:'查询报表',
                type:'search',
                icon:'filter',
                subMenu: [
                    {
                        type: '/siteInformation',
                        title: '站址信息查询',
                    },
                    {
                        type: '/meterInformationSearch',
                        title: '电表信息查询',
                    },
                    {
                        type: '/shareRatio',
                        title: '分摊比例查询',
                    },
                    {
                        type: '/shareAmount',
                        title: '结算结果查询',
                    },
                    {
                        type: '/electricitySum',
                        title: '电费汇总报账',
                    },
                ],
            },
            {
                title:'系统管理',
                type:'system',
                icon:'solution',
                subMenu: [
                    {
                        type: '/systemManage',
                        title: '用户管理',
                    }
                ],
            },
        ];
        break;
        default:
            break;
    }
    console.log(menuList);
    return menuList;
}

