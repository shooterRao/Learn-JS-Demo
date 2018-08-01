/**
 * @file    地图操作Util/MapUtil.js
 * @author  raojw
 */
define([
  "dojo/_base/declare",
  "esri/tasks/query",
  "esri/tasks/QueryTask",
  "esri/geometry/Point",
  "dojo/_base/lang",
  "esri/layers/GraphicsLayer",
  "esri/symbols/SimpleMarkerSymbol",
  "esri/symbols/TextSymbol",
  "esri/symbols/SimpleLineSymbol",
  "esri/symbols/SimpleFillSymbol",
  "esri/Color"
], function(
  declare,
  Query,
  QueryTask,
  Point,
  lang,
  GraphicsLayer,
  SimpleMarkerSymbol,
  TextSymbol,
  SimpleLineSymbol,
  SimpleFillSymbol,
  Color
) {
  "use strict";
  return declare(null, {
    /**
     * 清空图层
     * @public
     */
    mapClear: function() {
      this.map.graphics.clear();
      var glayerids = this.map.graphicsLayerIds;
      for (var i = 0; i < glayerids.length; i++) {
        var glayerid = glayerids[i];
        if (glayerid == "clipGraLayer") continue;
        var glayer = this.map.getLayer(glayerid);
        if (glayer) {
          glayer.clear();
        }
      }
      this.map.infoWindow.hide();
    },

    /**
     * 调整地图，把地图移动到右边
     * @public
     */
    resizeMap: function() {
      function move() {
        var extentconfig = this.appConfig.map.mapOptions.extent;
        var mpt = new Point(
          (extentconfig.xmin + extentconfig.xmax) / 2,
          (extentconfig.ymin + extentconfig.ymax) / 2,
          this.map.spatialReference
        );
        var screenPoint = this.map.toScreen(mpt);
        // 右移
        var windowOutwidth = window.outerWidth;
        var moveX = windowOutwidth / 4;
        screenPoint.x -= moveX;
        var mapPoint = this.map.toMap(screenPoint);
        this.map.centerAt(mapPoint);
      }
      var zoom = this.map.getZoom();
      if (zoom != 0) {
        this.map.setZoom(0).then(lang.hitch(this, move));
      } else {
        move.call(this);
      }
    },

    /**
     * query查询
     * @public
     */
    executeQuery: function(url, sql) {
      var query = new Query();
      var queryTask = new QueryTask(url);
      query.spatialRel = "sriSpatialRelIntersects";
      query.where = sql;
      query.returnGeometry = true;
      query.outFields = ["*"];
      return queryTask.execute(query);
    },

    /**
     * 创建GraphicLayer
     * @public
     */
    createGraphicLayer: function(id) {
      var layer = this.map.getLayer(id);
      if (!layer) {
        layer = new GraphicsLayer({
          id: id
        });
        this.map.addLayer(layer);
      }
      return layer;
    },

    /**
     * 获取别名
     * @public
     */
    getAlias: function(url) {
      url += "?f=pjson";
      return $.ajax({
        url: url,
        type: "GET",
        dataType: "json"
      });
    },

    /**
     * 获取通用symbol
     * @public
     */
    getGeometrySymbol: function(geometry) {
      var symbol = null;
      switch (geometry.type) {
        case "point":
          symbol = new SimpleMarkerSymbol(
            "circle",
            2,
            new SimpleLineSymbol("solid", new Color([255, 0, 0]), 1),
            new Color([255, 0, 0])
          );
          break;
        case "polyline":
          symbol = new SimpleLineSymbol("solid", new Color([255, 0, 0]), 2);
          break;
        case "polygon":
          symbol = new SimpleFillSymbol(
            "solid",
            new SimpleLineSymbol("solid", new Color([255, 0, 0]), 2),
            new Color([125, 125, 125, 0.35])
          );
          break;
      }
      return symbol;
    },

    /**
     * 修复地图定位偏移问题
     * @public
     */
    fixupMapMove: function(level, pt, callback) {
      this.map.setZoom(level).then(
        lang.hitch(this, function() {
          var windowOutwidth = window.outerWidth;
          var moveX = windowOutwidth / 4;
          // 转为屏幕坐标
          var screenPoint = this.map.toScreen(pt);
          screenPoint.x -= moveX;
          // 必须先放大地图，这样才能保证转换后的坐标点是正确的
          pt = this.map.toMap(screenPoint);
          this.map.centerAt(pt).then(
            lang.hitch(this, function() {
              // 必须定位完成后才执行回调函数(展示infoWindow等)，不然会引发一系列报错
              callback && callback();
            })
          );
        }))
    },

    /**
     * 获取内容模板信息
     * @public
     */
    getContentTemplate: function(attributes, aliases) {
      var content = "<div class='project-locate-info-window'><ul>";
      for (var key in attributes) {
        var value = attributes[key];
        if (
          key.indexOf("OBJECTID") > -1 ||
          !value ||
          value === "null" ||
          value === "Null"
        ) {
          continue;
        }
        if (aliases[key] === "立案时间" || aliases[key] === "省部批复日期") {
          // 判断是不是时间戳
          if (/^\d{13}$/.test(+value)) {
            var date = new Date(+value);
            value = date.toLocaleDateString();
          }
        }
        content +=
          "<li style='margin-bottom: 5px'><span style='display: inline-block;width: 25%;vertical-align: top'><b>" +
          aliases[key] +
          "</b></span> <span style='display: inline-block;width: 70%'>" +
          value +
          "</span></li>";
      }
      content += "</ul></div>";
      return content;
    }
  });
});