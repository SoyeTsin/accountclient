(function(f) {
	"function" === typeof define && define.amd ? define(["jquery", "moment"], f) : "object" === typeof exports && "undefined" !== typeof module ? module.exports = f(require("jquery"), require("moment")) : f(jQuery, moment)
})(function(f, d) {
	f.dateRangePickerLanguages = {
		az: {
			selected: "Se\u00e7ildi:",
			day: " g\u00fcn",
			days: " g\u00fcn",
			apply: "t\u0259tbiq",
			"week-1": "1",
			"week-2": "2",
			"week-3": "3",
			"week-4": "4",
			"week-5": "5",
			"week-6": "6",
			"week-7": "7",
			"month-name": "yanvar fevral mart aprel may iyun iyul avqust sentyabr oktyabr noyabr dekabr".split(" "),
			shortcuts: "Q\u0131sayollar",
			past: "Ke\u00e7mi\u015f",
			following: "N\u00f6vb\u0259ti",
			previous: "&nbsp;&nbsp;&nbsp;",
			"prev-week": "\u00d6nc\u0259ki h\u0259ft\u0259",
			"prev-month": "\u00d6nc\u0259ki ay",
			"prev-year": "\u00d6nc\u0259ki il",
			next: "&nbsp;&nbsp;&nbsp;",
			"next-week": "N\u00f6vb\u0259ti h\u0259ft\u0259",
			"next-month": "N\u00f6vb\u0259ti ay",
			"next-year": "N\u00f6vb\u0259ti il",
			"less-than": "Tarix aral\u0131\u011f\u0131 %d g\u00fcnd\u0259n \u00e7ox olmamal\u0131d\u0131r",
			"more-than": "Tarix aral\u0131\u011f\u0131 %d g\u00fcnd\u0259n az olmamal\u0131d\u0131r",
			"default-more": "%d g\u00fcnd\u0259n \u00e7ox bir tarix se\u00e7in",
			"default-single": "Tarix se\u00e7in",
			"default-less": "%d g\u00fcnd\u0259n az bir tarix se\u00e7in",
			"default-range": "%d v\u0259 %d g\u00fcn aral\u0131\u011f\u0131nda tarixl\u0259r se\u00e7in",
			"default-default": "Tarix aral\u0131\u011f\u0131 se\u00e7in"
		},
		cn: {
			selected: "\u5df2\u9009\u62e9:",
			day: "\u5929",
			days: "\u5929",
			apply: "\u786e\u5b9a",
			"week-1": "\u4e00",
			"week-2": "\u4e8c",
			"week-3": "\u4e09",
			"week-4": "\u56db",
			"week-5": "\u4e94",
			"week-6": "\u516d",
			"week-7": "\u65e5",
			"month-name": "\u4e00\u6708 \u4e8c\u6708 \u4e09\u6708 \u56db\u6708 \u4e94\u6708 \u516d\u6708 \u4e03\u6708 \u516b\u6708 \u4e5d\u6708 \u5341\u6708 \u5341\u4e00\u6708 \u5341\u4e8c\u6708".split(" "),
			shortcuts: "\u5feb\u6377\u9009\u62e9",
			past: "\u8fc7\u53bb",
			following: "\u5c06\u6765",
			previous: "&nbsp;&nbsp;&nbsp;",
			"prev-week": "\u4e0a\u5468",
			"prev-month": "\u4e0a\u4e2a\u6708",
			"prev-year": "\u53bb\u5e74",
			next: "&nbsp;&nbsp;&nbsp;",
			"next-week": "\u4e0b\u5468",
			"next-month": "\u4e0b\u4e2a\u6708",
			"next-year": "\u660e\u5e74",
			"less-than": "\u6240\u9009\u65e5\u671f\u8303\u56f4\u4e0d\u80fd\u5927\u4e8e%d\u5929",
			"more-than": "\u6240\u9009\u65e5\u671f\u8303\u56f4\u4e0d\u80fd\u5c0f\u4e8e%d\u5929",
			"default-more": "\u8bf7\u9009\u62e9\u5927\u4e8e%d\u5929\u7684\u65e5\u671f\u8303\u56f4",
			"default-less": "\u8bf7\u9009\u62e9\u5c0f\u4e8e%d\u5929\u7684\u65e5\u671f\u8303\u56f4",
			"default-range": "\u8bf7\u9009\u62e9%d\u5929\u5230%d\u5929\u7684\u65e5\u671f\u8303\u56f4",
			"default-single": "\u8bf7\u9009\u62e9\u4e00\u4e2a\u65e5\u671f",
			"default-default": "\u8bf7\u9009\u62e9\u4e00\u4e2a\u65e5\u671f\u8303\u56f4"
		},
		cz: {
			selected: "Vybr\u00e1no:",
			day: "Den",
			days: "Dny",
			apply: "Zav\u0159\u00edt",
			"week-1": "po",
			"week-2": "\u00fat",
			"week-3": "st",
			"week-4": "\u010dt",
			"week-5": "p\u00e1",
			"week-6": "so",
			"week-7": "ne",
			"month-name": "leden \u00fanor b\u0159ezen duben kv\u011bten \u010derven \u010dervenec srpen z\u00e1\u0159\u00ed \u0159\u00edjen listopad prosinec".split(" "),
			shortcuts: "Zkratky",
			past: "po",
			following: "n\u00e1sleduj\u00edc\u00ed",
			previous: "p\u0159edchoz\u00ed",
			"prev-week": "t\u00fdden",
			"prev-month": "m\u011bs\u00edc",
			"prev-year": "rok",
			next: "dal\u0161\u00ed",
			"next-week": "t\u00fdden",
			"next-month": "m\u011bs\u00edc",
			"next-year": "rok",
			"less-than": "Rozsah data by nem\u011bl b\u00fdt v\u011bt\u0161\u00ed ne\u017e %d dn\u016f",
			"more-than": "Rozsah data by nem\u011bl b\u00fdt men\u0161\u00ed ne\u017e %d dn\u016f",
			"default-more": "Pros\u00edm zvolte rozsah data v\u011bt\u0161\u00ed ne\u017e %d dn\u016f",
			"default-single": "Pros\u00edm zvolte datum",
			"default-less": "Pros\u00edm zvolte rozsah data men\u0161\u00ed ne\u017e %d dn\u016f",
			"default-range": "Pros\u00edm zvolte rozsah data mezi %d a %d dny",
			"default-default": "Pros\u00edm zvolte rozsah data"
		},
		en: {
			selected: "Selected:",
			day: "Day",
			days: "Days",
			apply: "Close",
			"week-1": "mo",
			"week-2": "tu",
			"week-3": "we",
			"week-4": "th",
			"week-5": "fr",
			"week-6": "sa",
			"week-7": "su",
			"month-name": "january february march april may june july august september october november december".split(" "),
			shortcuts: "Shortcuts",
			"custom-values": "Custom Values",
			past: "Past",
			following: "Following",
			previous: "Previous",
			"prev-week": "Week",
			"prev-month": "Month",
			"prev-year": "Year",
			next: "Next",
			"next-week": "Week",
			"next-month": "Month",
			"next-year": "Year",
			"less-than": "Date range should not be more than %d days",
			"more-than": "Date range should not be less than %d days",
			"default-more": "Please select a date range longer than %d days",
			"default-single": "Please select a date",
			"default-less": "Please select a date range less than %d days",
			"default-range": "Please select a date range between %d and %d days",
			"default-default": "Please select a date range"
		},
		it: {
			selected: "Selezionati:",
			day: "Giorno",
			days: "Giorni",
			apply: "Chiudi",
			"week-1": "lu",
			"week-2": "ma",
			"week-3": "me",
			"week-4": "gi",
			"week-5": "ve",
			"week-6": "sa",
			"week-7": "do",
			"month-name": "gennaio febbraio marzo aprile maggio giugno luglio agosto settembre ottobre novembre dicembre".split(" "),
			shortcuts: "Scorciatoie",
			past: "Scorso",
			following: "Successivo",
			previous: "Precedente",
			"prev-week": "Settimana",
			"prev-month": "Mese",
			"prev-year": "Anno",
			next: "Prossimo",
			"next-week": "Settimana",
			"next-month": "Mese",
			"next-year": "Anno",
			"less-than": "L'intervallo non dev'essere maggiore di %d giorni",
			"more-than": "L'intervallo non dev'essere minore di %d giorni",
			"default-more": "Seleziona un intervallo maggiore di %d giorni",
			"default-single": "Seleziona una data",
			"default-less": "Seleziona un intervallo minore di %d giorni",
			"default-range": "Seleziona un intervallo compreso tra i %d e i %d giorni",
			"default-default": "Seleziona un intervallo di date"
		},
		es: {
			selected: "Seleccionado:",
			day: "Dia",
			days: "Dias",
			apply: "Cerrar",
			"week-1": "lu",
			"week-2": "ma",
			"week-3": "mi",
			"week-4": "ju",
			"week-5": "vi",
			"week-6": "sa",
			"week-7": "do",
			"month-name": "enero febrero marzo abril mayo junio julio agosto septiembre octubre noviembre diciembre".split(" "),
			shortcuts: "Accesos directos",
			past: "Pasado",
			following: "Siguiente",
			previous: "Anterior",
			"prev-week": "Semana",
			"prev-month": "Mes",
			"prev-year": "A\u00f1o",
			next: "Siguiente",
			"next-week": "Semana",
			"next-month": "Mes",
			"next-year": "A\u00f1o",
			"less-than": "El rango no deberia ser mayor de %d dias",
			"more-than": "El rango no deberia ser menor de %d dias",
			"default-more": "Por favor selecciona un rango mayor a %d dias",
			"default-single": "Por favor selecciona un dia",
			"default-less": "Por favor selecciona un rango menor a %d dias",
			"default-range": "Por favor selecciona un rango entre %d y %d dias",
			"default-default": "Por favor selecciona un rango de fechas."
		},
		de: {
			selected: "Auswahl:",
			day: "Tag",
			days: "Tage",
			apply: "Schlie\u00dfen",
			"week-1": "mo",
			"week-2": "di",
			"week-3": "mi",
			"week-4": "do",
			"week-5": "fr",
			"week-6": "sa",
			"week-7": "so",
			"month-name": "januar februar m\u00e4rz april mai juni juli august september oktober november dezember".split(" "),
			shortcuts: "Schnellwahl",
			past: "Vorherige",
			following: "Folgende",
			previous: "Vorherige",
			"prev-week": "Woche",
			"prev-month": "Monat",
			"prev-year": "Jahr",
			next: "N\u00e4chste",
			"next-week": "Woche",
			"next-month": "Monat",
			"next-year": "Jahr",
			"less-than": "Datumsbereich darf nicht gr\u00f6\u00dfer sein als %d Tage",
			"more-than": "Datumsbereich darf nicht kleiner sein als %d Tage",
			"default-more": "Bitte mindestens %d Tage ausw\u00e4hlen",
			"default-single": "Bitte ein Datum ausw\u00e4hlen",
			"default-less": "Bitte weniger als %d Tage ausw\u00e4hlen",
			"default-range": "Bitte einen Datumsbereich zwischen %d und %d Tagen ausw\u00e4hlen",
			"default-default": "Bitte ein Start- und Enddatum ausw\u00e4hlen"
		},
		ru: {
			selected: "\u0412\u044b\u0431\u0440\u0430\u043d\u043e:",
			day: "\u0414\u0435\u043d\u044c",
			days: "\u0414\u043d\u0435\u0439",
			apply: "\u0417\u0430\u043a\u0440\u044b\u0442\u044c",
			"week-1": "\u043f\u043d",
			"week-2": "\u0432\u0442",
			"week-3": "\u0441\u0440",
			"week-4": "\u0447\u0442",
			"week-5": "\u043f\u0442",
			"week-6": "\u0441\u0431",
			"week-7": "\u0432\u0441",
			"month-name": "\u044f\u043d\u0432\u0430\u0440\u044c \u0444\u0435\u0432\u0440\u0430\u043b\u044c \u043c\u0430\u0440\u0442 \u0430\u043f\u0440\u0435\u043b\u044c \u043c\u0430\u0439 \u0438\u044e\u043d\u044c \u0438\u044e\u043b\u044c \u0430\u0432\u0433\u0443\u0441\u0442 \u0441\u0435\u043d\u0442\u044f\u0431\u0440\u044c \u043e\u043a\u0442\u044f\u0431\u0440\u044c \u043d\u043e\u044f\u0431\u0440\u044c \u0434\u0435\u043a\u0430\u0431\u0440\u044c".split(" "),
			shortcuts: "\u0411\u044b\u0441\u0442\u0440\u044b\u0439 \u0432\u044b\u0431\u043e\u0440",
			past: "\u041f\u0440\u043e\u0448\u0435\u0434\u0448\u0438\u0435",
			following: "\u0421\u043b\u0435\u0434\u0443\u044e\u0449\u0438\u0435",
			previous: "&nbsp;&nbsp;&nbsp;",
			"prev-week": "\u041d\u0435\u0434\u0435\u043b\u044f",
			"prev-month": "\u041c\u0435\u0441\u044f\u0446",
			"prev-year": "\u0413\u043e\u0434",
			next: "&nbsp;&nbsp;&nbsp;",
			"next-week": "\u041d\u0435\u0434\u0435\u043b\u044f",
			"next-month": "\u041c\u0435\u0441\u044f\u0446",
			"next-year": "\u0413\u043e\u0434",
			"less-than": "\u0414\u0438\u0430\u043f\u0430\u0437\u043e\u043d \u043d\u0435 \u043c\u043e\u0436\u0435\u0442 \u0431\u044b\u0442\u044c \u0431\u043e\u043b\u044c\u0448\u0435 %d \u0434\u043d\u0435\u0439",
			"more-than": "\u0414\u0438\u0430\u043f\u0430\u0437\u043e\u043d \u043d\u0435 \u043c\u043e\u0436\u0435\u0442 \u0431\u044b\u0442\u044c \u043c\u0435\u043d\u044c\u0448\u0435 %d \u0434\u043d\u0435\u0439",
			"default-more": "\u041f\u043e\u0436\u0430\u043b\u0443\u0439\u0441\u0442\u0430 \u0432\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \u0434\u0438\u0430\u043f\u0430\u0437\u043e\u043d \u0431\u043e\u043b\u044c\u0448\u0435 %d \u0434\u043d\u0435\u0439",
			"default-single": "\u041f\u043e\u0436\u0430\u043b\u0443\u0439\u0441\u0442\u0430 \u0432\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \u0434\u0430\u0442\u0443",
			"default-less": "\u041f\u043e\u0436\u0430\u043b\u0443\u0439\u0441\u0442\u0430 \u0432\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \u0434\u0438\u0430\u043f\u0430\u0437\u043e\u043d \u043c\u0435\u043d\u044c\u0448\u0435 %d \u0434\u043d\u0435\u0439",
			"default-range": "\u041f\u043e\u0436\u0430\u043b\u0443\u0439\u0441\u0442\u0430 \u0432\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \u0434\u0438\u0430\u043f\u0430\u0437\u043e\u043d \u043c\u0435\u0436\u0434\u0443 %d \u0438 %d \u0434\u043d\u044f\u043c\u0438",
			"default-default": "\u041f\u043e\u0436\u0430\u043b\u0443\u0439\u0441\u0442\u0430 \u0432\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \u0434\u0438\u0430\u043f\u0430\u0437\u043e\u043d"
		},
		fr: {
			selected: "S\u00e9lection:",
			day: "Jour",
			days: "Jours",
			apply: "Fermer",
			"week-1": "lu",
			"week-2": "ma",
			"week-3": "me",
			"week-4": "je",
			"week-5": "ve",
			"week-6": "sa",
			"week-7": "di",
			"month-name": "janvier f\u00e9vrier mars avril mai juin juillet ao\u00fbt septembre octobre novembre d\u00e9cembre".split(" "),
			shortcuts: "Raccourcis",
			past: "Pass\u00e9",
			following: "Suivant",
			previous: "Pr\u00e9c\u00e9dent",
			"prev-week": "Semaine",
			"prev-month": "Mois",
			"prev-year": "Ann\u00e9e",
			next: "Suivant",
			"next-week": "Semaine",
			"next-month": "Mois",
			"next-year": "Ann\u00e9e",
			"less-than": "L'intervalle ne doit pas \u00eatre sup\u00e9rieure \u00e0 %d jours",
			"more-than": "L'intervalle ne doit pas \u00eatre inf\u00e9rieure \u00e0 %d jours",
			"default-more": "Merci de choisir une intervalle sup\u00e9rieure \u00e0 %d jours",
			"default-single": "Merci de choisir une date",
			"default-less": "Merci de choisir une intervalle inf\u00e9rieure %d jours",
			"default-range": "Merci de choisir une intervalle comprise entre %d et %d jours",
			"default-default": "Merci de choisir une date"
		},
		hu: {
			selected: "Kiv\u00e1lasztva:",
			day: "Nap",
			days: "Nap",
			apply: "Ok",
			"week-1": "h",
			"week-2": "k",
			"week-3": "sz",
			"week-4": "cs",
			"week-5": "p",
			"week-6": "sz",
			"week-7": "v",
			"month-name": "janu\u00e1r febru\u00e1r m\u00e1rcius \u00e1prilis m\u00e1jus j\u00fanius j\u00falius augusztus szeptember okt\u00f3ber november december".split(" "),
			shortcuts: "Gyorsv\u00e1laszt\u00f3",
			past: "M\u00falt",
			following: "K\u00f6vetkez\u0151",
			previous: "El\u0151z\u0151",
			"prev-week": "H\u00e9t",
			"prev-month": "H\u00f3nap",
			"prev-year": "\u00c9v",
			next: "K\u00f6vetkez\u0151",
			"next-week": "H\u00e9t",
			"next-month": "H\u00f3nap",
			"next-year": "\u00c9v",
			"less-than": "A kiv\u00e1laszt\u00e1s nem lehet t\u00f6bb %d napn\u00e1l",
			"more-than": "A kiv\u00e1laszt\u00e1s nem lehet t\u00f6bb %d napn\u00e1l",
			"default-more": "V\u00e1lassz ki egy id\u0151szakot ami hosszabb mint %d nap",
			"default-single": "V\u00e1lassz egy napot",
			"default-less": "V\u00e1lassz ki egy id\u0151szakot ami r\u00f6videbb mint %d nap",
			"default-range": "V\u00e1lassz ki egy %d - %d nap hossz\u00fa id\u0151szakot",
			"default-default": "V\u00e1lassz ki egy id\u0151szakot"
		}
	};
	f.fn.dateRangePicker = function(a) {
		function C() {
			if (!a.inline) {
				var c = f(m).offset();
				if ("relative" == f(a.container).css("position")) {
					var b = f(a.container).offset();
					e.css({
						top: c.top - b.top + f(m).outerHeight() + 4,
						left: c.left - b.left
					})
				} else 460 > c.left ? e.css({
					top: c.top + f(m).outerHeight() + parseInt(f("body").css("border-top") || 0, 10),
					left: c.left
				}) : e.css({
					top: c.top + f(m).outerHeight() + parseInt(f("body").css("border-top") || 0, 10),
					left: c.left + f(m).width() - e.width() - 16
				})
			}
		}
		function F(c) {
			C();
			var b = a.getValue.call(z);
			if ((b = b ? b.split(a.separator) : "") && (1 == b.length && a.singleDate || 2 <= b.length)) {
				var g = a.format;
				g.match(/Do/) && (g = g.replace(/Do/, "D"), b[0] = b[0].replace(/(\d+)(th|nd|st)/, "$1"), 2 <= b.length && (b[1] = b[1].replace(/(\d+)(th|nd|st)/, "$1")));
				v = !1;
				2 <= b.length ? G(d(b[0], g, d.locale(a.language)).toDate(), d(b[1], g, d.locale(a.language)).toDate()) : 1 == b.length && a.singleDate && (b = d(b[0], g, d.locale(a.language)).toDate(), g = !0, a.startDate && 0 > p(b, a.startDate) && (g = !1), a.endDate && 0 < p(b, a.endDate) && (g = !1), g ? (a.start = b.getTime(), a.time.enabled && w("time1", b), l(b, "month1"), x(), y(), H()) : l(a.startDate, "month1"));
				v = !0
			}
			e.slideDown(c)
		}
		function w(a, b) {
			e.find("." + a + " input[type=range].hour-range").val(d(b).hours());
			e.find("." + a + " input[type=range].minute-range").val(d(b).minutes());
			I(a, d(b).format("HH"), d(b).format("mm"))
		}
		function J(c, b) {
			a[c] = parseInt(d(parseInt(b)).startOf("day").add(d(a[c + "Time"]).format("HH"), "h").add(d(a[c + "Time"]).format("mm"), "m").valueOf())
		}
		function I(c, b, g) {
			function h(c, h) {
				var d = h.format("HH"),
					f = h.format("mm");
				a[c] = h.startOf("day").add(b || d, "h").add(g || f, "m").valueOf()
			}
			b && e.find("." + c + " .hour-val").text(b);
			g && e.find("." + c + " .minute-val").text(g);
			switch (c) {
			case "time1":
				a.start && h("start", d(a.start));
				h("startTime", d(a.startTime || d().valueOf()));
				break;
			case "time2":
				a.end && h("end", d(a.end)), h("endTime", d(a.endTime || d().valueOf()))
			}
			A();
			y();
			B()
		}
		function K(c) {
			var b = c;
			"week-range" === a.batchMode ? b = "monday" === a.startOfWeek ? d(parseInt(c)).startOf("isoweek").valueOf() : d(parseInt(c)).startOf("week").valueOf() : "month-range" === a.batchMode && (b = d(parseInt(c)).startOf("month").valueOf());
			return b
		}
		function L(c) {
			var b = c;
			"week-range" === a.batchMode ? b = "monday" === a.startOfWeek ? d(parseInt(c)).endOf("isoweek").valueOf() : d(parseInt(c)).endOf("week").valueOf() : "month" === a.batchMode && (b = d(parseInt(c)).endOf("month").valueOf());
			return b
		}
		function H() {
			!0 === a.singleDate ? v && a.start && a.autoClose && u() : v && a.start && a.end && a.autoClose && u()
		}
		function A() {
			var c = Math.ceil((a.end - a.start) / 864E5) + 1;
			a.singleDate ? a.start && !a.end ? e.find(".drp_top-bar").removeClass("error").addClass("normal") : e.find(".drp_top-bar").removeClass("error").removeClass("normal") : a.maxDays && c > a.maxDays ? (a.start = !1, a.end = !1, e.find(".day").removeClass("checked"), e.find(".drp_top-bar").removeClass("normal").addClass("error").find(".error-top").html(k("less-than").replace("%d", a.maxDays))) : a.minDays && c < a.minDays ? (a.start = !1, a.end = !1, e.find(".day").removeClass("checked"), e.find(".drp_top-bar").removeClass("normal").addClass("error").find(".error-top").html(k("more-than").replace("%d", a.minDays))) : a.start || a.end ? e.find(".drp_top-bar").removeClass("error").addClass("normal") : e.find(".drp_top-bar").removeClass("error").removeClass("normal");
			a.singleDate && a.start && !a.end || !a.singleDate && a.start && a.end ? e.find(".apply-btn").removeClass("disabled") : e.find(".apply-btn").addClass("disabled");
			a.batchMode && (a.start && a.startDate && 0 > p(a.start, a.startDate) || a.end && a.endDate && 0 < p(a.end, a.endDate)) && (a.start = !1, a.end = !1, e.find(".day").removeClass("checked"))
		}
		function y(c) {
			e.find(".start-day").html("...");
			e.find(".end-day").html("...");
			e.find(".selected-days").hide();
			a.start && e.find(".start-day").html(q(new Date(parseInt(a.start))));
			a.end && e.find(".end-day").html(q(new Date(parseInt(a.end))));
			a.start && a.singleDate ? (e.find(".apply-btn").removeClass("disabled"), c = q(new Date(a.start)), a.setValue.call(z, c, q(new Date(a.start)), q(new Date(a.end))), v && f(m).trigger("datepicker-change", {
				value: c,
				date1: new Date(a.start)
			})) : a.start && a.end ? (e.find(".selected-days").show().find(".selected-days-num").html(Math.round((a.end - a.start) / 864E5) + 1), e.find(".apply-btn").removeClass("disabled"), c = q(new Date(a.start)) + a.separator + q(new Date(a.end)), a.setValue.call(z, c, q(new Date(a.start)), q(new Date(a.end))), v && f(m).trigger("datepicker-change", {
				value: c,
				date1: new Date(a.start),
				date2: new Date(a.end)
			})) : c ? e.find(".apply-btn").removeClass("disabled") : e.find(".apply-btn").addClass("disabled")
		}
		function G(c, b) {
			if (c.getTime() > b.getTime()) {
				var g = b;
				b = c;
				c = g
			}
			g = !0;
			a.startDate && 0 > p(c, a.startDate) && (g = !1);
			a.endDate && 0 < p(b, a.endDate) && (g = !1);
			if (g) {
				a.start = c.getTime();
				a.end = b.getTime();
				if (a.stickyMonths || 0 < p(c, b) && 0 == r(c, b)) a.lookBehind ? c = t(b) : b = n(c);
				a.stickyMonths && 0 < r(b, a.endDate) && (c = t(c), b = t(b));
				a.stickyMonths || 0 == r(c, b) && (a.lookBehind ? c = t(b) : b = n(c));
				a.time.enabled && (w("time1", c), w("time2", b));
				l(c, "month1");
				l(b, "month2");
				x();
				y();
				H()
			} else l(a.startDate, "month1"), l(n(a.startDate), "month2"), x()
		}
		function B() {
			(a.start || a.end) && e.find(".day").each(function() {
				var c = parseInt(f(this).attr("time")),
					b = a.start,
					g = a.end;
				a.time.enabled && (c = d(c).startOf("day").valueOf(), b = d(b || d().valueOf()).startOf("day").valueOf(), g = d(g || d().valueOf()).startOf("day").valueOf());
				a.start && a.end && g >= c && b <= c || a.start && !a.end && d(b).format("YYYY-MM-DD") == d(c).format("YYYY-MM-DD") ? f(this).addClass("checked") : f(this).removeClass("checked")
			})
		}
		function l(c, b) {
			c = d(c).toDate();
			var g;
			g = c.getMonth();
			g = k("month-name")[g];
			e.find("." + b + " .month-name").html(g + " " + c.getFullYear());
			e.find("." + b + " tbody").html(P(c));
			a[b] = c
		}
		function D(a, b) {
			e.find("." + b).append('<div><span>Time: <span class="hour-val">00</span>:<span class="minute-val">00</span></span></div><div class="hour"><label>Hour: <input type="range" class="hour-range" name="hour" min="0" max="23"></label></div><div class="minute"><label>Minute: <input type="range" class="minute-range" name="minute" min="0" max="59"></label></div>');
			w(b, a)
		}
		function q(c) {
			return d(c).format(a.format)
		}
		function x() {
			B();
			var c = parseInt(d(a.month1).format("YYYYMM")),
				b = parseInt(d(a.month2).format("YYYYMM")),
				c = Math.abs(c - b);
			1 < c && 89 != c ? e.find(".gap").show() : e.find(".gap").hide()
		}
		function u() {
			a.alwaysOpen || (f(e).slideUp(a.duration, function() {
				f(m).data("date-picker-opened", !1)
			}), f(m).trigger("datepicker-close"))
		}
		function r(a, b) {
			var g = parseInt(d(a).format("YYYYMM")) - parseInt(d(b).format("YYYYMM"));
			return 0 < g ? 1 : 0 == g ? 0 : -1
		}
		function p(a, b) {
			var g = parseInt(d(a).format("YYYYMMDD")) - parseInt(d(b).format("YYYYMMDD"));
			return 0 < g ? 1 : 0 == g ? 0 : -1
		}
		function n(a) {
			a = d(a).toDate();
			for (var b = a.getMonth(); a.getMonth() == b;) a = new Date(a.getTime() + 864E5);
			return a
		}
		function t(a) {
			a = d(a).toDate();
			for (var b = a.getMonth(); a.getMonth() == b;) a = new Date(a.getTime() - 864E5);
			return a
		}
		function Q() {
			var c = '<div class="date-picker-wrapper';
			a.singleDate && (c += " single-date");
			a.showShortcuts || (c += " no-shortcuts ");
			c += '"><div class="drp_top-bar">\r\n\t\t\t\t\t<div class="normal-top">\r\n\t\t\t\t\t\t<span style="color:#FFF">' + k("selected") + ' </span> <b class="start-day">...</b>';
			a.singleDate || (c += ' <span class="separator-day">' + a.separator + '</span> <b class="end-day">...</b> ');
			klass = "";
			!0 === a.autoClose && (klass += " hide");
			"" !== a.applyBtnClass && (klass += " " + a.applyBtnClass);
			c += '</div>\r\n\t\t\t\t\t<div class="error-top">error</div>\r\n\t\t\t\t\t<div class="default-top">default</div>\r\n\t\t\t\t\t<input type="button" class="apply-btn disabled' + klass + '" value="' + k("apply") + '" />\r\n\t\t\t\t</div><div class="month-wrapper"><table class="month1" cellspacing="0" border="0" cellpadding="0"><thead><tr class="caption"><th style="width:27px;"><span class="prev">&lt;</span></th><th colspan="5" class="month-name">January, 2011</th><th style="width:27px;">' + (a.singleDate || !a.stickyMonths ? '<span class="next">&gt;</span>' : "") + '</th></tr><tr class="week-name">' + M() + "</thead><tbody></tbody></table>";
			if (!a.singleDate) {
				var b;
				b = ['<div class="gap-top-mask"></div><div class="gap-bottom-mask"></div><div class="gap-lines">'];
				for (var g = 0; 20 > g; g++) b.push('<div class="gap-line">\r\n\t\t\t\t\t<div class="gap-1"></div>\r\n\t\t\t\t\t<div class="gap-2"></div>\r\n\t\t\t\t\t<div class="gap-3"></div>\r\n\t\t\t\t</div>');
				b.push("</div>");
				b = b.join("");
				c += '<div class="gap">' + b + '</div><table class="month2" cellspacing="0" border="0" cellpadding="0"><thead><tr class="caption"><th style="width:27px;">' + (a.stickyMonths ? "" : '<span class="prev">&lt;</span>') + '</th><th colspan="5" class="month-name">January, 2011</th><th style="width:27px;"><span class="next">&gt;</span></th></tr><tr class="week-name">' + M() + "</thead><tbody></tbody></table>"
			}
			c += '<div style="clear:both;height:0;font-size:0;"></div><div class="time"><div class="time1"></div>';
			a.singleDate || (c += '<div class="time2"></div>');
			c += '</div><div style="clear:both;height:0;font-size:0;"></div></div>';
			if (a.showShortcuts) {
				c += '<div class="footer"><b>' + k("shortcuts") + "</b>";
				if (g = a.shortcuts) {
					if (g["prev-days"] && 0 < g["prev-days"].length) {
						c += '&nbsp;<span class="prev-days">' + k("past");
						for (b = 0; b < g["prev-days"].length; b++) var h = g["prev-days"][b],
							h = h + (1 < g["prev-days"][b] ? k("days") : k("day")),
							c = c + (' <a href="javascript:;" shortcut="day,-' + g["prev-days"][b] + '">' + h + "</a>");
						c += "</span>"
					}
					if (g["next-days"] && 0 < g["next-days"].length) {
						c += '&nbsp;<span class="next-days">' + k("following");
						for (b = 0; b < g["next-days"].length; b++) h = g["next-days"][b], h += 1 < g["next-days"][b] ? k("days") : k("day"), c += ' <a href="javascript:;" shortcut="day,' + g["next-days"][b] + '">' + h + "</a>";
						c += "</span>"
					}
					if (g.prev && 0 < g.prev.length) {
						c += '&nbsp;<span class="prev-buttons">' + k("previous");
						for (b = 0; b < g.prev.length; b++) h = k("prev-" + g.prev[b]), c += ' <a href="javascript:;" shortcut="prev,' + g.prev[b] + '">' + h + "</a>";
						c += "</span>"
					}
					if (g.next && 0 < g.next.length) {
						c += '&nbsp;<span class="next-buttons">' + k("next");
						for (b = 0; b < g.next.length; b++) h = k("next-" + g.next[b]), c += ' <a href="javascript:;" shortcut="next,' + g.next[b] + '">' + h + "</a>";
						c += "</span>"
					}
				}
				if (a.customShortcuts) for (b = 0; b < a.customShortcuts.length; b++) c += '&nbsp;<span class="custom-shortcut"><a href="javascript:;" shortcut="custom">' + a.customShortcuts[b].name + "</a></span>";
				if (a.showCustomValues && (c += '<div class="customValues"><b>' + (a.customValueLabel || k("custom-values")) + "</b>", a.customValues)) for (b = 0; b < a.customValues.length; b++) g = a.customValues[b], c += '&nbsp;<span class="custom-value"><a href="javascript:;" custom="' + g.value + '">' + g.name + "</a></span>";
				c += "</div>"
			}
			return f(c + "</div>")
		}
		function M() {
			return "monday" == a.startOfWeek ? "<th>" + k("week-1") + "</th>\r\n\t\t\t\t\t<th>" + k("week-2") + "</th>\r\n\t\t\t\t\t<th>" + k("week-3") + "</th>\r\n\t\t\t\t\t<th>" + k("week-4") + "</th>\r\n\t\t\t\t\t<th>" + k("week-5") + "</th>\r\n\t\t\t\t\t<th>" + k("week-6") + "</th>\r\n\t\t\t\t\t<th>" + k("week-7") + "</th>" : "<th>" + k("week-7") + "</th>\r\n\t\t\t\t\t<th>" + k("week-1") + "</th>\r\n\t\t\t\t\t<th>" + k("week-2") + "</th>\r\n\t\t\t\t\t<th>" + k("week-3") + "</th>\r\n\t\t\t\t\t<th>" + k("week-4") + "</th>\r\n\t\t\t\t\t<th>" + k("week-5") + "</th>\r\n\t\t\t\t\t<th>" + k("week-6") + "</th>"
		}
		function E(c) {
			c = d(c);
			return a.startDate && c.endOf("month").isBefore(a.startDate) || a.endDate && c.startOf("month").isAfter(a.endDate) ? !0 : !1
		}
		function N(a, b, g) {
			var h = jQuery.extend(!0, {}, a);
			b.forEach(function(a, c, b) {
				a = a(this);
				for (var g in a) h.hasOwnProperty(g) ? h[g] += a[g] : h[g] = a[g]
			}, g);
			attrString = "";
			for (var d in h) h.hasOwnProperty(d) && (attrString += d + '="' + h[d] + '" ');
			return attrString
		}
		function P(c) {
			var b = [];
			c.setDate(1);
			c.getTime();
			var g = new Date,
				h = c.getDay();
			0 == h && "monday" == a.startOfWeek && (h = 7);
			if (0 < h) for (var f = h; 0 < f; f--) {
				var e = new Date(c.getTime() - 864E5 * f),
					k = !0;
				a.startDate && 0 > p(e, a.startDate) && (k = !1);
				a.endDate && 0 < p(e, a.endDate) && (k = !1);
				b.push({
					type: "lastMonth",
					day: e.getDate(),
					time: e.getTime(),
					valid: k
				})
			}
			e = c.getMonth();
			for (f = 0; 40 > f; f++) h = d(c).add(f, "days").toDate(), k = !0, a.startDate && 0 > p(h, a.startDate) && (k = !1), a.endDate && 0 < p(h, a.endDate) && (k = !1), b.push({
				type: h.getMonth() == e ? "toMonth" : "nextMonth",
				day: h.getDate(),
				time: h.getTime(),
				valid: k
			});
			c = [];
			for (f = 0; 6 > f && "nextMonth" != b[7 * f].type; f++) {
				c.push("<tr>");
				for (e = 0; 7 > e; e++) {
					h = b[7 * f + ("monday" == a.startOfWeek ? e + 1 : e)];
					k = d(h.time).format("L") == d(g).format("L");
					h.extraClass = "";
					h.tooltip = "";
					if (a.beforeShowDay && "function" == typeof a.beforeShowDay) {
						var l = a.beforeShowDay(d(h.time).toDate());
						h.valid = l[0];
						h.extraClass = l[1] || "";
						h.tooltip = l[2] || "";
						"" != h.tooltip && (h.extraClass += " has-tooltip ")
					}
					todayDivAttr = {
						time: h.time,
						title: h.tooltip,
						class: "day " + h.type + " " + h.extraClass + " " + (h.valid ? "valid" : "invalid") + " " + (k ? "real-today" : "")
					};
					c.push("<td " + N({}, a.dayTdAttrs, h) + "><div " + N(todayDivAttr, a.dayDivAttrs, h) + ">" + h.day + "</div></td>")
				}
				c.push("</tr>")
			}
			return c.join("")
		}
		function k(a) {
			return a in O ? O[a] : a
		}
		a || (a = {});
		a = f.extend(!0, {
			autoClose: !1,
			format: "YYYY-MM-DD",
			separator: " - ",
			language: "auto",
			startOfWeek: "sunday",
			getValue: function() {
				return f(this).val()
			},
			setValue: function(a) {
				f(this).attr("readonly") || f(this).is(":disabled") || f(this).val(a)
			},
			startDate: !1,
			endDate: !1,
			time: {
				enabled: !1
			},
			minDays: 0,
			maxDays: 0,
			showShortcuts: !0,
			shortcuts: {
				"next-days": [3, 5, 7],
				next: ["week", "month", "year"]
			},
			customShortcuts: [],
			inline: !1,
			container: "body",
			alwaysOpen: !1,
			singleDate: !1,
			lookBehind: !1,
			batchMode: !1,
			duration: 200,
			stickyMonths: !1,
			dayDivAttrs: [],
			dayTdAttrs: [],
			applyBtnClass: ""
		}, a);
		a.start = !1;
		a.end = !1;
		a.startDate && "string" == typeof a.startDate && (a.startDate = d(a.startDate, a.format).toDate());
		a.endDate && "string" == typeof a.endDate && (a.endDate = d(a.endDate, a.format).toDate());
		var O = function() {
				if ("auto" == a.language) {
					var c = navigator.language ? navigator.language : navigator.browserLanguage;
					if (!c) return f.dateRangePickerLanguages.en;
					var c = c.toLowerCase(),
						b;
					for (b in f.dateRangePickerLanguages) if (-1 != c.indexOf(b)) return f.dateRangePickerLanguages[b];
					return f.dateRangePickerLanguages.en
				}
				return a.language && a.language in f.dateRangePickerLanguages ? f.dateRangePickerLanguages[a.language] : f.dateRangePickerLanguages.en
			}(),
			e, v = !1,
			m = this,
			z = f(m).get(0);
		f(this).unbind(".datepicker").bind("click.datepicker", function(c) {
			var b = e.is(":visible");
			f(document).trigger("click.datepicker");
			c.stopPropagation();
			b || F(a.duration)
		});
		(function() {
			var c = this;
			if (f(this).data("date-picker-opened")) u();
			else {
				f(this).data("date-picker-opened", !0);
				e = Q().hide();
				f(a.container).append(e);
				a.inline ? e.addClass("inline-wrapper").css({
					position: "static"
				}) : C();
				a.alwaysOpen && e.find(".apply-btn").hide();
				var b = a.defaultTime ? a.defaultTime : new Date;
				a.lookBehind ? (a.startDate && 0 > r(b, a.startDate) && (b = n(d(a.startDate).toDate())), a.endDate && 0 < r(b, a.endDate) && (b = d(a.endDate).toDate()), l(t(b), "month1"), l(b, "month2")) : (a.startDate && 0 > r(b, a.startDate) && (b = d(a.startDate).toDate()), a.endDate && 0 < r(n(b), a.endDate) && (b = t(d(a.endDate).toDate())), l(b, "month1"), l(n(b), "month2"));
				a.time.enabled && (a.startDate && a.endDate || a.start && a.end ? (D(d(a.start || a.startDate).toDate(), "time1"), D(d(a.end || a.endDate).toDate(), "time2")) : (D(b, "time1"), D(b, "time2")));
				b = "";
				b = a.singleDate ? k("default-single") : a.minDays && a.maxDays ? k("default-range") : a.minDays ? k("default-more") : a.maxDays ? k("default-less") : k("default-default");
				e.find(".default-top").html(b.replace(/\%d/, a.minDays).replace(/\%d/, a.maxDays));
				setTimeout(function() {
					v = !0
				}, 0);
				e.click(function(a) {
					a.stopPropagation()
				});
				f(document).bind("click.datepicker", u);
				e.find(".next").click(function() {
					if (a.stickyMonths) {
						var c = n(a.month1),
							b = n(a.month2);
						E(b) || !a.singleDate && 0 <= r(c, b) || (l(c, "month1"), l(b, "month2"))
					} else b = (c = f(this).parents("table").hasClass("month2")) ? a.month2 : a.month1, b = n(b), !a.singleDate && !c && 0 <= r(b, a.month2) || E(b) || (l(b, c ? "month2" : "month1"), x())
				});
				e.find(".prev").click(function() {
					if (a.stickyMonths) {
						var c = t(a.month1),
							b = t(a.month2);
						E(c) || !a.singleDate && 0 >= r(b, c) || (l(b, "month2"), l(c, "month1"))
					} else b = (c = f(this).parents("table").hasClass("month2")) ? a.month2 : a.month1, b = t(b), c && 0 >= r(b, a.month1) || E(b) || (l(b, c ? "month2" : "month1"), x())
				});
				e.bind("click", function(c) {
					if (f(c.target).hasClass("day") && (c = f(c.target), !c.hasClass("invalid"))) {
						var b = c.attr("time");
						c.addClass("checked");
						a.singleDate ? (a.start = b, a.end = !1, a.time.enabled && J("start", a.start)) : "week" === a.batchMode ? "monday" === a.startOfWeek ? (a.start = d(parseInt(b)).startOf("isoweek").valueOf(), a.end = d(parseInt(b)).endOf("isoweek").valueOf()) : (a.end = d(parseInt(b)).endOf("week").valueOf(), a.start = d(parseInt(b)).startOf("week").valueOf()) : "month" === a.batchMode ? (a.start = d(parseInt(b)).startOf("month").valueOf(), a.end = d(parseInt(b)).endOf("month").valueOf()) : a.start && a.end || !a.start && !a.end ? (a.start = K(b), a.end = !1, a.time.enabled && J("start", a.start)) : a.start && (a.end = L(b), a.time.enabled && J("end", a.end));
						!a.singleDate && a.start && a.end && a.start > a.end && (c = a.end, a.end = L(a.start), a.start = K(c), a.time.enabled && (w("time1", a.start), w("time2", a.end)));
						a.start = parseInt(a.start);
						a.end = parseInt(a.end);
						A();
						y();
						B();
						H()
					}
				});
				e.attr("unselectable", "on").css("user-select", "none").bind("selectstart", function(a) {
					a.preventDefault();
					return !1
				});
				e.find(".apply-btn").click(function() {
					u();
					var b = q(new Date(a.start)) + a.separator + q(new Date(a.end));
					f(c).trigger("datepicker-apply", {
						value: b,
						date1: new Date(a.start),
						date2: new Date(a.end)
					})
				});
				e.find("[custom]").click(function() {
					var b = f(this).attr("custom");
					a.start = !1;
					a.end = !1;
					e.find(".day.checked").removeClass("checked");
					a.setValue.call(z, b);
					A();
					y(!0);
					B();
					a.autoClose && u()
				});
				e.find("[shortcut]").click(function() {
					var b = f(this).attr("shortcut"),
						c = new Date,
						d = !1;
					if (-1 != b.indexOf("day")) b = parseInt(b.split(",", 2)[1], 10), d = new Date((new Date).getTime() + 864E5 * b), c = new Date(c.getTime() + 864E5 * (0 < b ? 1 : -1));
					else if (-1 != b.indexOf("week")) {
						b = -1 != b.indexOf("prev,") ? -1 : 1;
						d = 1 == b ? "monday" == a.startOfWeek ? 1 : 0 : "monday" == a.startOfWeek ? 0 : 6;
						for (c = new Date(c.getTime() - 864E5); c.getDay() != d;) c = new Date(c.getTime() + 864E5 * b);
						d = new Date(c.getTime() + 5184E5 * b)
					} else if (-1 != b.indexOf("month")) b = -1 != b.indexOf("prev,") ? -1 : 1, d = 1 == b ? n(c) : t(c), d.setDate(1), c = n(d), c.setDate(1), c = new Date(c.getTime() - 864E5);
					else if (-1 != b.indexOf("year")) b = -1 != b.indexOf("prev,") ? -1 : 1, d = new Date, d.setFullYear(c.getFullYear() + b), d.setMonth(0), d.setDate(1), c.setFullYear(c.getFullYear() + b), c.setMonth(11), c.setDate(31);
					else if ("custom" == b) {
						var e = f(this).html();
						if (a.customShortcuts && 0 < a.customShortcuts.length) for (var k = 0; k < a.customShortcuts.length; k++) if (b = a.customShortcuts[k], b.name == e) {
							e = [];
							(e = b.dates.call()) && 2 == e.length && (d = e[0], c = e[1]);
							e && 1 == e.length && (movetodate = e[0], l(movetodate, "month1"), l(n(movetodate), "month2"), x());
							break
						}
					}
					d && c && (G(d, c), A())
				});
				e.find(".time1 input[type=range]").bind("change mousemove", function(a) {
					var b = a.target;
					a = "hour" == b.name ? f(b).val().replace(/^(\d{1})$/, "0$1") : void 0;
					b = "minute" == b.name ? f(b).val().replace(/^(\d{1})$/, "0$1") : void 0;
					I("time1", a, b)
				});
				e.find(".time2 input[type=range]").bind("change mousemove", function(a) {
					var b = a.target;
					a = "hour" == b.name ? f(b).val().replace(/^(\d{1})$/, "0$1") : void 0;
					b = "minute" == b.name ? f(b).val().replace(/^(\d{1})$/, "0$1") : void 0;
					I("time2", a, b)
				})
			}
		}).call(this);
		a.alwaysOpen && F(0);
		f(this).data("dateRangePicker", {
			setDateRange: function(c, b) {
				"string" == typeof c && "string" == typeof b && (c = d(c, a.format).toDate(), b = d(b, a.format).toDate());
				G(c, b)
			},
			clear: function() {
				a.start = !1;
				a.end = !1;
				e.find(".day.checked").removeClass("checked");
				a.setValue.call(z, "");
				A();
				y();
				B()
			},
			close: u,
			open: F,
			getDatePicker: function() {
				return e
			},
			destroy: function() {
				f(m).unbind(".datepicker");
				f(m).data("dateRangePicker", "");
				e.remove();
				f(window).unbind("resize.datepicker", C);
				f(document).unbind("click.datepicker", u)
			}
		});
		f(window).bind("resize.datepicker", C);
		return this
	}
});