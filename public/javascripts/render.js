$(function () {
  $.getJSON('/config', function (config) {
    var stylesheets = Object.keys(config.assets.stylesheets);

    $.each(stylesheets, function(index, asset) {
      $('#container').append('<div id="highcharts-' + CryptoJS.MD5(asset) + '" class="chart-wrapper" />');
      $.getJSON('/metrics/stylesheets/' + CryptoJS.MD5(asset), function (series) {
        $('#highcharts-' + CryptoJS.MD5(asset)).highcharts({
          chart: {
            type: 'spline'
          },
          credits: {
            enabled: false
          },
          navigation: {
            buttonOptions: {
              enabled: false
            }
          },
          title: {
            text: asset
          },
          xAxis: {
            type: 'datetime',
            dateTimeLabelFormats: { // don't display the dummy year
              month: '%e. %b',
              year: '%b'
            },
            title: {
              enabled: false
            }
          },
          yAxis: [
            {
              title: {
                text: 'Size'
              },
              labels: {
                formatter: function () {
                  return prettyBytes(this.value);
                }
              },
              min: 0
            },{
              title: {
                text: 'Count'
              },
              opposite: true,
              min: 0
            }
          ],
          plotOptions: {
            area: {
              marker: {
                symbol: 'circle',
                radius: 5,
              },
              lineWidth: 3,
              states: {
                hover: {
                  lineWidth: 5
                }
              },
              pointInterval: 3600000, // one hour
              tooltip: {
                headerFormat: '<b>{series.name}</b><br>',
                pointFormat: '{point.x:%b %e, %H:%M}: <b>{point.y} bytes</b>'
              }
            },
            line: {
              marker: {
                symbol: 'circle',
                radius: 3
              },
              lineWidth: 1,
              states: {
                hover: {
                  lineWidth: 3
                }
              },
              pointInterval: 3600000 // one hour
            }
          },
          tooltip: {
            headerFormat: '<b>{series.name}</b><br>',
            pointFormat: '{point.x:%b %e, %H:%M}: <b>{point.y}:</b>'
          },
          series: series
        });
      });
    });
  });
});
