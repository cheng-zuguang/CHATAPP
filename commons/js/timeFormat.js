export default {
	// 首页时间处理过滤器
	dealTimeFormat (value) {
		let currentTime = new Date()
		
		//获取数据的年月日
		let oldYear = value.getFullYear()
		let oldMonth = value.getMonth()
		let oldDay = value.getDate()
		let oldHour = value.getHours()
		let oldMins = value.getMinutes()
		
		//获取当前时间的年月日
		let nowYear = currentTime.getFullYear()
		let nowMonth = currentTime.getMonth()
		let nowDay = currentTime.getDate()
		
		oldHour = oldHour < 10 ? '0' + oldHour : oldHour
		oldMins = oldMins < 10 ? '0' + oldMins : oldMins
		
		if (nowYear - oldYear > 0 || nowMonth - oldMonth > 0 || nowDay - oldDay > 1) {
			return oldYear + '/' + oldMonth + '/' + oldDay
		} else if (nowDay - oldDay > 0) {
			return '昨天 ' + oldHour + ':' + oldMins
		} else {
			return oldHour + ':' + oldMins
		}
	},
	
	// 聊天页面时间处理过滤器
	dealTimeFormatBForChatTime (value) {
		let currentTime = new Date()
		
		//获取数据的年月日
		let oldYear = value.getFullYear()
		let oldMonth = value.getMonth()
		let oldDay = value.getDate()
		let oldHour = value.getHours()
		let oldMins = value.getMinutes()
		
		//获取当前时间的年月日
		let nowYear = currentTime.getFullYear()
		let nowMonth = currentTime.getMonth()
		let nowDay = currentTime.getDate()
		
		oldHour = oldHour < 10 ? '0' + oldHour : oldHour
		oldMins = oldMins < 10 ? '0' + oldMins : oldMins
		
		if (nowYear - oldYear > 0 || nowMonth - oldMonth > 0 || nowDay - oldDay > 1) {
			return (oldMonth + 1) + '月' + oldDay + '日' + oldHour + ':' + oldMins
		} else if (nowDay - oldDay > 0) {
			return '昨天 ' + oldHour + ':' + oldMins
		} else {
			return oldHour + ':' + oldMins
		}
	}
	
}