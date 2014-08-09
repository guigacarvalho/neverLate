var UI = require('ui');
var ajax = require('ajax');
var Vector2 = require('vector2');
var apiKey = "AIzaSyCoi-dKJOepgdksk4ejP6xla6TW82ANtRk";
var d = new Date();

var modeSelected;
var modeSelectedId;
var destinationSelected;
var destinationSelectedId;

// API ENDPOINTS
 // Directions: https://maps.googleapis.com/maps/api/directions/json?origin=Boston,MA&destination=Concord,MA&waypoints=Charlestown,MA|Lexington,MA&key=AIzaSyCoi-dKJOepgdksk4ejP6xla6TW82ANtRk
 // Address: https://maps.googleapis.com/maps/api/geocode/json?latlng=37.784191330212614,-122.39547393284955&key=AIzaSyCoi-dKJOepgdksk4ejP6xla6TW82ANtRk

//Main Screen
var main = new UI.Card({
  title: 'GPS Nav',
  icon: 'images/logo.png',
  subtitle: '+ Smart Alerts',
  body: 'on your wrist!',
    action: {
    up: 'images/pin.png',
    down: 'images/nav_small.png'
  }
});

//Transit Mode Selection menu
var transitModeMenu = new UI.Menu({
  sections: [{
    items: [{
      title: 'Walk',
      icon: 'images/walk.png',
      subtitle: ''
    }, {
      title: 'Public Transit',
      subtitle: '',
      icon: 'images/bus.png'
    }, {
      title: 'Driving',
      subtitle: '',
      icon: 'images/car.png'
    }, {
      title: 'Bike',
      subtitle: '',
      icon: 'images/bike.png'
    }]
  }]
});
var routesMenu = new UI.Menu({
  sections: [{
    title: 'User defined',
      items: [{
        title: 'Home',
        icon: 'images/home.png',
        subtitle: '-'
      }, {
        title: 'Work',
        subtitle: '-',
        icon: 'images/work.png'
      }, {
        title: 'Custom Location',
        subtitle: '-',
        icon: 'images/custom1.png'
      }]
    },
  {
    title: 'Common Destinations',
      items: [{
        title: 'Airport',
        subtitle: '-',
        icon: 'images/airport.png'
      }, {
        title: 'Gas',
        subtitle: '-',
        icon: 'images/car.png'
      }, {
        title: 'ATMs',
        subtitle: '-',
        icon: 'images/bank.png'
      }, {
        title: 'Bars/Restaurants',
        subtitle: '-',
        icon: 'images/bar.png'
      }]
    }]
  });

var transitModeMenuReset = transitModeMenu;

var selectClick = 0;

// Main menu events
main.on('click', 'up', function(e) {
  transitModeMenu.on('select', function(e) {
    d = new Date();
    var h = d.getHours();
    var m = d.getMinutes();
    var t = h + " : " + m;
    var wind = new UI.Window();
    var textfield = new UI.Text({
      position: new Vector2(0, 50),
      size: new Vector2(144, 30),
      font: 'Bitham 42 Light',
      text: t,
      textAlign: 'center'
    });
    var Vibe = require('ui/vibe');
    var evt = e;

    Vibe.vibrate('short');
    wind.on('click', 'up', function(e) {
      if (selectClick === 0) {
        if (h!==23)
          h++;
        else
          h=0;
        t = h + " : " + m;
        textfield.text(t);
      } else if (selectClick === 1){
        if (m!==59)
            m++;
        else m=0;
        t = h + " : " + m;
        textfield.text(t);
      }
    });
    wind.on('click', 'down', function(e) {
      if (selectClick === 0) {
        if (h!==0)
          h--;
        else
          h=23;
        t = h + " : " + m;
        textfield.text(t);
      } else if (selectClick === 1){
        if (m!==0)
          m--;
        else m=59;
        t = h + " : " + m;
        textfield.text(t);
      }       
    });
    wind.on('click', 'select', function(e) {
      if (selectClick === 0) {
        selectClick = 1;
      } else if (selectClick === 2) {
        // Reset menu and set * on the selected method
        wind.hide();
        routesMenu.show();
        selectClick = 0;
      } else if (selectClick === 1) {
        selectClick = 2;
        // transitModeMenu = transitModeMenuReset;
        var items='';
      for ( items in evt.menu.items(evt.section) )
          if(evt.menu.item(evt.section, evt.item).title.slice(0,1) === "*") {
            console.log(evt.menu.item(evt.section, evt.item).title);
            evt.menu.item(evt.section, evt.item).title=
              evt.menu.item(evt.section, evt.item).title.slice(
                0,evt.menu.item(evt.section, evt.item).title.length);
          }
        
        modeSelected = evt.menu.item(evt.section, evt.item).title;
    //    modeSelectedId = evt.item;
        console.log(modeSelected);
        evt.menu.item(evt.section, evt.item, {title: "* "+modeSelected, 
                                              subtitle: h+" : "+m, 
                                              icon: evt.menu.item(evt.section, evt.item).icon});
        // transitModeMenu.item(e.section, e.item).title("*"+transitModeMenu.item(e.section, e.item).title);
        // selectClick = 2;
      }            
    });
    wind.add(textfield);
    wind.show();
  });
  transitModeMenu.show();
});
//main.on('click', 'select', function(e) {
//});
main.on('click', 'down', function(e) {
/*  var card = new UI.Card({
    title: 'Hello World',
    body: 'This is your first Pebble app!',
    scrollable: true
  });*/
  
//  var quote;
/*  ajax(
    { 
      url: 'https://maps.googleapis.com/maps/api/directions/json?origin=Boston,MA&destination=Concord,MA&waypoints=Charlestown,MA|Lexington,MA&key=AIzaSyCoi-dKJOepgdksk4ejP6xla6TW82ANtRk', 
      type: 'json' 
    },
      function(data) {
      console.log('Quote of the day is: ' + data.contents.quote);
    },
    function(jqXHR, textStatus, errorThrown) {
        var output = '';
      console.log(textStatus);
      console.log(errorThrown);
      console.log(jqXHR);

      //for(property in error) {
      //  output += property + ': ' + error[property]+'; ';
      //};
      console.log(output);
    }
  );*/
/*var data = {
    "routes": [
        {
            "bounds": {
                "northeast": {
                    "lat": 37.776348,
                    "lng": -121.9361212
                },
                "southwest": {
                    "lat": 37.353189,
                    "lng": -122.4131742
                }
            },
            "copyrights": "Map data ©2014 Google",
            "legs": [
                {
                    "arrival_time": {
                        "text": "12:02am",
                        "time_zone": "America/Los_Angeles",
                        "value": 1407567720
                    },
                    "departure_time": {
                        "text": "10:40pm",
                        "time_zone": "America/Los_Angeles",
                        "value": 1407562800
                    },
                    "distance": {
                        "text": "44.3 mi",
                        "value": 71237
                    },
                    "duration": {
                        "text": "1 hour 22 mins",
                        "value": 4920
                    },
                    "end_address": "Santa Clara, CA, USA",
                    "end_location": {
                        "lat": 37.353189,
                        "lng": -121.936135
                    },
                    "start_address": "San Francisco, CA, USA",
                    "start_location": {
                        "lat": 37.776348,
                        "lng": -122.394935
                    },
                    "steps": [
                        {
                            "distance": {
                                "text": "44.3 mi",
                                "value": 71237
                            },
                            "duration": {
                                "text": "1 hour 22 mins",
                                "value": 4920
                            },
                            "end_location": {
                                "lat": 37.353189,
                                "lng": -121.936135
                            },
                            "html_instructions": "Train towards San Jose Caltrain Station",
                            "polyline": {
                                "points": "eeqeFhg`jV?@rHfKnD|Er@`Ab@z@d@z@`@t@`BxBLPRRHHJJNHNHPHTHPDNBN@N@P@LAN?PCNCLCRGPGHGPIHGJIPOf@o@p@}@tAkBn@}@PUfA{A`@i@\\e@Zc@t@gAxI_MR[LO\\c@h@k@d@e@j@e@p@c@f@]h@Y`Aa@p@Wn@Qt@O\\IZC~DYbESpG]ZAXArDIr@AnBAfB?l@?B?jD@jB@bBBvAFj@Br@DpQrAj@DtA@v@F~ATz@FhAHjUbBx@DvWpBnBL`Ij@nDVdLz@hStAbSzAbCRfTzAhAHnAJbALp@HbALdARdARnAXbAV`AVbDz@tA\\x@RnTpFzFxAd\\rIjAV`Bb@h@Lh@JZF^FZDVBj@Ff@DF?d@BV@b@?d@?rS@fIAdI?bh@@r@Ar@Av@At@Cx@E`AIn@Gr@GpAO`AO`AO`AQz@QZI^Iv@UjA[dA]z@[`A_@|@_@nD{Ab@WrAy@l@]z@m@dAs@bBsAlQsNxAqAf@e@t@o@bOsL~KgJnBsAdCkAjBq@x@UrAWrAO`AIhAEfC@dABz@HpCb@lAZhA`@`@JxAv@rAv@lAz@rAjAHHrEjEfC`CdQrPNP\\ZTTnBjBtApAr@r@x@t@j@j@ZZr@p@LJhAfAtBpBpCjClBjBpBjBlIbIhAfAf@f@bIvH|DxD~BvBVVbCvBJJtAfAfA|@bBnAnA`Af@^f@\\`@\\h@b@~AjAfAx@f@`@rA~@`Ap@z@h@~@f@~@f@fAh@jAf@bA`@jA`@hA^lA\\hAVjAXnATv@L~@L~@Jv@H|@FbAFhBHx@@h@@vAAzBCf@?h@?tEIrCA|G@Z?vNQv@AlBAd@Ad@An@GhAQb@ITEVGXI`@Of@Qh@Uf@UrAo@b@Sd@UTKxDkBjDcBjDcBvFmC^QTK`Ae@bAe@`Ae@|@a@x@a@JGFEvIaEz@e@xCkBXQ\\U`GaEdCgBd@]h@a@`GcEz]kVbD_CzAoAr@o@hLgLRWrBuBf@i@\\c@V[X[V[d@e@j@m@^[`@[\\]XYRQDEFG\\[dAgA~PgQ\\_@^_@~QgRx@}@rAuAnImI^a@h@i@d@i@`@e@^i@b@o@f@w@b@q@j@eAh@eAh@mA\\{@l@aBt@cCPi@`@kAh@eBHU|BmHx_@cmAvB}GH[Xy@X}@zA{E|C{J|Jg[J[r@wBp@yBdAgDn@qB~@yCr@yB`@qAL]d@}AlAsDrAgEv@eCt@aCz@kClAwDZgAZeAxBcHd@oAjDwKfDyKHUzHmVRo@`A_Dl@eBz@gCRg@N]f@qAh@qAd@gAf@cAJSPY?Al@iAl@cAn@gAj@{@l@{@PWHKHMHIp@_A`AiAv@}@n@s@DELODEpAyAdAkAx@}@^c@BCHKJKX]~@aARSv@y@t@y@p@w@h@k@HIv@}@t@y@TYNOz@aAt@{@XYv@_AfAoAT[~@cAxA_B`@e@|@_AZ_@TUz@eA@?`@k@f@m@l@w@Z_@h@k@FIb@c@d@e@NOn@m@FGb@g@`@c@RUvA_BxCgDrC}ChNuOpAuAjB}A`BgAvA}@~BmAnB{@tBy@bEwApCaAJExDaBlDoBfBiAhAy@tAeAlEiD`FcEzD}CjAaAlA_A`Ay@|BgB`BsAnAcAx@o@hA_A`JmHnDyClD{Cj@i@nAiArAkA~@y@^[HIZYNOPOHIFG|@y@r@o@v@q@`@_@n@m@\\Yd@c@f@i@l@o@\\_@^a@l@u@f@m@d@m@t@eAt@gAt@eAt@eAh@w@x@kAn@aAz@qAx@oAr@mAt@mAdAgBh@}@d@y@NUr@kAjAsBbAeBdAeBr@iAj@cAr@mA`A_BVc@R]PY^q@Ze@b@s@^q@f@}@b@s@b@s@h@{@b@m@d@q@j@u@h@q@p@{@h@s@f@o@n@w@PW^e@`@g@FKHIHK`@i@b@k@^e@j@u@p@w@n@s@j@s@l@q@j@q@l@u@r@}@h@q@l@w@FIr@_Af@m@JQn@y@NOz@iAz@gAfDyEpAgBjB}B`ByBnBqC|@sAvBeDtCoEzA{B~B{Cx@aAvJuLzDsEpRoU@AbFcGvCoDzAgBtYq]xb@_h@nDgEzAoBfBaCl@{@~@wA|AeCdCkE~BgE|AuCTc@NYP[bB_DtByDpBuDbByCz@aBn@kAd@{@x@yAj@gA~AwC|@aBPYv@{At@uA~BmE?AzB_EhAwBPYN[\\m@jBkDlBkDv@yAr@qAtAiCd@w@rByDjBkDTc@HQf@}@d@}@R]j@cAxAkCb@y@P]|@cBpDwGlA{B|BeE`AiBh@aA~@cB|@eBdAmBjAuBv@wAv@{Av@uA~@gBP[nA}Bt@uAhAuBd@}@v@uAl@iAv@wAj@eAp@oAv@uAx@{An@kAP_@R[Zm@^q@^q@fCwEP]tD}GrAiCf@{@p@oAr@qAl@gAj@iArAaCbAiBbAmBtAgCXg@xDgHlBkDx@}An@iAp@mAl@kALSFMvAkCtCmFbB{CnA{BnA{Br@sAZi@Xi@d@{@b@y@j@cAb@w@b@{@d@{@v@uA\\o@LWXg@Ve@f@aAdAkBzCwFbAmBFKf@_A`B{CVe@`AgBZm@Xi@`AeBLUzFqKP[\\k@`@w@h@cA~AuC\\o@p@kA`@w@@C|@aBh@aAp@oA\\m@^s@\\o@`@u@dAkBh@cAf@_AFKFOXg@l@eA\\o@d@{@`@u@d@}@P[d@y@b@w@Zm@T]DGFMTc@`@o@`@m@`@m@t@iAn@}@RY^i@h@{@b@o@`@o@^m@^q@T_@BGHOXi@b@y@b@y@j@cAVg@R]LUBEVe@BId@{@b@w@d@{@b@y@d@{@\\q@^u@`@aA^{@`@_A\\w@Xq@n@qA?ARc@Zu@^{@`@y@z@aBv@yAh@aAfAoBh@eATa@~@cB\\m@\\o@NYt@uAz@_B~@cBb@y@n@iAl@gAr@qAf@_Al@eAh@eA\\k@d@aAl@eAh@cAb@w@t@wAn@iAr@qAl@cAp@qAf@aA~@eBh@aA`AiBt@wAh@aAdBaDh@cAt@qAn@oAp@mAl@gAp@qAh@aAf@}@JSFKDIDGRc@v@uAf@_Ah@aAn@iAR_@LUZm@JQt@uAv@yA`AeBxAiCpA{Bd@{@x@{Ap@mAr@sAx@yAZk@Tc@r@sAr@qAz@_Bz@_B`AgBr@sA|@aBt@uAr@qAp@mAn@oAt@uAx@yAl@iAx@{ApEsI`KaRnQe\\p[ml@|@_BhAuBnA{BdAkBz@_Bx@{Al@kAt@oAh@cANYjAyBv@wAp@wA|@sBp@cBz@gCv@cCd@_B^qA^oAf@aBf@eBj@qBn@{BTo@T{@X}@^iAZgAZaABKB]V{@b@uAb@wAb@yAf@_B\\sAX}@ZkA^kAV}@Ne@La@lByGd@wAbIwXxAeFPk@`DuK|@{ChK}]HWFYHU@CpAoEx@kClBqG`AsDtGyTXaAt@aC\\iARm@X{@@AtJk\\^oAf@iB`Ii]\\yAjB}I`DkNb@sBLe@|L{h@`AiEJc@rF{V~Luh@b@mB~@kEdCqKj@aClAoFLi@`EkQjCsLfD_OBEJe@HWJ_@FYFUJ_@Pq@Jc@Lg@fA_Fh@cCJo@BKLq@Hi@Jk@Jo@BYJs@NcABSLgAL_AVwBj@wE^}Cb@qDP}AF[NuAR{AP_BL}@TqBJs@Fo@NgADe@d@wDNkABUNgAHu@BSJ{@j@wENmA@MPsAZgCV{BRcBHy@@O@GBa@Da@@U?IDk@Dw@D_ADyA?_@BiA@k@@c@@o@@_@@iA@i@?O@a@BiABcB?_@DeCBcA@]@kABeB?{@@_@?{@?{@?}A?]AmB?gAA}CCiEAiE?uDA_D?yBAoB?gA?w@?q@?aAAcA?u@?m@?i@?{@?w@A_@A_AEkCAcC?_@?k@?G@{@?aA?{@?k@@U?I?Y@[@]@i@@u@D{@Bw@F}@FaABQDs@D_@BSB]B[Hy@LaARsAHg@Ls@N}@Jk@FUJc@Je@Nq@Rw@Lg@Ja@HUH[J]J[HUHWHYJYJYJYJ]J[L]HWJ[L]J]L]J[J[L]Ne@Na@Pm@Pi@Ri@BKDMtEiNpNwb@j@gBtAcETo@J]Pg@Ne@Rk@Pi@La@To@Vw@To@Rm@Pg@La@Ne@Ne@N_@Tu@Vw@Xw@ZaAV{@`@iAz@eC|EaOtG_SJYJ[jM_`@fFsO`BaFtAsDn@eB^{@Xu@BB"
                            },
                            "start_location": {
                                "lat": 37.776348,
                                "lng": -122.394935
                            },
                            "transit_details": {
                                "arrival_stop": {
                                    "location": {
                                        "lat": 37.353189,
                                        "lng": -121.936135
                                    },
                                    "name": "Santa Clara Caltrain Station"
                                },
                                "arrival_time": {
                                    "text": "12:02am",
                                    "time_zone": "America/Los_Angeles",
                                    "value": 1407567720
                                },
                                "departure_stop": {
                                    "location": {
                                        "lat": 37.776348,
                                        "lng": -122.394935
                                    },
                                    "name": "San Francisco Caltrain Station"
                                },
                                "departure_time": {
                                    "text": "10:40pm",
                                    "time_zone": "America/Los_Angeles",
                                    "value": 1407562800
                                },
                                "headsign": "San Jose Caltrain Station",
                                "line": {
                                    "agencies": [
                                        {
                                            "name": "Caltrain",
                                            "phone": "(800) 660-4287",
                                            "url": "http://www.caltrain.com/"
                                        }
                                    ],
                                    "name": "Local",
                                    "vehicle": {
                                        "icon": "//maps.gstatic.com/mapfiles/transit/iw/6/rail.png",
                                        "name": "Train",
                                        "type": "HEAVY_RAIL"
                                    }
                                },
                                "num_stops": 20
                            },
                            "travel_mode": "TRANSIT"
                        }
                    ],
                    "via_waypoint": []
                }
            ],
            "overview_polyline": {
                "points": "eeqeFhg`jVvOhThAvB`@t@`BxB`@d@TT^Rf@R`AL`ACbAWp@c@x@_AfCiDjDyEhMqQhB{BpAkAxAaAjB{@`Bi@rAYzE]jOu@fFKvEAhIBzDJ~AH|RxAlCHzC\\tWlBbg@pDhxAjKtBVhC`@tCl@dCn@b^~I`d@lLlDz@nCh@fCVhBDfi@?vi@?jBC`F[dCWbC_@xDw@bCq@`Cy@~B_ArEsB`CwA`CaBpTgQ`CwBxPcN~KgJnBsAdCkAjBq@lCm@tCYhAEfC@`CLpCb@lAZjBl@lDnBlAz@rAjA|EtEzVbVnGfGtO`O`h@tf@zCnC`BrAbHnFrEjDdGlEzBpAfCpAnChAtC`AvCt@zCn@nFp@`CNbDJdHC~FIpL?xTUjACxBYjBa@zCmArDeBd]kPdEqB~IgEtEqCxHiFvMkJ~b@kZnC_C|L_MzC_DfBwBrCkCpAoAjTsTvUeVlNoNfAoAbAyAjAiBtAkCfAiCbBeFfBqFfq@{vBzb@atA~FiRpEgNpDoL~Lc`@fC_HbCqFlBiDzCwEnAcBzI}J`FqFvIsJzCgDtEoFtEeFtBgCzCqD`BcB|BaCxK{LzPkRjB}A`BgAvEkCdFuBtIyCdEgBtGyD~C_CvTmQnJuHtPaN|IuHzBsB|DkDfAcAfIoHrC{CpDwEjEkG~EoHnKqQlSg]~CqElDqE`EiF`D_EtDkEhHgJvD{ExFaIlEwFlDeFlGuJzEwGpLwNr_@id@beAioAjGwHtC}D|C}EdGsKtCoFnLiTfL_TtMoVrQm\\p]mo@|[{l@`z@q|At[el@~Vce@vi@ubAx@wAzCuElC}DdC_EhEaIpDyGfC}E`CuF|AiDxCmGdJuPvJqQ~H{NjKsRzSe`@jGiLfMeUpXug@vEuIrQu\\`n@siA|G}LxEwI|DoHnBkElBkF|CeKjDuLdBsFv@iCFi@bCcIzB}HtAqEpPok@xSgs@jC{InDeMbKg]l@iBvJm\\fAyD~Ic`@~Hc^~Neo@~F_XbNcl@dE}QhIg^rHs\\Nk@d@gBv@}C`C_Ln@wDb@eD|Da\\fF{b@`DiXZ_FNcGF_DRyNJsG@sEIy_@EaU?iEIcH?}LNoGViEReCn@kFr@eEfBiHvAqExEuNl_@miAfYi{@jUir@vDuKnAaDXu@BB"
            },
            "summary": "",
            "warnings": [],
            "waypoint_order": []
        }
    ],
    "status": "OK"
};
  
  card.title("Work to Home");
  card.body(data.routes[0].legs[0].duration.text);
  console.log(data.routes[0].legs[0].duration.text);  */

  routesMenu.on('select', function(e) {
    console.log('Selected item: ' + e.menu.item(e.section, e.item).title + ' ' + e.item);
//    console.log('Selected item: ' + e.menu.sections.size() + ' ' + e.item);
//    e.section(title,'test');
//    e.section('title','test');
//    console.log(routesMenu.sections[e.section].items[e.item].title);

    //;

 
    var defineLocation = new UI.Card({
      title: e.menu.item(e.section, e.item).title,
      icon: e.menu.item(e.section, e.item).icon,
      subtitle: 'Address',
      scrollable: true,
      body: '',
        action: {
        up: 'images/pin.png',
        down: 'images/nav_small.png'
      }
    });


    defineLocation.show();
    function showPosition(position) {
      // Show a map centered at (position.coords.latitude, position.coords.longitude).
      // console.log("Lat: "+position.coords.latitude+" Long"+ position.coords.latitude);
      //
      var urlAddr = "https://maps.googleapis.com/maps/api/geocode/json?latlng="+position.coords.latitude+","+position.coords.longitude+"&key="+apiKey;
      console.log(urlAddr);
      var address = '';
      ajax(
    { 
      url: urlAddr, 
      type: 'json' 
    },
      function(data) {
      console.log(data);
        address = data.results[0].formatted_address;
        e.menu.item(e.section, e.item, { 
          title:e.menu.item(e.section, e.item).title, 
          subtitle: address, 
          icon: e.menu.item(e.section, e.item).icon
        });        
        defineLocation.subtitle(address);
    });
      
      
      defineLocation.body('Lat: '+position.coords.latitude+' \nLong:'+position.coords.longitude);
      
     // defineLocation.body("Lat: "+position.coords.latitude+" Long"+ position.coords.longitude);
    }

    navigator.geolocation.getCurrentPosition(showPosition);    

  var Vibe = require('ui/vibe');

  Vibe.vibrate('short');
//  wind.add(textfield);
  //wind.show();

  });
routesMenu.show();  
});


main.show();