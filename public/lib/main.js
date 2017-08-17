// JavaScript Document
//日期控件
function layDate() {
    var start = {
        elem: '#start',
        format: 'YYYY-MM-DD',
        min: '1900-06-16 23:59:59', //设定最小日期为当前日期
        max: laydate.now(), //最大日期
        istime: true,
        istoday: true,
        choose: function (datas) {
            end.min = datas; //开始日选好后，重置结束日的最小日期
            end.start = datas //将结束日的初始值设定为开始日
            //$("#startTime").text(datas)
        }
    };
    var end = {
        elem: '#end',
        format: 'YYYY-MM-DD',
        min: laydate.now(),
        max: '2099-06-16 23:59:59',
        istime: true,
        istoday: true,
        choose: function (datas) {
            start.max = datas; //结束日选好后，重置开始日的最大日期
            //$("#endTime").text(datas)
        }
    };
    laydate(start);
    laydate(end);
}
layDate();
$(document).ready(function () {
    //类型塞选
    $(".indexTopLeft ul li:nth-child(3) a").click(function () {
        $(this).addClass("active").siblings("a").removeClass("active");
    })
    //表格文字颜色
    //alert($(".deposit,.pay").text())
});
