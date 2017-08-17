/**
 * Created by Linyi on 2015/10/22 0022.
 */
/**
 * Created by Linyi on 2015/10/14 0014.
 */
avalon.filters.screenName = function (screen) {
    var screenName = "";
    if (screen == "artist.html") {
        screenName = "艺人管理";
    } else if (screen == "sociaty.html") {
        screenName = "马甲管理";
    }
    return screenName;
}
var registerModel = createModel('register', function (modelName) {
    return avalon.define(modelName, function (vm) {
            vm.user = {
                mobile: '13088869730',
                password: '',
                from: 'fengxiu_pc',
                version: '1.0',
                code: ''
            }
            vm.login = function () {
                vm.strToRsa(vm.user.password, function (cb) {
                    vm.user.password = cb;
                    ajaxPost("/api/reg/client", vm.user.$model, function (result) {
                        if (result.status == 0) {
                            //vm.initPagination(vm.roomWhiteList.length);
                        } else {
                            alert(result.info.errorno + "," + result.info.msg);
                        }
                    });
                });
            }
            vm.mobileCode = {
                mobile: '',
                time: '',
                keytype: '',
                key: '',
            }
            vm.strToRsa = function (str, cb) {//rsa加密
                ajaxPost("/mainService/strToRsa", {data: str}, function (result) {
                    if (result.code == 0) {
                        var str = result.rsa
                        cb(str)
                        //vm.initPagination(vm.roomWhiteList.length);
                    } else {
                        cb('')
                    }
                });
            }
            vm.getKeyStr = function (str, cb) {//key
                ajaxPost("/mainService/getKeyStr", {data: str}, function (result) {
                    if (result.code == 0) {
                        var str = result;
                        cb(str)
                        //vm.initPagination(vm.roomWhiteList.length);
                    } else {
                        cb('')
                    }
                });
            }
            vm.msg = '';
            vm.sendCode = function () {
                var newDate = new Date();
                vm.mobileCode.mobile = vm.user.mobile;
                vm.mobileCode.keytype = 'fengxiu_pc';
                vm.getKeyStr(vm.mobileCode.mobile, function (cb) {
                    vm.mobileCode.time = cb.time;
                    vm.mobileCode.key = cb.key;
                    ajaxPost("/api/msg/client", vm.mobileCode.$model, function (result) {
                        if (result.status == 1) {
                            vm.msg = result.info.msg;
                        } else {
                            vm.msg = result.info.msg;
                        }
                    });
                })
            }
            vm.init = function () {
            }
        }
    )
});