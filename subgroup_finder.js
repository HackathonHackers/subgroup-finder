/*global console, $, callBackWithData, FB, hackers, groups*/

var FB_ID, FBName,
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
        $.getJSON('suggested_groups.json', function (data) {
            if (data.hasOwnProperty(FB_ID)) {
                subgroups = data[FB_ID];
                console.log(subgroups);
                getGroupLinks();
            }
        });
    });
}

function grabFB_ID() {
    "use strict";
	FB.getLoginStatus(function (response) {
        FB_ID = response.authResponse.userID;
        console.log(FB_ID);
        getGroupDataFromID();
    });
}