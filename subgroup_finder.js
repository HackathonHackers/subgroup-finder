/*global console, $, callBackWithData, FB, hackers, groups*/

var FB_ID, FBName,
    HH_ID, subgroups;

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
                                + "</a><br>"
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
            if (data.hasOwnProperty(HH_ID)) {
                subgroups = data[HH_ID];
                console.log(subgroups);
                getGroupLinks();
            }
        });
    });
}

function getGroupID() {
    'use strict';
    $(document).ready(function () {
        $.getJSON('names_ids.json', function (data) {
            if (data.hasOwnProperty(FBName)) {
                HH_ID = data[FBName][0];
                console.log(HH_ID);
                getGroupDataFromID();
            }
        });
    });
}

function grabFB_ID() {
    "use strict";
	FB.getLoginStatus(function (response) {
        FB_ID = response.authResponse.userID;
        FB.api(
            '/' + FB_ID.toString(),
            'GET',
            {},
            function (response2) {
                FBName = response2.name;
                console.log(FBName);
                getGroupID();
            }
        );
    });
}