// @ts-nocheck
// @shared
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    /* SmtpJS.com - v3.0.0 */
    var Email = {
        send: function (a) {
            return new Promise(function (n, e) {
                (a.nocache = Math.floor(1e6 * Math.random() + 1)), (a.Action = 'Send');
                var t = JSON.stringify(a);
                Email.ajaxPost('https://smtpjs.com/v3/smtpjs.aspx?', t, function (e) {
                    n(e);
                });
            });
        },
        ajaxPost: function (e, n, t) {
            var a = Email.createCORSRequest('POST', e);
            a.setRequestHeader('Content-type', 'application/x-www-form-urlencoded'),
                (a.onload = function () {
                    var e = a.responseText;
                    null != t && t(e);
                }),
                a.send(n);
        },
        ajax: function (e, n) {
            var t = Email.createCORSRequest('GET', e);
            (t.onload = function () {
                var e = t.responseText;
                null != n && n(e);
            }),
                t.send();
        },
        createCORSRequest: function (e, n) {
            var t = new XMLHttpRequest();
            return ('withCredentials' in t
                ? t.open(e, n, !0)
                : 'undefined' != typeof XDomainRequest
                    ? (t = new XDomainRequest()).open(e, n)
                    : (t = null),
                t);
        }
    };
    return Email;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic210cC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNtdHAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUNkLFVBQVU7Ozs7Ozs7Ozs7O0lBRVYseUJBQXlCO0lBQ3pCLElBQU0sS0FBSyxHQUFHO1FBQ1osSUFBSSxFQUFFLFVBQVUsQ0FBQztZQUNmLE9BQU8sSUFBSSxPQUFPLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQztnQkFDL0IsQ0FBQyxDQUFDLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsQ0FBQztnQkFDdkUsSUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDNUIsS0FBSyxDQUFDLFFBQVEsQ0FBQyxvQ0FBb0MsRUFBRSxDQUFDLEVBQUUsVUFBVSxDQUFDO29CQUNqRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ1AsQ0FBQyxDQUFDLENBQUM7WUFDTCxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUM7UUFDRCxRQUFRLEVBQUUsVUFBVSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7WUFDekIsSUFBTSxDQUFDLEdBQUcsS0FBSyxDQUFDLGlCQUFpQixDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQztZQUM3QyxDQUFDLENBQUMsZ0JBQWdCLENBQUMsY0FBYyxFQUFFLG1DQUFtQyxDQUFDO2dCQUNyRSxDQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUc7b0JBQ1YsSUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLFlBQVksQ0FBQztvQkFDekIsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3BCLENBQUMsQ0FBQztnQkFDRixDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2QsQ0FBQztRQUNELElBQUksRUFBRSxVQUFVLENBQUMsRUFBRSxDQUFDO1lBQ2xCLElBQU0sQ0FBQyxHQUFHLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDNUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFHO2dCQUNWLElBQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxZQUFZLENBQUM7Z0JBQ3pCLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3BCLENBQUMsQ0FBQztnQkFDQSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDYixDQUFDO1FBQ0QsaUJBQWlCLEVBQUUsVUFBVSxDQUFDLEVBQUUsQ0FBQztZQUMvQixJQUFJLENBQUMsR0FBRyxJQUFJLGNBQWMsRUFBRSxDQUFDO1lBQzdCLE9BQU8sQ0FDTCxpQkFBaUIsSUFBSSxDQUFDO2dCQUNwQixDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUNsQixDQUFDLENBQUMsV0FBVyxJQUFJLE9BQU8sY0FBYztvQkFDdEMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksY0FBYyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztvQkFDdkMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQztnQkFDZCxDQUFDLENBQ0YsQ0FBQztRQUNKLENBQUM7S0FDRixDQUFDO0lBQ0YsT0FBUyxLQUFLLENBQUMifQ==