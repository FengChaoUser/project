(function(c, e, b) {
	var a = b(c, e);
	c.util = c.util || {};
	c.util.toucher = c.util.toucher || a;
	c.define && define(function(g, f, h) {
		return a
	})
})(this, document, function(g, j) {
	function e(l, k) {
		return l.className.match(new RegExp("(\\s|^)" + k + "(\\s|$)"))
	}

	function b(s, r, q) {
		this._events = this._events || {};
		var n, p;
		if (typeof(r) == "string") {
			n = r.replace(/^\./, "");
			p = q
		} else {
			n = null;
			p = r
		}
		if (typeof(p) == "function" && s && s.length) {
			var k = s.split(/\s+/);
			for (var l = 0, o = k.length; l < o; l++) {
				var m = k[l];
				if (!this._events[m]) {
					this._events[m] = []
				}
				this._events[m].push({
					className: n,
					fn: p
				})
			}
		}
		return this
	}

	function h(n, o) {
		this._events = this._events || {};
		if (!this._events[n]) {
			return
		}
		var k = this._events[n];
		var p = o.target;
		while (1) {
			if (k.length == 0) {
				return
			}
			if (p == this.dom || !p) {
				for (var m = 0, r = k.length; m < r; m++) {
					var l = k[m]["className"];
					var s = k[m]["fn"];
					if (l == null) {
						f(n, s, p, o)
					}
				}
				return
			}
			var q = k;
			k = [];
			for (var m = 0, r = q.length; m < r; m++) {
				var l = q[m]["className"];
				var s = q[m]["fn"];
				if (e(p, l)) {
					if (f(n, s, p, o) == false) {
						return
					}
				} else {
					k.push(q[m])
				}
			}
			p = p.parentNode
		}
	}

	function f(l, m, p, o) {
		var q = o.touches.length ? o.touches[0] : {};
		var n = {
			type: l,
			target: o.target,
			pageX: q.clientX || 0,
			pageY: q.clientY || 0
		};
		if (l == "swipe" && o.startPosition) {
			n.startX = o.startPosition.pageX, n.startY = o.startPosition.pageY, n.moveX = n.pageX - n.startX, n.moveY = n.pageY - n.startY
		}
		var k = m.call(p, n);
		if (k == false) {
			o.preventDefault();
			o.stopPropagation()
		}
		return k
	}

	function i(l, k, n, m) {
		return Math.abs(l - k) >= Math.abs(n - m) ? (l - k > 0 ? "Left" : "Right") : (n - m > 0 ? "Up" : "Down")
	}

	function a(z) {
		var s = this;
		var q = 0;
		var k = 0;
		var m, v, l, t;
		var r;
		var y;
		var x = false;
		var u = null;

		function n(A) {
			x = false;
			clearTimeout(y);
			clearTimeout(r)
		}

		function o(A) {
			u = A;
			m = A.touches[0].pageX;
			v = A.touches[0].pageY;
			l = 0;
			t = 0;
			x = true;
			q = new Date();
			h.call(s, "swipeStart", A);
			clearTimeout(y);
			y = setTimeout(function() {
				n(A);
				h.call(s, "longTap", A)
			}, 500)
		}

		function w(B) {
			h.call(s, "swipeEnd", u);
			if (!x) {
				return
			}
			var A = new Date();
			if (A - k > 260) {
				r = setTimeout(function() {
					n();
					h.call(s, "singleTap", u)
				}, 250)
			} else {
				clearTimeout(r);
				n(B);
				h.call(s, "doubleTap", u)
			}
			k = A
		}

		function p(B) {
			u = B;
			B.startPosition = {
				pageX: m,
				pageY: v
			};
			h.call(s, "swipe", B);
			if (!x) {
				return
			}
			l = B.touches[0].pageX;
			t = B.touches[0].pageY;
			if (Math.abs(m - l) > 2 || Math.abs(v - t) > 2) {
				var A = i(m, l, v, t);
				h.call(s, "swipe" + A, B)
			} else {
				n(B);
				h.call(s, "singleTap", B)
			}
			n(B)
		}
		z.addEventListener("touchstart", o);
		z.addEventListener("MSPointerDown", o);
		z.addEventListener("pointerdown", o);
		z.addEventListener("touchend", w);
		z.addEventListener("MSPointerUp", w);
		z.addEventListener("pointerup", w);
		z.addEventListener("touchmove", p);
		z.addEventListener("MSPointerMove", p);
		z.addEventListener("pointermove", p);
		z.addEventListener("touchcancel", n);
		z.addEventListener("MSPointerCancel", n);
		z.addEventListener("pointercancel", n)
	}

	function c(k, l) {
		var l = l || {};
		this.dom = k;
		a.call(this, this.dom)
	}
	c.prototype.on = b;
	return function(k) {
		return new c(k)
	}
});
(function(c, e) {
	var h = e(".banner"),
		o = h.find(".banner-ctrl li"),
		s = [],
		g = [],
		u = [],
		l = true,
		r = false,
		p = -1,
		n = -1,
		a, f, m, q, k, b = false;
	if (h.length == 0) {
		return
	}
	var t = {
		switchType: 1,
		_init: function() {
			var x = this,
				v = 200;
			h.find(".banner-pic ul").each(function(y) {
				s.push([]);
				e(this).find("li").each(function() {
					s[y].push(e(this))
				})
			});
			o.each(function(y) {
				var z = e(this);
				g.push([]);
				z.find(".ctrl-dot i").each(function() {
					g[y].push(e(this))
				});
				u.push([]);
				z.find(".title-list p").each(function() {
					u[y].push(e(this))
				})
			});
			if (o.filter("[data-rec]").size() == 0) {
				var j = Math.floor(Math.random() * s.length),
					i = Math.floor(Math.random() * s[j].length);
				x.select(j, i, 1)
			} else {
				var w = Math.floor(Math.random() * s[0].length);
				x.select(0, w, 1)
			}
			h.on("click", ".banner-next", function() {
				x.switchType = 0;
				x.next(2)
			});
			h.on("click", ".banner-prev", function() {
				x.switchType = 0;
				x.prev(2)
			});
			h.on("mouseenter", ".banner-ctrl li", function() {
				var y = e(this);
				clearTimeout(q);
				m = setTimeout(function() {
					x.switchType = 0;
					o.removeClass("current mouse-hover");
					y.addClass("current mouse-hover").find(".title-item").slideDown();
					x.select(y.index(), 0, 3)
				}, v)
			});
			h.on("mouseleave", ".banner-ctrl li", function() {
				clearTimeout(m)
			});
			h.on("mouseleave", ".banner-ctrl", function() {
				var y = e(this);
				clearTimeout(m);
				q = setTimeout(function() {
					o.removeClass("mouse-hover")
				}, v)
			});
			h.on("mouseenter", ".title-list p", function() {
				var y = e(this);
				a = setTimeout(function() {
					y.addClass("now").siblings().removeClass("now");
					x.select(y.parents("li").index(), y.index(), 3)
				}, v)
			});
			h.on("mouseleave", ".title-list p", function() {
				clearTimeout(a)
			});
			h.on("mouseenter mousemove", function() {
				r = true;
				x._pauseAuto()
			});
			h.on("mouseleave", function() {
				r = false;
				if (x.isInScreen()) {
					x._startAuto()
				}
			});
			if (x.isInScreen()) {
				x._startAuto();
				b = true
			}
			e(window).scroll(function() {
				if (x.isInScreen() && b == false) {
					b = true;
					r = false;
					x._startAuto()
				} else {
					if (!x.isInScreen() && b == true) {
						b = false;
						r = true;
						x._pauseAuto()
					}
				}
			});
			e(document).keyup(function(y) {
				if (x.isInScreen()) {
					if (y.which == 37 || y.which == 75) {
						x.switchType = 0;
						x.prev(2)
					}
					if (y.which == 39 || y.which == 74) {
						x.switchType = 0;
						x.next(2)
					}
					if (!r) {
						x._pauseAuto();
						x._startAuto()
					}
				}
			})
		},
		_startAuto: function() {
			var i = this;
			f = setInterval(function() {
				i.next(1)
			}, 3000)
		},
		_pauseAuto: function() {
			clearInterval(f)
		},
		select: function(j, i, w) {
			if (p == j && n == i) {
				return
			}
			if (l) {
				e(".banner").css("background", "none");
				l = false
			}
			if (p >= 0 && n >= 0) {
				s[p][n].stop().fadeOut(500);
				if (p != j) {
					o.eq(p).removeClass("current mouse-hover")
				}
				g[p][n].removeClass("on");
				u[p][n].removeClass("now")
			}
			s[j][i].fadeIn(500).find("img[data-src]").attr("src", function() {
				return e(this).attr("data-src")
			}).removeAttr("data-src");
			if (p != j) {
				o.eq(j).addClass("current")
			}
			g[j][i].addClass("on");
			u[j][i].addClass("now");
			k = s[j][i].attr("cptId");
			if (k) {
				try {
					apsAdboardCptPvObj.aps_adboard_loadAdCptPv(k)
				} catch (x) {}
			}
			p = j;
			n = i;
			if (window.saExportUtil) {
				var v = s[p][n].children("a").attr("expo");
				switch (w) {
					case 1:
						saExportUtil.adverCarousel(v);
						break;
					case 2:
						saExportUtil.adverClick(v);
						break;
					case 3:
						saExportUtil.sendCustomExpoData(v, 2);
						break
				}
			}
		},
		next: function(v) {
			var w = this,
				j, i;
			if (s[p][n + 1]) {
				if (w.switchType) {
					if (o.eq(p).attr("data-rec")) {
						j = p;
						i = n + 1
					} else {
						j = p == (s.length - 1) ? 0 : (p + 1);
						i = 0
					}
				} else {
					j = p;
					i = n + 1
				}
			} else {
				j = p == (s.length - 1) ? 0 : (p + 1);
				i = 0
			}
			this.select(j, i, v)
		},
		prev: function(v) {
			var w = this,
				j, i;
			if (s[p][n - 1]) {
				if (w.switchType) {
					if (o.eq(p).attr("data-rec")) {
						j = p;
						i = n - 1
					} else {
						j = p == 0 ? (s.length - 1) : (p - 1);
						i = 0
					}
				} else {
					j = p;
					i = n - 1
				}
			} else {
				j = p == 0 ? (s.length - 1) : (p - 1);
				if (w.switchType && !o.eq(j).attr("data-rec")) {
					i = 0
				} else {
					i = s[j].length - 1
				}
			}
			this.select(j, i, v)
		},
		isInScreen: function() {
			if (h.length > 0) {
				return (e(c).scrollTop() + e(window).height() - 100 > h.offset().top) && (h.offset().top + h.height() - 100 > e(c).scrollTop())
			}
		}
	};
	c.Banner = t;
	e(function() {
		c.Banner._init()
	})
})(window, jQuery);
var index = index || {};
index.priceDOM = new Array();
index.getPriceFlag = false;
index.getCity = function(a) {
	SFE.base.getCity(function(b) {
		if (a && $.isFunction(a)) {
			a(b)
		}
	})
};
index.baoguang = function(a) {
	if (a) {
		if (typeof _analyseExpoTags == "function") {
			_analyseExpoTags("a", a)
		} else {
			setTimeout(function() {
				index.baoguang(a)
			}, 2000)
		}
	}
};
index.getPrice = function(b) {
	index.getPriceFlag = true;
	var a = index.priceDOM[0];
	$.ajax({
		url: "http://" + sn.domain + sn.context + "/priceService_" + b + "_" + a.attr("data-sku") + "_1_priceServiceCallBack_.html",
		cache: true,
		dataType: "jsonp",
		jsonp: false,
		jsonpCallback: "priceServiceCallBack",
		timeout: 3000,
		error: function(c, f, e) {},
		success: function(e) {
			if (e && e != "" && e.price && e.price.length > 0) {
				var f = e.price[0].promotionPrice.toString();
				if (f.indexOf(".") <= -1) {
					f += ".00"
				}
				var g = f.split(".")[0];
				var c = f.split(".")[1];
				if (c.length != 2) {
					c += "0"
				}
				$(a).find(".price").html("<i>¥</i><span><b>" + g + "</b>." + c + "</span>")
			}
			index.priceDOM.shift();
			if (index.priceDOM.length > 0) {
				index.getPrice(b)
			} else {
				index.getPriceFlag = false
			}
		}
	})
};
index.downShiftFlag = false;
index.baseObj = {
	id: "",
	name: "",
	trickPoint: "",
	vendorCode: "",
	partNumber: "",
	linkType: "1",
	shopPicUrl: "/b2c/catentries/000000000",
	floorNum: ""
};
index.data = {
	data: []
};
(function() {
	var b = {};
	index.tmpl = function a(f, e) {
		var c = !/\W/.test(f) ? b[f] = b[f] || a(document.getElementById(f).innerHTML) : new Function("obj", "var p=[],print=function(){p.push.apply(p,arguments);};with(obj){p.push('" + f.replace(/[\r\t\n]/g, " ").split("<%").join("\t").replace(/((^|%>)[^\t]*)'/g, "$1\r").replace(/\t=(.*?)%>/g, "',$1,'").split("\t").join("');").split("%>").join("p.push('").split("\r").join("\\'") + "');}return p.join('');");
		return e ? c(e) : c
	}
})();
index.getUrl = function(h, e) {
	var b = "";
	if (h.trickPoint && h.trickPoint.length > 0) {
		b = "?srcPoint=" + h.trickPoint
	}
	if (h.linkUrl && h.linkUrl != "") {
		if (h.linkUrl.indexOf("http://") == 0) {
			return h.linkUrl + b
		} else {
			return "http://" + h.linkUrl + b
		}
	} else {
		var c = h.linkType;
		var a = h.vendorCode;
		var f = h.partNumber;
		var g = sn.productDomain;
		if (g.substring(g.length - 1) != "/") {
			g = g + "/"
		}
		if (null != e) {
			if (a && a.length > 0) {
				return g + a + "/" + f + ".html?srcPoint=" + e + "&src=" + e
			} else {
				return g + f + ".html?srcPoint=" + e + "&src=" + e
			}
		} else {
			if (a && a.length > 0) {
				return g + a + "/" + f + ".html" + b
			} else {
				return g + f + ".html" + b
			}
		}
	}
};
index.getPic = function(f, b) {
	var c = sn.imgHost;
	if (c.substring(c.length - 1) != "/") {
		c = c + "/"
	}
	if (f.picUrl && f.picUrl != "") {
		return c + f.picUrl
	} else {
		var e = f.shopPicUrl;
		var a = "1";
		if (!b) {
			b = "120x120"
		}
		if (c) {
			e = e.substring(1)
		}
		return c + e + f.partNumber + "_" + a + "_" + b + ".jpg"
	}
};
index.getSku = function(f) {
	var c = f.partNumber + "|1|";
	var e = "";
	var b = f.linkType;
	var a = f.vendorCode;
	if (b && b != "1") {
		if (b == "2") {
			e = "4|"
		} else {
			if (b == "3") {
				e = "5|"
			} else {
				if (b == "4") {
					e = "6|"
				} else {
					if (b == "5") {
						e = "7|"
					} else {
						if (b == "6") {
							e = "8|"
						} else {
							if (b == "7") {
								e = "9|"
							}
						}
					}
				}
			}
		}
	} else {
		if (a && a != "") {
			if (a == "0000000000") {
				e = "3|"
			} else {
				e = "2|" + f.vendorCode
			}
		} else {
			e = "|"
		}
	}
	return 'data-sku="' + c + e + '"'
};
index.getId = function(f, c) {
	var h = "";
	var g = "0000000000";
	var e = f.trickPoint;
	if (e && "" != e) {
		var b = e.indexOf("rec");
		var a = "";
		if (-1 != b) {
			a = e.substring(b)
		}
		if (f.vendorCode && f.vendorCode.length > 0) {
			g = f.vendorCode
		}
		h = "baoguang_" + a + "-" + c + "_" + g + "_" + f.partNumber + "_0"
	}
	return h
};
index.getTrickForPic = function(g, f, a) {
	var b = "";
	var e = g.partnumber;
	if (!e) {
		e = g.partNumber
	}
	if (e && e.length > 9) {
		e = e.substring(9)
	}
	var c = "c";
	if (a) {
		c = "p"
	}
	var h = "0000000000";
	if (g.vendorCode && g.vendorCode.length > 0) {
		h = g.vendorCode
	}
	b = g.trickPoint + "-" + f + "_" + c + "_" + h + "_" + e + "_0";
	return b
};
index.getExpo = function(g, f) {
	var a = "";
	var c = g.partnumber;
	if (!c) {
		c = g.partNumber
	}
	if (c && c.length > 9) {
		c = c.substring(9)
	}
	var h = "0000000000";
	if (g.vendorCode && g.vendorCode.length > 0) {
		h = g.vendorCode
	}
	var e = g.floorNum;
	var b = "";
	if (f > 9) {
		b = f
	} else {
		b = "0" + f
	}
	a = "index_lcsp0" + e + "" + b + ":" + h + "|" + c;
	return a
};
index.getJsonObj = function(f, c, e) {
	var i = index.getTrickForPic(f, c, true);
	var a = index.getUrl(f, i);
	var h = index.getPic(f);
	var j = index.getSku(f);
	var b = index.getId(f, c);
	var g = index.getTrickForPic(f, c, false);
	var l = index.getExpo(f, c);
	var k = {
		id: b,
		name: f.name,
		href: a,
		trickPoint: f.trickPoint,
		trickPointT: g,
		trickPointP: i,
		pic: h,
		sku: j,
		expo: l
	};
	return k
};
index.load = function() {
	var e = index.data.data;
	var c = index.lazyLoadArr[0];
	var b = "jsModel";
	var f = $(c).attr("jsModelId");
	if (c && f && f.length > 0) {
		b = $(c).attr("jsModelId")
	}
	if (e.length > 0) {
		var a = index.tmpl(b, index.data);
		$(c).html('<script type="text/html">' + a + "<\/script>")
	}
};
index.checkSmart = function() {
	$.ajax({
		url: sn.smartDomain + "/iss/turingShelf/ajaxIsNormalLevel_index.lazyLoadSmart.html",
		async: false,
		cache: false,
		type: "GET",
		dataType: "jsonp",
		jsonp: index.lazyLoadSmart,
		success: function(a) {}
	})
};
index.lazyLoadSmart = function(c, f) {
	index.downShiftFlag = c;
	var a = index.lazyLoadArr[0];
	var g = "";
	var i = sn.cityId;
	var j = "";
	var k = "";
	var e = $(a).attr("dataCode");
	var b = 10;
	if (c == "h") {
		j = d("custno");
		k = d("_snma");
		if (k && k.length > 0) {
			var h = k.split("_");
			if (h.legnth > 2) {
				k = h[1]
			} else {
				k = ""
			}
		} else {
			k = ""
		}
	} else {
		if (c == "l") {
			return false
		}
	}
	$.ajax({
		url: sn.smartDomain + "/iss/turingShelf/ajaxGetShelfItem_" + e + "_" + b + "_" + g + "_" + i + "_" + j + "_" + k + "_smartCb.html",
		cache: true,
		async: false,
		type: "GET",
		jsonp: false,
		jsonpCallback: "smartCb",
		dataType: "jsonp",
		error: function(l, n, m) {},
		success: function(l) {}
	})
};
var smartCb = function(e) {
	var a = index.lazyLoadArr[0];
	var c = $(a).attr("trickPoint");
	var b = $(a).attr("floorNum");
	if (e && e.success && e.shelfInfo) {
		var h = e.shelfInfo;
		var k = e.vendor;
		if (h.itemList && h.itemList.length > 0) {
			var j = new Array();
			for (var f = 0; f < h.itemList.length; f++) {
				var m = h.itemList[f];
				var l = m.partnumber;
				if (l && l.length > 9) {
					l = l.substring(9)
				}
				var g = f + 1;
				if (f < 9) {
					g = "0" + g
				}
				index.baseObj.name = m.itemName;
				index.baseObj.trickPoint = c;
				index.baseObj.vendorCode = k;
				index.baseObj.partNumber = l;
				index.baseObj.floorNum = b;
				j.push(index.getJsonObj(index.baseObj, f + 1, true))
			}
			index.data.data = j
		}
	} else {
		index.data.data = []
	}
	index.lazyLoadCallBack()
};
index.lazyLoadArr = new Array();
index.lazyLoadStatus = false;
index.lazyLoadCallBack = function() {
	index.load();
	index.lazyLoadArr.shift();
	if (index.lazyLoadArr.length > 0) {
		index.lazyLoadData(sn.cityId)
	} else {
		index.lazyLoadStatus = false
	}
};
index.lazyLoadData = function(a) {
	if (index.lazyLoadArr.length > 0) {
		if (index.downShiftFlag) {
			index.lazyLoadSmart(index.downShiftFlag, a)
		} else {
			index.checkSmart()
		}
	}
};
index.lazyLoadInit = function(a, b) {
	index.lazyLoadArr.push(a);
	if (!index.lazyLoadStatus) {
		index.lazyLoadStatus = true;
		index.lazyLoadData(b)
	}
};
index.getFloorNum = function() {
	var c = $(".floor");
	var a = c.length;
	for (var b = 0; b < a; b++) {
		c.eq(b).addClass("J-floor" + (b + 1))
	}
};
index.ieVersion = function(c) {
	var a = document.createElement("b");
	a.innerHTML = "<!--[if IE " + c + "]><i></i><![endif]-->";
	return a.getElementsByTagName("i").length === 1
};
index.isInScreen = function(b) {
	var a = b;
	if (a.length > 0) {
		return ($(window).scrollTop() + $(window).height() > a.offset().top) && a.offset().top + a.height() > $(window).scrollTop()
	}
};
index.topActive = function() {
	var f = $("#__TOP_ACTIVE__"),
		e = f.find(".top-active-wrap"),
		b = e.find("img"),
		a = parseInt(e.attr("data-height")),
		c = f.find(".btn"),
		g = true;
	f.on("click", ".btn", function() {
		var i = $(this);
		if (!i.hasClass("btn-open")) {
			c.removeClass("btn-close").addClass("btn-open").attr({
				title: "打开",
				name: "打开埋点值"
			});
			if (a > 0) {
				e.stop(true).animate({
					height: 0
				}, 200)
			} else {
				e.hide()
			}
		} else {
			c.removeClass("btn-open").addClass("btn-close").attr({
				title: "关闭",
				name: "关闭埋点值"
			});
			if (a > 0) {
				e.stop(true).animate({
					height: a
				}, 200)
			} else {
				e.show().css("height", "auto")
			}
		}
		var h = new Date();
		h.setTime(h.getTime() + 12 * 60 * 60 * 1000);
		if (g) {
			g = false;
			document.cookie = "topActiveStatus=true;expires=" + h
		}
	})
};
index.SetCookie = function(c, e, a) {
	var b = new Date;
	b.setTime(b.getTime() + a * 24 * 60 * 60 * 1000);
	document.cookie = c + "=" + escape(e) + ";expires=" + b
};
index.getCookie = function(e) {
	var c;
	return (c = document.cookie.match(new RegExp("(^| )" + e + "=([^;]*)(;|$)"))) ? decodeURIComponent(c[2].replace(/\+/g, "%20")) : null
};
index.ABTest = function() {
	var a, b = Math.floor(Math.random() * 2 + 1);
	a = index.getCookie("version");
	if (!a) {
		index.SetCookie("version", b, 30)
	}
};
index.recmdActive = function() {
	var j = $(".recmd-active"),
		c = j.find(".btn"),
		i = j.find(".bg"),
		f = true,
		e, h = false,
		g = false,
		k = bigscreen ? 1190 : 990;
	if (index.ieVersion(6) || j.length == 0) {
		return
	}
	var m = index.getCookie("recmdActive"),
		l = bigscreen ? 595 : 495,
		b;

	function n() {
		e = Math.ceil($(document).width() / 2 - l < 0 ? 0 : $(document).width() / 2 - l)
	}
	n();
	$(window).bind("scroll resize", function() {
		n()
	});
	if (!m) {
		h = true
	}

	function a() {
		if (h) {
			j.show().stop(true).animate({
				left: e
			}, 600);
			c.removeClass("btn-open").addClass("btn-close").attr({
				title: "收起",
				name: "收起按钮的埋点值"
			});
			i.fadeOut()
		}
	}
	a();
	$(window).bind("resize", function() {
		if (h && c.hasClass("btn-close")) {
			j.css("left", e)
		}
	});
	j.on("click", ".btn", function() {
		g = true;
		clearTimeout(b);
		var o = $(this);
		if (o.hasClass("btn-open")) {
			i.fadeOut();
			c.removeClass("btn-open").addClass("btn-close").attr({
				title: "收起",
				name: "收起按钮的埋点值"
			});
			j.stop(true).animate({
				left: e
			}, 300)
		} else {
			i.fadeIn();
			c.removeClass("btn-close").addClass("btn-open").attr({
				title: "展开",
				name: "展开按钮的埋点值"
			});
			j.stop(true).animate({
				left: -k
			}, 300)
		}
	});
	if (f) {
		f = false;
		index.SetCookie("recmdActive", true, 5)
	}
	if (!g && c.hasClass("btn-close")) {
		b = setTimeout(function() {
			i.fadeIn();
			c.removeClass("btn-close").addClass("btn-open").attr({
				title: "展开",
				name: "展开按钮的埋点值"
			});
			j.stop(true).animate({
				left: -k
			}, 300)
		}, 7000)
	}
};
index.newUser = function() {
	var b = $(".new-user"),
		c, a = function() {
			var g = $(".dialog-overlay"),
				f = b.find(".close"),
				e = $(document).height();
			g.css("height", e);
			b.show();
			g.show();
			f.click(function() {
				g.hide();
				b.hide()
			});
			index.setData("newUserDialog", new Date().getTime() + 600000)
		};
	if (index.ieVersion(6) || b.length == 0) {
		return
	}
	if (index.getCookie("logonStatus")) {
		return
	}
	if (!index.getCookie("idsLoginUserIdLastTime")) {
		if (window.localStorage) {
			c = parseInt(index.getData("newUserDialog"));
			if (!c || c < new Date().getTime()) {
				a()
			}
		} else {
			a()
		}
	}
};
index.activeDialog = function() {
	index.recmdActive();
	var a = index.getCookie("recmdActive");
	if (!a) {
		index.newUser()
	}
};
index.switchBtn = function(b, a) {
	$(b).hover(function() {
		$(a).stop(true, true).fadeIn("fast")
	}, function() {
		$(a).stop(true, true).fadeOut("fast")
	})
};
index.announce = function() {
	if (bigscreen) {
		return
	}
	var c = $(".show-case"),
		e = c.find(".up-title"),
		b = c.find(".box-all"),
		a = c.find(".btn");
	a.click(function(f) {
		var g = $(this);
		if (g.hasClass("btn-down")) {
			e.hide();
			a.removeClass("btn-down").addClass("btn-up");
			b.show().css("height", 41).stop(true).animate({
				height: 430
			}, 300)
		} else {
			a.removeClass("btn-up").addClass("btn-down");
			b.stop(true).animate({
				height: 41
			}, 300, function() {
				b.hide();
				e.show()
			})
		}
		f.stopPropagation()
	});
	e.click(function(f) {
		e.hide();
		a.removeClass("btn-down").addClass("btn-up");
		b.show().css("height", 41).stop(true).animate({
			height: 430
		}, 300);
		f.stopPropagation()
	});
	c.click(function(f) {
		f.stopPropagation()
	});
	$(document).click(function() {
		a.removeClass("btn-up").addClass("btn-down");
		b.hide();
		e.show()
	})
};
index.floorTab = function() {
	var b = $(".floor"),
		a = b.find(".tab li"),
		c = null;
	a.hover(function() {
		var f = $(this),
			e = f.index();
		c = setTimeout(function() {
			f.addClass("on").siblings().removeClass("on");
			f.parents(".floor").find(".main-col").hide().eq(e).show();
			var g = f.parents(".floor").find(".main-col").hide().eq(e).show();
			lazyelem.detect();
			if (g.children("script").length == 0) {
				cpmRequire(g)
			}
		}, 200)
	}, function() {
		clearTimeout(c)
	})
};
index.picOpacity = function(e, b) {
	var c = $(e),
		a = b;
	c.on("mouseenter", "a img", function() {
		$(this).css("opacity", a)
	}).on("mouseleave", "a img", function() {
		$(this).css("opacity", 1)
	})
};
index.listloop = function(c) {
	var f = {
		wrap: "",
		loopBox: "",
		loopChild: "",
		triggerLeft: ".switch-prev",
		triggerRight: ".switch-next",
		curCount: "",
		totalCount: "",
		hasCount: false,
		isLoop: true,
		isLazyImg: false,
		isLazyDom: false,
		delay: 0,
		hasLabel: true,
		hasLabelObj: null,
		labelObj: null,
		isRandom: false
	};
	$.extend(f, c);
	var o = $(f.wrap),
		w = o.find(f.triggerLeft),
		b = o.find(f.triggerRight),
		z = o.find(f.loopBox),
		l = z.find(f.loopChild),
		j = f.step.wide,
		s = f.scrollWidth.wide,
		D = parseInt(l.length / j),
		k = l.length,
		p = o.find(f.curCount),
		F = o.find(f.totalCount),
		E = $(f.hasLabelObj),
		C = 0,
		H;
	if (!bigscreen) {
		j = f.step.narrow;
		s = f.scrollWidth.narrow;
		H = l.length % j;
		D = parseInt(l.length / j);
		k = l.length - H
	}
	f.hasCount && F.html(D);
	w.unbind().click(function() {
		u()
	});
	b.unbind().click(function() {
		v()
	});
	$(document).keyup(function(i) {
		if (index.isInScreen(b)) {
			if (i.which == 37 || i.which == 75) {
				u()
			}
			if (i.which == 39 || i.which == 74) {
				v()
			}
		}
	});
	if (!(!!window.ActiveXObject || "ActiveXObject" in window)) {
		if (o.length > 0) {
			var I = util.toucher(o[0]);
			I.on("swipeLeft", function() {
				v(C)
			}).on("swipeRight", function() {
				u(C)
			})
		}
	}
	var r = c.labelObj,
		e = "",
		m;
	if (r) {
		if (D <= 1) {
			r.hide()
		}
		r.find(".prev").unbind().click(function() {
			u()
		});
		r.find(".next").unbind().click(function() {
			v()
		});
		for (m = 0; m < D; m++) {
			e += "<li></li>"
		}
		r.find("ul").html(e).find("li").click(function() {
			C = $(this).index();
			y(false, C)
		}).first().addClass("current")
	}

	function v() {
		if (D == 1 || z.is(":animated")) {
			return false
		}
		if (!f.isLoop) {
			C++;
			if (C >= D) {
				C = D - 1
			}
			y(false, C);
			return
		}
		if (C == D - 1) {
			for (var i = 0; i < j; i++) {
				l.eq(i).css({
					position: "relative",
					left: D * s + "px"
				})
			}
		}
		C++;
		y(function() {
			if (C == D) {
				C = 0;
				l.removeAttr("style");
				z.css("left", C * s)
			}
		}, C)
	}

	function u() {
		if (D == 1 || z.is(":animated")) {
			return false
		}
		if (!f.isLoop) {
			C--;
			if (C <= 0) {
				C = 0
			}
			y(false, C);
			return
		}
		if (C == 0) {
			for (var i = 1; i <= j; i++) {
				l.eq(k - i).css({
					position: "relative",
					left: -D * s + "px"
				})
			}
		}
		C--;
		y(function() {
			if (C == -1) {
				C = D - 1;
				l.removeAttr("style");
				z.css("left", -C * s)
			}
		}, C)
	}

	function y(n, i) {
		g();
		q();
		if (f.hasCount) {
			if (i > D - 1) {
				i = 0
			}
			if (i < 0) {
				i = D - 1
			}
			p.html(i + 1)
		}
		if (!n) {
			n = function() {}
		}
		z.stop(true).animate({
			left: -C * s
		}, 300, n);
		t(C == D ? 0 : C);
		if (r) {
			r.find("li").removeClass("current").eq(C == D ? 0 : C).addClass("current")
		}
	}

	function g() {
		if (!f.isLazyDom) {
			return
		}
		var N = l.eq(C).find(".lazy-dom"),
			n = N.text(),
			M = n.length;
		if (M == 0) {
			return
		}
		var P = /\n+/g,
			L = /<!--.*?-->/ig,
			R = /\/\*.*?\*\//ig,
			J = /[ ]+</ig,
			O = n.replace(P, ""),
			Q = O.replace(L, ""),
			K = Q.replace(R, ""),
			i = K.replace(J, "<");
		N.before(i).remove()
	}

	function q() {
		if (!f.isLazyImg) {
			return
		}
		for (var n = 0; n < j; n++) {
			var i = l.eq(C * j + n).find("img[data-src3]");
			i.each(function() {
				var J = $(this);
				J.attr("src", J.attr("data-src3")).removeAttr("data-src3").addClass("err-product")
			})
		}
	}

	function B() {
		var J = [],
			n, K;
		J.push('<div class="banner-pager"><ul class="pager">');
		for (n = 1; n <= D; n++) {
			J.push("<li" + (n == 1 ? ' class="current"' : "") + "></li>")
		}
		J.push('</ul><i class="pager-radius"></i></div>');
		var i = $(J.join("")).appendTo(E);
		i.find("li").hover(function() {
			var L = $(this).index(),
				M = L * j,
				N = (L + 1) * j;
			K = setTimeout(function() {
				z.stop(true).animate({
					left: -L * s
				}, 300);
				t(L);
				if (f.hasCount) {
					p.html(L + 1)
				}
				C = L;
				if (f.isLazyImg) {
					for (var R = M; R < N; R++) {
						l.eq(R).find("img[data-src3]").each(function() {
							var aa = $(this);
							aa.attr("src", aa.attr("data-src3")).removeAttr("data-src3").addClass("err-product")
						})
					}
				}
				if (f.isLazyDom) {
					var V = l.eq(C).find(".lazy-dom"),
						P = V.text(),
						U = P.length;
					if (U == 0) {
						return
					}
					var X = /\n+/g,
						T = /<!--.*?-->/ig,
						Z = /\/\*.*?\*\//ig,
						Q = /[ ]+</ig,
						W = P.replace(X, ""),
						Y = W.replace(T, ""),
						S = Y.replace(Z, ""),
						O = S.replace(Q, "<");
					V.before(O).remove()
				}
			}, 100)
		}, function() {
			clearTimeout(K)
		})
	}

	function t(n) {
		o.find(".pager li").removeClass("current").eq(n).addClass("current")
	}
	if (f.hasLabel && D > 1) {
		B()
	}
	if (f.delay) {
		var h = setInterval(function() {
			v()
		}, f.delay);
		o.hover(function() {
			clearInterval(h)
		}, function() {
			h = setInterval(function() {
				v()
			}, f.delay)
		})
	}
	if (f.isRandom) {
		var a = Math.floor(Math.random() * D),
			G = a * j,
			A = (a + 1) * j;
		for (var x = G; x < A; x++) {
			z.find(f.loopChild).eq(x).find("img[data-src3]").each(function() {
				var i = $(this);
				i.attr("data-src2", i.attr("data-src3")).removeAttr("data-src3").addClass("err-product")
			})
		}
		z.stop(true).animate({
			left: -a * s
		}, 300);
		C = a
	}
	index.floatBar = function() {
		var n = {
			contents: null,
			align: "right",
			vertical: "middle",
			zIndex: 10000,
			css: null,
			id: null,
			ieFixed: true
		};
		var J = ($.browser.msie) ? parseInt($.browser.version) : false;
		if (arguments.length < 1 || !(arguments[0] instanceof Object)) {
			return $.error("ECode.floatBar: 参数必须为JSON对象")
		}
		$.extend(n, arguments[0]);
		var i = {
			position: "fixed",
			top: "-9999em",
			left: "-9999em"
		};
		if (J && J <= 6) {
			i.position = "absolute"
		}
		$('<div class="ECode-floatBar"></div>').css(i).appendTo("body");
		var N = $("body").find(".ECode-floatBar:last");
		N.append(n.contents);
		var K = N.width(),
			O = N.height(),
			M = {
				zIndex: n.zIndex
			};
		if (n.id != null) {
			N.attr("id", n.id)
		}
		switch (n.align) {
			case "right":
				M.left = "auto";
				M.right = 0;
				break;
			case "left":
				M.right = "auto";
				M.left = 0;
				break;
			case "center":
				M.right = "auto";
				M.left = "50%";
				M.marginLeft = -K / 2;
				break
		}
		switch (n.vertical) {
			case "top":
				M.top = 0;
				break;
			case "bottom":
				M.top = "auto";
				M.bottom = 0;
				break;
			case "middle":
				M.top = "50%";
				M.marginTop = -O / 2;
				if (J && J <= 6) {
					M.marginTop = 0
				}
				break
		}
		N.css($.extend(M, n.css));
		var L = function() {
			var T = $(document).scrollTop(),
				P = $(window).height(),
				Q = $(document).width();
			switch (n.vertical) {
				case "top":
					N.stop().animate({
						top: T
					});
					break;
				case "bottom":
					var S = P + T - O;
					if (n.css.marginBottom != null) {
						var R = parseInt(n.css.marginBottom);
						if (R >= 0) {
							S -= R
						}
					}
					N.css({
						marginTop: 0
					}).stop().animate({
						top: S
					});
					break;
				case "middle":
					N.stop().animate({
						top: P / 2 + T - O / 2
					});
					break
			}
		};
		if (n.ieFixed && J && J <= 6) {
			L();
			$(window).scroll(function() {
				L()
			});
			$(window).resize(function() {
				L()
			})
		}
	};
	if (screen.width <= 1280) {
		index.floatBar({
			zIndex: 10000,
			contents: $(".floor-guide"),
			align: "center",
			vertical: "middle",
			css: {
				"margin-left": "-629px"
			}
		})
	} else {
		index.floatBar({
			zIndex: 10000,
			contents: $(".floor-guide"),
			align: "center",
			vertical: "middle",
			css: {
				"margin-left": "-647px"
			}
		})
	}
	index.floatBarEffect = function() {
		var J = $(".ECode-floatBar"),
			L = index.ieVersion(6),
			n = $(".recmd-active");

		function i() {
			var M = parseInt($(document).scrollTop()),
				N = $(".floor:first").offset().top;
			if (M + $(window).height() > N) {
				if (L) {
					J.show()
				} else {
					J.stop(true, true).fadeIn(500);
					if (n.find(".btn").hasClass("btn-open")) {
						n.hide()
					}
				}
			} else {
				if (L) {
					J.hide()
				} else {
					J.stop(true, true).fadeOut(500);
					if (n.find(".btn").hasClass("btn-open")) {
						n.show()
					}
				}
			}
		}

		function K() {
			var M = parseInt($(document).scrollTop()),
				N = $(".floor:first").offset().top;
			if (M + $(window).height() > N) {
				if (n.find(".btn").hasClass("btn-open") && !L) {
					n.hide()
				}
			} else {
				if (n.find(".btn").hasClass("btn-open") && !L) {
					n.show()
				}
			}
		}
		bigscreen && i() || K();
		$(window).bind("scroll resize", function() {
			bigscreen && i() || K()
		})
	};
	index.floorGuide = function() {
		var i = $(".floor-guide"),
			N = i.find("li"),
			L, P, J, M = $("#goTop"),
			K = true;
		M.click(function() {
			K = false;
			$("html, body").stop(true).animate({
				scrollTop: 0
			}, "fast", function() {
				K = true
			})
		});
		if (i.length == 0) {
			return
		}
		N.click(function() {
			K = false;
			var Q = "." + $(this).attr("rel");
			if ($(Q).length == 0) {
				return
			}
			$(this).addClass("on").siblings().removeClass("on");
			$("html, body").stop(true).animate({
				scrollTop: $(Q).offset().top - 50
			}, "fast", function() {
				K = true
			})
		});
		N.hover(function() {
			$(this).addClass("hover")
		}, function() {
			$(this).removeClass("hover")
		});

		function n(R) {
			var Q = $(".floor").eq(R - 1);
			if (Q.length > 0) {
				return Q.offset().top - $(document).scrollTop()
			}
		}

		function O() {
			var Q = N.length;
			if (n(1) <= 0) {
				for (var R = 2; R <= Q; R++) {
					if (n(R) - 150 > 0) {
						N.eq(R - 2).addClass("on").siblings().removeClass("on");
						return
					}
				}
				N.eq(Q - 1).addClass("on").siblings().removeClass("on")
			} else {
				N.removeClass("on").eq(0).addClass("on")
			}
		}
		O();
		$(window).scroll(function() {
			if (K) {
				O()
			}
		})
	};
	index.floorGuide();
	index.minWidth = function(K) {
		var n = bigscreen ? 1190 : 990;
		var J = $(K),
			i = J.width();
		if (i < n) {
			J.css("width", n)
		} else {
			J.css("width", "100%")
		}
	};
	index.browserZoomTip = function() {
		if (/ipad|iphone|android/ig.test(navigator.userAgent)) {
			return
		}
		if (index.getData("zoomTip")) {
			return
		}
		detectZoom = function() {
			var J = 0,
				n = 0,
				n = window.screen,
				K = navigator.userAgent.toLowerCase();
			window.devicePixelRatio !== void 0 ? J = window.devicePixelRatio : ~K.indexOf("msie") ? n.deviceXDPI && n.logicalXDPI && (J = n.deviceXDPI / n.logicalXDPI) : window.outerWidth !== void 0 && window.innerWidth !== void 0 && (J = window.outerWidth / window.innerWidth);
			J && (J = Math.round(J * 100));
			window.devicePixelRatio && window.devicePixelRatio === 1 && (n = Math.round(window.outerWidth / window.innerWidth * 100), Math.abs(J - n) > 2 && (J = n));
			return J
		};

		function i() {
			var J = '<div id="browserZoomTip" class="browser-zoom-tip"><div class="wrapper"><a href="javascript:void(0);" class="close">×</a><i></i>您的浏览器目前处于缩放状态哦，会导致页面显示不正常，您可以在键盘上同时按下<b>Ctrl</b>+<b>0</b>键恢复初始状态。<a href="javascript:void(0);" class="noagain">不再提示</a></div></div>',
				n = detectZoom();
			if (n != 100 && $("#browserZoomTip").length == 0) {
				$("body").prepend(J);
				$("#browserZoomTip").find(".close").click(function() {
					$("#browserZoomTip").remove()
				});
				$("#browserZoomTip").find(".noagain").click(function() {
					index.setData("zoomTip", 1);
					$("#browserZoomTip").remove();
					$(window).unbind("resize.zoom")
				})
			}
			if (n == 100 && $("#browserZoomTip").length > 0) {
				$("#browserZoomTip").remove()
			}
		}
		i();
		$(window).bind("resize.zoom", function() {
			i()
		})
	};
	index.setData = function(i, n) {
		if (window.localStorage) {
			localStorage.setItem(i, n)
		}
	};
	index.getData = function(i) {
		if (window.localStorage) {
			return localStorage.getItem(i)
		}
		return null
	}
};

function cpmRequire(f) {
	var l = f.find("[cpmId]"),
		p = [];
	l.each(function() {
		p.push($(this).attr("cpmId"))
	});
	var q = "w",
		j = p.length,
		h = [],
		r = Math.ceil(j / 5);
	for (var g = 0; g < r; g++) {
		h[g] = [];
		for (var c = 0; c < 5; c++) {
			var b = g * 5 + c;
			if (b < j) {
				h[g].push(p[b])
			}
		}
	}
	for (var a = 0; a < r; a++) {
		try {
			apsAdboardGroupObj.aps_adboard_loadAdCpmGroup(h[a], q)
		} catch (k) {
			aps_adboard_errors(h[a])
		}
	}
}

function aps_adboard_romancecpmGroup(b, k) {
	if (b == null || k == null) {
		return
	}
	var c;
	try {
		for (var f = 0, l = b.length; f < l; f++) {
			var a = b[f];
			if (a.pid) {
				c = $(".floor").find("[cpmId=" + a.pid + "]");
				c.find("a").attr({
					href: a.apsClickUrl,
					title: a.title
				}).find("img").attr({
					src: a.adSrc,
					alt: a.title
				})
			} else {
				var g = $(".floor").find("[cpmId=" + k[f] + "] a"),
					h = g.children("img");
				g.attr({
					title: g.attr("d-title"),
					href: g.attr("d-href")
				});
				h.attr({
					src: h.attr("d-src"),
					alt: h.attr("d-alt")
				})
			}
		}
	} catch (j) {
		throw new Error(j)
	}
}

function aps_adboard_outTime(f) {
	for (var c = 0, e = f.length; c < e; c++) {
		var b = $(".floor").find("[cpmId=" + f[c] + "] a"),
			a = b.children("img");
		b.attr({
			title: b.attr("d-title"),
			href: b.attr("d-href")
		});
		a.attr({
			src: a.attr("d-src"),
			alt: a.attr("d-alt")
		})
	}
}

function aps_adboard_errors(f) {
	for (var c = 0, e = f.length; c < e; c++) {
		var b = $(".floor").find("[cpmId=" + f[c] + "] a"),
			a = b.children("img");
		b.attr({
			title: b.attr("d-title"),
			href: b.attr("d-href")
		});
		a.attr({
			src: a.attr("d-src"),
			alt: a.attr("d-alt")
		})
	}
}
index.recommendFn = {
	getHtml: function(p) {
		var g = "",
			j = p.sugGoods[0]["skus"],
			m = j.length;
		for (var f = 0; f < m; f++) {
			var k = "";
			switch (j[f]["promotionType"]) {
				case "1":
					k = '<i class="recommend-promotion">大聚惠</i>';
					break;
				case "2":
					k = '<i class="recommend-promotion">抢购</i>';
					break;
				case "3":
					k = '<i class="recommend-promotion">团购</i>';
					break;
				case "7":
					k = '<i class="recommend-promotion">返券</i>';
					break;
				case "8":
					k = '<i class="recommend-promotion">直降</i>';
					break
			}
			var q = j[f]["sugGoodsId"];
			var o = j[f]["sugGoodsCode"].substring(9),
				l;
			var c = j[f]["vendorId"];
			var n = j[f]["handwork"];
			var e = "index2_none_recscnxh_1-" + (f + 1) + "_p_" + c + "_" + o + "_0";
			var b = "baoguang_recscnxh_1-" + (f + 1) + "_" + c + "_" + o + "_" + n;
			var a = {
				picUrl: "",
				partNumber: o,
				shopPicUrl: "/b2c/catentries/000000000",
				vendorCode: c,
				linkType: "",
				trickPoint: e,
				linkUrl: ""
			};
			var h = j[f]["price"];
			if (h) {
				if (h.indexOf(".") <= -1) {
					h = "<i>¥</i><span><b>" + h + "</b>.00</span>"
				} else {
					h = "<i>¥</i><span><b>" + h.split(".")[0] + "</b>." + h.split(".")[1] + "</span>"
				}
			} else {
				h = ""
			}
			g += '<li class="floor-recommend-item"><div class="recommend-img-box"><a name="' + e + '" href="' + index.getUrl(a, e) + '" target="_blank"><img class="recommend-img" src="' + index.getPic(a, "160x160") + '" alt="' + j[f]["sugGoodsName"] + '" /></a></div><p class="recommend-name"><a  name="' + e + '" id="' + b + '" href="' + index.getUrl(a, e) + '" target="_blank">' + j[f]["sugGoodsName"] + '</a></p><p class="recommend-price price">' + h + "</p>" + k + "</li>"
		}
		$(".floor-recommend").find(".floor-recommend-list").html(g);
		index.baoguangFun("baoguang_recscnxh_1")
	},
	getCMSHtml: function() {
		var a = $(".floor-recommend-list");
		var b = a.find("script").html();
		a.html(b);
		index.getCity(function(c) {
			sn.cityId = c;
			lazyelem.listen("li[data-sku]", "fn", function(e) {
				index.priceDOM.push(e);
				if (index.getPriceFlag) {
					return
				}
				index.getPrice(sn.cityId)
			})
		})
	}
};
index.priceDOMBaogunag = new Array();
index.getBaogunagFlag = false;
index.baoguangFun = function(a) {
	if (typeof _analyseExpoTags == "function") {
		_analyseExpoTags("a", a)
	} else {
		setTimeout(function() {
			index.baoguangFun(a)
		}, 2000)
	}
};
$(function() {
	index.topActive();
	if (!(!!window.ActiveXObject || "ActiveXObject" in window)) {
		var a = $(".first-screen .banner");
		if (a.length > 0) {
			var b = util.toucher(a[0]);
			b.on("swipeLeft", function() {
				Banner._pauseAuto();
				Banner._startAuto();
				Banner.switchType = 0;
				Banner.next()
			}).on("swipeRight", function() {
				Banner._pauseAuto();
				Banner._startAuto();
				Banner.switchType = 0;
				Banner.prev()
			})
		}
	}
	index.switchBtn(".first-screen .banner", ".first-screen .banner-btn");
	index.switchBtn(".floor-zone", ".floor-zone-main .switch-btn");
	index.announce();
	index.floorTab();
	index.picOpacity(".second-screen", "0.8");
	index.picOpacity(".floor-financial", "0.8");
	index.picOpacity(".main-col", "0.8");
	index.listloop({
		wrap: ".floor-zone-main",
		loopBox: ".hots-and-share-main",
		loopChild: ".hots-and-share-item",
		hasLabelObj: ".hots-and-share",
		step: {
			wide: 1,
			narrow: 1
		},
		scrollWidth: {
			wide: 1000,
			narrow: 800
		},
		isLazyDom: true
	});
	index.floatBarEffect();
	if (index.ieVersion(6)) {
		index.minWidth("body, html");
		$(window).resize(function() {
			index.minWidth("body, html")
		})
	}
	lazyelem.listen(".floor", "dom", function(c) {
		var e = $(c).find("div[jsModelId]");
		if (e && e.length > 0) {
			index.getCity(function(f) {
				sn.cityId = f;
				index.lazyLoadInit(e, f)
			})
		}
	});
	lazyelem.listen(".J-domLazy", "dom", function(g) {
		cpmRequire(g);
		var e = "";
		var f = $(g).attr("trickPoint");
		if (f) {
			var c = f.indexOf("rec");
			if (-1 != c) {
				e = "baoguang_" + f.substring(c)
			}
		}
		index.getCity(function(h) {
			sn.cityId = h;
			lazyelem.listen("li[data-sku]", "fn", function(i) {
				index.priceDOM.push(i);
				if (index.getPriceFlag) {
					return
				}
				index.getPrice(h);
				index.baoguang(e)
			})
		});
		if (window.saExportUtil) {
			lazyelem.listen(g.find("a[expo] img"), "bat", function(o) {
				var n = [],
					m = [],
					j;
				for (j = 0; j < o.length; j++) {
					var l = o[j].parent(),
						h = l.attr("expo"),
						k = parseInt(l.attr("expotype"));
					if (k == 1) {
						n.push(h)
					}
					if (k == 2) {
						m.push(h)
					}
				}
				saExportUtil.sendCustomExpoData(n.join(","), 1);
				saExportUtil.sendCustomExpoData(m.join(","), 2)
			})
		}
	});
	index.getFloorNum();
	lazyelem.listen(".floor-recommend", "fn", function(c) {
		index.getCity(function(i) {
			sn.cityId = i;
			var e = "",
				h = "",
				f = "",
				g = "";
			g = index.getCookie("custno");
			if (typeof g != "undefined" && g) {
				h = g
			}
			f = index.getCookie("_snma");
			if (typeof f != "undefined" && f) {
				e = f.split("|")[1]
			}
			$.ajax({
				url: tuijianDomain + "/recommend-portal/recommendv2/biz.jsonp?&u=" + h + "&c=" + e + "&cityId=" + sn.cityId + "&sceneIds=12-14&count=6",
				type: "GET",
				dataType: "jsonp",
				error: function(j, l, k) {
					index.recommendFn.getCMSHtml()
				},
				success: function(j) {
					if (j.sugGoods[0]["resCode"] == "01" || j.sugGoods[0]["resCode"] == "03") {
						if (j.sugGoods[0]["skus"].length < 6) {
							index.recommendFn.getCMSHtml()
						} else {
							index.recommendFn.getHtml(j)
						}
					} else {
						index.recommendFn.getCMSHtml()
					}
				}
			})
		})
	});
	lazyelem.listen();
	index.activeDialog();
	index.browserZoomTip()
});