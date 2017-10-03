Nf.ready(function () {
 
    setDuration(15);

});
  function setDuration(days) {
	var now = getCurrentTime();
	var datetime = now.split(" ");
	var start = datetime[0] + " 00:00:00";
	var end = datetime[0] + " 23:59:59";
	start = beforeDays(start, days);
	S("start_date").setTime(start);
	S("end_date").setTime(end);
  }
function getCurrentTime() {
	var timezone = getUserTimeZone();
	var result = formatDate(new Date());

	if (timezone) {
		$.ajax({
			url : NfUtil.getRootContext() + "/time/computeInitTime.action",
			data : {
				zoneId : timezone
			},
			async : false,
			cache : false,
			dataType : "text",
			success : function (data) {
				result = data;
			}
		});
	}
	return result;
}

function getUserTimeZone() {
	var result = undefined;
	$.ajax({
		url : NfUtil.getRootContext() + "/uitimezone/getUserTimeZone.action",
		async : false,
		cache : true,
		dataType : "text",
		success : function (data) {
			result = data;
		}
	})
	return result;
}

function beforeDays(dateString, days) {
	var date = new Date(dateString);
	if (isNaN(date.getTime())) {
		date = new Date(dateString.replace(" ", "T"));
	}
	date.setTime(date.getTime() - days * 86400000);
	return formatDate(date);
}

function formatDate(fmt) {
	var YY = fmt.getFullYear();
	var MM = fmt.getMonth() < 9 ? ('0' + (fmt.getMonth() + 1)) : (fmt.getMonth() + 1);
	var dd = fmt.getDate() < 10 ? ('0' + fmt.getDate()) : fmt.getDate();
	var hh = fmt.getHours() < 10 ? ('0' + fmt.getHours()) : fmt.getHours();
	var mm = fmt.getMinutes() < 10 ? ('0' + fmt.getMinutes()) : fmt.getMinutes();
	var ss = fmt.getSeconds() < 10 ? ('0' + fmt.getSeconds()) : fmt.getSeconds();
	return YY + '-' + MM + '-' + dd + ' ' + hh + ':' + mm + ':' + ss;
}
