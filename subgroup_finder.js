/*global console, $, callBackWithData, FB, hackers, groups*/

var FB_ID,
    subgroups;

function getGroupLinks() {
    'use strict';
    
    $(document).ready(function () {
        $.getJSON('groups.json', function (data) {
            var g, rec_group;
            for (g in subgroups) {
                if (subgroups.hasOwnProperty(g)) {
                    rec_group = subgroups[g];
                    if (data.hasOwnProperty(rec_group)) {
                        $('#recommendations').append(
                            "<a href='" + data[rec_group] + "'>"
                                + rec_group
                                + "</a>"
                        );
                    } else {
                        $('#recommendations').append(
                            "<p>" + rec_group + "</p>"
                        );
                    }
                }
            }
        });
    });
}

function getGroupDataFromID() {
    'use strict';
    $(document).ready(function () {
        $.getJSON('hh_recommend.json', function (data) {
            if (data.hasOwnProperty(FB_ID)) {
                subgroups = data[FB_ID];
                getGroupLinks();
            }
        });
    });
}

function grabFB_ID() {
    "use strict";
	FB.getLoginStatus(function (response) {
        FB_ID = response.authResponse.userID;
        getGroupDataFromID();
    });
}