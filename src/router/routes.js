export default [
	{
		path: '/login',
		component: () => import('~p/login/Login')
	},
	{
		path: '/',
		component: () => import('~p/app'),
		redirect: '/home',
		children: [
			{
				meta: {
					title: '首页'
				},
				path: 'home',
				component: () => import('~p/home/app')
			},
			{
				meta: {
					title: '待办'
				},
				path: 'confirm',
				name: 'confirm',
				component: () => import('~p/task/confirm/app')
			},
			{
				meta: {
					title: '投票'
				},
				path: 'vote',
				name: 'vote',
				component: () => import('~p/task/vote/app')
			},
			{
				meta: {
					title: '分摊规则告警'
				},
				path: 'apportionmentRules',
				name: 'apportionmentRules',
				component: () => import('~p/warn/apportionmentRules/app')
			},
			{
				meta: {
					title: '金额结算告警'
				},
				path: 'amountSettlement',
				name: 'amountSettlement',
				component: () => import('~p/warn/amountSettlement/app')
			},
			{
				meta: {
					title: '电表信息'
				},
				path: 'meterInformation',
				name: 'meterInformation',
				component: () => import('~p/base/meterInformation/app')
			},
			{
				meta: {
					title: '固定比例'
				},
				path: 'fixedRatio',
				name: 'fixedRatio',
				component: () => import('~p/base/fixedRatio/app')
			},
			{
				meta: {
					title: '结算信息'
				},
				path: 'billingInformation',
				name: 'billingInformation',
				component: () => import('~p/base/billingInformation/app')
			},
			{
				meta: {
					title: '分路计量'
				},
				path: 'shuntMetering',
				name: 'shuntMetering',
				component: () => import('~p/base/shuntMetering/app')
			},
			{
				meta: {
					title: '站点信息查询'
				},
				path: 'siteInformation',
				name: 'siteInformation',
				component: () => import('~p/search/siteInformation/app')
			},
			{
				meta: {
					title: '电表信息查询'
				},
				path: 'meterInformationSearch',
				name: 'meterInformationSearch',
				component: () => import('~p/search/meterInformation/app')
			},
			{
				meta: {
					title: '分摊比例查询'
				},
				path: 'shareRatio',
				component: () => import('~p/search/shareRatio/app')
			},
			{
				meta: {
					title: '结算结果查询'
				},
				path: 'shareAmount',
				name: 'shareAmount',
				component: () => import('~p/search/shareAmount/app')
			},
			{
				meta: {
					title: '电费汇总报账'
				},
				path: 'electricitySum',
				name: 'electricitySum',
				component: () => import('~p/search/electricitySum/app')
			},
			{
				meta: {
					title: '系统管理'
				},
				path: 'systemManage',
				name: 'systemManage',
				component: () => import('~p/system/systemManage/app')
			},
		]
	},
	{
		path: '/home',
		name: 'home',
		component: () => import('~p/home/app')
	},
];
